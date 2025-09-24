package main

import (
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/controller"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/db"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/repository"
	"github.com/Rayza-Souto/Desafio-Rayza-LAIOB/backend/usecase"
	"github.com/gin-gonic/gin"
)

func main() {

	//inicializa o servidor
	server := gin.Default()

	//conecta com o banco de dados
	dbConnection, err := db.ConnectDB()
	if err != nil {
		panic(err)
	}

	//Camada de repository
	ProductRepository := repository.NewProductRepository(dbConnection)
	//Camada usecase
	ProductUseCase := usecase.NewProductUseCase(ProductRepository)
	//Camada de controllers
	ProductController := controller.NewProductController(ProductUseCase)

	//criadas as rotas
	server.GET("/products", ProductController.GetProducts)
	server.POST("/product", ProductController.CreateProduct)
	server.GET("/product/:productId", ProductController.GetProductById)
	server.PUT("/product/:productId", ProductController.UpdateProduct)
	server.DELETE("/product/:productId", ProductController.DeleteProduct)

	//inicia o servidor
	server.Run(":8000")

}
