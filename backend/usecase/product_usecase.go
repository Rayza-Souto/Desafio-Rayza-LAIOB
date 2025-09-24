package usecase

import (
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/model"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/repository"
)

// ProductUseCase é a struct que representa o caso de uso de produtos.
type ProductUseCase struct {
	repository repository.ProductRepository
}

// NewProductUseCase cria uma nova instância de ProductUseCase
func NewProductUseCase(repo repository.ProductRepository) ProductUseCase {
	return ProductUseCase{
		repository: repo,
	}
}

// GetProducts lista todos os produtos
func (pu *ProductUseCase) GetProducts() ([]model.Product, error) {
	return pu.repository.GetProducts()
}

// CreateProduct cria um novo produto
func (pu *ProductUseCase) CreateProduct(product model.Product) (model.Product, error) {

	productId, err := pu.repository.CreateProduct(product)
	if err != nil {
		return model.Product{}, err
	}

	product.ID = productId

	return product, nil
}

// GetProductById busca um produto pelo seu ID
func (pu *ProductUseCase) GetProductById(id_product int) (*model.Product, error) {

	product, err := pu.repository.GetProductById(id_product)
	if err != nil {
		return nil, err
	}

	return product, nil
}

// UpdateProduct atualiza os dados de um produto existente
func (pu *ProductUseCase) UpdateProduct(product model.Product) (model.Product, error) {
	
	// chama o repository para atualizar todos os campos do produto
	err := pu.repository.UpdateProduct(product.ID, product)
	if err != nil {
		return model.Product{}, err
	}

	// retorna o produto atualizado
	return product, nil
}

// DeleteProduct remove um produto do banco de dados
func (pu *ProductUseCase) DeleteProduct(id int) error {
	return pu.repository.DeleteProduct(id)
}