// Contrato (produto): todo item do acervo precisa ter um título e seus assuntos
export interface ItemAcervo {
  titulo: string;
  assuntos: string[];
}

// Produto concreto: Livro cumpre o contrato do ItemAcervo
export class Livro implements ItemAcervo {
  constructor(public titulo: string, public assuntos: string[]) {}
}

// Produto concreto: Revista também cumpre o mesmo contrato
export class Revista implements ItemAcervo {
  constructor(public titulo: string, public assuntos: string[]) {}
}