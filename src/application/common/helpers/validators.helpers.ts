export class ValidatorsHelpers {
    public static isValidCPF(cpf: string): boolean {
        // Remove caracteres não numéricos
        cpf = cpf.replace(/[^\d]+/g, '');
      
        if (!cpf || cpf.length !== 11) return false;
      
        // Elimina CPFs inválidos conhecidos (todos dígitos iguais)
        if (/^(\d)\1+$/.test(cpf)) return false;
      
        // Valida 1º dígito verificador
        let soma = 0;
        for (let i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;
      
        // Valida 2º dígito verificador
        soma = 0;
        for (let i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(10))) return false;
      
        return true;
      }
}