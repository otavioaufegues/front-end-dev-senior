### 🖥️ Requisitos: Tela de Dashboards (View Principal)

Esta tela deve servir como a porta de entrada da aplicação, listando os quadros de projeto existentes no banco de dados.

#### **1. Layout e Sidebar**
* **Sidebar Persistente:** Implementar a barra lateral conforme a imagem, contendo o logo "KanbanFlow", o nome do workspace e o item de menu "Dashboard" com estado ativo (indicador visual azul).
* **Área de Conteúdo:** Título principal ("Your Dashboards") e subtitulo descritivo.
* **Grid de Cards:** Implementar um sistema de grid (CSS Grid ou Flexbox) que se ajuste automaticamente ao tamanho da tela (ex: 1 coluna em mobile, 2 em tablets, 3 ou mais em desktops).

#### **2. Componentização do Card de Dashboard**
Cada card de projeto deve ser um componente React reaproveitável, contendo:
* **Header do Card:** Ícone colorido no canto superior esquerdo e botão de menu de contexto (três pontos) no canto superior direito.
* **Corpo:** Título do board em negrito e descrição curta (com suporte a *truncation* para textos longos).
* **Badges de Prioridade:** Suporte para tags coloridas (ex: "URGENT" em laranja), conforme o card "Customer Feedback".
* **Footer do Card:** * Informações de contagem de tarefas e data de última atividade com ícones correspondentes.
    * **Avatar Group:** Exibição sobreposta de avatares dos membros. Candidatos seniores devem lidar corretamente com o contador "+N" quando houver muitos membros.

#### **3. Card de Criação ("Create New Board")**
* Deve possuir um estilo visual distinto (borda pontilhada/dashed) e um estado de hover claro.
* Ao clicar, deve disparar a lógica de criação de um novo board via API.

---

### ⚙️ Integração com Backend (Sênior)

* **Repository Pattern:** O método `findAll()` do seu `BoardRepository` no PHP deve retornar os dados necessários para popular esses cards (incluindo as agregações como contagem de tarefas vinculadas).
* **Estado Global vs Local:** No React, o candidato deve decidir se armazena a lista de boards em um Contexto, um Store (Redux/Zustand) ou apenas via cache de queries (React Query/SWR) — esta decisão é um ótimo ponto de discussão técnica.

<img width="2564" height="2050" alt="image" src="https://github.com/user-attachments/assets/713c4b81-3e65-4fac-8092-64f8496ca4b0" />
