# Tema: Sistema de Gestão de Biblioteca

## Descrição do domínio

O sistema gerencia o acervo e os empréstimos de uma biblioteca.
Ele permite cadastrar itens do acervo, controlar exemplares,
registrar usuários e realizar empréstimos seguindo regras
diferentes para cada tipo de usuário.

## Entidades principais

- **Item do acervo**: pode ser um Livro ou uma Revista.
- **Usuário**: pode ser Aluno ou Professor.
- **Empréstimo**: registro de retirada de um item por um usuário,
  com prazo de devolução e informações opcionais.
- **Configuração da biblioteca**: dados gerais, como o nome da
  biblioteca e o valor da multa por dia de atraso.

## Funcionalidades

- Cadastrar itens do acervo de tipos diferentes;
- Criar novas edições de uma revista a partir de uma já cadastrada;
- Aplicar regras de prazo e multa conforme o tipo de usuário;
- Montar e registrar empréstimos;
- Consultar a configuração geral da biblioteca.

## Planejamento dos padrões

| Padrão           | Onde será usado                                  |
|------------------|--------------------------------------------------|
| Singleton        | Configuração geral da biblioteca                 |
| Factory Method   | Cadastro dos tipos de item (Livro e Revista)     |
| Abstract Factory | Regras de empréstimo e multa por tipo de usuário |
| Builder          | Montagem do objeto Empréstimo                    |
| Prototype        | Criação de novas edições por clonagem            |