import { Emprestimo } from "./Emprestimo";

// Builder: monta o empréstimo passo a passo
export class EmprestimoBuilder {
  // estado do builder, cada parte começa com um valor padrão
  private usuarioEmp = "";
  private itemEmp = "";
  private prazoEmp = 0;
  private observacaoEmp?: string;
  private renovavelEmp?: boolean;

  // um método para cada parte, todos devolvem this para encadear as chamadas
  usuario(u: string) {
    this.usuarioEmp = u;
    return this;
  }

  item(i: string) {
    this.itemEmp = i;
    return this;
  }

  prazoDias(p: number) {
    this.prazoEmp = p;
    return this;
  }

  observacao(o: string) {
    this.observacaoEmp = o;
    return this;
  }

  renovavel(r: boolean) {
    this.renovavelEmp = r;
    return this;
  }

  // só aqui o empréstimo é montado de verdade
  build(): Emprestimo {
    const e: Emprestimo = {
      usuario: this.usuarioEmp,
      item: this.itemEmp,
      prazoDias: this.prazoEmp,
    };
    // as partes opcionais só entram se foram configuradas
    if (this.observacaoEmp) e.observacao = this.observacaoEmp;
    if (this.renovavelEmp) e.renovavel = this.renovavelEmp;
    return e;
  }
}