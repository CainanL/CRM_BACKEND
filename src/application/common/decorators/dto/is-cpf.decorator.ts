import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
 import { ValidatorsHelpers } from "../../helpers/validators.helpers";

export function IsCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isCPF",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return typeof value === "string" && ValidatorsHelpers.isValidCPF(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return "CPF inválido";
                },
            },
        });
    };
}
