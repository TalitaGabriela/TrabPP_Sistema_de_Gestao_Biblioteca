import { ItemAcervo } from "./ItemAcervo";
import { CadastrarItem } from "./CadastrarItem";

// Cliente: o Acervo depende só do creator abstrato,
// ele nunca escreve o nome Livro ou Revista
export class Acervo {
  // lista com os itens cadastrados na biblioteca
  private itens: ItemAcervo[] = [];

  // recebe qual creator vai usar para cadastrar
  constructor(private cadastro: CadastrarItem) {}

  // pede para o creator criar o item e guarda na lista
  adicionar(titulo: string, assuntos: string[]): ItemAcervo {
    const item = this.cadastro.criarItem(titulo, assuntos);
    this.itens.push(item);
    return item;
  }

  // devolve os itens cadastrados
  listar(): ItemAcervo[] {
    return this.itens;
  }
}