---
# GERADO por tokens.mjs a partir de tokens.json. Não edite este bloco à mão.
version: alpha
name: "André Ruperto · Portfólio"
description: "Portfólio André Ruperto · Brasa sobre carvão · tema escuro único"
colors:
  primary: "#fe7e29"
  on-primary: "#130f0d"
  fundo-base: "#130f0d"
  fundo-superficie: "#1a1513"
  fundo-sutil: "#241e1b"
  fundo-elevado: "#2c2522"
  fundo-selecionado: "#342d29"
  fundo-selo: "#341706"
  texto-primario: "#eae7e5"
  texto-secundario: "#aaa39f"
  texto-desabilitado: "#7c736f"
  texto-na-acao: "#130f0d"
  texto-link: "#eb864c"
  texto-destaque: "#eb864c"
  texto-selo: "#eb864c"
  borda-padrao: "#3f3732"
  borda-interativa: "#4f4540"
  borda-forte: "#69635f"
  acao-primaria: "#fe7e29"
  acao-primaria-hover: "#ff975d"
  acao-primaria-pressionada: "#a44b09"
  acao-secundaria: "#241e1b"
  acao-secundaria-hover: "#2c2522"
  acao-foco: "#fe7e29"
  acao-destrutiva: "#d53d3d"
  estado-no-ar-texto: "#64bb79"
  estado-no-ar-fundo: "#0d2714"
  estado-no-ar-borda: "#125629"
  estado-disponivel-texto: "#64bb79"
  estado-disponivel-fundo: "#0d2714"
  estado-disponivel-borda: "#125629"
  estado-privado-texto: "#75a9df"
  estado-privado-fundo: "#132231"
  estado-privado-borda: "#264a6e"
  estado-em-construcao-texto: "#c79e41"
  estado-em-construcao-fundo: "#2a1e04"
  estado-em-construcao-borda: "#5c4300"
  estado-erro-texto: "#f57a73"
  estado-erro-fundo: "#371412"
  estado-erro-borda: "#7b2625"
typography:
  titulo-1:
    fontFamily: "Sora"
    fontSize: 48px
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: -1px
  titulo-2:
    fontFamily: "Sora"
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.6px
  titulo-3:
    fontFamily: "Sora"
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.2px
  sobretitulo:
    fontFamily: "Sora"
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 1.4px
  corpo:
    fontFamily: "Sora"
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0px
  corpo-pequeno:
    fontFamily: "Sora"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0px
  dado:
    fontFamily: "Fira Code"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0px
rounded:
  pequeno: 8px
  medio: 12px
  grande: 16px
  pilula: 999px
spacing:
  1: 4px
  2: 8px
  3: 12px
  4: 16px
  5: 20px
  6: 24px
  8: 32px
  10: 40px
  12: 48px
  16: 64px
  24: 96px
motion:
  rapida:
    duration: 120ms
    delay: 0ms
    timingFunction: "cubic-bezier(0.2, 0, 0, 1)"
  padrao:
    duration: 200ms
    delay: 0ms
    timingFunction: "cubic-bezier(0.2, 0, 0, 1)"
  enfase:
    duration: 320ms
    delay: 0ms
    timingFunction: "cubic-bezier(0.2, 0, 0, 1)"
---
---
---

# André Ruperto · Portfólio — sistema de design

Prancha: https://claude.ai/artifact/9S36CXLu9YPj8gVrEPKZZM · Tokens: `docs/design/tokens.json` → `tokens.css`

## Overview

**Produto em uma frase:** o portfólio de um desenvolvedor Python/Full Stack com foco em dados, feito para um
recrutador entender em 30 segundos o que ele entrega e abrir os projetos que provam isso.

**Direção: Brasa sobre carvão.** Carvão quente no fundo (`#130f0d`) e um único acento laranja brasa (`#fe7e29`),
como uma brasa que ainda queima: pouca luz, bem colocada. A identidade já existia no site e foi mantida. A versão 2
tira dela o que era enfeite (gradientes, brilho, vidro) e reorganiza o conteúdo para quem contrata.

