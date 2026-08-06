# Pitufo

Clone do [Termo](https://term.ooo) com modos **Termo**, **Dueto** e **Quarteto**.

## Stack

- Backend: Python + FastAPI
- Frontend: React + Vite (JavaScript)
- Infra: Docker Compose (API + Nginx)

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
