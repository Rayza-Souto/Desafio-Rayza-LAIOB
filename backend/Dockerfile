# Etapa 1: Build da aplicação Go
FROM golang:1.23-alpine AS builder
WORKDIR /app/backend

# Copia arquivos de módulos e baixa dependências
COPY go.mod go.sum ./
RUN go mod download

# Copia todo o backend
COPY . .

# Compila o main.go diretamente
RUN CGO_ENABLED=0 go build -o ../main main.go

# Etapa 2: Imagem final
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8000
CMD ["./main"]
