# Próximos passos

**Data:** 24/11/2026 · **Branch:** `feat/visual-v2-candidato`

## O que foi feito nesta sessão (v2 do sistema de design)

- Sistema de design em `docs/design/` (`tokens.json` → `tokens.css`, `DESIGN.md`), gerado pela /prancha v4; 25 pares de contraste medidos, todos passam.
- Prancha atualizada (v2): https://claude.ai/artifact/9S36CXLu9YPj8gVrEPKZZM
- Site: sem gradiente, glow nem vidro; topo com posicionamento de candidato ("Desenvolvedor Python/Full Stack com foco em dados"); home reordenada (Projetos → Experiência → Habilidades → Sobre → GitHub → Contato); serviços para cliente em `/servicos`; título e metas do `index.html` no mesmo posicionamento.

## Estado atual

- Passam: `tsc`, `eslint` nos arquivos mexidos, `npm test`, `npm run build`. Conferido no navegador em 1280 px e 375 px, início e `/servicos`, sem rolagem lateral.
- Os componentes ainda usam as variáveis HSL do shadcn (mesmos valores da paleta); só as classes globais, o topo e o selo usam `var(--cor-…)`.
- Não conferido: a lista de projetos (vem da API, que não roda no teste local) e o `/admin`.

## Próximos passos

- [ ] No admin (`/admin/projects`): pôr Clareza no Voto, Agregador de Vagas, Voa Aí e o estudo de caso RMH primeiro, e tirar o link "Código" dos repositórios privados
- [ ] Escrever o estudo de caso da RMH (página ou PDF)
- [ ] Favicon: a prancha propõe o ícone "A."; o site ainda usa o memoji
- [ ] Migrar as variáveis do shadcn para os tokens de função, se valer o tempo
- [ ] Olhar `/admin` e `EmailPreview` no navegador

## Histórico

- 18/11/2026: prancha v1, fontes no Tailwind, tokens de estado, anel de foco, cartão único de depoimento, rótulos em português.

## Comandos úteis

```bash
npm ci
npm run dev
npm run lint && npm test && npm run build
node ~/.claude/skills/prancha/scripts/tokens.mjs docs/design --design-md docs/design/DESIGN.md
```
