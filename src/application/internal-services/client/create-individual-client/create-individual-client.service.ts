import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateIndividualClientRequest } from "./create-individual-client.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";

@Injectable()
export class CreateIndividualClientService extends HandlerBase<CreateIndividualClientRequest, ClientVM> {
    protected async executeCore(request: CreateIndividualClientRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const count = await tx.client.count();
            const internalCode = request?.internalCode || `CLI${String(count + 1).padStart(3, '0')}`;

            let client = await tx.client.create({
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
                    internalCode: internalCode,
                    status: request.status,
                    notes: request.notes,
                    isActive: true
                },
                include: { address: true }
            });

            const address = await tx.clientAddress.create({
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
                            id: client.id
                        }
                    }
                },
            });

            client.address = address;

            return new ClientVM(client);
        });
    }
}
