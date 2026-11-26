"""Curadoria dos projetos do portfólio (25/11/2026), a partir da auditoria profissional.

Lê o DATABASE_URL de backend/.env, mostra o que muda e só grava com --aplicar.
Não apaga nenhum projeto: cria os que faltam e reordena os existentes.

    python -I scripts/curadoria_projetos.py            # só mostra
    python -I scripts/curadoria_projetos.py --aplicar  # grava
"""
import json
import os
import sys

import psycopg

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

NOVOS = [
    {
        "title": "Clareza no Voto",
        "description": "Plataforma de dados públicos de parlamentares. Workers Celery coletam da Câmara, do Senado e do TSE (gastos, presença, votações, emendas) para o PostgreSQL, com auditoria de cobertura dos dados, e o site mostra fichas e rankings neutros para o eleitor. Cerca de 160 testes automatizados.",
        "tags": ["Python", "FastAPI", "Celery", "PostgreSQL", "Next.js", "ETL"],
        "links": [{"url": "https://clareza-no-voto.up.railway.app", "label": "Ver site"}],
    },
    {
        "title": "Agregador de Vagas",
        "description": "Junta vagas de 27 fontes (14 coletadas no servidor e 13 num coletor local), remove as duplicadas e pontua a aderência de cada uma ao perfil do candidato, com pipeline de candidaturas e triagem por IA em três provedores. Mais de 400 testes e CI.",
        "tags": ["Python", "FastAPI", "Celery", "PostgreSQL", "React", "TypeScript"],
        "links": [{"url": "https://agregador-vagas.up.railway.app", "label": "Ver site"}],
    },
    {
        "title": "Voa Aí",
        "description": "Acompanha voos em tempo real e avisa por Web Push quando o avião decola, atrasa e pousa. Servidor em Node 22 sem framework, webhooks da FlightAware com deduplicação, controle do custo da API, login Google e PWA, com cerca de 110 testes.",
        "tags": ["Node.js", "SQLite", "Web Push", "PWA", "Playwright"],
        "links": [{"url": "https://voaai.up.railway.app", "label": "Ver site"}],
    },
    {
        "title": "Sistema interno de escritório de advocacia (estudo de caso)",
        "description": "Sistema em produção num escritório de advocacia, usado por cerca de 100 pessoas: mais de 30 módulos (CRM, metas e KPIs, agenda, portal do cliente, documentos) em React + TypeScript, Node/Express e PostgreSQL, com Power BI Embedded e 50 DAGs no Airflow sincronizando o banco legado. Código fechado: aqui vai o estudo de caso.",
        "tags": ["React", "TypeScript", "Node.js", "PostgreSQL", "Airflow", "Power BI"],
        "links": [],
    },
    {
        "title": "Truco",
        "description": "Truco paulista e mineiro online, em tempo real: servidor autoritativo com Colyseus, motor de regras isolado que roda igual no servidor e nos testes, bots e mesas privadas com os amigos. Mais de 1.200 testes automatizados.",
        "tags": ["TypeScript", "React", "Colyseus", "WebSocket", "PostgreSQL"],
        "links": [{"url": "https://truco.up.railway.app", "label": "Jogar"}],
    },
]

# Ordem final pelo título (começo do título basta). O que não estiver aqui vai para o fim, na ordem atual.
ORDEM = [
    "Clareza no Voto",
    "Agregador de Vagas",
    "Voa Aí",
    "Sistema interno de escritório de advocacia",
    "Integração Alice ao ComprasGov",
    "Modelo de Credenciamento - PNCP",
    "DataBola",
    "Truco",
    "Painel de Resultados - 2026",
    "Documentação API ComprasGov",
    "Genética da Gravidez Explicada",
    "Mangueira & Peixoto",
    "Blue Mais",
    "Sistema de Controle Financeiro via WhatsApp",
    "Triagegeist",
    "Gráfico de Contribuições Pac-Man",
    "Cronomapa",
    "Good Cities",
    "Cobra o L",
    "Capi3D",
]


def ler_url():
    caminho = os.path.join(RAIZ, "backend", ".env")
    for linha in open(caminho, encoding="utf-8"):
        linha = linha.strip()
        if linha.startswith("DATABASE_URL="):
            return linha.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("DATABASE_URL não encontrado em backend/.env")


def main():
    aplicar = "--aplicar" in sys.argv
    with psycopg.connect(ler_url()) as con, con.cursor() as cur:
        cur.execute('SELECT id, title, "order" FROM "Project" ORDER BY "order", id')
        atuais = cur.fetchall()
        titulos = {t for _, t, _ in atuais}
        criar = [n for n in NOVOS if n["title"] not in titulos]

        print(f"{len(atuais)} projetos no banco; {len(criar)} para criar.\n")
        for n in criar:
            print(f"+ criar: {n['title']}")
        if aplicar:
            for n in criar:
                cur.execute(
                    'INSERT INTO "Project" (title, description, tags, image, links, github, "order", "createdAt", "updatedAt") '
                    "VALUES (%s, %s, %s, NULL, %s::jsonb, NULL, 999, now(), now())",
                    (n["title"], n["description"], n["tags"], json.dumps(n["links"], ensure_ascii=False)),
                )
            cur.execute('SELECT id, title, "order" FROM "Project" ORDER BY "order", id')
            atuais = cur.fetchall()
        else:
            atuais = atuais + [(None, n["title"], 999) for n in criar]

        def posicao(titulo):
            for i, prefixo in enumerate(ORDEM):
                if titulo.startswith(prefixo):
                    return i
            return len(ORDEM)

        nova = sorted(atuais, key=lambda r: (posicao(r[1]), r[2], r[0] or 0))
        print("\nNova ordem:")
        for i, (pid, titulo, antes) in enumerate(nova, start=1):
            marca = "novo" if pid is None or antes == 999 else (f"era {antes}" if antes != i else "igual")
            print(f"  {i:2}. {titulo}  ({marca})")
            if aplicar and pid is not None and antes != i:
                cur.execute('UPDATE "Project" SET "order" = %s, "updatedAt" = now() WHERE id = %s', (i, pid))

        if aplicar:
            con.commit()
            print("\nGravado.")
        else:
            print("\nNada gravado. Rode com --aplicar para gravar.")


if __name__ == "__main__":
    main()
