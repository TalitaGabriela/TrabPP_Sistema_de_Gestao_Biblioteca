import { ConfiguracaoBiblioteca } from "./config/ConfiguracaoBiblioteca";
import { Acervo } from "./acervo/Acervo";
import { CadastrarLivro, CadastrarRevista } from "./acervo/CadastrarItem";
import { FabricaAluno, FabricaProfessor } from "./usuarios/FabricaRegrasUsuario";
import { ServicoEmprestimo } from "./emprestimos/ServicoEmprestimo";

// Singleton: as duas variáveis apontam para a mesma configuração
const config = ConfiguracaoBiblioteca.getInstancia();
const config2 = ConfiguracaoBiblioteca.getInstancia();
console.log(config.nomeBiblioteca);
console.log("Mesma instância?", config === config2);

// Factory Method: só muda o creator passado, o Acervo continua igual
const livros = new Acervo(new CadastrarLivro());
const domCasmurro = livros.adicionar("Dom Casmurro", ["romance", "literatura brasileira"]);

const revistas = new Acervo(new CadastrarRevista());
const revista = revistas.adicionar("Superinteressante", ["ciência"]);

console.log(livros.listar());
console.log(revistas.listar());

// Abstract Factory + Builder: cada serviço recebe a família de regras do seu usuário
const servicoAluno = new ServicoEmprestimo(new FabricaAluno());
const servicoProfessor = new ServicoEmprestimo(new FabricaProfessor());

console.log(servicoAluno.emprestar("Ana", domCasmurro));
console.log(servicoProfessor.emprestar("Prof. Carlos", revista, "Usar na aula de terça"));

// multa de 3 dias de atraso para cada tipo de usuário
console.log("Multa aluno:", servicoAluno.calcularMulta(3));
console.log("Multa professor:", servicoProfessor.calcularMulta(3));