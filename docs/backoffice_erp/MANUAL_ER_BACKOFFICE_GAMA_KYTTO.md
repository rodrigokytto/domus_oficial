# 🏛️ MANUAL TÉCNICO DE BACKOFFICE ERP: GAMA PATRIMONIAL × KYTTO ERP

**Empresa:** Gama Patrimonial Gestão e Participações Ltda  
**CNPJ:** 52.894.120/0001-44 | **CRECI Jurídico:** J-14280 MT  
**Sede:** Tangará da Serra - MT | **Código IBGE:** 5107958  
**Repositório Base:** `rrodrigogon-byte/agro-open` (Kytto ERP Core)  
**Status Arquitetural:** Especificação e DDL de Produção Finalizados  

---

## 1. Contexto e Objetivo Arquitetural

O **Kytto ERP** (desenvolvido no repositório `agro-open`) possui um ecossistema completo de gestão transacional com mais de 130 migrações SQL. Ele contempla tanto módulos front-office (PDV de varejo, bar, restaurante, barbearia, supermercado) quanto um núcleo enterprise de **Backoffice** de alta precisão.

Este documento detalha a replicação e evolução do **Modelo Entidade-Relacionamento (ER)** do Kytto ERP, extraindo com qualidade ampliada e detalhes exaustivos **exclusivamente os módulos de Backoffice**, integrados às operações imobiliárias, patrimoniais, de crédito e consórcios da **Gama Patrimonial**.

---

