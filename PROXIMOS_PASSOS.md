# Próximos passos

**Data:** 2026-11-18 · **Branch:** `claude/reverent-fermi-40e846`

## O que foi feito nesta sessão

- Criada a prancha de identidade e sistema de design do portfólio no claude.ai:
  https://claude.ai/artifact/9S36CXLu9YPj8gVrEPKZZM (identidade, componentes, 4 telas de celular, nota de fluxo).
- Código alinhado à prancha:
  - `tailwind.config.ts` passa a declarar Sora e Fira Code (as fontes que o site já carregava).
  - Tokens de estado `success`, `danger`, `warning`, `info` no lugar das cores cruas do Tailwind.
  - Anel de foco único para tudo que recebe Tab (`src/index.css`).
  - Cartão único de depoimento (`TestimonialCard`) para cliente e recomendação do LinkedIn.
  - Rótulos em português (Início, Habilidades, GitHub, Projetos, 404, "Enviar mensagem", "Baixar currículo").
  - Limpeza: `src/App.css`, bloco `.dark` duplicado, tokens `sidebar-*`, keyframes duplicados.

## Estado atual

- Passam: `npx tsc --noEmit -p tsconfig.app.json`, `npm run lint` (0 erros), `npm test`, `npm run build`.
- Conferido no navegador em 375 px: início e depoimentos, sem rolagem lateral.
- Não conferido: páginas do admin (`/admin`) e `EmailPreview` depois da troca de cores; envio real do formulário.

## Próximos passos

- [ ] Confirmar se o selo "Aberto a novos projetos" do início é verdade hoje; senão, trocar o texto.
- [ ] Favicon: a prancha propõe o ícone "A."; o site ainda usa o memoji. Decidir e, se for o "A.", gerar o SVG/PNG.
- [ ] `<title>` e metas do `index.html` dizem "Cientista de Dados & Desenvolvedor"; o início diz "Desenvolvedor & Cientista de Dados". Escolher uma ordem (mexe em SEO).
- [ ] Papéis de raio da prancha (12 / 16 / 24 / 999): ainda há `rounded-md` nos componentes `ui/toast` e `ui/tooltip` e `rounded-3xl` em alguns painéis.
- [ ] Olhar `/admin` e `EmailPreview` no navegador.

## Comandos úteis

```bash
npm ci
npm run dev
npm run lint && npm test && npm run build
```
