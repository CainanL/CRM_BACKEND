import { Client, Prisma } from ".prisma/tenant-client";

type ClientWithValues = Prisma.ClientGetPayload<{
    include: { address: true }
}>;

export class ClientToListVm {
    public id: string;
    public clientType: string;
    public displayName: string;
    public email: string;
    public phone?: string;
    public status: string;
    public internalCode: string;

    constructor(client: Client) {
        this.id = client.id;
        this.clientType = client.clientType;
        this.displayName = client.clientType === "INDIVIDUAL" ? client.fullName || "" : client.tradeName || client.companyName || "";
        this.email = client.email;
        this.phone = client.phone || undefined;
        this.status = client.status;
        this.internalCode = client.internalCode;
    }
}

export class ClientVM {
    public id: string;
    public clientType: string;
    
    // Campos para pessoa física
    public fullName?: string;
    public cpf?: string;
    public birthDate?: Date;
    public sex?: string;
    
    // Campos para pessoa jurídica
    public companyName?: string;
    public tradeName?: string;
    public cnpj?: string;
    public stateRegistration?: string;
    public municipalRegistration?: string;
    
    // Campos comuns
    public photo?: string;
    public email: string;
    public phone?: string;
    public alternativePhone?: string;
    
    public address?: {
        street: string;
        number: string;
        complement?: string;
        district: string;
        city: string;
        state: string;
        cep: string;
    };
    
    // Campos de negócio
    public internalCode: string;
    public status: string;
    public notes?: string;
    public userId?: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(client: ClientWithValues) {
        this.id = client.id;
        this.clientType = client.clientType;
        
        // Campos para pessoa física
        this.fullName = client.fullName || undefined;
        this.cpf = client.cpf || undefined;
        this.birthDate = client.birthDate || undefined;
        this.sex = client.sex || undefined;
        
        // Campos para pessoa jurídica
        this.companyName = client.companyName || undefined;
        this.tradeName = client.tradeName || undefined;
        this.cnpj = client.cnpj || undefined;
        this.stateRegistration = client.stateRegistration || undefined;
        this.municipalRegistration = client.municipalRegistration || undefined;
        
        // Campos comuns
        this.photo = client.photo || undefined;
        this.email = client.email;
        this.phone = client.phone || undefined;
        this.alternativePhone = client.alternativePhone || undefined;
        
        if (client.address) {
            this.address = {
                street: client.address.street,
                number: client.address.number,
                complement: client.address.complement || undefined,
                district: client.address.district,
                city: client.address.city,
                state: client.address.state,
                cep: client.address.cep
            };
        }
        
        // Campos de negócio
        this.internalCode = client.internalCode;
        this.status = client.status;
        this.notes = client.notes || undefined;
    }
}
