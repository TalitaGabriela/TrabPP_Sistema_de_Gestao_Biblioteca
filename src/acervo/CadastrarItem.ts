import { ItemAcervo, Livro, Revista } from "./ItemAcervo";

// Creator: promete criar um item, mas não decide qual.
// criarItem() é o Factory Method, quem decide o que ele devolve são as subclasses.
export abstract class CadastrarItem {
  abstract criarItem(titulo: string, assuntos: string[]): ItemAcervo;
}

// Creator concreto: só essa classe sabe que existe Livro
export class CadastrarLivro extends CadastrarItem {
  criarItem(titulo: string, assuntos: string[]): ItemAcervo {
    return new Livro(titulo, assuntos);
  }
}

// Creator concreto: só essa classe sabe que existe Revista
export class CadastrarRevista extends CadastrarItem {
  criarItem(titulo: string, assuntos: string[]): ItemAcervo {
    return new Revista(titulo, assuntos);
  }
}