# Padrões Criacionais Aplicados

Este documento explica onde cada um dos cinco padrões criacionais foi
usado no sistema de biblioteca, qual problema ele resolve e por que ele
faz sentido naquele ponto.

---

## 1. Singleton

**Onde:** `src/config/ConfiguracaoBiblioteca.ts`

**Problema:** o nome da biblioteca e o valor da multa por dia de atraso
precisam ser os mesmos em todo o sistema. Se cada parte criasse a sua
própria configuração, poderiam existir valores diferentes de multa ao
mesmo tempo.

**Por quê:** o Singleton garante que existe uma única instância da
configuração, compartilhada por todo o sistema.

**Como funciona:**

- O construtor é `private`, então ninguém de fora consegue dar `new`
  na classe;
- O atributo `private static instancia` guarda a única instância;
- O método `static getInstancia()` cria a instância só na primeira vez
  e, nas próximas, devolve sempre a mesma.

**Onde é usado:** no cálculo da multa do aluno e do professor, que
pegam o `valorMultaDia` da configuração.

---

## 2. Factory Method

**Onde:** `src/acervo/CadastrarItem.ts`

**Problema:** o acervo tem tipos diferentes de item (Livro e Revista).
Se o `Acervo` decidisse com `if` qual item criar, ele teria dois motivos
para mudar: a regra do acervo e a escolha do item (viola o SRP). Além
disso, todo tipo novo de item obrigaria a mexer no `Acervo`, que já
funciona (viola o OCP).

**Por quê:** com o Factory Method, o `Acervo` só pede para criar um
item, sem decidir qual. Quem decide é cada creator concreto. Para
adicionar um E-book, por exemplo, basta criar as classes `Ebook` e
`CadastrarEbook`, sem alterar o `Acervo`.

| Papel              | Classe                               |
|--------------------|--------------------------------------|
| Produto            | `ItemAcervo`                         |
| Produtos concretos | `Livro`, `Revista`                   |
| Creator            | `CadastrarItem`                      |
| Factory Method     | `criarItem()`                        |
| Creators concretos | `CadastrarLivro`, `CadastrarRevista` |
| Cliente            | `Acervo`                             |

---

## 3. Abstract Factory

**Onde:** `src/usuarios/FabricaRegrasUsuario.ts` e `src/usuarios/RegrasUsuario.ts`

**Problema:** aluno e professor têm regras diferentes de empréstimo
(prazo e renovação) e de multa. Essas peças precisam sempre combinar:
não pode acontecer de usar o prazo do professor com a multa do aluno.

**Por quê:** a Abstract Factory cria uma família inteira de objetos que
precisam combinar entre si. Cada fábrica concreta só conhece as classes
do seu tipo de usuário, então é impossível montar uma família
misturada. Para trocar de aluno para professor, troca-se a fábrica
inteira de uma vez.

| Papel              | Classe                                                   |
|--------------------|----------------------------------------------------------|
| Fábrica abstrata   | `FabricaRegrasUsuario`                                   |
| Fábricas concretas | `FabricaAluno`, `FabricaProfessor`                       |
| Produtos           | `RegraEmprestimo`, `CalculoMulta`                        |
| Família do Aluno   | `RegraEmprestimoAluno`, `CalculoMultaAluno`              |
| Família do Professor | `RegraEmprestimoProfessor`, `CalculoMultaProfessor`    |
| Cliente            | `ServicoEmprestimo`                                      |

| Regra          | Aluno        | Professor        |
|----------------|--------------|------------------|
| Prazo          | 7 dias       | 15 dias          |
| Pode renovar   | Não          | Sim              |
| Multa por dia  | Valor cheio  | Metade do valor  |

---

## 4. Builder

**Onde:** `src/emprestimos/EmprestimoBuilder.ts`

**Problema:** todo empréstimo tem usuário, item e prazo, mas observação
e renovação só aparecem às vezes. Com um construtor só, a chamada
ficaria cheia de `undefined` e seria preciso abrir a classe para saber
o que é cada posição (construtor telescópico).

**Por quê:** o Builder monta o empréstimo passo a passo e só entrega o
objeto pronto no final.

**Como funciona:**

- O estado de cada parte fica dentro do builder, com um valor padrão;
- Cada parte tem o seu próprio método (`usuario()`, `item()`,
  `prazoDias()`, `observacao()`, `renovavel()`), e todos devolvem `this`
  para encadear as chamadas;
- O `build()` monta o `Emprestimo`, e as partes opcionais só entram se
  foram configuradas.

**Onde é usado:** no `ServicoEmprestimo`, que preenche as partes
obrigatórias e só chama as opcionais quando precisa.

---

## 5. Prototype

**Onde:** `src/acervo/ItemAcervo.ts` (método `clone()` do `Livro` e da `Revista`)

**Problema:** uma revista tem várias edições com os mesmos dados base,
mudando só o título da edição e alguns assuntos. Copiar o objeto sem
cuidado faria a cópia dividir o mesmo array de assuntos com o original,
e mexer em um mudaria o outro sem ninguém perceber.

**Por quê:** em vez de cadastrar cada edição do zero, o sistema clona a
revista modelo e muda só o que for diferente. Quem garante que a cópia
sai independente é o próprio item, pelo `clone()`.

**Como funciona:** o `clone()` cria um objeto novo com
`[...this.assuntos]`, que gera um array novo. Assim, adicionar um
assunto na edição nova não altera a revista modelo.

**Por que não Builder:** aqui não é preciso montar um objeto do zero com
partes opcionais, e sim copiar um que já está pronto.

---

## Integração entre os padrões

Os cinco padrões trabalham juntos no mesmo fluxo, mostrado no `src/index.ts`:

1. A **configuração** única da biblioteca é carregada (Singleton);
2. O Livro e a Revista são cadastrados pelos creators (Factory Method);
3. Uma nova edição da revista é criada clonando a revista modelo (Prototype);
4. O tipo de usuário define a família de regras usada (Abstract Factory),
   e a multa usa o valor da configuração do Singleton;
5. O `ServicoEmprestimo` monta o empréstimo com essas regras (Builder),
   recebendo o item criado pelo Factory Method ou pelo Prototype.