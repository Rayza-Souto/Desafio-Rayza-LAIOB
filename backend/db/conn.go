package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

// definir as constantes de conexão com o banco de dados
const (
	host     = "go_db"
	port     = 5432
	user     = "postgres"
	password = "Juliano@0210"
	dbname   = "postgres"
)

// criar a função que conecta ao banco de dados
func ConnectDB() (*sql.DB, error) {
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
