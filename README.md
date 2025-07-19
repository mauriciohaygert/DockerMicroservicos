# Teste Técnico Full Stack – Integração entre Serviços PHP, Node.js e Front-end

## Visão Geral

Este projeto é composto por três serviços principais:
- **User Service (Laravel/PHP + MySQL)**: Cadastro e listagem de usuários.
- **Enrichment Service (Node.js/Express + MongoDB)**: Enriquecimento de dados de usuário.
- **Frontend (React + Material UI)**: Interface de usuário para cadastro, listagem e visualização detalhada.
- **RabbitMQ**: Fila para comunicação assíncrona entre os serviços.

## Como rodar o projeto

1. Copie o arquivo `.env.example` para `.env` e ajuste as variáveis se necessário.
2. Execute:

```sh

cp .env.example .env
docker-compose up -d
# Aguarde alguns segundos, para o Mysql ficar pronto
docker compose exec user-service php artisan migrate --seed

```
Usuário: test@test.com
Senha: 12345678

3. Acesse os serviços:
- Frontend: http://localhost:5173
- User Service API: http://localhost:8080
- Enrichment Service API: http://localhost:3001
- RabbitMQ Management: http://localhost:15672 (guest/guest)

## Estrutura dos Serviços

- `/user-service`: Serviço PHP (Laravel)
- `/enrichment-service`: Serviço Node.js (Express)
- `/frontend`: React (Vite)

## Tecnologias
- PHP 8 + Laravel
- Node.js + Express
- MySQL
- MongoDB
- RabbitMQ
- Docker, Docker Compose
- React + Material UI (MUI)

## Observações
- Utilize os arquivos `.env` para configuração de ambiente.

