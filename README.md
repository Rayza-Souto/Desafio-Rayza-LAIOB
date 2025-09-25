# Desafio Rayza LAIOB – CRUD de Produtos

Aplicação simples de cadastro de produtos (CRUD) usando **React + Vite** no front-end e **Go (Golang)** no back-end, com banco de dados **PostgreSQL**.  
Este projeto atende ao desafio de criar um front-end que consome uma API REST desenvolvida em Go.

---

## 🚀 Tecnologias Utilizadas

- **Front-end:** React + Vite + Axios
- **Back-end:** Go (Golang) + Gin/Fiber (ajuste se você usou outro framework)
- **Banco de dados:** PostgreSQL (poderia ser SQLite, mas optamos por Postgres)
- **Containerização:** Docker e Docker Compose (opcional)
- **Variáveis de ambiente:** `.env` para configurar API e banco

---

## 📂 Estrutura do Projeto
/frontend → Código do front-end React/Vite
/backend → Código do back-end Go
/docker-compose.yml → Configuração opcional para rodar backend + banco (e frontend)

## 🛠️ Pré-requisitos

- Node.js ≥ 18
- Go ≥ 1.21
- PostgreSQL (se não usar Docker)
- Docker e Docker Compose (opcional)

---

## ⚙️ Configuração do Banco de Dados

Crie um banco PostgreSQL local ou use o Docker Compose:

```sql
CREATE DATABASE produtosdb;
CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  preco NUMERIC(10,2) NOT NULL,
  quantidade INTEGER NOT NULL,
  descricao TEXT
);

## Variáveis de ambiente necessárias para o backend (.env):

DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=produtosdb
PORT=8000

No frontend, configure o arquivo .env com a URL da API:

VITE_API_URL=http://localhost:8000

---

## ▶️ Como Rodar Localmente

Back-end

cd backend
go mod download
go run main.go

O back-end sobe por padrão em http://localhost:8000.

Front-end

cd frontend
npm install
npm run dev

O front-end sobe por padrão em http://localhost:5173.

---

## 🐳 Rodando com Docker

Com Docker Compose você sobe o banco, backend e frontend:

docker-compose up --build

Acesse:

API: http://localhost:8000
Front-end: http://localhost:5173

---

## 📑 Endpoints da API

| Método | Endpoint      | Descrição                     | Corpo esperado (JSON)                                                                |
| ------ | ------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| GET    | /produtos     | Lista todos os produtos       | –                                                                                    |
| GET    | /produtos/:id | Retorna um produto pelo ID    | –                                                                                    |
| POST   | /produtos     | Cria um novo produto          | `{ "nome": "Mouse", "preco": 199.90, "quantidade": 10, "descricao": "Mouse gamer" }` |
| PUT    | /produtos/:id | Atualiza um produto existente | Mesmo corpo do POST                                                                  |
| DELETE | /produtos/:id | Remove um produto             | –                                                                                    |

Estrutura mínima do produto

{
  "id": 1,
  "nome": "Mouse Gamer",
  "preco": 199.90,
  "quantidade": 10,
  "descricao": "Mouse com iluminação RGB"
}

---

## 🖥️ Funcionalidades do Front-end

Listar produtos consumindo GET /produtos

Criar produto consumindo POST /produtos

Editar produto consumindo PUT /produtos/:id

Excluir produto consumindo DELETE /produtos/:id

Layout simples e intuitivo

---

## 📸 Prints ou GIF




---

## 🔒 Tratamento de Erros

Backend retorna status HTTP adequados (400/404/500)

Frontend mostra mensagens de erro básicas para o usuário

---

## 📝 Licença

Este projeto é apenas para fins de avaliação técnica.