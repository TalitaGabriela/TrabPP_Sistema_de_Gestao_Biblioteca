import {
  RegraEmprestimo,
  CalculoMulta,
  RegraEmprestimoAluno,
  CalculoMultaAluno,
  RegraEmprestimoProfessor,
  CalculoMultaProfessor,
} from "./RegrasUsuario";

// Abstract Factory: contrato da família inteira.
// Quem implementar promete entregar as duas peças, sempre do mesmo tipo de usuário.
export interface FabricaRegrasUsuario {
  criarRegraEmprestimo(): RegraEmprestimo;
  criarCalculoMulta(): CalculoMulta;
}

// Fábrica do Aluno: só ela conhece as classes do Aluno
export class FabricaAluno implements FabricaRegrasUsuario {
  criarRegraEmprestimo() {
    return new RegraEmprestimoAluno();
  }
  criarCalculoMulta() {
    return new CalculoMultaAluno();
  }
}

// Fábrica do Professor: só ela conhece as classes do Professor
export class FabricaProfessor implements FabricaRegrasUsuario {
  criarRegraEmprestimo() {
    return new RegraEmprestimoProfessor();
  }
  criarCalculoMulta() {
    return new CalculoMultaProfessor();
  }
}