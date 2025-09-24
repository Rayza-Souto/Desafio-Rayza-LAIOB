# Estágio 1: Build da aplicação
FROM golang:1.20-alpine AS builder

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de gerenciamento de módulos para aproveitar o cache do Docker
COPY go.mod .
COPY go.sum .

# Baixa as dependências
RUN go mod download

# Copia o código-fonte do projeto
COPY . .

# Compila a aplicação Go para um binário estático
RUN CGO_ENABLED=0 go build -o main ./cmd/api

# Estágio 2: Imagem final para execução
FROM alpine:latest

# Define o diretório de trabalho
WORKDIR /root/

# Copia o binário compilado do estágio anterior para a imagem final
COPY --from=builder /app/main .

# Exponha a porta que a aplicação vai escutar
EXPOSE 8080

# Comando para rodar a aplicação quando o contêiner iniciar
CMD ["./main"]