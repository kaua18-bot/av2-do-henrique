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
2. A página fará requisições para `https://catfact.ninja/facts?limit=24&page=1` para exibir a lista.

Observação: não é necessário servidor local — abrir os arquivos diretamente funciona para esta aplicação.

## API utilizada
- Listagem e detalhes: `https://catfact.ninja/` (endpoints usados)
- Listagem (exemplo): `https://catfact.ninja/facts?limit=24&page=1`
- Detalhes (exemplo): `detalhes.html?fact=<texto-url-encoded>&length=<n>` ou `detalhes.html?page=1&index=0` (fallback que busca a página e seleciona pelo índice). As imagens são obtidas de `https://loremflickr.com/`.

## Parâmetros de URL
- `fact` (opcional): o texto completo do fato, URL-encoded. Se presente, `detalhes.html` exibirá esse fato diretamente, sem precisar buscar pela página/índice. Exemplo:

  `detalhes.html?fact=Eu%20adoro%20gatos&length=16`

- `length` (opcional): comprimento do fato (número). Pode ser usado junto com `fact` para informar o tamanho.

- Fallback por paginação: se não for fornecido `fact`, a página de detalhes ainda suporta `page` + `index` (ex.: `detalhes.html?page=1&index=0`) — nesse caso o app busca a página correspondente em `catfact.ninja` e exibe o item pelo índice.

## Funcionalidades
- Listagem de fatos em cards responsivos com foto aleatória.
- Indicador de carregamento (spinner) durante requisições.
- Tratamento de erros com mensagens amigáveis.
- Página de detalhes que recebe `fact` (texto) ou `page`+`index` e exibe o fato completo.
- Pesquisa local por termo com filtragem em tempo real.
- Layout responsivo com Bootstrap 5.

## Autor
- Nome: Seu Nome Aqui
