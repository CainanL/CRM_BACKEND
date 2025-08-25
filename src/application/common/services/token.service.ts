import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from ".prisma/master-client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
  private readonly accessTokenExpiration: string; // tempo de expiração do token
  private readonly refreshTokenExpiration: string; // tempo de expiração do refresh

  constructor(private readonly jwtService: JwtService,
    private configService: ConfigService
  ) {
    const nodeEnv = this.configService.get<string>('NODE_ENV');
    this.accessTokenExpiration = nodeEnv == 'production' ? '15m' : "365d";
    this.refreshTokenExpiration = nodeEnv == 'production' ? '7d' : "365d";
  }

  /**
   * Cria um token de acesso.
   * @param payload Payload para o token.
   */
  public generateAccessToken(user: User): string {
    const payload = { sub: user.id, id: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      expiresIn: this.accessTokenExpiration,
      secret: process.env.JWT_SECRET,
    });
  }

  /**
   * Cria um refresh token.
   * @param payload Payload para o refresh token.
   */
  public generateRefreshToken(user: any): string {
    const payload = { sub: user.id, id: user.id, email: user.email };
    return this.jwtService.sign(payload, {
      expiresIn: this.refreshTokenExpiration,
      secret: process.env.JWT_SECRET,
    });
  }

  /**
   * Verifica se o token de acesso é válido e não expirado.
   * Retorna `true` se válido, `false` se expirado ou inválido.
   */
  public isAccessTokenValid(token: string): boolean {
    try {
      this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verifica se o refresh token é válido e não expirado.
   * Retorna `true` se válido, `false` se expirado ou inválido.
   */
  public isRefreshTokenValid(refreshToken: string): boolean {
    try {
      this.jwtService.verify(refreshToken, { secret: process.env.JWT_SECRET });
      return true;
    } catch {
      return false;
    }
  }

  public getPayload(token: string): { sub: string, id: string, email: string } {
    const { payload } = this.jwtService.decode(token, { complete: true });
    return payload;
  }
}
