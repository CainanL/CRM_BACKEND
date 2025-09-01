import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { UpdateIndividualClientRequest } from "./update-individual-client.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";
import { BaseException } from "src/application/common/exceptions/base-exception";

@Injectable()
export class UpdateIndividualClientService extends HandlerBase<UpdateIndividualClientRequest, ClientVM> {
    protected async executeCore(request: UpdateIndividualClientRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const existingClient = await tx.client.findUnique({
                where: { id: request.id },
                include: { address: true }
            });

            if (!existingClient) {
                throw new BaseException("Cliente não encontrado", 404);
            }

            if (existingClient.clientType !== "INDIVIDUAL") {
                throw new BaseException("Este cliente não é uma pessoa física", 400);
            }

            let client = await tx.client.update({
                where: { id: request.id },
                data: {
                    clientType: "INDIVIDUAL",
                    
                    // Campos para pessoa física
                    fullName: request.fullName,
                    cpf: request.cpf,
                    birthDate: new Date(request.birthDate),
                    sex: request.sex,
                    
                    // Campos para pessoa jurídica (null para pessoa física)
                    companyName: null,
                    tradeName: null,
                    cnpj: null,
                    stateRegistration: null,
                    municipalRegistration: null,
                    
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
