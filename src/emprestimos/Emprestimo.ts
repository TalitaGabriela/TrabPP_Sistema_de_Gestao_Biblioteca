// Produto final do Builder: o formato que o build() precisa devolver.
// Usuário, item e prazo sempre aparecem, observação e renovação só às vezes.
export interface Emprestimo {
  usuario: string;
  item: string;
  prazoDias: number;
  observacao?: string;
  renovavel?: boolean;
}