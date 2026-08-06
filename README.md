# Pitufo

Clone do [Termo](https://term.ooo) com modos **Termo**, **Dueto** e **Quarteto**.

## Stack

- Backend: Python + FastAPI
- Frontend: React + Vite (JavaScript)
- Infra: Docker Compose (API + Nginx)

## Deploy na Vercel

O app é um monorepo (`frontend` + `backend`). A Vercel **exige** um `vercel.json` com `services` — sem isso aparece o aviso *"vercel.json required to deploy projects with multiple services"*.

1. Faça commit/push do `vercel.json` (já está na raiz do repo)
2. Na Vercel, em **Settings → Build and Deployment**, defina o framework como **Services** (se a opção existir)
3. **Root Directory** deve continuar `./` (raiz do repo)
4. Clique em **Refresh** no banner e depois **Deploy**

Rotas:
- Frontend (Vite) → `/`
- API (FastAPI) → `/api/*`

> Observação: o estado das partidas fica em memória no processo da API. Em serverless isso pode “esquecer” jogos entre cold starts; para produção robusta use Redis/KV depois.

## Subir com Docker

```bash
cd ~/pitufo
docker compose up --build
```

Abra [http://localhost:3000](http://localhost:3000).

## Modos

| Modo | Palavras | Tentativas |
|------|----------|------------|
| Termo | 1 | 6 |
| Dueto | 2 | 7 |
| Quarteto | 4 | 9 |

- **Diário**: palavras do dia (seed por data UTC + modo)
- **Prática**: palavras aleatórias

## Desenvolvimento local (sem Docker)

### API

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
PYTHONPATH=. uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O Vite faz proxy de `/api` para `localhost:8000`.

## Testes do backend

```bash
cd backend
PYTHONPATH=. pytest -q
```
