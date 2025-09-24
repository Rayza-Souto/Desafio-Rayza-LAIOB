package repository

import (
	"database/sql"
	"fmt"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/model"
)

// ProductRepository é a struct que representa o repositório de produtos.
type ProductRepository struct {
	connection *sql.DB
}

// NewProductRepository cria uma nova instância de ProductRepository
func NewProductRepository(connection *sql.DB) ProductRepository {
	return ProductRepository{
		connection: connection,
	}
}

// GetAllProducts lista todos os produtos do banco de dados
func (pr *ProductRepository) GetProducts() ([]model.Product, error) {

	query := "SELECT id, nome_produto, preco, quantidade, descricao FROM product"
	rows, err := pr.connection.Query(query)
	if err != nil {
		fmt.Println(err)
		return []model.Product{}, err
	}

	//variaveis para armazenar os dados do banco
	var productList []model.Product
	var productObj model.Product

	//percorre as linhas retornadas pela consulta
	for rows.Next() {
		err = rows.Scan(
			&productObj.ID,
			&productObj.Nome,
			&productObj.Preco,
			&productObj.Quantidade,
			&productObj.Descricao)

		//verifica se houve erro ao escanear os dados
		if err != nil {
			fmt.Println(err)
			return []model.Product{}, err
		}
		//adiciona o produto na lista
		productList = append(productList, productObj)
	}
	//fecha as linhas após o uso
	rows.Close()

	//retorna a lista de produtos
	return productList, nil
}

// CreateProduct insere um novo produto no banco de dados
func (pr *ProductRepository) CreateProduct(product model.Product) (int, error) {

	var id int
	//prepara a query de inserção do produto
	query, err := pr.connection.Prepare("INSERT INTO product" +
		"(nome_produto, preco, quantidade, descricao)" +
		" VALUES ($1, $2, $3, $4) RETURNING id")

	//verifica se houve erro ao preparar a query
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	//executa a query e obtém o ID do produto inserido
	err = query.QueryRow(product.Nome, product.Preco, product.Quantidade, product.Descricao).Scan(&id)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	query.Close()
	return id, nil
}

// GetProductByID busca um produto pelo seu ID
func (pr *ProductRepository) GetProductById(id_product int) (*model.Product, error) {

	query, err := pr.connection.Prepare("SELECT * FROM product WHERE id = $1")
	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	var produto model.Product

	err = query.QueryRow(id_product).Scan(
		&produto.ID,
		&produto.Nome,
		&produto.Preco,
		&produto.Quantidade,
		&produto.Descricao,
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}

		return nil, err
	}

	query.Close()
	return &produto, nil
}

// UpdateProduct atualiza os dados de um produto existente
func (pr *ProductRepository) UpdateProduct(id int, product model.Product) error {
	query, err := pr.connection.Prepare("UPDATE product" +
		" SET nome_produto = $1, preco = $2, quantidade = $3, descricao = $4" +
		" WHERE id = $5")

	// verifica se houve erro ao preparar a query
	if err != nil {
		return err
	}
	defer query.Close()

	// executa a query de atualização
	_, err = query.Exec(product.Nome, product.Preco, product.Quantidade, product.Descricao, id)
	return err
}

// DeleteProduct remove um produto do banco de dados pelo seu ID
func (pr *ProductRepository) DeleteProduct(id int) error {

	// prepara a query de exclusão do produto
	query, err := pr.connection.Prepare("DELETE FROM product WHERE id = $1")
	if err != nil {
		return err
	}
	defer query.Close()

	// executa a query de exclusão
	_, err = query.Exec(id)
	return err
}