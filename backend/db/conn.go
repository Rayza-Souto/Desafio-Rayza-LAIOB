package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
	"github.com/joho/godotenv"
)

// criar a função que conecta ao banco de dados
func ConnectDB() (*sql.DB, error) {

	//carrega as variáveis de ambiente do arquivo .env
	_ = godotenv.Load()

	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
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
	fmt.Println("Connected to " + dbname)

	return db, nil
}
