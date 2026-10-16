import { ConfiguracaoBiblioteca } from "../config/ConfiguracaoBiblioteca";

// Primeira peça da família: a regra de empréstimo
export interface RegraEmprestimo {
  prazoEmDias(): number;
  podeRenovar(): boolean;
}

// Segunda peça da família: o cálculo da multa
export interface CalculoMulta {
  calcular(diasAtraso: number): number;
}

// Peças da família do Aluno
export class RegraEmprestimoAluno implements RegraEmprestimo {
  // aluno fica 7 dias com o item e não pode renovar
  prazoEmDias(): number {
    return 7;
  }
  podeRenovar(): boolean {
    return false;
  }
}

export class CalculoMultaAluno implements CalculoMulta {
  // aluno paga o valor cheio da multa, que vem da configuração (Singleton)
  calcular(diasAtraso: number): number {
    const config = ConfiguracaoBiblioteca.getInstancia();
    return diasAtraso * config.valorMultaDia;
  }
}

// Peças da família do Professor
export class RegraEmprestimoProfessor implements RegraEmprestimo {
  // professor fica 15 dias com o item e pode renovar
  prazoEmDias(): number {
    return 15;
  }
  podeRenovar(): boolean {
    return true;
  }
}

export class CalculoMultaProfessor implements CalculoMulta {
  // professor paga metade do valor da multa
  calcular(diasAtraso: number): number {
    const config = ConfiguracaoBiblioteca.getInstancia();
    return diasAtraso * (config.valorMultaDia / 2);
  }
}