**Princípios que decidem empates**
1. **Prova antes de promessa.** Projeto no ar, código e número real vêm antes de adjetivo.
2. **Um acento por tela.** O laranja marca a ação ou o dado que importa; o resto fica em carvão.
3. **Recrutador primeiro, cliente depois.** A home fala com quem contrata; a página de serviços fala com cliente.
4. **Nada inventado.** Métrica sem fonte não entra; estado do projeto (no ar, privado, em construção) é sempre dito.

**Regras duras**
- Componentes usam só `var(--cor-…)`, `var(--espaco-…)` etc. da camada de função; nunca hex nem `--escala-…`.
- Sem gradiente em texto, botão ou fundo; sem glow; sem vidro fosco atrás de texto.
- Todo estado tem cor + ícone + palavra.

## Colors

Tema escuro único: o site sempre foi escuro, e a identidade (brasa no carvão) depende do fundo escuro.

| Token de função | Uso | Contraste medido |
|---|---|---|
| `cor.fundo.base` | fundo da página | — |
| `cor.fundo.superficie` | cartões de projeto, cabeçalho | — |
| `cor.fundo.sutil` / `elevado` | chips, botão secundário, hover | — |
| `cor.texto.primario` | títulos e corpo | 15,48:1 no fundo · 14,70:1 na superfície |
| `cor.texto.secundario` | descrições, metadados | 7,67:1 · 7,28:1 |
| `cor.texto.link` / `destaque` | links e palavra de destaque no título | 7,30:1 · 6,93:1 |
| `cor.texto.na-acao` | texto sobre o botão laranja | 7,47:1 (8,93:1 no hover) |
| `cor.texto.desabilitado` | controle indisponível | 3,56:1 sobre `fundo.sutil` |
| `cor.acao.primaria` | um botão principal por tela | — |
| `cor.acao.foco` | anel de foco | 7,47:1 no fundo |
| `cor.borda.padrao` / `interativa` / `forte` | divisórias, campos, borda de foco | forte 3,22:1 |
| `cor.fundo.selo` + `cor.texto.selo` | chips de stack (React, FastAPI…) | 6,33:1 |

O laranja do site (`hsl(24 100% 58%)` = `#ff7f2a`) virou o degrau 9 da rampa `brasa` (`#fe7e29`), e o texto em
laranja usa o degrau 11 (`#eb864c`), que passa 4,5:1 em qualquer superfície.

## Typography

| Estilo | Fonte | Tamanho / peso / altura | Uso |
|---|---|---|---|
| `tipo.titulo-1` | Sora | 48 / 700 / 1,08 (celular 36) | nome no topo |
| `tipo.titulo-2` | Sora | 32 / 700 / 1,15 | título de seção |
| `tipo.titulo-3` | Sora | 20 / 600 / 1,3 | nome do projeto |
| `tipo.sobretitulo` | Sora | 14 / 600, caixa alta, +1,4 px | rótulo acima do título |
| `tipo.corpo` | Sora | 16 / 400 / 1,6 | texto corrido |
| `tipo.corpo-pequeno` | Sora | 14 / 400 / 1,55 | metadados, legendas |
| `tipo.dado` | Fira Code | 14 / 500 | stack, números de projeto (`~537 testes`) |

Sora tem acentos e ç completos e números largos que leem bem; Fira Code só para tecnologia e números de prova.

## Layout

Espaço em base 4 (`espaco.1` = 4 px … `espaco.24` = 96 px). Conteúdo em coluna de até 1140 px.

| Quebra | Grade |
|---|---|
| celular (< 768) | 1 coluna, margem 16 px, seções a cada 64 px |
| tablet (≥ 768) | 2 colunas nos projetos, margem 32 px |
| computador (≥ 1024) | topo em 2 colunas (texto + retrato), projetos em 2 colunas, seções a cada 96 px |

**Ordem da home (candidato):** Início → Projetos em destaque (as 4 peças) → Experiência → Habilidades →
Sobre → Contato. Depoimentos de clientes, "Por que ter um site" e preços saem da home e vão para `/servicos`.

## Elevation & Depth

Profundidade pela claridade da superfície (degraus 1 → 2 → 3 → 4), não por sombra. `sombra.nivel-1` só em
menu e diálogo; `nivel-2` só no visualizador de imagem.

## Shapes

