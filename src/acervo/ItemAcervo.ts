// Contrato (produto): todo item do acervo precisa ter um título e seus assuntos.
// Prototype: todo item também sabe se clonar.
export interface ItemAcervo {
  titulo: string;
  assuntos: string[];
  clone(): ItemAcervo;
}

// Produto concreto: Livro cumpre o contrato do ItemAcervo
export class Livro implements ItemAcervo {
  constructor(public titulo: string, public assuntos: string[]) {}

  // [...this.assuntos] cria um array novo, mexer na cópia não afeta o original
  clone(): Livro {
    return new Livro(this.titulo, [...this.assuntos]);
  }
}

// Produto concreto: Revista também cumpre o mesmo contrato
export class Revista implements ItemAcervo {
  constructor(public titulo: string, public assuntos: string[]) {}

  // mesma ideia do Livro, a cópia sai com o próprio array de assuntos
  clone(): Revista {
    return new Revista(this.titulo, [...this.assuntos]);
  }
}