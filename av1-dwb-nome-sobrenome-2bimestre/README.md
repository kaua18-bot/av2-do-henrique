# AV1 DWB - Lista de Posts

## Objetivo
Aplicação web simples em HTML5, CSS3, Bootstrap 5 e JavaScript puro que consome a API catfact.ninja para listar fatos de gatos e exibir detalhes. Cada fato exibe uma foto aleatória de gato (fornecida por loremflickr) para melhorar a interface.

## Tecnologias utilizadas
- HTML5
- CSS3
- Bootstrap 5
- JavaScript (ES6+)

## Estrutura de pastas

```
av1-dwb-nome-sobrenome-2bimestre/
├─ index.html
├─ detalhes.html
├─ css/
│  └─ style.css
├─ js/
│  ├─ script.js
│  └─ detalhes.js
└─ README.md
```

## Como executar
1. Abra `index.html` em um navegador moderno (recomendado Chrome, Edge ou Firefox).
2. A página fará requisições para `https://jsonplaceholder.typicode.com/posts` para exibir a lista.

Observação: não é necessário servidor local — abrir os arquivos diretamente funciona para esta aplicação.

## API utilizada
- Listagem e detalhes: `https://catfact.ninja/` (endpoints usados)
- Listagem (exemplo): `https://catfact.ninja/facts?limit=24&page=1`
- Detalhes (exemplo): `https://catfact.ninja/facts?limit=24&page=1` (a página é buscada e o item selecionado é identificado pelo índice). As imagens são obtidas de `https://loremflickr.com/`.

## Funcionalidades
- Listagem de posts em cards responsivos.
- Indicador de carregamento (spinner) durante requisições.
- Tratamento de erros com mensagens amigáveis.
- Página de detalhes que recebe `id` pela URL (`?id=...`) e exibe informações completas.
- Layout responsivo com Bootstrap 5.

## Autor
- Nome: Seu Nome Aqui
