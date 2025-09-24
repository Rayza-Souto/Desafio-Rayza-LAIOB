package main

import (
	
	"github.com/gin-gonic/gin"
)

func main() {

	// Inicializa o servidor
	server := gin.Default()

	// Porta em que o servidor vai rodar
	server.Run(":8080")

}
