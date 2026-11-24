// Completa docs/design/tokens.json com as camadas de função e fundamentos.
// As rampas (escala.*) vêm do rampa.mjs da /prancha; este script só acrescenta o resto.
// Rodar: node docs/design/completar-tokens.mjs
import { readFileSync, writeFileSync } from "node:fs";

const arq = new URL("./tokens.json", import.meta.url);
const t = JSON.parse(readFileSync(arq, "utf8"));
const r = (rampa, d) => ({ $value: `{escala.${rampa}-escuro.${d}}` });
const px = (v) => ({ $value: { value: v, unit: "px" } });
const ms = (v) => ({ $value: { value: v, unit: "ms" } });
const tipo = (familia, tam, peso, alt, esp = 0) => ({
  $value: { fontFamily: familia, fontSize: { value: tam, unit: "px" }, fontWeight: peso, lineHeight: alt, letterSpacing: { value: esp, unit: "px" } },
});
const SORA = ["Sora", "system-ui", "sans-serif"];
const FIRA = ["Fira Code", "ui-monospace", "monospace"];

t.$description = "Portfólio André Ruperto · Brasa sobre carvão · tema escuro único";
t.$extensions = {
  prancha: {
    nome: "André Ruperto · Portfólio",
    contraste: [
      ["cor.texto.primario", "cor.fundo.base"],
      ["cor.texto.primario", "cor.fundo.superficie"],
      ["cor.texto.secundario", "cor.fundo.base"],
      ["cor.texto.secundario", "cor.fundo.superficie"],
      ["cor.texto.link", "cor.fundo.base"],
      ["cor.texto.link", "cor.fundo.superficie"],
      ["cor.texto.na-acao", "cor.acao.primaria"],
      ["cor.texto.na-acao", "cor.acao.primaria-hover"],
      ["cor.texto.desabilitado", "cor.fundo.sutil", 3],
      ["cor.acao.foco", "cor.fundo.base", 3],
      ["cor.acao.foco", "cor.fundo.superficie", 3],
      ["cor.borda.forte", "cor.fundo.base", 3],
      ["cor.texto.selo", "cor.fundo.selo"],
      ["cor.estado.no-ar.texto", "cor.estado.no-ar.fundo"],
      ["cor.estado.no-ar.texto", "cor.fundo.superficie"],
      ["cor.estado.privado.texto", "cor.estado.privado.fundo"],
      ["cor.estado.privado.texto", "cor.fundo.superficie"],
      ["cor.estado.em-construcao.texto", "cor.estado.em-construcao.fundo"],
      ["cor.estado.em-construcao.texto", "cor.fundo.superficie"],
      ["cor.estado.erro.texto", "cor.estado.erro.fundo"],
      ["cor.estado.erro.texto", "cor.fundo.superficie"],
      ["cor.estado.disponivel.texto", "cor.fundo.base"],
      ["cor.estado.disponivel.texto", "cor.estado.disponivel.fundo"],
      ["cor.texto.primario", "cor.estado.erro.fundo"],
      ["cor.texto.secundario", "cor.fundo.selo"],
    ],
  },
};

t.cor = {
  $type: "color",
  fundo: { base: r("carvao", 1), superficie: r("carvao", 2), sutil: r("carvao", 3), elevado: r("carvao", 4), selecionado: r("carvao", 5) },
  texto: {
    primario: r("carvao", 12),
    secundario: r("carvao", 11),
    desabilitado: r("carvao", 9),
    "na-acao": r("carvao", 1),
    link: r("brasa", 11),
    destaque: r("brasa", 11),
    selo: r("brasa", 11),
  },
  borda: { padrao: r("carvao", 6), interativa: r("carvao", 7), forte: r("carvao", 8) },
  acao: {
    primaria: r("brasa", 9),
    "primaria-hover": r("brasa", 10),
    "primaria-pressionada": r("brasa", 8),
    secundaria: r("carvao", 3),
    "secundaria-hover": r("carvao", 4),
    foco: r("brasa", 9),
    destrutiva: r("erro", 9),
  },
  fundo_selo: undefined,
  estado: {
    "no-ar": { texto: r("sucesso", 11), fundo: r("sucesso", 3), borda: r("sucesso", 7) },
    disponivel: { texto: r("sucesso", 11), fundo: r("sucesso", 3), borda: r("sucesso", 7) },
    privado: { texto: r("info", 11), fundo: r("info", 3), borda: r("info", 7) },
    "em-construcao": { texto: r("aviso", 11), fundo: r("aviso", 3), borda: r("aviso", 7) },
    erro: { texto: r("erro", 11), fundo: r("erro", 3), borda: r("erro", 7) },
  },
};
delete t.cor.fundo_selo;
t.cor.fundo.selo = r("brasa", 3);

t.fonte = {
  $type: "fontFamily",
  display: { $value: SORA },
  texto: { $value: SORA },
  mono: { $value: FIRA },
};
t.tipo = {
  $type: "typography",
  "titulo-1": tipo(SORA, 48, 700, 1.08, -1),
  "titulo-2": tipo(SORA, 32, 700, 1.15, -0.6),
  "titulo-3": tipo(SORA, 20, 600, 1.3, -0.2),
  sobretitulo: tipo(SORA, 14, 600, 1.4, 1.4),
  corpo: tipo(SORA, 16, 400, 1.6),
  "corpo-pequeno": tipo(SORA, 14, 400, 1.55),
  dado: tipo(FIRA, 14, 500, 1.4),
};
t.espaco = { $type: "dimension", 1: px(4), 2: px(8), 3: px(12), 4: px(16), 5: px(20), 6: px(24), 8: px(32), 10: px(40), 12: px(48), 16: px(64), 24: px(96) };
t.raio = { $type: "dimension", pequeno: px(8), medio: px(12), grande: px(16), pilula: px(999) };
t.alvo = { $type: "dimension", minimo: px(44) };
t.foco = { $type: "dimension", largura: px(2), folga: px(2) };
t.sombra = {
  $type: "shadow",
  "nivel-1": { $value: { color: "#00000066", offsetX: { value: 0, unit: "px" }, offsetY: { value: 8, unit: "px" }, blur: { value: 24, unit: "px" }, spread: { value: -8, unit: "px" } } },
  "nivel-2": { $value: { color: "#00000080", offsetX: { value: 0, unit: "px" }, offsetY: { value: 16, unit: "px" }, blur: { value: 40, unit: "px" }, spread: { value: -12, unit: "px" } } },
};
t.duracao = { $type: "duration", rapida: ms(120), padrao: ms(200), enfase: ms(320) };
t.curva = {
  $type: "cubicBezier",
  saida: { $value: [0.2, 0, 0, 1] },
  "entra-e-sai": { $value: [0.4, 0, 0.2, 1] },
};
t.quebra = { $type: "dimension", celular: px(0), tablet: px(768), computador: px(1024), largo: px(1400) };

writeFileSync(arq, JSON.stringify(t, null, 2) + "\n");
console.log("tokens.json completo:", Object.keys(t).join(", "));
