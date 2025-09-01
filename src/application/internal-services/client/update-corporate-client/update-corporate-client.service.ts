import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateCorporateClientRequest } from "./update-corporate-client.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";
import { ClientType } from "src/repos/enums/client-type.enum";

@Injectable()
export class UpdateCorporateClientService extends HandlerBase<UpdateCorporateClientRequest, ClientVM> {
    protected async executeCore(request: UpdateCorporateClientRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const existingClient = await tx.client.findUnique({
                where: { id: request.id },
                include: { address: true }
            });

            if (!existingClient) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            if (existingClient.clientType !== ClientType.CORPORATE) {
                throw new BaseException("Este cliente não é uma pessoa jurídica", 400);
            }

            await tx.client.update({
                where: { id: request.id },
                data: {
                    clientType: ClientType.CORPORATE,
                    
                    // Campos para pessoa física (null para pessoa jurídica)
                    fullName: null,
                    cpf: null,
                    birthDate: null,
                    sex: null,
                    
                    // Campos para pessoa jurídica
                    companyName: request.companyName,
                    tradeName: request.tradeName,
                    cnpj: request.cnpj,
                    stateRegistration: request.stateRegistration,
                    municipalRegistration: request.municipalRegistration,
                    
                    // Campos comuns
                    photo: request.photo,
                    email: request.email,
                    phone: request.phone,
                    alternativePhone: request.alternativePhone,
                    
                    // Campos de negócio
                    internalCode: request.internalCode,
                    status: request.status,
                    notes: request.notes
                },
                include: { address: true }
            });

            // Atualizar endereço
            if (existingClient.address) {
                await tx.clientAddress.update({
                    where: { clientId: request.id },
                    data: {
                        street: request.address.street,
                        number: request.address.number,
                        complement: request.address.complement,
                        district: request.address.district,
                        city: request.address.city,
                        state: request.address.state,
                        cep: request.address.cep
                    }
                });
            } else {
                await tx.clientAddress.create({
                    data: {
                        street: request.address.street,
                        number: request.address.number,
                        complement: request.address.complement,
                        district: request.address.district,
                        city: request.address.city,
                        state: request.address.state,
                        cep: request.address.cep,
                        client: {
                            connect: {
                                id: request.id
                            }
                        }
                    }
                });
            }

            // Buscar cliente atualizado com endereço
            const updatedClient = await tx.client.findUnique({
                where: { id: request.id },
                include: { address: true }
            });

            return new ClientVM(updatedClient!);
        });
    }
}