`raio.pequeno` 8 (chip, campo) · `raio.medio` 12 (botão) · `raio.grande` 16 (cartão de projeto) ·
`raio.pilula` (selo de estado, avatar). Alvo mínimo de toque `alvo.minimo` 44 px.

## Motion

`duracao.rapida` 120 ms (hover, pressionar) · `padrao` 200 ms (abrir menu, trocar aba) · `enfase` 320 ms
(revelar seção). Curvas `curva.saida` e `curva.entra-e-sai`. Com `prefers-reduced-motion`, a revelação vira
fade de 120 ms sem deslocamento e o letreiro (marquee) para.

## Voice & Content

Primeira pessoa, direto, com o número que prova. Fala de entrega, não de paixão.

| Situação | Exemplo |
|---|---|
| Título do topo | "Desenvolvedor Python/Full Stack com foco em dados" |
| Prova | "16 integrações de vagas, deduplicação e ~537 testes. No ar." |
| Projeto privado | "Código privado: explico a arquitetura na entrevista." |
| Chamada | "Ver projetos" · "Baixar currículo · Dados" · "Falar comigo" |
| Erro no formulário | "Não deu para enviar. Confira o e-mail e tente de novo." |

Escrita pt-BR: `24/11/2026`, `R$ 1.234,50`, `~537 testes`; botão com verbo e sem ponto.

## Components

- **Botão primário** (`acao.primaria`, texto `na-acao`, raio médio, 48 px): um por tela.
- **Botão secundário** (`acao.secundaria` + `borda.interativa`): "Ver código", "Currículo".
- **Cartão de projeto**: imagem 16:10, nome (`titulo-3`), selo de estado, uma frase de problema, linha de prova
  em `tipo.dado`, chips de stack e até 2 ações (Ver no ar · Ver código ou "Código privado").
- **Selo de estado**: pílula com ícone + palavra (No ar · Código privado · Em construção · Fora do ar).
- **Chip de stack**: `fundo.selo` + `texto.selo`, Fira Code 13–14 px.
- **Linha de experiência**: cargo, empresa, período e 2–3 resultados com número.
- **Campo de formulário**: rótulo visível, borda `interativa`, foco com anel de `acao.foco`, erro abaixo com ícone.

## Do's and Don'ts

| Faça | Não faça |
|---|---|
| Um botão laranja por tela | Botão, título e borda laranjas ao mesmo tempo |
| Dizer o estado do projeto (no ar, privado) | Deixar botão "Código" dar 404 |
| Número que você sabe explicar | Métrica sem origem ("120 h/mês") |
| Título em uma cor, com uma palavra em `texto.destaque` | Gradiente no texto |

## Estados do domínio

| Estado | Cor (texto 11 · fundo 3) | Ícone | Palavra |
|---|---|---|---|
| no ar | sucesso | globo | "No ar" |
| disponível | sucesso | ponto | "Disponível para começar" |
| código privado | info | cadeado | "Código privado" |
| em construção | aviso | ferramenta | "Em construção" |
| fora do ar / erro | erro | alerta | "Fora do ar" |

## Acessibilidade

WCAG 2.2 AA: todos os 22 pares declarados em `$extensions.prancha.contraste` passam (medidos por `tokens.mjs`).
Anel de foco de 2 px com folga de 2 px em todo elemento focável, nunca escondido pelo cabeçalho fixo
(`scroll-margin-top` nas âncoras). Alvos de 44 px. Movimento reduzido respeitado.

## Defaults evitados

- **Removidos do site atual:** gradiente no texto (`.text-gradient`), brilho (`.glow-warm`), vidro (`.glass`).
- **Exceção mantida:** Sora como display. Não está na lista de vetados e já é a voz do site.
- **Hero centralizado:** no celular continua centralizado por largura; no computador vira 2 colunas.

## Versões

| Data | Versão | O que mudou |
|---|---|---|
| 18/11/2026 | 1 | Prancha "Brasa sobre carvão" a partir do site (valores direto nos boards) |
| 24/11/2026 | 2 | Tokens DTCG + DESIGN.md; sem gradiente, glow e vidro; posicionamento de candidato; home reordenada; serviços em `/servicos` |
