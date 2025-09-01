import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsValidAge(min: number, max: number, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isValidAge",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (!value) return false;
          const birthDate = new Date(value);
          if (isNaN(birthDate.getTime())) return false; // data inválida

          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const m = today.getMonth() - birthDate.getMonth();

          if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }

          return age >= min && age <= max;
        },
        defaultMessage(_args: ValidationArguments) {
          return `A idade deve ser entre ${min} e ${max} anos`;
        },
      },
    });
  };
}
