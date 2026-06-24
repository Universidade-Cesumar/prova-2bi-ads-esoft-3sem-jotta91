# Controle de Almoxarifado

## Link do projeto
https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-jotta91/

##  Descrição

Sistema web para controle de almoxarifado desenvolvido com HTML, CSS e JavaScript.

O projeto utiliza a MockAPI para armazenar os materiais cadastrados, permitindo realizar operações completas de CRUD (criação, leitura, atualização e exclusão de dados).

## ⚙️ Funcionalidades

- Cadastro de materiais no estoque
- Listagem automática de materiais via MockAPI
- Atualização de estoque (baixa de materiais)
- Exclusão de materiais
- Validação de retirada de estoque (impede valores inválidos)
- Barra de pesquisa para filtragem de materiais
- Contador de total de itens exibidos
- Destaque visual para estoque baixo (< 10 unidades)
- Atualização automática da interface após alterações

##  Regras de negócio

- Não permite retirada maior que o estoque atual
- Não permite valores negativos ou inválidos
- Atualização em tempo real após cada operação
- Controle de estoque baseado em API externa (MockAPI)

##  Operações da API (CRUD)

- GET → Lista todos os materiais
- POST → Cadastra novos materiais
- PUT → Atualiza quantidade (baixa de estoque)
- DELETE → Remove materiais

##  Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- MockAPI (API REST)

##  API utilizada

MockAPI Resource:`materials`

## 🚀 Como executar o projeto

1. Acesse o link do GitHub Pages:
https://universidade-cesumar.github.io/prova-2bi-ads-esoft-3sem-jotta91/

2. Ou clone o repositório:
git clone https://github.com/universidade-cesumar/prova-2bi-ads-esoft-3sem-jotta91.git

3.Abra o projeto:
Entre na pasta clonada
Abra o arquivo index.html no navegador

# Autor 
João Pedro Guimarães
