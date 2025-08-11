

export class UserVm {
    public name: string;
    public email: string;
    public token: string;
    public refreshToken: string;
    public tenantId: string;

    constructor({ name, email, tenantId }: any, token: string, refreshToken: string) {
        this.name = name;
        this.email = email;
        this.token = token;
        this.refreshToken = refreshToken;
        this.tenantId = tenantId;
    }
}
