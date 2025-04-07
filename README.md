# Mercado livre consultas
Desafio FullStack para consulta a produtos.

# Aplicação Node
API HTTP em Node.js com TypeScript, NestJS e Docker no backend, já no frontend optei por utilizar React + Vite.

## Guia de desenvolvimento
Prerequisites:

-  caso não utilize docker é recomendado ter uma versao do node mais atual.
- `yarn` ou `npm` (para gerenciamento de dependências e execução de scripts)
- `docker` e `docker-compose` (para executar o servidor)

### Backend:
Em primeiro lugar se faz necessário preencher as variáveis de ambiente do backend. Crie um arquivo .env na raíz do projeto backend (exemplo abaixo, há tambem um .env-example aqui no repositório).

```
BASE_URL=
SITE_ID=
ML_ACCESS_TOKEN=
PORT=

```
Caso precisem do meu token de acesso da Api do Mercado Livre, só me contatar.  Na BASE_URL coloquei:
```
BASE_URL=https://api.mercadolibre.com
```

Em seguida é so subir o container docker:
```
sudo docker compose up
```

Sem o docker:

```
cd backend
npm i
npm run start
yarn start
```

### Swaager:

Documentação disponível em http://localhost:{PORTA}/api

### Frontend
Para startar a aplicação frontend é necessário preencher a variavel de ambiente com a porta escolhida na api:

```
VITE_API_PORT=8085
```

E depois rodar o projeto: 
```
cd frontend
npm run dev
```
Qualquer duvida só me chamar pelo linkedin

https://www.linkedin.com/in/gabriel-rodrigues-aaa352207/
