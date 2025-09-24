package controller

import(
	"net/http"
	"strconv"
	"github.com/gin-gonic/gin"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/model"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/usecase"
)

//ProductController é a struct que representa o controller de produtos.
type productController struct {
	productUseCase usecase.ProductUseCase
}

// NewProductController cria uma nova instância de ProductController
func NewProductController(usecase usecase.ProductUseCase) productController {
	return productController{
		productUseCase: usecase,
	}
}

// GetProducts lista todos os produtos
func (p *productController) GetProducts(ctx *gin.Context) {

	// chama o usecase para obter todos os produtos
	products, err := p.productUseCase.GetProducts()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	// retorna a lista de produtos em formato JSON
	ctx.JSON(http.StatusOK, products)
}

// CreateProduct cria um novo produto
func (p *productController) CreateProduct(ctx *gin.Context) {

	// faz o bind do JSON recebido para a struct Product
	var product model.Product
	err := ctx.BindJSON(&product)

	// trata erro de bind
	if err != nil {
		ctx.JSON(http.StatusBadRequest, err)
		return
	}

	// chama o usecase para criar o produto
	insertedProduct, err := p.productUseCase.CreateProduct(product)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	// retorna o produto inserido em formato JSON
	ctx.JSON(http.StatusCreated, insertedProduct)
}

// GetProductById busca um produto pelo seu ID
func (p *productController) GetProductById(ctx *gin.Context) {

	id := ctx.Param("productId")
	if id == "" {
		response := model.Response{
			Message: "Id do produto nao pode ser nulo",
		}
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	productId, err := strconv.Atoi(id)
	if err != nil {
		response := model.Response{
			Message: "Id do produto precisa ser um numero",
		}
		ctx.JSON(http.StatusBadRequest, response)
		return
	}

	product, err := p.productUseCase.GetProductById(productId)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, err)
		return
	}

	if product == nil {
		response := model.Response{
			Message: "Produto nao foi encontrado na base de dados",
		}
		ctx.JSON(http.StatusNotFound, response)
		return
	}

	ctx.JSON(http.StatusOK, product)
}

// UpdateProduct atualiza os dados de um produto existente
func (p *productController) UpdateProduct(ctx *gin.Context) {
	
    // Pega o ID do path
    id := ctx.Param("productId")
    productId, err := strconv.Atoi(id)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"message": "ID inválido"})
        return
    }

    // Decodifica o JSON do body
    var product model.Product
    if err := ctx.BindJSON(&product); err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"message": "JSON inválido"})
        return
    }

    // Coloca o ID do path na estrutura
    product.ID = productId

    // Chama o use case para atualizar
    updatedProduct, err := p.productUseCase.UpdateProduct(product)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao atualizar produto"})
        return
    }

    ctx.JSON(http.StatusOK, updatedProduct)
}

// DeleteProduct remove um produto do banco de dados
func (p *productController) DeleteProduct(ctx *gin.Context) {

    // Pega o ID do path
    id := ctx.Param("productId")
    productId, err := strconv.Atoi(id)
	
	// Trata erro de conversão
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"message": "ID inválido"})
        return
    }

    // Chama o use case para deletar
    err = p.productUseCase.DeleteProduct(productId)
    if err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"message": "Erro ao deletar produto"})
        return
    }

    ctx.Status(http.StatusNoContent) // 204 = deletado com sucesso, sem body
}