## 📋 Resumo Geral do Projeto: KanbanFlow Clone

O objetivo deste teste é avaliar a capacidade de um desenvolvedor **Sênior** em arquitetar uma solução full stack escalável, performática e fiel a um design profissional. O projeto consiste em um sistema de gerenciamento de fluxos de trabalho dividido em três visões principais: **Dashboard**, **Criação de Board** e **Quadro Kanban**.

### 🛠️ Especificações Técnicas Recomendadas

Para um perfil Sênior, espera-se a utilização de versões modernas e estáveis das tecnologias:

* **Backend:** **PHP 8.2+** (Aproveitando *Readonly Properties*, *Enums* e *Typed Class Constants*).
* **Frontend:** **React 18+** (Foco em *Concurrent Rendering*, *Hooks* e *Functional Components*).
* **Persistência:** **PostgreSQL 15+** ou **MongoDB 6.0+**.
* **Infraestrutura:** **Docker** e **Docker Compose**.

---

### 🔍 Pontos de Validação (O que será avaliado)

A avaliação não focará apenas no "funcionar", mas no **"como"** foi construído:

#### **1. Arquitetura Backend (PHP)**
* **Repository Pattern:** A persistência deve estar isolada. O código de domínio não deve saber se os dados vêm de um banco relacional ou não-relacional.
* **Injeção de Dependência:** Uso de containers de DI para desacoplar as camadas.
* **Tipagem Estrita:** Uso rigoroso de tipos para parâmetros e retornos, evitando `mixed` ou arrays genéricos.

#### **2. Engenharia Frontend (React)**
* **Separação de Lógica e View:** Componentes puramente visuais separados da lógica de negócio (uso de *Custom Hooks*).
* **Gerenciamento de Estado:** Escolha fundamentada para o estado global (Context API, Zustand, Redux) e estado de servidor (React Query ou SWR).
* **Fidelidade ao Design (UI/UX):** Alinhamento, tipografia, estados de hover e transições suaves entre as telas.
* **Responsividade:** Implementação de um layout que se adapta de forma inteligente (não apenas "encolher", mas reorganizar elementos).

#### **3. Infraestrutura e Dev Ops**
* **Orquestração Docker:** Qualidade do `docker-compose.yml`, configuração de redes internas e persistência de volumes.
* **Estratégia de Git Flow:** Uso de branches temáticas (`feature/`, `fix/`), mensagens de commit semânticas e um histórico limpo.

#### **4. Entendimento de Requisitos**
* **Justificativa de Escolhas:** No README, o candidato deve explicar por que escolheu o banco de dados X e como estruturou o padrão Repository.
* **Tratamento de Erros:** Como a aplicação se comporta quando a API falha ou quando o banco está offline.

---

### 🚀 Fluxo do Candidato

1.  **Dashboard:** Listar boards existentes com contadores e membros.
2.  **Criação:** Formulário com seleção de cores e ícones (Validação de inputs).
3.  **Kanban:** Manipulação de tarefas (Mudar status, reatividade visual, lógica de conclusão).

> **Nota:** Este desafio é desenhado para ser concluído em um intervalo de 2 a 3 dias, permitindo que o candidato demonstre profundidade técnica sem comprometer excessivamente sua rotina pode ser utilizado IA para construção
> desde que o candidato consiga explicar todas implementações e ter conciencia de como elas foram feitas, porem ao ser feito o commit sinalizar que foi utilizado IA e qual foi utilizada.
