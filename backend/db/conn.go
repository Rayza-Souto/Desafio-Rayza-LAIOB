package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

// criar a função que conecta ao banco de dados
func ConnectDB() (*sql.DB, error) {

	//carrega o arquivo .env
	err := godotenv.Load()

	//se não encontrar o arquivo .env, exibe uma mensagem de erro
	if err != nil {
		log.Println("Arquivo .env não encontrado, utilizando variáveis de ambiente do sistema")
	}

	//pega as variáveis de ambiente
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	//cria a string de conexão
	psqlInfo := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)

	//verifica se houve erro na conexão
	if err != nil {
		return nil, err
	}

	//verifica se a conexão está ativa
	if err := db.Ping(); err != nil {
		panic(err)
	}
	//se a conexão foi bem sucedida vai aparecer essa mensagem no terminal
	fmt.Println("Conectado ao banco " + dbname)

	return db, nil
}
