# Usuário Multiperfil Domus · ggamas@gmail.com

Este documento formaliza o cadastro, as credenciais e o mecanismo de operação multiperfil do usuário **`ggamas@gmail.com`** no projeto **Domus** (Gama Patrimonial & Domus Inteligência Imobiliária / Consórcios).

---

## 1. Dados de Acesso & Credenciais Oficiais

| Campo | Valor |
| :--- | :--- |
| **E-mail / Login** | `ggamas@gmail.com` |
| **Senha de Acesso** | `#231215Verdao` |
| **Nome Cadastral** | G. Gamas (Domus Multiperfil) |
| **Telefone / WhatsApp** | (65) 99641-0000 |
| **CRECI** | CRECI-MT 14.821-F |
| **Status da Conta** | Ativa / Verificada |
| **Perfis Concedidos** | **Corretor**, **Cliente**, **Vendedor** e **Gerente Geral** |
| **Perfil Padrão Inicial** | `gerente` (acesso irrestrito) |

---

## 2. Matriz de Perfis e Permissões (RBAC)

O usuário possui simultaneamente 4 identidades na plataforma. Ele pode alternar entre elas a qualquer instante através do menu dropdown no cabeçalho superior (`/plataforma`):

```
┌────────────────────────────────────────────────────────────────────────┐
│  [👔 G. Gamas · Gerente Geral ▼]                                        │
│    ├── 👔 Gerente Geral        (Visão executiva, financeiro, DIMOB)   │
│    ├── 💼 Corretor Credenciado (Lâminas A4, CRM de leads, agenda)     │
│    ├── 🏷️ Vendedor / Prop.     (Meus imóveis, contratos, repasses)    │
│    └── 👤 Cliente / Investidor (Portfólio, consórcios, vistorias)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Detalhamento por Perfil:

1. **Gerente Geral (`gerente`)**:
   - Controle total da imobiliária e carteira de ativos.
   - Acesso ao **Financeiro**, **Repasses de Comissões**, **Fiscal / DIMOB** e **Compliance COAF**.
   - Gestão de equipe, contratos, minutas jurídicas e aprovação de propostas até R$ 5.000.000,00.

2. **Corretor Credenciado (`corretor`)**:
   - Foco comercial: Catálogo de imóveis, geração de lâminas **Paper PDF A4 instantâneas** para WhatsApp.
   - **CRM Funil** de atendimento de compradores.
   - **Vistorias Digitais** com assinatura touch na tela.
   - **Consórcios**: Simulações com parcelas reduzidas e lances embutidos para clientes.
   - **Agenda** de visitas.

3. **Vendedor / Proprietário (`vendedor`)**:
   - Visão dos imóveis cadastrados para venda ou locação.
   - Acompanhamento de propostas recebidas e contratos de intermediação.
   - Extrato de **repasses** e prestação de contas dos valores das negociações.

4. **Cliente / Investidor (`cliente`)**:
   - Catálogo de oportunidades residenciais e agropecuárias em MT.
   - Vitrine de **cotas e cartas contempladas de consórcios** com deságio.
   - Consulta de laudos de vistorias dos seus imóveis adquiridos ou alugados.

---

## 3. Arquitetura de Implementação no Código

Os arquivos implementados e configurados no repositório `rodrigokytto/domus_oficial`:

1. `src/types/usuario.ts`:
   - Definição dos tipos `PerfilUsuario`, `UsuarioDomus`, `PermissoesPerfil` e estrutura de credenciais.
2. `src/lib/authDomus.ts`:
   - Serviço de autenticação com validação da senha `#231215Verdao`.
   - Persistência de sessão no `localStorage` sob a chave `@domus:sessao_usuario`.
   - Regras de filtro de menus laterais (`secoesPermitidasPorPerfil`).
   - Função `alternarPerfilAtivo` para troca em tempo real sem deslogar.
3. `src/components/SeletorPerfilDomus.tsx`:
   - Seletor suspenso no cabeçalho com badges coloridos e contagem de 4 perfis disponíveis.
4. `src/components/ModalDetalhesUsuarioDomus.tsx`:
   - Modal com ficha cadastral completa, botão para copiar credenciais, status de autenticação e detalhes de cada papel.
5. `src/components/ModalLoginDomus.tsx`:
   - Formulário de login com atalho para preenchimento rápido das credenciais oficiais.
6. `src/plataforma/LayoutPlataformaGama.tsx` & `src/App.tsx`:
   - Integração do estado do usuário ao layout da retaguarda com renderização dinâmica dos menus.
7. `scripts/criar_usuario_ggamas.sql`:
   - Script SQL idempotente para inserção e vínculo relacional no banco de dados PostgreSQL.
8. `tests/usuario-domus.test.ts`:
   - Suíte de testes automatizados com Vitest cobrindo autenticação, validação de senha, troca de perfis e matriz de permissões.

---

## 4. Como Testar & Utilizar

1. **No Frontend (`/plataforma`)**:
   - Acesse a plataforma em produção (GCP Cloud Run): [https://gamapatrimonial.com.br/plataforma](https://gamapatrimonial.com.br/plataforma)
   - O usuário executivo oficial `rodrigo.goncalves@kytto.com.br` (Dr. Rodrigo Ribeiro Gonçalves) e `ggamas@gmail.com` iniciam com acesso completo como **Gerente Geral** (11 módulos de retaguarda).
   - No cabeçalho superior ou pelos botões de atalho rápido no banner do painel, alterne entre **Corretor Credenciado**, **Vendedor / Proprietário** ou **Cliente / Investidor**.
   - Uma notificação Toast animada confirma a troca e o menu lateral é filtrado dinamicamente com fallback de segurança.
   - Clique em **Ver Ficha** para visualizar a ficha cadastral completa com dados copiáveis e permissões granulares.

2. **Executar Testes Automatizados**:
   ```bash
   pnpm test
   ```
   Todos os 22 testes do projeto (incluindo os 6 testes específicos do usuário multiperfil e fallback seguro) são executados com sucesso em menos de 1 segundo.

3. **Banco de Dados PostgreSQL**:
   - Execute o script `scripts/criar_usuario_ggamas.sql` no banco de dados da aplicação para persistir o registro em ambiente de homologação ou produção.

---

## 5. Validação em Produção Oficial (Google Cloud Platform · Cloud Run)

- **URL Pública da Aplicação**: [https://gamapatrimonial.com.br](https://gamapatrimonial.com.br)
- **Área Restrita / Vistorias**: [https://gamapatrimonial.com.br/plataforma/vistorias](https://gamapatrimonial.com.br/plataforma/vistorias)
- **Área Restrita / Contratos**: [https://gamapatrimonial.com.br/plataforma/contratos-minutas](https://gamapatrimonial.com.br/plataforma/contratos-minutas)
- **Status do Serviço**: Ativo no Google Cloud Run (HTTP 200 OK via Google Frontend)
- **Infraestrutura**: Google Cloud Platform (NUNCA RENDER)
