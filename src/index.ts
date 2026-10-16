import { ConfiguracaoBiblioteca } from "./config/ConfiguracaoBiblioteca";
import { Acervo } from "./acervo/Acervo";
import { CadastrarLivro, CadastrarRevista } from "./acervo/CadastrarItem";

// Singleton: as duas variáveis apontam para a mesma configuração
const config = ConfiguracaoBiblioteca.getInstancia();
const config2 = ConfiguracaoBiblioteca.getInstancia();
console.log(config.nomeBiblioteca);
console.log("Mesma instância?", config === config2);

// Factory Method: só muda o creator passado, o Acervo continua igual
const livros = new Acervo(new CadastrarLivro());
livros.adicionar("Dom Casmurro", ["romance", "literatura brasileira"]);

const revistas = new Acervo(new CadastrarRevista());
revistas.adicionar("Superinteressante", ["ciência"]);

console.log(livros.listar());
console.log(revistas.listar());