---

### 🚀 Desafio Técnico (React + PHP): To-Do List Sênior

O objetivo é avaliar a arquitetura, qualidade de código e automação de ambiente. O candidato deve desenvolver uma aplicação de gerenciamento de tarefas (To-Do List) integrando PHP e React.

#### **1. Infraestrutura e Ambiente (Obrigatório)**
* **Docker Compose:** O projeto deve ser entregue com um arquivo `docker-compose.yml` que orquestre ao menos três serviços:
    1.  **Backend:** Ambiente PHP (PHP-FPM/Nginx ou Apache).
    2.  **Frontend:** Ambiente de desenvolvimento ou build do React.
    3.  **Database:** Um container com **PostgreSQL** ou **MongoDB** (à escolha do candidato).
* **Setup:** Deve ser possível rodar o projeto completo com apenas um comando (ex: `docker-compose up --build`).

#### **2. Back-end (PHP)**
* **Arquitetura:** Implementação obrigatória do **Repository Pattern**.
    * O domínio deve depender de uma `Interface`.
    * A implementação concreta do Repositório deve realizar a persistência no banco escolhido (Postgres ou MongoDB).
* **Injeção de Dependência:** O Controller deve receber o repositório via DI.
* **Boas Práticas:** Uso de PSRs, tratamento de exceções e separação entre lógica de negócio e infraestrutura.

#### **3. Front-end (React)**
* **Reatividade e Estado:** Gerenciamento eficiente de estado (Hooks ou Context API).
* **Lógica Desacoplada:** Utilização de **Custom Hooks** para isolar as chamadas à API e a lógica de manipulação dos dados.
* **Responsividade:** Interface moderna e adaptável para diferentes tamanhos de tela.

#### **4. Critérios de Avaliação Sênior**
* **Escolha do Banco de Dados:** O candidato deve ser capaz de justificar por que escolheu Postgres (Relacional/ACID) ou MongoDB (Documento/Escalabilidade) para este cenário.
* **Git Flow:** Histórico de commits organizado e uso de branches.
* **Qualidade do Dockerfile:** Otimização de imagens e uso de variáveis de ambiente.
* **Documentação:** Um arquivo `README.md` claro explicando como rodar o projeto e as decisões arquiteturais tomadas.
