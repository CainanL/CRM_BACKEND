import { Injectable } from "@nestjs/common";
import { HandlerBase } from "src/application/common/handle-base";
import { CreateCorporateClientRequest } from "./create-corporate-client.request";
import { ClientVM } from "src/application/ViewModels/client/client.vm";

@Injectable()
export class CreateCorporateClientService extends HandlerBase<CreateCorporateClientRequest, ClientVM> {
    protected async executeCore(request: CreateCorporateClientRequest, data?: any): Promise<ClientVM> {

        return await this.transaction<ClientVM>(async (tx) => {

            const count = await tx.client.count();
            const internalCode = request?.internalCode || `CLI${String(count + 1).padStart(3, '0')}`;

            let client = await tx.client.create({
                data: {
                    clientType: "CORPORATE",
                    
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
