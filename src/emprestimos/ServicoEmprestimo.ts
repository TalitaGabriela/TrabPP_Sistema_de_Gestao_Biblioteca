import { FabricaRegrasUsuario } from "../usuarios/FabricaRegrasUsuario";
import { ItemAcervo } from "../acervo/ItemAcervo";
import { Emprestimo } from "./Emprestimo";
import { EmprestimoBuilder } from "./EmprestimoBuilder";

// Cliente da Abstract Factory: recebe a fábrica e não sabe se é de Aluno ou Professor
export class ServicoEmprestimo {
  constructor(private fabrica: FabricaRegrasUsuario) {}

  // usa a regra da fábrica e o Builder para montar o empréstimo
  emprestar(usuario: string, item: ItemAcervo, observacao?: string): Emprestimo {
    const regra = this.fabrica.criarRegraEmprestimo();

    // partes obrigatórias
    const builder = new EmprestimoBuilder()
      .usuario(usuario)
      .item(item.titulo)
      .prazoDias(regra.prazoEmDias());

    // partes opcionais, só chama se precisar
    if (regra.podeRenovar()) builder.renovavel(true);
    if (observacao) builder.observacao(observacao);

    return builder.build();
  }

  // calcula a multa com a peça da mesma família
  calcularMulta(diasAtraso: number): number {
    return this.fabrica.criarCalculoMulta().calcular(diasAtraso);
  }
}