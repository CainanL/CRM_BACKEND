import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";
import { ValidatorsHelpers } from "../../helpers/validators.helpers";

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "isCNPJ",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    return typeof value === "string" && ValidatorsHelpers.isValidCNPJ(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return "CNPJ inválido";
                },
            },
        });
    };
}
