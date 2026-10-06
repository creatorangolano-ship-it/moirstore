# Moir Store — E-Commerce de Alta Costura & Perfumes de Luxo (Luanda, Angola)

Aplicação web completa, responsiva e estritamente **MOBILE-FIRST** desenvolvida para a **Moir Store**, especializada em roupas finas e perfumes importados raros, com moeda em Kwanza (Kz), autenticação de clientes, carrinho persistente, checkout direto no WhatsApp e painel administrativo de gestão de estoque.

---

## 🌟 Funcionalidades Principais

### 1. Experiência Mobile-First & Identidade Visual
- **Design Editorial de Luxo**: Paleta refinada com fundo creme suave (`#F9F8F6`), branco puro (`#FFFFFF`), preto sofisticado (`#111111`) e toques em ouro acetinado (`#C5A880`).
- **Navegação Intuitiva**:
  - Header compacto com busca instantânea, status do carrinho e perfil do cliente.
  - Barra de filtros com rolagem horizontal deslizante suave (`Todos`, `Roupas`, `Perfumes`, `Destaques`) com contadores de estoque em tempo real.
  - Catálogo em grade de 2 colunas no celular (`grid-cols-2`) com botões táteis de fácil alcance.

### 2. Catálogo & Moeda Oficial em Kwanza (Kz)
- Moeda padrão formatada conforme convenção angolana (ex: `45.000 Kz`, `125.000 Kz`).
- Mock inicial com 4 roupas elegantes (18.000 Kz a 68.000 Kz) e 4 perfumes de luxo (35.000 Kz a 145.000 Kz).
- Suporte a preços promocionais com indicação de desconto e badges de status.

### 3. Gestão da Sacola / Carrinho Inteligente
- **Validação de Variantes Obrigatória**: Seleção obrigatória de tamanhos (`PP`, `P`, `M`, `G`, `GG`) para roupas ou volumetria (`30ml`, `50ml`, `100ml`) para perfumes antes da adição.
- **Feedback Imediato**: Notificações toast animadas e badge no ícone da sacola.
- **Drawer Lateral / Bottom Sheet Mobile**:
  - Controle de quantidade (`+` / `-`) com trava automática para limite de estoque.
  - Remoção individual de itens.
  - Sistema de cupons de desconto (`MOIR10` para 10% OFF, `LUXURY` para 15% OFF).
  - Resumo financeiro transparente: Subtotal, Desconto e Total em Kz.
  - Persistência total em `moir_cart` no `localStorage`.

### 4. Checkout Formatado para o WhatsApp Oficial
- **Número Oficial**: `+244 945 665 918`.
- Se o cliente estiver logado, os dados (Nome, Telefone e Endereço em Luanda) são pré-preenchidos automaticamente.
- Se não estiver logado, formulário rápido de entrega integrado na sacola.
- Mensagem perfeitamente formatada:
```text
Olá Moir Store! Gostaria de concluir o seguinte pedido:

*Itens da Sacola:*
• [Produto] ([Tamanho ou ml]) x[Qtd] — [Preço Unitário Kz]

*Total:* [Total em Kz]

*Dados para Entrega:*
• Cliente: [Nome]
• Telefone: [Contacto]
• Endereço: [Bairro/Morada em Luanda]
```
- Registro automático do pedido no histórico local da conta do cliente e abatimento do estoque em tempo real.

### 5. Autenticação & Área do Cliente
- Modal / Bottom sheet com alternância ágil entre "Entrar" e "Criar Conta".
- Cadastro completo com Nome, E-mail, Senha, Telefone (+244) e Bairro/Morada de Luanda.
- Persistência de sessão ativa em `moir_auth` e banco de usuários em `moir_users`.
- Área do cliente com dados cadastrados e histórico detalhado de pedidos anteriores.

### 6. Painel Administrativo de Gestão
- Acesso discreto no header ("Modo Loja" / "Painel de Gestão").
- **4 Indicadores (KPIs)**:
  1. Total de produtos ativos
  2. Itens com estoque baixo (< 5 unidades)
  3. Total de clientes cadastrados
  4. Valor total estimado do inventário em Kz
- Ajuste rápido de estoque (`+` / `-`) diretamente na listagem.
- Formulário dinâmico de cadastro e edição de produtos, com opções condicionais de variantes por categoria.
- Sincronização em tempo real com a vitrine sem necessidade de recarregar a página.

---

## 🛠️ Como Executar o Projeto

```bash
# Entrar no diretório do projeto
cd moir-store

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Abrir no navegador
# http://localhost:3000
```
