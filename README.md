# Marmoraria Nunes — Irecê-BA

Site institucional da Marmoraria Nunes. HTML, CSS e JavaScript estáticos, sem build e
sem dependência: é só servir a pasta.

## Estrutura

```
index.html                    página única
assets/css/styles.css         estilos
assets/js/main.js             interações
assets/img/                   logos e texturas de pedra
assets/img/portfolio/mini/    47 fotos em 620px (esteira e grade)
assets/img/portfolio/full/    as mesmas 47 em 1500px (tela cheia)
```

## Antes de publicar

**1. WhatsApp.** Abrir `assets/js/main.js` e trocar as duas primeiras constantes:

```js
var WA_NUMERO = '5574000000000';   // 55 + DDD + número, só dígitos
var WA_EXIBE  = '(74) 0 0000-0000'; // como aparece escrito no site
```

Os 34 links de WhatsApp da página e o número exibido saem daí. É o único lugar a mexer.

**2. Telefone no SEO.** Em `index.html`, atualizar o campo `telephone` do bloco
`application/ld+json`.

**3. Endereço.** Hoje consta apenas "Irecê e região, Bahia", no bloco de contato e no
mesmo `ld+json`.

## Publicação

Qualquer hospedagem de arquivo estático serve. O `index.html` está na raiz, então
Vercel, Netlify ou GitHub Pages funcionam sem configuração: é só apontar para a raiz do
repositório, sem build command e sem output directory.

## Manutenção

- **Serviços:** 18 itens em 4 abas dentro de `index.html`. Cada um tem um `data-msg`
  com a mensagem que abre no WhatsApp. Para incluir um serviço, copiar um bloco `.row`,
  trocar texto, `data-msg` e o ícone (`#s-...` do sprite no topo do arquivo).
- **Portfólio:** as legendas ficam no array `FOTOS` de `main.js`, na ordem dos arquivos
  `p-01` a `p-47`. Para acrescentar fotos, gerar os dois tamanhos, salvar com o número
  seguinte nas duas pastas e adicionar a legenda no fim do array.
- **Cores e tipografia:** todas as variáveis estão no `:root` de `styles.css`.

As imagens originais, o logo em alta e o histórico do projeto ficam no repositório do
workspace, em `sites/035 - Marmoraria Nunes Irecê/`.
