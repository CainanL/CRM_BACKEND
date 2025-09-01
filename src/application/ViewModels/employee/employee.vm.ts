import { Employee, Prisma } from ".prisma/tenant-client";

type EmployeeWithValues = Prisma.EmployeeGetPayload<{
    include: { address: true }
}>;

export class EmployeeToListVm {
    public id: string;
    public fullName: string;
    public photo?: string;
    public email: string;
    public phone?: string;
    public status: string;
    public function: string;

    constructor(employee: Employee) {
        this.id = employee.id;
        this.fullName = employee.fullName;
        this.photo = employee.photo || undefined;
        this.email = employee.email;
        this.phone = employee.phone || undefined;
        this.status = employee.status;
        this.function = employee.function;
    }
}

export class EmployeeVM {
    public id: string;
    public fullName: string;
    public photo?: string;
    public cpf: string;
    public birthDate: Date;
    public sex: string;
    public email: string;
    public phone?: string;
    public address: {
        street: string;
        number: string;
        complement?: string;
        district: string;
        city: string;
        state: string;
        cep: string;
    };
    public function: string;
    public department: string;
    public internalRegistration: string;
    public admissionDate: Date;
    public typeOfContract: string;
    public salary: number;
    public comission?: number;
    public status: string;
    public userId?: string;
    public isActive: boolean;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(employee: EmployeeWithValues) {
        this.id = employee.id;
        this.fullName = employee.fullName;
        this.photo = employee.photo || undefined;
        this.cpf = employee.cpf;
        this.birthDate = employee.birthDate;
        this.sex = employee.sex;
        this.email = employee.email;
        this.phone = employee.phone || undefined;
        if (employee.address)
            this.address = {
                street: employee.address.street,
                number: employee.address.number,
                complement: employee.address.complement || undefined,
                district: employee.address.district,
                city: employee.address.city,
                state: employee.address.state,
                cep: employee.address.cep
            };
        this.function = employee.function;
        this.department = employee.department;
        this.internalRegistration = employee.internalRegistration;
        this.admissionDate = employee.admissionDate;
        this.typeOfContract = employee.typeOfContract;
        this.salary = employee.salary.toNumber();
        this.comission = employee.comission?.toNumber() || undefined;
        this.status = employee.status;
        this.userId = employee.userId || undefined;

    }
}