## 2. Mapa dos Módulos de Backoffice Replicados

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                             GAMA PATRIMONIAL BACKOFFICE ENTERPRISE                               │
├──────────────────────────────┬──────────────────────────────┬────────────────────────────────────┤
│ 1. Governança & Multiempresa │ 2. ERP Financeiro & Razão    │ 3. Backoffice Imobiliário          │
│ • Empresas (Matriz Tangará)  │ • Plano de Contas Estruturado│ • Acervo Patrimonial & Fazendas MT │
│ • Unidades de Negócio        │ • Centros de Custo (4 áreas) │ • Contratos de Locação e Venda     │
│ • Usuários, Corretores e 2FA │ • Razão com Idempotência     │ • Repasses Líquidos a Locadores    │
│ • Controle RBAC Granular     │ • Contas Bancárias & OFX     │ • Comissões e Split de Corretores  │
│ • Contrapartes Mestres       │ • Fechamento Mensal & DRE    │ • Vistorias com Assinatura Touch   │
├──────────────────────────────┼──────────────────────────────┼────────────────────────────────────┤
│ 4. Soluções de Consórcios    │ 5. Fiscal, NFS-e & DIMOB     │ 6. Auditoria & Compliance COAF     │
│ • Administradoras BACEN      │ • Certificados A1 Cifrados   │ • Trilha Imutável SHA-256          │
│ • Carteira de Cotas Ativas   │ • NFS-e Tangará da Serra     │ • Prevenção Lavagem de Dinheiro    │
│ • Faturamento de Comissões   │ • DIMOB Anual Receita Federal│ • Monitoramento de Espécie         │
│ • Assembleias e Lances       │ • Reforma Tributária IBS/CBS │ • Dossiê de Diligência Cadastral   │
└──────────────────────────────┴──────────────────────────────┴────────────────────────────────────┘
```

---

## 3. Especificação Detalhada das Entidades e Atributos

### 3.1. Governança, Multiempresa & Controle de Acesso (RBAC)

1. **`empresas`**: Registro da holding imobiliária e participações.
   - `id` (UUID PK): Identificador universal.
   - `razao_social`: "Gama Patrimonial Gestão e Participações Ltda".
   - `cnpj`: "52894120000144" (Validação de formato e dígito).
   - `creci_juridico`: "J-14280 MT" (Inscrição perante o CRECI-MT).
   - `codigo_municipio_ibge`: "5107958" (Tangará da Serra - MT).
   - `regime_tributario`: Enquadramento em Lucro Presumido para serviços de intermediação e locação.
2. **`unidades_negocio`**: Segmentação operacional da Gama.
   - Tipos: `imobiliaria_sede`, `fazendas_agro`, `consorcios_domus`, `incorporacao`.
3. **`usuarios`**: Funcionários, diretores e corretores autônomos credenciados.
   - `creci_fisico`: Registro profissional do corretor de imóveis.
   - `segundo_fator_ativo`: Obrigatório para operações financeiras e contratuais (TOTP).
4. **`perfis_permissoes`**: Matriz RBAC (*Role-Based Access Control*).
   - Permissões específicas: `pode_aprovar_pagamento`, `pode_estornar`, `pode_emitir_fiscal`.
5. **`contrapartes`**: Cadastro mestre unificado de pessoas físicas e jurídicas.
   - Papéis: `proprietario_locador`, `locatario`, `comprador`, `vendedor`, `consorciado`, `fornecedor`.
   - `dados_bancarios_repasse`: Chave PIX, banco, agência e conta corrente para recebimento dos repasses de aluguel.
   - `score_credito`: Classificação de risco cadastral e de adimplência.

---

### 3.2. ERP Financeiro & Tesouraria (O Razão Universal Kytto)

O coração financeiro do sistema adota a arquitetura de **Razão Universal com Idempotência** desenvolvida em `090_financeiro_razao.sql`.

1. **`fin_centros_custo`**: Rateio por verticais de faturamento:
   - `LOCACAO`: Carteira de administração de aluguéis residenciais e comerciais.
   - `VENDAS`: Intermediação imobiliária urbana de alto padrão.
   - `AGRO`: Intermediação e arrendamento de fazendas e áreas produtivas no MT.
   - `CONSORCIOS`: Operações financeiras e cartas contempladas Domus.
2. **`fin_plano_contas`**: Plano contábil e gerencial de 4 níveis amarrado ao DRE:
   - `1.1`: Ativo Circulante (Disponibilidades em Bancos).
   - `2.1`: Passivo Circulante (Repasses a Proprietários, Comissões a Pagar).
   - `3.1`: Receitas Operacionais Brutas (Taxa de Administração 10%, Honorários de Corretagem 6%, Comissão de Consórcio 4%).
   - `4.1`: Custos dos Serviços Prestados (Laudos, Vistorias, Diligências).
   - `5.1`: Despesas Operacionais e Administrativas.
3. **`fin_lancamentos`**: Tabela central do Razão Financeiro.
   - **Chave de Idempotência (`chave_idempotencia`)**: Composta por `prefixo:empresa:origem:id_externo:parcela`. Impede categoricamente a duplicação de lançamentos financeiros mesmo se o webhook bancário ou o fechamento de aluguéis for disparado múltiplas vezes.
   - **Regime Duplo (Competência vs Vencimento)**: 
     * `data_competencia`: Define o mês contábil para o DRE.
     * `data_vencimento` e `data_liquidacao`: Controlam o Fluxo de Caixa real.
   - `natureza`: `pagar` (ex: repasse ao dono do imóvel), `receber` (ex: aluguel cobrado do inquilino), ou `avulso`.
   - `valor_efetivo`: Coluna gerada automaticamente (`valor_nominal + valor_juros + valor_multa - valor_desconto`).
4. **`fin_conciliacoes_extrato`**: Conciliação automatizada de extratos bancários via padrão OFX e APIs bancárias (Banco do Brasil, Bradesco, Itaú, Sicredi e Sicoob).
5. **`fin_fechamentos_periodo`**: Snapshot consolidado mensal que congela o DRE contábil, apurando a margem bruta de corretagem e o lucro líquido do exercício.

---

### 3.3. Backoffice Imobiliário & Gestão de Contratos

1. **`imob_contratos`**: Gestão dos instrumentos jurídicos.
   - Tipos: `locacao_residencial`, `locacao_comercial`, `compra_venda_promessa`, `arrendamento_agro`.
   - `taxa_administracao_perc`: Percentual padrão praticado pela Gama (8% a 10%).
   - `tipo_garantia`: Seguro-fiança, caução depositada em conta de garantia ou fiador idôneo.
2. **`imob_repasses_locacao`**: Motor automatizado de prestação de contas aos locadores.
   - **Fórmula de Repasse Líquido**:
     $$\text{Líquido} = \text{Aluguel Bruto Recebido} - \text{Taxa de Administração (Gama)} - \text{IRRF Retido} - \text{Despesas/Reparos autorizados}$$
   - Integra-se em tempo real ao `fin_lancamentos` gerando a respectiva ordem de pagamento via PIX.
3. **`imob_comissoes_corretagem`**: Split automático de honorários.
   - A partir da venda (6% CRECI-MT), divide a receita entre a imobiliária e o corretor responsável (ex: 50%/50%), provisionando no contas a pagar assim que o sinal do negócio é liquidado.
4. **`imob_vistorias_digitais`**: Vistorias de entrada e saída.
   - Armazena a matriz de fotos com hash SHA-256 e assinatura eletrônica touch/mouse colhida nas telas do app, com registro de IP e carimbo UTC.

---

### 3.4. Backoffice de Consórcios & Crédito (Domus Consórcios)

1. **`consorcio_administradoras`**: Cadastro de administradoras financeiras fiscalizadas pelo Banco Central (Porto Seguro, Rodobens, Itaú, Embracon).
2. **`consorcio_cotas`**: Carteira ativa de consórcios imobiliários e agropecuários.
   - Acompanhamento de saldo devedor, parcelas pagas, lances ofertados e data de contemplação.
3. **`consorcio_comissoes_faturamento`**: Faturamento de vendas de cotas novas e intermediação de cartas contempladas, integrando os créditos de comissão diretamente ao razão financeiro.

---

### 3.5. Módulo Fiscal, NFS-e Tangará da Serra & DIMOB Nacional

1. **`fis_certificados_a1`**: Armazenamento seguro de certificado digital ICP-Brasil.
   - Chaves privadas PFX e senhas são salvas sob criptografia simétrica forte **AES-256-GCM** com chave mestra externa (`FISCAL_CERT_MASTER_KEY`). O banco de dados nunca mantém credenciais em texto puro.
2. **`fis_emitentes_servico`**: Configuração fiscal com CNAE 6821-8/01 (Intermediação Imobiliária) e alíquota de ISS de 5,00% perante a Prefeitura Municipal de Tangará da Serra - MT.
3. **`fis_nfse_emitidas`**: Emissão automática de NFS-e sobre o valor da **taxa de administração** retida e sobre a **comissão de corretagem** (a nota nunca é emitida sobre o valor total do aluguel ou venda, protegendo a empresa contra bitributação indevida).
4. **`fis_dimob_declaracoes`**: Motor gerador da **DIMOB (Declaração de Informações sobre Atividades Imobiliárias)** exigida anualmente pela Receita Federal do Brasil (IN RFB nº 1.115).
   - Relaciona cada contrato de locação do ano-calendário, vinculando CPF/CNPJ do locador, CPF/CNPJ do inquilino, montante de aluguéis intermediados, rendimento de comissão da imobiliária e retenções de Imposto de Renda Retido na Fonte (Carnê-Leão).
5. **`fis_classificacao_ibs_cbs`**: Enquadramento fiscal para a **Reforma Tributária (EC 132/2023)**, com classificação CST de 3 dígitos e `cClassTrib` de 6 dígitos para o regime específico do setor imobiliário.

---

### 3.6. Auditoria Imutável & Compliance COAF

1. **`auditoria_trilha_imutavel`**:
   - Cada inserção, alteração ou exclusão em tabelas críticas (contratos, repasses, lançamentos bancários) grava um registro com `payload_anterior`, `payload_novo`, identificação do operador, IP e hash criptográfico SHA-256 encadeado.
2. **`compliance_coaf_diligencia`**:
   - Atendimento obrigatório à **Resolução COAF nº 40/2021** (Prevenção à Lavagem de Dinheiro no Mercado Imobiliário).
   - Disparo automático de alerta quando uma operação envolver pagamento em espécie superior a R$ 100.000,00 ou quando partes envolvidas figurarem em listas de Pessoas Expostas Politicamente (PEP).

---

## 4. Arquivos Entregues no Sandbox

1. **Script DDL SQL Completo**:
   - Localização: `/home/ubuntu/gama_erp_backoffice/schema_gama_backoffice_erp.sql`
   - Características: Código SQL PostgreSQL 15+ pronto para execução, com integridade referencial, índices compostos e constraints financeiras.
2. **Diagrama Entidade-Relacionamento Modular (PNG)**:
   - Localização: `/home/ubuntu/gama_erp_backoffice/diagrama_backoffice_modular.png`
   - Renderização: Gerado em alta resolução estruturado em 6 blocos visuais conectados.
3. **Código-Fonte do Diagrama Mermaid**:
   - Localização: `/home/ubuntu/gama_erp_backoffice/diagrama_backoffice_modular.mmd`
4. **Diagrama ER Puro Alternativo**:
   - Localização: `/home/ubuntu/gama_erp_backoffice/er_diagram_gama_kytto.png`
   - Código MMD: `/home/ubuntu/gama_erp_backoffice/er_diagram_gama_kytto.mmd`
