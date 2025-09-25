package model

//cria a estrutura do produto
type Product struct {
	ID         int     `json:"id"`
	Nome       string  `json:"nome"`
	Preco      float64 `json:"preco"`
	Quantidade int     `json:"quantidade"`
	Descricao  string  `json:"descricao"`
}
