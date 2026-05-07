# KanbanFlow

Aplicacao full stack de gerenciamento de boards e tarefas em formato Kanban. O projeto foi desenvolvido com React no frontend, Laravel/PHP no backend e PostgreSQL como banco de dados, com ambiente completo orquestrado via Docker Compose.

## Funcionalidades

- Dashboard com listagem de boards, contadores de tarefas e ultima atividade.
- Criacao de boards com nome, descricao, cor e icone.
- Tela Kanban por board com colunas `To Do`, `In Progress` e `Done`.
- Criacao de tarefas por coluna.
- Movimentacao de tarefas entre status com atualizacao otimista no frontend.
- API REST com validacao de requests no Laravel.

## Arquitetura

### Backend

O backend fica em `api/` e usa Laravel com uma separacao simples entre HTTP, dominio e persistencia.

- `app/Http/Controllers`: recebe as requisicoes HTTP e delega a operacao para contratos de repositorio.
- `app/Http/Requests`: valida os payloads de entrada, como criacao de board, criacao de task e mudanca de status.
- `app/Domain`: define as interfaces do dominio, como `BoardRepository`, `TaskRepository` e `StatusRepository`.
- `app/Infrastructure/Persistence/Eloquent`: contem as implementacoes concretas usando Eloquent/PostgreSQL.
- `app/Providers/AppServiceProvider.php`: registra a injecao de dependencia entre interfaces e implementacoes.

Essa estrutura aplica Repository Pattern para evitar que controllers dependam diretamente de detalhes de banco. Assim, a regra de aplicacao conversa com contratos, e a persistencia fica concentrada na camada de infraestrutura.

### Frontend

O frontend fica em `frontend/` e usa React com Vite.

- `src/services/api`: concentra as chamadas HTTP da API.
- `src/services/axios`: configura o client Axios e normaliza erros.
- `src/hooks`: isola regras de estado e integracao, como `useBoards` e `useKanban`.
- `src/pages`: telas principais, como Dashboard e Board/Kanban.
- `src/components`: componentes reutilizaveis de UI, como cards, modais e colunas.

A tela Kanban usa um custom hook (`useKanban`) para centralizar carregamento, agrupamento por status, criacao de tasks e mudanca de status. A interface aplica atualizacao otimista para responder imediatamente quando uma tarefa e criada ou movida.


## Por que PostgreSQL

O PostgreSQL foi escolhido porque o projeto possui relações bem definidas entre as entidades e precisa garantir consistência nos dados.

Uma board possui várias tasks, cada task pertence a uma board e sempre deve possuir um status válido (`todo`, `in_progress` ou `done`). Como essas relações são centrais para a aplicação, um banco relacional facilita bastante a modelagem e a integridade dos dados através de foreign keys, transações e índices.

Além disso, operações como mover tarefas entre colunas precisam acontecer de forma consistente, evitando estados inválidos ou perda de informações.

O PostgreSQL também facilita consultas agregadas do dashboard, como total de tarefas e contagem por status, tornando o SQL uma escolha natural para esse cenário.

## Stack

- Frontend: React, TypeScript, Vite, Axios.
- Backend: PHP 8.3, Laravel.
- Banco: PostgreSQL 16.
- Infra: Docker, Docker Compose, Nginx.

## Como rodar

### Pre-requisitos

- Docker
- Docker Compose

### Variaveis de ambiente

Na raiz do projeto existe um arquivo `.env` usado pelo `docker-compose.yml`:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=todo-db
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

Se precisar recriar, use esses valores ou ajuste conforme seu ambiente.

### Subir os containers

Na raiz do projeto, execute:

```bash
docker compose up --build
```

Servicos expostos:

- Frontend: `http://localhost:3000`
- API: `http://localhost:8000/api`
- PostgreSQL: `localhost:5432`

O container PHP executa automaticamente:

- instalacao das dependencias Composer, se necessario;
- geracao da `APP_KEY`;
- migrations;
- seeders.

Com isso, ao subir o ambiente, o banco ja deve estar migrado e populado com dados iniciais.

## Comandos uteis

Rodar build do frontend:

```bash
docker compose exec frontend yarn build
```

Rodar migrations manualmente:

```bash
docker compose exec app php artisan migrate
```

Rodar seeders manualmente:

```bash
docker compose exec app php artisan db:seed
```

Acessar o container do backend:

```bash
docker compose exec app sh
```

## Endpoints principais

Boards:

- `GET /api/boards`: lista boards com estatisticas.
- `POST /api/boards`: cria um board.
- `GET /api/boards/{boardId}`: busca um board especifico.

Tasks:

- `GET /api/boards/{boardId}/tasks`: lista tarefas de um board.
- `POST /api/boards/{boardId}/tasks`: cria uma tarefa no board.
- `PATCH /api/tasks/{taskId}/status`: altera o status de uma tarefa.
