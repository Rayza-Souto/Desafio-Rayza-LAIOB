# 📚 Documentação da API – CRUD de Produtos

Esta é a documentação oficial da API desenvolvida em Go para o cadastro de produtos.  
A API é RESTful, utiliza JSON para entrada e saída de dados e não requer autenticação.

---

## 🌐 URL Base

http://localhost:8000

---

## 🔖 Estrutura de um Produto

{
  "id": 1,
  "nome": "Mouse Gamer",
  "preco": 199.90,
  "quantidade": 10,
  "descricao": "Mouse com iluminação RGB"
}

---

## 📑 Endpoints

1. Listar todos os produtos
GET /produtos

Retorna todos os produtos cadastrados.

Exemplo de resposta:


[
  {
    "id": 1,
    "nome": "Mouse Gamer",
    "preco": 199.90,
    "quantidade": 10,
    "descricao": "Mouse com iluminação RGB"
  },
  {
    "id": 2,
    "nome": "Teclado Mecânico",
    "preco": 299.90,
    "quantidade": 5,
    "descricao": "Switch blue"
  }
]
Status de retorno:

200 OK


2. Obter um produto pelo ID
GET /produtos/:id

Retorna um único produto com base no ID informado.

Exemplo:

GET /produtos/1
Resposta:

{
  "id": 1,
  "nome": "Mouse Gamer",
  "preco": 199.90,
  "quantidade": 10,
  "descricao": "Mouse com iluminação RGB"
}

Status de retorno:

200 OK

404 Not Found (se não encontrado)

3. Criar um novo produto
POST /produtos

Cria um novo produto.

Corpo da requisição (JSON):

{
  "nome": "Headset Gamer",
  "preco": 149.90,
  "quantidade": 15,
  "descricao": "Headset com microfone removível"
}
Resposta:

{
  "id": 3,
  "nome": "Headset Gamer",
  "preco": 149.90,
  "quantidade": 15,
  "descricao": "Headset com microfone removível"
}

Status de retorno:

201 Created

400 Bad Request (payload inválido)

4. Atualizar um produto existente
PUT /produtos/:id

Atualiza um produto já existente.

Exemplo:

PUT /produtos/3
Corpo:

{
  "nome": "Headset Gamer Pro",
  "preco": 199.90,
  "quantidade": 12,
  "descricao": "Headset com som 7.1"
}
Resposta:

{
  "id": 3,
  "nome": "Headset Gamer Pro",
  "preco": 199.90,
  "quantidade": 12,
  "descricao": "Headset com som 7.1"
}

Status de retorno:

200 OK

400 Bad Request

404 Not Found

5. Deletar um produto
DELETE /produtos/:id

Remove um produto do banco de dados.

Exemplo:

DELETE /produtos/3
Resposta:

{ "message": "Produto removido com sucesso" }
Status de retorno:

200 OK

404 Not Found

---

## ⚠️ Erros Comuns

| Status                    | Significado              | Quando ocorre                                        |
| ------------------------- | ------------------------ | ---------------------------------------------------- |
| 400 Bad Request           | Requisição inválida      | Payload JSON incorreto, campos obrigatórios ausentes |
| 404 Not Found             | Recurso não encontrado   | Produto não existe para o ID informado               |
| 500 Internal Server Error | Erro interno no servidor | Problemas de conexão ao banco ou exceção não tratada |

---

## 🛠️ Exemplos com cURL

Listar produtos:
curl http://localhost:8000/produtos

Buscar produto 1:
curl http://localhost:8000/produtos/1

Criar produto:
curl -X POST http://localhost:8000/produtos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teclado","preco":99.9,"quantidade":5,"descricao":"Teclado mecânico"}'

Atualizar produto:
curl -X PUT http://localhost:8000/produtos/1 \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teclado Gamer","preco":120.0,"quantidade":4,"descricao":"Switch red"}'

Excluir produto:
curl -X DELETE http://localhost:8000/produtos/1

---

## 📌 Notas

Todos os endpoints retornam application/json.

Caso use Docker, substitua localhost pelo nome do contêiner/host configurado no docker-compose.
