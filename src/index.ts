import { ConfiguracaoBiblioteca } from "./config/ConfiguracaoBiblioteca";
import { Acervo } from "./acervo/Acervo";
import { CadastrarLivro, CadastrarRevista } from "./acervo/CadastrarItem";
import { FabricaAluno, FabricaProfessor } from "./usuarios/FabricaRegrasUsuario";
import { ServicoEmprestimo } from "./emprestimos/ServicoEmprestimo";

// 1. Singleton: as duas variáveis apontam para a mesma configuração
const config = ConfiguracaoBiblioteca.getInstancia();
const config2 = ConfiguracaoBiblioteca.getInstancia();
console.log(config.nomeBiblioteca);
console.log("Mesma instância?", config === config2);

// 2. Factory Method: só muda o creator passado, o Acervo continua igual
const livros = new Acervo(new CadastrarLivro());
const domCasmurro = livros.adicionar("Dom Casmurro", ["romance", "literatura brasileira"]);

const revistas = new Acervo(new CadastrarRevista());
const revistaModelo = revistas.adicionar("Superinteressante", ["ciência"]);

console.log(livros.listar());

// 3. Prototype: cada edição nova da revista é um clone do modelo,
// só muda o que for diferente
const edicaoOutubro = revistaModelo.clone();
edicaoOutubro.titulo = "Superinteressante - Outubro";
edicaoOutubro.assuntos.push("tecnologia");

console.log(revistaModelo); // modelo continua só com "ciência"
console.log(edicaoOutubro); // cópia com "ciência" e "tecnologia"

// 4. Abstract Factory: cada serviço recebe a família de regras do seu usuário
const servicoAluno = new ServicoEmprestimo(new FabricaAluno());
const servicoProfessor = new ServicoEmprestimo(new FabricaProfessor());

// 5. Builder: o serviço monta o empréstimo só com as partes necessárias
console.log(servicoAluno.emprestar("Ana", domCasmurro));
console.log(servicoProfessor.emprestar("Prof. Carlos", edicaoOutubro, "Usar na aula de terça"));

// multa de 3 dias de atraso para cada tipo de usuário
console.log("Multa aluno:", servicoAluno.calcularMulta(3));
console.log("Multa professor:", servicoProfessor.calcularMulta(3));