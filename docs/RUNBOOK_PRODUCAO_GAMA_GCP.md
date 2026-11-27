# RUNBOOK OFICIAL DE PRODUÇÃO · GAMA PATRIMONIAL (GCP)
> **DIRETRIZ MANDATÓRIA PARA TODOS OS AGENTES DE IA E DESENVOLVEDORES**  
> **Ambiente Oficial de Produção:** Google Cloud Platform (GCP) · Cloud Run  
> **Domínio Canônico:** `https://gamapatrimonial.com.br`  
> **Regra de Ouro:** **NUNCA UTILIZAR O RENDER (render.com)**. O Render NÃO é a infraestrutura de produção da Gama Patrimonial. Qualquer deploy, documentação ou validação apontando para Render é terminantemente incorreto e rejeitado.

---

## 1. Identificação Corporativa & Usuário Oficial

Qualquer funcionalidade, autenticação padrão, módulo de vistoria, contrato ou assinatura digital deve referenciar o titular executivo oficial da empresa:

* **Usuário Oficial / E-mail:** `rodrigo.goncalves@kytto.com.br`
* **Nome do Titular:** Dr. Rodrigo Ribeiro Gonçalves
* **Cargo / Função:** Diretor Executivo & Responsável Técnico
* **Empresa Mantenedora:** Gama Patrimonial Gestão e Participações Ltda.
* **CNPJ Oficial:** `52.894.120/0001-44`
* **Registro Imobiliário Oficial:** `CRECI J-14280 MT`
* **Endereço Sede:** Av. Brasil, 1250, Centro, Tangará da Serra - MT, CEP 78300-000
* **Paleta de Identidade Visual:**
  * `#121212` (Grafite Nobre Gama)
  * `#C6A15B` (Ouro Envelhecido / Destaque)
  * `#F7F3EA` (Névoa / Fundo Creme Nobre)
  * `#2B2B2B` (Cinza Suporte)

---

## 2. Links Oficiais do Ambiente de Produção (GCP)

Todos os testes de carga, requisições de API, conferências de cabeçalho e capturas visuais de tela devem ser executados nas URLs oficiais abaixo:

| Módulo / Rota | URL Oficial em Produção | Finalidade |
| :--- | :--- | :--- |
| **Vistorias & Laudos Digitais** | [`https://gamapatrimonial.com.br/plataforma/vistorias`](https://gamapatrimonial.com.br/plataforma/vistorias) | Vistorias com fotos SHA-256, IA de avarias (Art. 23 Lei 8.245/91), assinatura touch e carimbo de tempo. |
| **Central de Contratos & Minutas** | [`https://gamapatrimonial.com.br/plataforma/contratos-minutas`](https://gamapatrimonial.com.br/plataforma/contratos-minutas) | Minutas jurídicas autônomas, score IA 100/100, guardrails Tangará/MT e assinatura ICP-Brasil. |
| **Plataforma / Dashboard Geral** | [`https://gamapatrimonial.com.br/plataforma`](https://gamapatrimonial.com.br/plataforma) | Cockpit executivo multiperfil com visão de ativos, CRM, financeiro e agenda. |
| **ERP Financeiro & DRE** | [`https://gamapatrimonial.com.br/plataforma/financeiro`](https://gamapatrimonial.com.br/plataforma/financeiro) | Razão contábil universal, partidas dobradas e idempotência bancária. |
| **Repasses & Comissões** | [`https://gamapatrimonial.com.br/plataforma/repasses`](https://gamapatrimonial.com.br/plataforma/repasses) | Split automático de locação e rateio de comissões de corretores. |
| **Fiscal NFS-e & DIMOB** | [`https://gamapatrimonial.com.br/plataforma/fiscal`](https://gamapatrimonial.com.br/plataforma/fiscal) | Escrituração tributária Tangará da Serra e integração DIMOB Receita Federal. |
| **Auditoria COAF & PLD** | [`https://gamapatrimonial.com.br/plataforma/compliance`](https://gamapatrimonial.com.br/plataforma/compliance) | Matriz de risco KYC e prevenção à lavagem de dinheiro (COFECI 1.336/14). |
| **Mesa de Consórcios Domus** | [`https://gamapatrimonial.com.br/plataforma/consorcios`](https://gamapatrimonial.com.br/plataforma/consorcios) | Simulações estruturadas, cartas contempladas e comparador de economia. |

---

## 3. Infraestrutura & Arquitetura GCP (Google Cloud Platform)

### 3.1 Provedor e Serviços Ativos
* **Hospedagem:** Google Cloud Run (Fully Managed Serverless Container).
* **Borda / Edge:** Google Frontend com certificado SSL automático gerenciado pelo Google Trust Services.
* **Cabeçalhos de Resposta Mandatórios (Validação em PRD):**
  * `server: Google Frontend`
  * `x-cloud-trace-context: [trace-id]`
  * `cache-control: no-cache` (ou `public, max-age=...` para assets estáticos)
  * Status code: `HTTP/2 200 OK`

### 3.2 Proibição Expressa do Render
* **NUNCA** fazer deploy de serviços da Gama no Render (`onrender.com`).
* **NUNCA** registrar links do Render em relatórios ou documentações para o usuário Rodrigo Gonçalves.
* O Render foi utilizado experimentalmente no passado para prototipagem de consórcios genéricos e **NÃO FAZ PARTE** do ecossistema corporativo da Gama Patrimonial.

---

## 4. Checklist Pré-Deploy e Validação de Agentes

Antes de considerar qualquer entrega finalizada, o agente deve obrigatoriamente executar e aprovar os seguintes passos:

### Passo 1: Higienização de Marca
Certifique-se de que não existe nenhuma ocorrência ou botão com o texto "Construtora Casa Nova" ou "Casa Nova" na interface do usuário da Gama Patrimonial:
```bash
grep -ri "casa nova" src/ || echo "OK - Nenhuma referência incorreta encontrada"
```

### Passo 2: Execução de Testes Automatizados
Todos os testes unitários e de integração devem passar com 100% de sucesso:
```bash
pnpm test
```

### Passo 3: Compilação de Produção
Geração do bundle estático e criação dos fallbacks de SPA para roteamento direto:
```bash
pnpm build
```

### Passo 4: Validação de Produção ao Vivo
Verificar a resposta ao vivo do endpoint no GCP Cloud Run:
```bash
curl -sI https://gamapatrimonial.com.br/plataforma/vistorias | grep -E "HTTP|server|x-cloud-trace"
```
*A saída esperada deve conter:*
```text
HTTP/2 200
server: Google Frontend
x-cloud-trace-context: ...
```

### Passo 5: Captura Visual de Evidências (Screenshots)
Gerar prints atualizados via Chromium headless na resolução de desktop (1440x900) e inspecionar visualmente:
```bash
chromium --headless --no-sandbox --disable-gpu --window-size=1440,900 \
  --screenshot=/home/ubuntu/validacao_prd/gama_vistorias_prd.png \
  https://gamapatrimonial.com.br/plataforma/vistorias
```

---

## 5. Procedimentos de Emergência e Rollback

1. **Falha de Carregamento da Rota `/plataforma/vistorias`:**
   * Conferir a existência do fallback `dist/plataforma/vistorias/index.html`.
   * Verificar se o `App.tsx` possui o parser de `window.location.pathname.includes("/vistorias")`.
2. **Identidade Visual Incorreta:**
   * Garantir que `MARCA_GAMA` injeta `#121212`, `#C6A15B` e `CRECI J-14280 MT`.
3. **Contato do Responsável:**
   * Notificar imediatamente `rodrigo.goncalves@kytto.com.br`.
