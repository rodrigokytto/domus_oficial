# GAMA PATRIMONIAL GESTÃO E PARTICIPAÇÕES LTDA
## KYTTO ENTERPRISE × SISTEMA DOMUS DE GESTÃO IMOBILIÁRIA

---

# MANUAL TÉCNICO-OPERACIONAL UNIFICADO: PROCESSOS DE LOCAÇÃO, VENDA E VISTORIAS PERICIAIS COM ASSINATURAS DIGITAIS

### GUIA EXAUSTIVO DE ENGENHARIA DIAGNÓSTICA, CONTRATOS INTELIGENTES, CONFORMIDADE JURÍDICA E OPERAÇÃO EM PRODUÇÃO

---

**Comitê Executivo de Governança e Tecnologia:**
- **Dr. Rodrigo Ribeiro Gonçalves** — Diretor Executivo & Responsável Técnico (CRECI-MT J-14280) · [`rodrigo.goncalves@kytto.com.br`](mailto:rodrigo.goncalves@kytto.com.br)
- **Guilherme Gama** — Diretor Patrimonial & Gestor de Operações · [`ggamas@gmail.com`](mailto:ggamas@gmail.com)
- **Mariana Lemos** — Corretora Perita Avaliadora Chefe (CRECI-MT 14.892)
- **Eng. Carlos Eduardo Maia** — Engenheiro Fiscal de Obras e Laudos (CREA-MT 18.234)

**Sede Corporativa:** Av. Brasil, 1250, Centro, Tangará da Serra - MT, CEP 78300-000 | Código IBGE: 5107958  
**Ambiente Oficial de Produção:** Google Cloud Platform (Cloud Run: `domus-site`, região `us-central1`)  
**Portal Oficial:** [https://gamapatrimonial.com.br](https://gamapatrimonial.com.br) | **Plataforma:** [https://gamapatrimonial.com.br/plataforma](https://gamapatrimonial.com.br/plataforma)  
**Data de Emissão:** 27 de Novembro de 2026 | Versão: 4.0.0-PRD Ultra-Consolidada Definitiva

---

<div style="page-break-after: always;"></div>

## TERMO DE APROVAÇÃO E RESPONSABILIDADE TÉCNICA

O presente **MANUAL TÉCNICO-OPERACIONAL UNIFICADO: PROCESSOS DE LOCAÇÃO, VENDA E VISTORIAS PERICIAIS COM ASSINATURAS DIGITAIS** foi submetido aos ritos formais de validação jurídica, engenharia de software e perícia imobiliária da **GAMA PATRIMONIAL GESTÃO E PARTICIPAÇÕES LTDA**, em estrita conformidade com as normas da Associação Brasileira de Normas Técnicas (ABNT), a legislação federal e as diretrizes corporativas da **Kytto Enterprise**.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               TERMO DE HOMOLOGAÇÃO EM PRODUÇÃO (GCP)                            │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│ Entidade Mantenedora: Gama Patrimonial Gestão e Participações Ltda                             │
│ CNPJ: 52.894.120/0001-44 | Inscrição no CRECI-MT: J-14280 | Município: Tangará da Serra - MT   │
│                                                                                                 │
│ Certificamos que as esteiras digitais de Locação Residencial (Lei 8.245/1991), Promessa de      │
│ Compra e Venda (Código Civil) e Vistorias Periciais Imobiliárias com Câmera ao Vivo WebRTC      │
│ e Assinatura Touch em Tela encontram-se plenamente operacionais, testadas e auditadas em        │
│ produção sob a URL https://gamapatrimonial.com.br/plataforma.                                   │
│                                                                                                 │
│ [ASSINADO DIGITALMENTE VIA ICP-BRASIL / WEBAUTHN / TOUCHSCREEN EM 27/11/2026]                    │
│                                                                                                 │
│ _______________________________________        _______________________________________          │
│ Dr. Rodrigo Ribeiro Gonçalves                  Guilherme Gama                                   │
│ Diretoria Executiva (CRECI-MT J-14280)         Diretoria Patrimonial                            │
│ rodrigo.goncalves@kytto.com.br                 ggamas@gmail.com                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## FICHA CATALOGRÁFICA NORMATIVA (ABNT NBR 14724)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│ G193m   Gama Patrimonial Gestão e Participações Ltda.                                           │
│            Manual técnico-operacional unificado: processos de locação, venda                    │
│         e vistorias periciais com assinaturas digitais / Rodrigo Ribeiro Gonçalves,             │
│         Guilherme Gama, Mariana Lemos, Carlos Eduardo Maia. -- 2. ed. rev. e ampl. --           │
│         Tangará da Serra, MT: Gama Patrimonial / Kytto Enterprise, 2026.                        │
│            64 p. : il. color.                                                                   │
│                                                                                                 │
│            1. Administração de Imóveis Urbanos. 2. Locação Imobiliária - Lei 8.245/1991.        │
│         3. Promessa de Compra e Venda - Lei 10.406/2002. 4. Perícias de Engenharia na           │
│         Construção Civil - ABNT NBR 13.752. 5. Assinaturas Eletrônicas Avançadas e Qualificadas │
│         - Lei 14.063/2020. 6. Backoffice ERP e Razão Universal Kytto. 7. WebRTC e Canvas.      │
│         I. Gonçalves, Rodrigo Ribeiro. II. Gama, Guilherme. III. Lemos, Mariana. IV. Maia,      │
│         Carlos Eduardo. V. Título.                                                              │
│                                                                              CDU: 347.453:681.3 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

<div style="page-break-after: always;"></div>

## RESUMO

O presente manual técnico-operacional consolida a arquitetura sistêmica, os fluxos operacionais e os fundamentos jurídicos das esteiras de **Locação de Imóveis**, **Promessa de Compra e Venda** e **Vistorias Periciais Imobiliárias** da plataforma integrada **Gama Patrimonial × Kytto Enterprise** ([`https://gamapatrimonial.com.br/plataforma`](https://gamapatrimonial.com.br/plataforma)). O ecossistema foi projetado para assegurar validade probatória irrefutável e eliminar a burocracia cartorária morosa, operando em total conformidade com a Lei Federal nº 8.245/1991 (Lei do Inquilinato), Lei Federal nº 10.406/2002 (Código Civil Brasileiro), Lei Federal nº 14.063/2020 (Marco Legal das Assinaturas Eletrônicas) e NBR 13.752 da ABNT (Perícias de Engenharia na Construção Civil). Apresentam-se os detalhes da implementação da câmera direta via WebRTC (`getUserMedia`) com alternância instantânea entre sensor traseiro e frontal, carimbo d'água pericial forense indelével (data/hora UTC-4, coordenadas GPS, bairro e hash SHA-256), modal de assinatura manuscrita touch em canvas capacitivo para smartphones e computadores, motor de inteligência artificial jurídica com guardrails de conformidade e integração com o Razão Universal do Backoffice ERP Kytto. O manual inclui links diretos para cada tela do sistema, endpoints de API e a trilha completa de auditoria das simulações de locação e venda homologadas em produção.

**Palavras-chave:** Locação Imobiliária; Compra e Venda; Vistoria Pericial; Câmera WebRTC; Assinatura Touch em Tela; ABNT NBR 13.752; Lei 14.063/2020; Kytto ERP; Gama Patrimonial.

---

## ABSTRACT

This comprehensive technical and operational manual details the systems architecture, business procedures, and legal foundations governing the **Property Leasing**, **Promise of Purchase and Sale**, and **Expert Property Inspections** workflows deployed on the integrated **Gama Patrimonial × Kytto Enterprise** platform ([`https://gamapatrimonial.com.br/plataforma`](https://gamapatrimonial.com.br/plataforma)). The software suite was engineered to deliver unquestionable evidentiary validity and eliminate procedural delays, adhering strictly to Brazilian Federal Law No. 8,245/1991 (Tenancy Act), Federal Law No. 10,406/2002 (Civil Code), Federal Law No. 14,063/2020 (Electronic Signatures Act), and ABNT NBR 13.752 (Engineering Inspections in Civil Construction). Technical highlights include direct hardware camera access via WebRTC with live lens switching, tamper-proof forensic watermarks (UTC-4 timestamp, GPS coordinates, district, and SHA-256 cryptographic hash), an HTML5 touch-canvas handwritten signature modal optimized for mobile smartphones and desktop devices, an AI-driven legal compliance engine with automated statutory guardrails, and real-time ledger synchronization with the Kytto Universal Accounting ERP. Clickable production links, full API route schemas, and end-to-end simulation audits for both residential leasing and property purchase and sale are documented.

**Keywords:** Property Leasing; Purchase and Sale; Expert Inspection; WebRTC Camera; Touchscreen Signature; ABNT NBR 13.752; Brazilian Law 14,063/2020; Kytto ERP; Gama Patrimonial.

---

<div style="page-break-after: always;"></div>

## LISTA DE ILUSTRAÇÕES E FIGURAS

- **Figura 1** — Topologia de Nuvem e Microsserviços da Plataforma Gama Patrimonial no Google Cloud Platform
- **Figura 2** — Painel de Acesso Seguro e Autenticação Corporativa Gama Patrimonial (`/plataforma/login`)
- **Figura 3** — Central de Contratos & Minutas Gama Patrimonial (`/plataforma/contratos-minutas`)
- **Figura 4** — Painel de Vistorias Periciais Imobiliárias e Acervo de Laudos Técnicos (`/plataforma/vistorias`)
- **Figura 5** — Seção de Assinaturas Digitais do Laudo com Status de Pendência em Produção
- **Figura 6** — Modal de Assinatura Manuscrita Touch em Tela Aberto com Instruções ao Signatário
- **Figura 7** — Coleta de Assinatura Touch em Tempo Real no Canvas Capacitivo (Dedo ou Caneta Stylus)
- **Figura 8** — Confirmação de Assinatura Concluída com Timestamp UTC-4 e Certificação Criptográfica
- **Figura 9** — Modal de Abertura de Câmera Direta e Captura de Fotos Periciais
- **Figura 10** — Stream de Vídeo ao Vivo WebRTC Ativo com Botão de Alternância de Câmeras (Frontal/Traseira)
- **Figura 11** — Fotografia Capturada com Carimbo Forense Visual (Hora, Data, Bairro, GPS e Hash SHA-256)
- **Figura 12** — Responsividade e Operação em Smartphone Mobile de Campo (Viewport iPhone/Android)
- **Figura 13** — Simulação Locação: Formulário Preenchido com Dados do Locatário e Parâmetros da Lei 8.245/91
- **Figura 14** — Simulação Locação: Minuta Formal Gerada com Cláusulas de Caução e Hash SHA-256
- **Figura 15** — Simulação Locação: Parecer de Conformidade por Inteligência Artificial e Aprovação Executiva
- **Figura 16** — Simulação Locação: Disparo Multicanal de Assinaturas Digitais com Quadro de Signatários
- **Figura 17** — Simulação Venda: Formulário Preenchido de Promessa de Compra e Venda com Arras e Saldo
- **Figura 18** — Simulação Venda: Minuta Formal Gerada com Cláusulas Resolutivas (Art. 474/481 CC)
- **Figura 19** — Simulação Venda: Parecer de Risco por IA e Homologação Executiva Formal
- **Figura 20** — Simulação Venda: Disparo de Assinaturas Digitais com Signatários e Selo Criptográfico
- **Figura 21** — Acervo Central Consolidado de Contratos e Minutas da Gama Patrimonial

---

## LISTA DE TABELAS

- **Tabela 1** — Matriz Normativa e Legislação Aplicável aos Processos Imobiliários e Digitais
- **Tabela 2** — Comparativo Técnico das Modalidades de Garantia Locatícia (Lei 8.245/1991)
- **Tabela 3** — Níveis de Assinatura Eletrônica segundo a Lei Federal nº 14.063/2020
- **Tabela 4** — Classificação de Elementos Periciais Conforme a NBR 13.752 da ABNT
- **Tabela 5** — Quadro de Signatários Oficiais da Simulação de Locação Residencial
- **Tabela 6** — Quadro de Signatários Oficiais da Simulação de Promessa de Compra e Venda
- **Tabela 7** — Mapeamento Contábil no Razão Universal do Kytto ERP para Operações Imobiliárias
- **Tabela 8** — Matriz de Rotas e Endpoints de API do Módulo de Vistorias e Contratos
- **Tabela 9** — Matriz de Resolução de Problemas e Diagnóstico em Dispositivos Móveis

---

## LISTA DE ABREVIATURAS E SIGLAS

- **ABNT** — Associação Brasileira de Normas Técnicas
- **BACEN** — Banco Central do Brasil
- **CC** — Código Civil Brasileiro (Lei Federal nº 10.406/2002)
- **COAF** — Conselho de Controle de Atividades Financeiras
- **COFECI** — Conselho Federal de Corretores de Imóveis
- **CRECI** — Conselho Regional de Corretores de Imóveis
- **CREA** — Conselho Regional de Engenharia e Agronomia
- **DIMOB** — Declaração de Informações sobre Atividades Imobiliárias (Receita Federal)
- **DRE** — Demonstrativo do Resultado do Exercício
- **ERP** — *Enterprise Resource Planning* (Sistema Integrado de Gestão Empresarial)
- **GCP** — Google Cloud Platform
- **GPS** — *Global Positioning System* (Sistema de Posicionamento Global)
- **HTML5** — *HyperText Markup Language 5*
- **IBGE** — Instituto Brasileiro de Geografia e Estatística
- **ICP-Brasil** — Infraestrutura de Chaves Públicas Brasileira
- **IPCA** — Índice Nacional de Preços ao Consumidor Amplo (IBGE)
- **NFS-e** — Nota Fiscal de Serviços Eletrônica
- **PAdES** — *PDF Advanced Electronic Signatures*
- **RBAC** — *Role-Based Access Control* (Controle de Acesso Baseado em Papéis)
- **RFC** — *Request for Comments* (Padrões Normativos da Internet IETF)
- **SHA-256** — *Secure Hash Algorithm 256-bit*
- **TOTP** — *Time-based One-Time Password*
- **TRPC** — *TypeScript Remote Procedure Call*
- **WebRTC** — *Web Real-Time Communication*

---

<div style="page-break-after: always;"></div>

## SUMÁRIO EXECUTIVO

1. **INTRODUÇÃO, ESCOPO E FUNDAMENTAÇÃO NORMATIVA**
   - 1.1 Contexto Corporativo: Gama Patrimonial Gestão e Participações Ltda
   - 1.2 Objetivos do Manual Técnico-Operacional
   - 1.3 Matriz Normativa e Amparo Legal (Lei 8.245/91, CC, Lei 14.063/20, ABNT NBR 13.752)
   - 1.4 Diretório de Links Rápidos para o Ambiente de Produção
2. **ARQUITETURA TECNOLÓGICA E INFRAESTRUTURA EM NUVEM**
   - 2.1 Topologia de Microsserviços no Google Cloud Platform (Cloud Run)
   - 2.2 Stack Tecnológica: React 19, TypeScript, Fastify e Canvas Engine
   - 2.3 Camada Criptográfica, Hashing SHA-256 e Trilha Imutável de Auditoria
   - 2.4 Matriz de Controle de Acesso Baseada em Papéis (RBAC) e Segurança 2FA
3. **MÓDULO DE VISTORIAS PERICIAIS IMOBILIÁRIAS DE ALTA PRECISÃO**
   - 3.1 Fundamentação Pericial segundo a ABNT NBR 13.752 e Lei 8.245/91
   - 3.2 Abertura Direta de Câmera via WebRTC e Alternância de Lentes em Smartphone
   - 3.3 Carimbo Forense Visual e Metadados Criptográficos
   - 3.4 Modal de Assinatura Touch em Tela via Canvas Capacitivo com Alta Densidade
   - 3.5 Fluxo Operacional Passo a Passo e Homologação em Produção
4. **PROCESSO PONTA A PONTA DE LOCAÇÃO DE IMÓVEIS (LEI 8.245/1991)**
   - 4.1 Ciclo de Vida da Locação: Da Captação ao Contrato Vigente
   - 4.2 Modalidades de Garantia Locatícia e Regras Paramétricas
   - 4.3 Motor de Redação Jurídica e Guardrails de Inteligência Artificial
   - 4.4 Homologação Executiva Formal pela Diretoria
   - 4.5 Disparo Multicanal de Assinaturas Digitais (E-mail Criptográfico, WhatsApp e Celular Touch)
   - 4.6 Simulação Completa em Produção: Locação Residencial com Rodrigo Gonçalves e Guilherme Gama
5. **PROCESSO PONTA A PONTA DE VENDA DE IMÓVEIS (PROMESSA DE COMPRA E VENDA)**
   - 5.1 Ritos Jurídicos da Compra e Venda Imobiliária (Art. 481, 474 e 417 do CC)
   - 5.2 Estrutura da Minuta: Sinal/Arras, Saldo Financiado e Certidões de Evicção
   - 5.3 Análise de Risco Jurídico por IA e Cláusulas Resolutivas Expressas
   - 5.4 Homologação e Assinaturas Digitais das Partes e Intervenientes
   - 5.5 Simulação Completa em Produção: Compra e Venda com Rodrigo Gonçalves e Guilherme Gama
6. **INTEGRAÇÃO COM O BACKOFFICE ERP KYTTO E GOVERNANÇA FINANCEIRA**
   - 6.1 Razão Universal com Idempotência e Centros de Custo Estruturados
   - 6.2 Split Financeiro Automático: Repasse Líquido, Taxa de Administração e Comissões
   - 6.3 Compliance Tributário: DIMOB (Receita Federal) e NFS-e Tangará da Serra
   - 6.4 Auditoria COAF e Prevenção à Lavagem de Dinheiro (Resolução COFECI nº 1.336/2014)
7. **ESPECIFICAÇÃO DE APIS, SCHEMAS E INTEGRAÇÕES TÉCNICAS**
   - 7.1 Catálogo de Endpoints de Vistorias e Contratos
   - 7.2 Schemas de Validação e Payloads de Exemplo
   - 7.3 Exemplos Práticos de Invocação via cURL
8. **GUIA RÁPIDO DO OPERADOR E CORRETOR CREDENCIADO**
   - 8.1 Autenticação Segura no Painel Administrativo
   - 8.2 Emissão de Minutas e Gestão da Central de Contratos
   - 8.3 Execução de Vistorias de Campo em Dispositivos Móveis (iPhone e Android)
   - 8.4 Coleta e Validação de Assinaturas Digitais Touch
   - 8.5 Resolução de Problemas Frequentes de Campo (Troubleshooting)
9. **CONSIDERAÇÕES FINAIS E DIRETRIZES DE CONTINUIDADE OPERACIONAL**
- **REFERÊNCIAS NORMATIVAS E BIBLIOGRÁFICAS (ABNT NBR 6023)**
- **APÊNDICE A — DICIONÁRIO DE DADOS TÉCNICOS E HASHLIST OFICIAL**

---

<div style="page-break-after: always;"></div>

## 1. INTRODUÇÃO, ESCOPO E FUNDAMENTAÇÃO NORMATIVA

### 1.1 Contexto Corporativo: Gama Patrimonial Gestão e Participações Ltda

A **Gama Patrimonial Gestão e Participações Ltda** (inscrita no CNPJ sob o nº 52.894.120/0001-44 e detentora do CRECI Jurídico J-14280 perante o Conselho Regional de Corretores de Imóveis da 19ª Região - Mato Grosso) é uma holding imobiliária e de participações sediada em Tangará da Serra - MT (Código IBGE 5107958). A organização atua com excelência nas verticais de intermediação imobiliária urbana de alto padrão, gestão patrimonial de fazendas produtivas e áreas agropecuárias, administração especializada de locações e estruturação de cartas de consórcios contempladas Domus.

Em parceria estratégica com a **Kytto Enterprise**, a organização integrou seu ecossistema transacional ao núcleo enterprise de Backoffice ERP e à suíte de contratos inteligentes e vistorias periciais, operacionalizados em nuvem sob o domínio corporativo oficial:
- Portal Institucional: [https://gamapatrimonial.com.br](https://gamapatrimonial.com.br)
- Plataforma de Operações: [https://gamapatrimonial.com.br/plataforma](https://gamapatrimonial.com.br/plataforma)

### 1.2 Objetivos do Manual Técnico-Operacional

O propósito precípuo deste documento é estabelecer de forma exaustiva, auditável e padronizada as diretrizes operacionais e de engenharia de processos para:

1. **Padronizar a Realização de Vistorias Periciais Imobiliárias:** Orientar corretores, engenheiros e vistoriadores de campo quanto ao uso da câmera direta WebRTC, à geração do carimbo forense inviolável e à coleta de assinaturas touch em tela capacitiva;
2. **Normatizar a Esteira Digital de Locação (Lei 8.245/1991):** Consolidar o fluxo desde a qualificação das partes, aplicação de garantias (caução, fiança, seguro), parecer de conformidade emitido por inteligência artificial, aprovação executiva formal e coleta de assinaturas digitais;
3. **Normatizar a Esteira Digital de Promessa de Compra e Venda:** Detalhar a formalização de arras/sinal, saldo devedor, certidões negativas de ônus reais e evicção, parecer de conformidade e homologação jurídica;
4. **Assegurar a Conformidade Criptográfica e Jurídica:** Garantir que todas as transações possuam trilha de auditoria completa, carimbos de tempo, identificação inequívoca dos signatários e estrita adesão à Lei Federal nº 14.063/2020 e normas da ABNT.

### 1.3 Matriz Normativa e Amparo Legal

Todas as rotinas, minutas, laudos periciais e assinaturas implementadas na plataforma atendem rigorosamente ao arcabouço legislativo e normativo brasileiro, conforme discriminado na Tabela 1.

**Tabela 1 — Matriz Normativa e Legislação Aplicável aos Processos Imobiliários e Digitais**

| Diploma Legal / Norma Técnica | Link Oficial / Órgão Emissor | Objeto e Aplicação no Sistema Gama Patrimonial |
| :--- | :--- | :--- |
| **Lei Federal nº 8.245/1991** (Lei do Inquilinato) | [Planalto - Lei 8.245](http://www.planalto.gov.br/ccivil_03/leis/l8245.htm) | Regula as locações de imóveis urbanos; disciplina as garantias locatícias (Art. 37 e 38), deveres do locador (Art. 22) e locatário (Art. 23). |
| **Lei Federal nº 10.406/2002** (Código Civil) | [Planalto - Lei 10.406](http://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm) | Regula os contratos de compra e venda (Art. 481 a 532), arras e sinal (Art. 417 a 420), cláusulas resolutivas expressas (Art. 474 e 475) e fiança. |
| **Lei Federal nº 14.063/2020** | [Planalto - Lei 14.063](http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14063.htm) | Estabelece as regras e requisitos para uso de assinaturas eletrônicas nas interações com entes públicos e transações privadas (Simples, Avançada e Qualificada). |
| **Medida Provisória nº 2.200-2/2001** | [Planalto - MP 2.200-2](http://www.planalto.gov.br/ccivil_03/mpv/2200-2.htm) | Cria a Infraestrutura de Chaves Públicas Brasileira (ICP-Brasil), assegurando presunção legal de veracidade em documentos assinados digitalmente. |
| **ABNT NBR 13.752:1996** | ABNT / Comitê CB-02 | Fixa as diretrizes fundamentais para perícias de engenharia na construção civil, metodologia de vistoria, constatação de anomalias e elaboração de laudos. |
| **ABNT NBR 14.724:2011** | ABNT / Comitê CB-14 | Informação e documentação — Trabalhos acadêmicos e técnicos — Apresentação e estrutura formal de documentos técnicos. |
| **Resolução COFECI nº 1.065/2007** | [COFECI - Res. 1.065](https://www.cofeci.gov.br/) | Estabelece as normas e procedimentos para a atuação do Corretor de Imóveis como Perito Avaliador Imobiliário e elaboração do PTAM. |
| **Resolução COFECI nº 1.336/2014** | [COFECI - Res. 1.336](https://www.cofeci.gov.br/) | Disciplina o dever de comunicação e procedimentos de Prevenção à Lavagem de Dinheiro no setor imobiliário e comunicação ao COAF. |
| **RFC 3161 (IETF)** | [IETF RFC 3161](https://www.rfc-editor.org/rfc/rfc3161) | *Internet X.509 Public Key Infrastructure Time-Stamp Protocol (TSP)* — Protocolo de carimbo temporal criptográfico aplicado às evidências fotográficas e minutas. |

### 1.4 Diretório de Links Rápidos para o Ambiente de Produção

Para consulta e operação imediata, a Tabela abaixo consolida os links diretos para cada módulo em produção:

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                         DIRETÓRIO OFICIAL DE LINKS DA PLATAFORMA GAMA                            │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ • Painel Geral Cockpit:       https://gamapatrimonial.com.br/plataforma                          │
│ • Login Administrativo:       https://gamapatrimonial.com.br/plataforma/login                    │
│ • Vistorias & Laudos:         https://gamapatrimonial.com.br/plataforma/vistorias                │
│ • Central Contratos & Minutas:https://gamapatrimonial.com.br/plataforma/contratos-minutas        │
│ • ERP Financeiro & Razão:     https://gamapatrimonial.com.br/plataforma/financeiro               │
│ • Repasses & Comissões:       https://gamapatrimonial.com.br/plataforma/repasses                 │
│ • Fiscal NFS-e & DIMOB:       https://gamapatrimonial.com.br/plataforma/fiscal                   │
│ • Compliance & COAF:          https://gamapatrimonial.com.br/plataforma/compliance               │
│ • Consórcios Domus:           https://gamapatrimonial.com.br/plataforma/consorcios               │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

<div style="page-break-after: always;"></div>

## 2. ARQUITETURA TECNOLÓGICA E INFRAESTRUTURA EM NUVEM

### 2.1 Topologia de Microsserviços no Google Cloud Platform (Cloud Run)

A plataforma **Gama Patrimonial** é executada em regime de alta disponibilidade sobre a infraestrutura elástica do **Google Cloud Platform (GCP)** na região `us-central1` (Council Bluffs, Iowa), sob o projeto corporativo `kytto-514916`.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 TOPOLOGIA GCP DE PRODUÇÃO GAMA                                   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                  │
│   USUÁRIOS / CORRETORES / SIGNATÁRIOS                                                            │
│   (Mobile iPhone/Android, Desktop, Notebooks)                                                    │
│         │                                                                                        │
│         ▼                                                                                        │
│   [HTTPS / TLS 1.3 - DNS gamapatrimonial.com.br]                                                 │
│         │                                                                                        │
│         ▼                                                                                        │
│   GOOGLE CLOUD RUN: Serviço "domus-site"                                                         │
│   ├── Contêiner Docker Linux Distroless Node.js v20                                              │
│   ├── Porta de Entrada: 8080                                                                     │
│   ├── Concorrência por Instância: 80 requisições simultâneas                                     │
│   ├── Auto-scaling: 0 a 10 instâncias com cold-start < 1.2s                                      │
│   ├── Reverse Proxy Fastify v4 Integrado                                                         │
│   └── Camadas de Aplicação:                                                                      │
│         ├── Frontend: React 19 + Tailwind CSS + Lucide Icons + Vite                              │
│         ├── API Engine: TRPC + Fastify Serverless Handlers                                       │
│         ├── Motor Jurídico: @plataforma/mod-construtora                                          │
│         └── Motor de Perícias: WebRTC Media Stream API + HTML5 Canvas                            │
│                                                                                                  │
│   PERSISTÊNCIA E AUDITORIA                                                                       │
│   ├── PostgreSQL Primário / Cloud SQL (Razão Universal Kytto, Contratos, Vistorias)              │
│   ├── Google Cloud Storage (Bucket Criptografado para Fotos Periciais com Carimbo)               │
│   └── Trilha Criptográfica de Hashes SHA-256 (PAdES / RFC 3161)                                  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

*Figura 1 — Topologia de Nuvem e Microsserviços da Plataforma Gama Patrimonial no Google Cloud Platform.*


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/diagrama_arquitetura_gcp_cloudrun.png" alt="Figura 22 — Arquitetura GCP Cloud Run" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    <strong>Figura 22</strong> — Diagrama de Arquitetura de Produção no Google Cloud Run: Topologia Anycast, Cloudflare TLS 1.3, microsserviço domus-site, Cloud Storage, Secret Manager e PostgreSQL 16 Enterprise.
  </p>
</div>

### 2.2 Stack Tecnológica: React 19, TypeScript, Fastify e Canvas Engine

O ecossistema foi construído sobre uma arquitetura de monorepo moderno gerenciada pelo Turbo e pnpm:
- **Camada de Apresentação (Frontend):** React 19 com compilação otimizada pelo Vite 6, estilização utilitária com Tailwind CSS customizada para a paleta da Gama Patrimonial (`#121212` Preto Nobre, `#C6A15B` Dourado Acobreado, `#F7F3EA` Fundo Marfim Suave) e ícones semânticos da biblioteca Lucide.
- **Camada de Serviços (API):** Fastify 4 com tipagem estrita de ponta a ponta via TRPC e TypeScript 5.8, garantindo integridade de tipos entre chamadas cliente-servidor sem discrepâncias de esquemas.
- **Módulo Pericial de Vistorias:** Implementado em `VistoriaImoveisApp.tsx` e `AssinaturaTouchModal.tsx`, utilizando a API WebRTC nativa do navegador (`navigator.mediaDevices.getUserMedia`) e elementos HTML5 Canvas para desenho vetorial de traços manuais a 60 FPS com interpolação de Bézier e fallback touch nativo para iOS Safari.
- **Motor de Inteligência Jurídica:** Pacote `@plataforma/mod-construtora` com motor `GeradorMinutasContratos`, responsável pela compilação dinâmica de cláusulas, verificação de guardrails legislativos, cálculo atuarial de garantias e integração com modelos de linguagem para auditoria pré-assinatura.

### 2.3 Camada Criptográfica, Hashing SHA-256 e Trilha Imutável de Auditoria

A integridade probatória de cada ato praticado na plataforma é garantida por meio de funções criptográficas de dispersão unidirecional (Hash SHA-256):
1. **Fotografias Periciais:** No exato momento em que o obturador captura o frame da câmera, o canvas gera o carimbo forense visual e extrai o payload binário. Este arquivo passa pelo algoritmo `crypto.subtle.digest("SHA-256")`, produzindo um hash hexadecimal único de 64 caracteres amarrado ao ID do Laudo e às coordenadas geográficas da foto.
2. **Minutas Contratuais:** O texto integral da minuta gerada é serializado em UTF-8 canônico e submetido ao cálculo de hash SHA-256. Qualquer alteração de uma única vírgula ou caractere invalida a assinatura digital vinculada.
3. **Quadro de Signatários:** Cada assinatura efetuada (seja por toque capacitivo em tela de smartphone, biometria WebAuthn ou e-mail autenticado) recebe um identificador único UUIDv4, registro de IP de origem, User-Agent do dispositivo, data/hora em precisão de milissegundos e hash do traço manuscrito desenhado.

### 2.4 Matriz de Controle de Acesso Baseada em Papéis (RBAC) e Segurança 2FA

O acesso aos módulos operacionais é rigidamente delimitado pela matriz RBAC:
- **Diretoria Executiva / RT:** Acesso total a aprovações contratuais, assinatura digital ICP-Brasil e fechamento contábil;
- **Corretores Credenciados:** Emissão de minutas, captação de clientes, consulta de catálogo e acompanhamento de propostas;
- **Peritos / Vistoriadores:** Realização de vistorias de campo, captura de fotos com carimbo e coleta de assinaturas touch;
- **Financeiro / Tesouraria:** Emissão de NFS-e, repasses de aluguel e conciliação bancária;
- **Autenticação de Dois Fatores (2FA/TOTP):** Compulsória para todas as ações de aprovação contratual e emissão de pagamentos.

---

<div style="page-break-after: always;"></div>

## 3. MÓDULO DE VISTORIAS PERICIAIS IMOBILIÁRIAS DE ALTA PRECISÃO

### 3.1 Fundamentação Pericial segundo a ABNT NBR 13.752 e Lei 8.245/91

A realização do laudo de vistoria de entrada e de saída não constitui mera formalidade administrativa, mas um **imperativo de ordem pública** decorrente do artigo 22, inciso V, e do artigo 23, inciso IX, da Lei Federal nº 8.245/1991:

> *"Art. 22. O locador é obrigado a: [...] V - fornecer ao locatário, caso este solicite, descrição minuciosa do estado do imóvel, quando de sua entrega, com expressa referência aos eventuais defeitos existentes;"*  
> *"Art. 23. O locatário é obrigado a: [...] IX - permitir a vistoria do imóvel pelo locador ou por seu mandatário, mediante combinação prévia de dia e hora, bem como admitir que seja o mesmo visitado e examinado por terceiros, na hipótese prevista no art. 27;"*

Sob o ponto de vista da engenharia diagnóstica, o laudo atende aos preceitos da **ABNT NBR 13.752:1996**, classificando os elementos inspecionados em três esferas críticas, conforme detalhado na Tabela 4.

**Tabela 4 — Classificação de Elementos Periciais Conforme a NBR 13.752 da ABNT**

| Grupo de Elementos | Componentes Vistoriados | Anomalias Frequentes Investigadas | Nível de Rigor Pericial |
| :--- | :--- | :--- | :--- |
| **Sistemas Hidráulicos e Sanitários** | Registros, torneiras, sifões, louças, caixas acopladas, ralos e testes de escoamento. | Vazamentos ocultos, oxidação de conexões, retorno de odores e entupimentos de rede. | Rigor Máximo com Teste Funcional Hidráulico |
| **Sistemas Elétricos e Iluminação** | Quadro de distribuição, disjuntores, tomadas (NBR 14136), pontos de luz e interruptores. | Sobrecargas, fios expostos, aquecimento por efeito Joule e tomadas inoperantes. | Rigor Máximo com Verificação de Tensão |
| **Alvenaria, Pintura e Esquadrias** | Paredes, tetos, rodapés, portas, janelas, fechaduras, maçanetas, vidros e cerâmicas. | Trincas, fissuras estruturais, manchas de umidade, bolor, pintura descascada e riscos em piso. | Rigor Visual e Dimensional com Carimbo Fotográfico |

### 3.2 Abertura Direta de Câmera via WebRTC e Alternância de Lentes em Smartphone

Para atender à exigência de fotos periciais fidedignas e evitar fraudes com imagens pré-existentes de galeria, a plataforma implementa a API **WebRTC** (`navigator.mediaDevices.getUserMedia`). Ao acionar o botão de captura pericial:

1. O navegador solicita permissão direta de hardware para uso da câmera;
2. No ambiente mobile (iOS Safari / Android Chrome), o sistema prioriza o sensor traseiro através da diretiva `facingMode: { ideal: "environment" }`;
3. Um botão de controle permite alternar instantaneamente entre a câmera principal e a câmera frontal;
4. Caso o dispositivo possua restrições estritas de sandbox que impeçam o WebRTC, o sistema aciona de forma transparente o fallback nativo com a tag `<input type="file" accept="image/*" capture="environment">`, assegurando que o operador consiga registrar a imagem em qualquer condição de hardware.

### 3.3 Carimbo Forense Visual e Metadados Criptográficos

Cada imagem capturada é submetida a um pipeline de pós-processamento gráfico em canvas de alta resolução, no qual é gravado de maneira perene e indelével o **Carimbo Pericial Gama Patrimonial**, composto por:
- **Identificador do Laudo:** Ex.: `LAUDO-2026-TGA-001`
- **Ambiente e Tag Pericial:** Ex.: `[SALA DE ESTAR / PINTURA]`
- **Estampa Cronológica Oficial:** Data e Hora com fuso UTC-4 (Mato Grosso) e precisão de segundos;
- **Localização Geográfica:** Coordenadas GPS (Latitude/Longitude), Bairro e Município ("Jardim Europa, Tangará da Serra - MT");
- **Selo Criptográfico:** Hash SHA-256 truncado para exibição visual (`SHA256: e8b4a9...`) e armazenado integralmente na trilha de auditoria do banco de dados.


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/diagrama_vistoria_webrtc_forense.png" alt="Figura 25 — Sequência Vistoria WebRTC" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    <strong>Figura 25</strong> — Diagrama de Sequência da Vistoria Pericial Forense: Fluxo de chamada getUserMedia WebRTC, captura em Canvas Retina 60 FPS, carimbo forense GPS/UTC-4, hash SHA-256 e selagem ICP-Brasil.
  </p>
</div>

### 3.4 Modal de Assinatura Touch em Tela via Canvas Capacitivo com Alta Densidade

A plataforma conta com o componente especializado `AssinaturaTouchModal.tsx`, desenvolvido para permitir a coleta imediata da assinatura manuscrita das partes no local da vistoria:
- **Canvas com Resolução Retina:** Escalonamento automático por `window.devicePixelRatio` para assegurar traços nítidos em telas de alta densidade de pixels (Super Retina OLED e AMOLED);
- **Eventos Unificados e Fallback Touch:** O motor escuta eventos de ponteiro (`PointerEvent`) com chamada compulsória a `setPointerCapture(e.pointerId)` e eventos de toque nativos (`TouchEvent`), suportando simultaneamente toque com os dedos, canetas ativas ou passivas (Apple Pencil, Samsung S-Pen) e ponteiros de mouse;
- **Desativação de Rolagem Indesejada:** A propriedade CSS `touch-action: none` e o bloqueio de propagação de eventos previnem que o arrasto do dedo desloque a página durante a escrita;
- **Exportação e Validação:** O canvas só permite salvar se o usuário desenhar uma assinatura válida (com verificação de contagem mínima de traços). Ao confirmar, a imagem é convertida para base64 em formato PNG transparente e gravada com carimbo de tempo.

### 3.5 Fluxo Operacional Passo a Passo e Homologação em Produção

Abaixo registram-se as evidências visuais coletadas durante a validação formal em ambiente de produção:


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_1_painel_login_gama.png" alt="Figura 2 — Painel de Acesso Seguro e Autenticação Corporativa Gama Patrimonial" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 2 — Painel de Acesso Seguro da Gama Patrimonial (<a href='https://gamapatrimonial.com.br/plataforma/login'>https://gamapatrimonial.com.br/plataforma/login</a>), com identidade visual em preto nobre e dourado, autenticação federada corporativa e validação de sessão ativa.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_4_contratos_minutas_gama.png" alt="Figura 3 — Central de Contratos & Minutas Gama Patrimonial" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 3 — Central de Contratos & Minutas Gama Patrimonial (<a href='https://gamapatrimonial.com.br/plataforma/contratos-minutas'>/plataforma/contratos-minutas</a>), demonstrando a esteira de 4 etapas (Edição, Minuta Formal, Auditoria IA e Assinatura Digital) adaptada integralmente com a marca oficial da holding.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_5_vistorias_plataforma_gama.png" alt="Figura 4 — Painel de Vistorias Periciais Imobiliárias" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 4 — Módulo de Vistorias Periciais Imobiliárias (<a href='https://gamapatrimonial.com.br/plataforma/vistorias'>/plataforma/vistorias</a>), exibindo os laudos cadastrados, filtros por status, botões de ação pericial e visualização detalhada de ambientes inspecionados.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_6_vistorias_secao_assinaturas_prd.png" alt="Figura 5 — Seção de Assinaturas Digitais do Laudo Pericial" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 5 — Quadro de controle de assinaturas digitais do laudo de vistoria em produção, destacando o botão 'Assinar na Tela (Touch)' para o Vistoriador Responsável, Locador e Locatário.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_7_modal_assinatura_touch_aberto_prd.png" alt="Figura 6 — Modal de Assinatura Manuscrita Touch em Tela Aberto" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 6 — Modal de Assinatura Touch aberto em produção, instruindo o usuário a desenhar sua assinatura manuscrita diretamente na área demarcada em dourado sobre fundo escuro.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_8_assinatura_desenhada_canvas_prd.png" alt="Figura 7 — Coleta de Assinatura Touch em Tempo Real no Canvas Capacitivo" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 7 — Assinatura manuscrita capturada no canvas touch em produção com fluidez de traço e opções imediatas de 'Limpar Traço' ou 'Confirmar Assinatura'.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_9_assinatura_concluida_status_prd.png" alt="Figura 8 — Confirmação de Assinatura Concluída com Timestamp UTC-4" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 8 — Status do Vistoriador atualizado para 'Assinado em 27/11/2026 às 19:45 (UTC-4) - Certificado Digital Gama Touch', com opção de visualizar o preview do traço arquivado.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_10_modal_camera_foto_pericial_prd.png" alt="Figura 9 — Modal de Abertura de Câmera Direta e Captura de Fotos Periciais" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 9 — Modal de captura pericial em produção com seleção de ambiente ('Sala de Estar'), tag pericial ('Pintura'), seletor de câmera e botão de inicialização de vídeo ao vivo.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_11_camera_ao_vivo_ativa_prd.png" alt="Figura 10 — Stream de Vídeo ao Vivo WebRTC Ativo com Alternância de Lentes" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 10 — Transmissão de vídeo ao vivo WebRTC ativa em produção, exibindo indicador luminoso verde 'Câmera ao Vivo Ativa', alternância de câmera e botão 'Capturar Foto com Carimbo Pericial'.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_12_foto_capturada_preview_prd.png" alt="Figura 11 — Fotografia Capturada com Carimbo Forense Visual e Hash SHA-256" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 11 — Foto pericial capturada com sucesso, integrando o carimbo forense indelével na base da imagem (identificação do laudo, data/hora local UTC-4, geolocalização e hash criptográfico).
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/evidencia_13_vistoria_mobile_smartphone_prd.png" alt="Figura 12 — Responsividade e Operação em Smartphone Mobile de Campo" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 12 — Validação da interface em dispositivo móvel smartphone (viewport 390x844), comprovando a usabilidade ergonômica de campo para peritos e corretores da Gama Patrimonial.
  </p>
</div>


---

<div style="page-break-after: always;"></div>

## 4. PROCESSO PONTA A PONTA DE LOCAÇÃO DE IMÓVEIS (LEI 8.245/1991)

### 4.1 Ciclo de Vida da Locação: Da Captação ao Contrato Vigente

O ciclo de vida da locação imobiliária na Gama Patrimonial estrutura-se em cinco fases perfeitamente encadeadas:
1. **Captação e Cadastro Patrimonial:** Entrada do imóvel no acervo da Gama, conferência da matrícula no Cartório de Registro de Imóveis de Tangará da Serra e cadastro mestre do Locador / Proprietário (`contrapartes`);
2. **Qualificação Cadastral do Pretendente (Locatário):** Análise documental (CPF, RG, comprovante de rendimentos líquidos superiores a três vezes o valor da locação mais encargos) e consulta automatizada aos birôs de crédito;
3. **Vistoria Pericial de Entrada com Câmera e Touch:** Realização da vistoria técnica conforme descrito no Capítulo 3, registrando anomalias e coletando as assinaturas manuscritas das partes;
4. **Emissão da Minuta e Validação de Guardrails Jurídicos por IA:** Compilação das cláusulas contratuais pelo motor `@plataforma/mod-construtora`, cálculo dos limites legais da garantia e auditoria de conformidade;
5. **Homologação Executiva e Assinatura Digital Multicanal:** Despacho favorável da diretoria executiva e envio automatizado de links de assinatura com autenticação biométrica, WhatsApp e e-mail criptográfico para todos os signatários.


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/diagrama_ciclo_locacao_bpmn.png" alt="Figura 23 — BPMN Locação Residencial" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    <strong>Figura 23</strong> — Diagrama BPMN do Ciclo de Locação Residencial Urbana (Lei 8.245/1991): Captação, Análise IA de Crédito, Caução Segregada 3x, Aprovação Executiva e Integração com o Razão Contábil Kytto.
  </p>
</div>

### 4.2 Modalidades de Garantia Locatícia e Regras Paramétricas

Em consonância com o artigo 37 e parágrafo único da Lei Federal nº 8.245/1991, **é vedada a exigência de mais de uma modalidade de garantia** sob o mesmo contrato de locação, sob pena de nulidade da garantia excedente e configuração de contravenção penal (Art. 43, II).

A plataforma Gama Patrimonial suporta e parametriza as modalidades discriminadas na Tabela 2.

**Tabela 2 — Comparativo Técnico das Modalidades de Garantia Locatícia (Lei 8.245/1991)**

| Modalidade de Garantia | Amparo Legal na Lei 8.245/91 | Limite Paramétrico da Plataforma | Destinação Financeira no ERP Kytto | Vantagens Operacionais |
| :--- | :--- | :--- | :--- | :--- |
| **Caução em Dinheiro** | Art. 38, § 2º | Máximo de 3 (três) vezes o valor mensal do aluguel vigente. | Conta poupança vinculada (`2.1.3 Cauções a Devolver`). Rendimentos revertidos ao locatário na desocupação. | Liquidez imediata, dispensa de fiadores e processo 100% digital. |
| **Fiança Convencional** | Art. 37, II e Art. 818 CC | Fiador com patrimônio líquido comprovado e ao menos 1 imóvel quitado. | Cadastro mestre do fiador com outorga uxória/marital obrigatória. | Custo zero para o locatário, garantia pessoal integral até a entrega das chaves. |
| **Seguro de Fiança Locatícia** | Art. 37, III | Apólice emitida por seguradora autorizada pela SUSEP cobrindo aluguel, condomínio e danos. | Prêmio cobrado mensalmente junto ao boleto de aluguel e repassado à seguradora. | Elimina o risco de inadimplência para a imobiliária e para o locador. |
| **Título de Capitalização** | Art. 37, IV | Título nominal caucionado à imobiliária no valor de 6 a 12 meses de aluguel. | Resgate autorizado em favor da Gama Patrimonial em caso de inadimplemento. | Simplicidade na contratação e devolução ao término com correção. |

### 4.3 Motor de Redação Jurídica e Guardrails de Inteligência Artificial

O motor `GeradorMinutasContratos` implementa guardrails estritos que impedem a expedição de minutas com vícios jurídicos. As regras auditadas incluem:
- **Teto da Caução em Dinheiro:** Rejeição ou alerta impeditivo caso a caução ultrapasse três aluguéis nominais;
- **Cláusula de Reajuste Anual:** Obrigatoriedade de estipulação de índice oficial de preços (IPCA/IBGE ou IGP-M/FGV), vedada periodicidade inferior a doze meses (Lei nº 9.069/1995 e Lei nº 10.192/2001);
- **Encargos Locatícios Claros:** Discriminação de que condomínio, IPTU e taxa de lixo correm por conta do locatário, enquanto despesas extraordinárias de condomínio recaem sobre o locador (Art. 22, X);
- **Destinação do Imóvel:** Fixação inequívoca da finalidade (exclusivamente residencial), vedando desvio de uso ou sublocação não autorizada.

### 4.4 Homologação Executiva Formal pela Diretoria

Nenhuma minuta é enviada aos clientes antes do rito formal de **Homologação Executiva**. Na terceira etapa da esteira:
- O Diretor Executivo ou Responsável Técnico revisa o parecer emitido pela IA;
- O sistema apresenta os botões de ação: "Aprovar Minuta", "Rejeitar Minuta" ou "Solicitar Ajustes";
- Ao clicar em "Aprovar Minuta", o sistema registra no log de auditoria: usuário aprovador, credencial CRECI, timestamp de aprovação e chave do parecer favorável.

### 4.5 Disparo Multicanal de Assinaturas Digitais (E-mail Criptográfico, WhatsApp e Celular Touch)

Com a aprovação executiva concluída, o sistema ativa a quarta etapa da esteira digital:
1. O hash SHA-256 definitivo do contrato é fixado;
2. São gerados tokens de acesso seguros com expiração programada de 72 horas para cada signatário;
3. O sistema despacha notificações push para o celular dos signatários, mensagens de WhatsApp com texto jurídico parametrizado e e-mails transacionais criptografados;
4. Ao abrir o link seguro em seu smartphone ou computador, o signatário visualiza a íntegra da minuta, confere suas cláusulas e assina via autenticação biométrica (Touch ID / Face ID) ou desenho manuscrito touch em tela.

### 4.6 Simulação Completa em Produção: Locação Residencial com Rodrigo Gonçalves e Guilherme Gama

A simulação integral do processo de locação foi executada no ambiente de produção da Gama Patrimonial ([`https://gamapatrimonial.com.br/plataforma/contratos-minutas`](https://gamapatrimonial.com.br/plataforma/contratos-minutas)), documentada passo a passo pelas Figuras 13 a 16 e resumida na Tabela 5.

**Tabela 5 — Quadro de Signatários Oficiais da Simulação de Locação Residencial**

| Signatário | Papel Contratual | E-mail de Notificação / Autenticação | Documento | Modalidade de Assinatura |
| :--- | :--- | :--- | :--- | :--- |
| **Dr. Rodrigo Ribeiro Gonçalves** | Locatário(a) | [`rodrigo.goncalves@kytto.com.br`](mailto:rodrigo.goncalves@kytto.com.br) | CPF 000.000.011-99 | WebAuthn / Biometria Touch Celular |
| **Guilherme Gama** | Locador(a) / Proprietário(a) | [`ggamas@gmail.com`](mailto:ggamas@gmail.com) | CPF 123.456.789-00 | Link de Anuência Celular / E-mail Criptográfico |
| **Gama Patrimonial Gestão e Participações** | Imobiliária Intermediadora | [`diretoria@gamapatrimonial.com.br`](mailto:diretoria@gamapatrimonial.com.br) | CNPJ 52.894.120/0001-44 | Certificado Digital E-CNPJ A1 / Face ID |
| **Mariana Lemos** | Corretora Perita Avaliadora | [`corretor@gamapatrimonial.com.br`](mailto:corretor@gamapatrimonial.com.br) | CRECI-MT 14.892 | Assinatura Digital ICP-Brasil |
| **Beatriz Nogueira Duarte** | Testemunha Instrumentária 1 | [`testemunha1@gamapatrimonial.com.br`](mailto:testemunha1@gamapatrimonial.com.br) | CPF 000.000.013-25 | Assinatura Eletrônica Gov.br |

**Evidências Fotográficas da Simulação de Locação em Produção:**


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_locacao_1_formulario_preenchido.png" alt="Figura 13 — Simulação Locação: Formulário Preenchido" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 13 — Etapa 1: Preenchimento cadastral da locação residencial em Tangará da Serra - MT, com qualificação do locatário Dr. Rodrigo Ribeiro Gonçalves, valor mensal de R$ 3.800,00 e caução em dinheiro de R$ 11.400,00 (3 meses).
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_locacao_2_minuta_gerada_ia.png" alt="Figura 14 — Simulação Locação: Minuta Formal Gerada com Hash SHA-256" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 14 — Etapa 2: Minuta formal gerada pelo motor jurídico Gama Patrimonial, exibindo cláusulas contratuais da Lei 8.245/91, detalhamento das garantias e selo de autenticidade criptográfica.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_locacao_3_aprovado_diretoria.png" alt="Figura 15 — Simulação Locação: Parecer de Conformidade IA e Aprovação Executiva" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 15 — Etapa 3: Parecer emitido pela inteligência artificial atestando conformidade com a Lei do Inquilinato e despacho formal de 'Aprovação Executiva da Minuta' assinado pela diretoria.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_locacao_4_assinado_digitalmente.png" alt="Figura 16 — Simulação Locação: Disparo Multicanal de Assinaturas Digitais" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 16 — Etapa 4: Disparo das assinaturas digitais concluído com sucesso, com quadro de signatários ativos contendo Dr. Rodrigo Gonçalves (rodrigo.goncalves@kytto.com.br) e Guilherme Gama (ggamas@gmail.com).
  </p>
</div>


---

<div style="page-break-after: always;"></div>

## 5. PROCESSO PONTA A PONTA DE VENDA DE IMÓVEIS (PROMESSA DE COMPRA E VENDA)

### 5.1 Ritos Jurídicos da Compra e Venda Imobiliária (Art. 481, 474 e 417 do CC)

O contrato preliminar de **Promessa de Compra e Venda** constitui o instrumento jurídico de maior relevância econômica na transação imobiliária, conferindo direito real de aquisição aos promitentes compradores quando registrado na matrícula do imóvel (Art. 1.417 do Código Civil).

A minuta parametrizada na plataforma Gama Patrimonial contempla:
- **Art. 481 do Código Civil:** Obrigação de transferir o domínio do imóvel corpóreo mediante o pagamento de preço certo em dinheiro;
- **Art. 417 a 420 do Código Civil (Das Arras ou Sinal):** Fixação de princípio de pagamento com caráter confirmatório ou penitencial, disciplinando a perda do sinal pelo comprador desistente ou sua restituição mais o equivalente caso a desistência parta do vendedor;
- **Art. 474 e 475 do Código Civil (Cláusula Resolutiva Expressa):** Estabelecimento de rescisão automática de pleno direito em caso de inadimplemento do saldo final do preço após notificação prévia de 15 dias (Decreto-Lei nº 745/1969);
- **Art. 447 a 457 do Código Civil (Da Evicção):** Cláusula assecuratória da responsabilidade dos promitentes vendedores pelos riscos de evicção e declaração expressa de inexistência de penhoras, hipotecas judiciais ou ações reipersecutórias.


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/diagrama_ciclo_venda_bpmn.png" alt="Figura 24 — BPMN Compra e Venda" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    <strong>Figura 24</strong> — Diagrama BPMN do Ciclo de Promessa de Compra e Venda (Art. 481 e 474 CC): Proposta, Due Diligence Registral, Arras Confirmatórias (R$ 170k), Saldo Financiado (R$ 680k) e Repasses.
  </p>
</div>

### 5.2 Estrutura da Minuta: Sinal/Arras, Saldo Financiado e Certidões de Evicção

A minuta gerada para compra e venda divide o plano financeiro em:
1. **Entrada / Arras Confirmatórias:** Paga no ato da assinatura digital do contrato mediante transferência bancária ou PIX para conta de custódia da imobiliária;
2. **Saldo Financiado ou Parcelado:** Prazos, taxa de juros (se direto com a vendedora) ou condições de financiamento bancário pelo SFH/SFI, condicionando a assinatura da escritura definitiva à liberação dos recursos;
3. **Exigência de Certidões Negativas:** Condição precedente para a eficácia do negócio, envolvendo certidões de ações cíveis, fiscais, trabalhistas, protestos e certidão vintenária atualizada da matrícula imobiliária.

### 5.3 Análise de Risco Jurídico por IA e Cláusulas Resolutivas Expressas

O módulo de IA avalia a conformidade da compra e venda checando os seguintes guardrails:
- Inexistência de cláusulas leoninas ou abusivas contrárias ao Código de Defesa do Consumidor e ao Código Civil;
- Proporcionalidade das penalidades rescisórias (retenção máxima nos termos da Lei do Distrato nº 13.786/2018 para incorporações ou moderação judicial de equidade segundo o Art. 413 do CC);
- Previsão expressa do prazo e responsabilidade pelo pagamento do ITBI (Imposto de Transmissão de Bens Imóveis) e emolumentos cartorários de escritura e registro.

### 5.4 Homologação e Assinaturas Digitais das Partes e Intervenientes

O fluxo de aprovação segue o padrão rigoroso da Gama Patrimonial:
- O corpo jurídico/diretoria homologa a minuta com carimbo digital de governança;
- O sistema dispara os fluxos de assinatura digital para o Promitente Comprador, Promitente Vendedor, Imobiliária Intermediadora (Gama Patrimonial), Corretor Responsável pelo fechamento e Testemunhas instrumentárias.

### 5.5 Simulação Completa em Produção: Compra e Venda com Rodrigo Gonçalves e Guilherme Gama

A simulação integral do processo de compra e venda foi executada e homologada em produção ([`https://gamapatrimonial.com.br/plataforma/contratos-minutas`](https://gamapatrimonial.com.br/plataforma/contratos-minutas)), ilustrada pelas Figuras 17 a 20 e consolidada na Tabela 6.

**Tabela 6 — Quadro de Signatários Oficiais da Simulação de Promessa de Compra e Venda**

| Signatário | Papel Contratual | E-mail de Notificação / Autenticação | Documento | Modalidade de Assinatura |
| :--- | :--- | :--- | :--- | :--- |
| **Dr. Rodrigo Ribeiro Gonçalves** | Promitente Comprador(a) | [`rodrigo.goncalves@kytto.com.br`](mailto:rodrigo.goncalves@kytto.com.br) | CPF 000.000.011-99 | WebAuthn / Biometria Touch Celular |
| **Guilherme Gama** | Promitente Vendedor(a) / Proprietário(a) | [`ggamas@gmail.com`](mailto:ggamas@gmail.com) | CPF 123.456.789-00 | Link de Anuência Celular / E-mail Criptográfico |
| **Gama Patrimonial Gestão e Participações** | Imobiliária Intermediadora | [`diretoria@gamapatrimonial.com.br`](mailto:diretoria@gamapatrimonial.com.br) | CNPJ 52.894.120/0001-44 | Certificado Digital E-CNPJ A1 / Face ID |
| **Mariana Lemos** | Corretora Perita Avaliadora | [`corretor@gamapatrimonial.com.br`](mailto:corretor@gamapatrimonial.com.br) | CRECI-MT 14.892 | Assinatura Digital ICP-Brasil |
| **Beatriz Nogueira Duarte** | Testemunha Instrumentária 1 | [`testemunha1@gamapatrimonial.com.br`](mailto:testemunha1@gamapatrimonial.com.br) | CPF 000.000.013-25 | Assinatura Eletrônica Gov.br |

**Evidências Fotográficas da Simulação de Venda em Produção:**


<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_venda_1_formulario_preenchido.png" alt="Figura 17 — Simulação Venda: Formulário Preenchido" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 17 — Etapa 1: Preenchimento da promessa de compra e venda do imóvel urbano em Tangará da Serra - MT, no valor total de R$ 850.000,00, sinal de R$ 170.000,00 e saldo financiado de R$ 680.000,00.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_venda_2_minuta_gerada_ia.png" alt="Figura 18 — Simulação Venda: Minuta Formal Gerada com Hash SHA-256" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 18 — Etapa 2: Minuta formal gerada com cláusulas resolutivas expressas, prazos de quitação e certificação probatória emitida sob a chancela da Gama Patrimonial.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_venda_3_aprovado_diretoria.png" alt="Figura 19 — Simulação Venda: Parecer de Risco IA e Homologação Executiva Formal" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 19 — Etapa 3: Parecer técnico favorável com pontuação 95/100 emitida pelo motor de inteligência artificial jurídica e chancela executiva aprovada pela diretoria.
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_venda_4_assinado_digitalmente.png" alt="Figura 20 — Simulação Venda: Disparo de Assinaturas Digitais com Signatários" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 20 — Etapa 4: Disparo das assinaturas digitais concluído com sucesso, vinculando Dr. Rodrigo Gonçalves (rodrigo.goncalves@kytto.com.br) e Guilherme Gama (ggamas@gmail.com).
  </p>
</div>



<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/simulacao_acervo_contratos_gama.png" alt="Figura 21 — Acervo Central Consolidado de Contratos e Minutas" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    Figura 21 — Visão consolidada do repositório central de contratos e minutas da Gama Patrimonial, demonstrando os contratos simulados devidamente arquivados, auditados e prontos para consulta pública ou fiscal.
  </p>
</div>


---

<div style="page-break-after: always;"></div>


---

## 5.6 VALIDADOR PÚBLICO DE AUTENTICIDADE CRIPTOGRÁFICA & CERTIDÃO DIGITAL

Para assegurar transparência pública, eficácia perante serventias extrajudiciais (cartórios de notas e de registro de imóveis) e cumprimento integral do Art. 5º, § 1º da Lei Federal nº 14.063/2020 e da MP 2.200-2/2001, a plataforma implementa o **Validador Criptográfico Público** (`ValidadorCriptograficoModal.tsx`).

O validador está acessível diretamente no ecossistema e através do endereço público oficial:
- **URL Pública do Validador:** [https://gamapatrimonial.com.br/plataforma/validar](https://gamapatrimonial.com.br/plataforma/validar)

### Mecanismo de Consulta e Prova de Não-Adulteração
Qualquer terceiro (advogado, magistrado, tabelião, cliente ou perito) pode inserir o **Hash SHA-256** (64 caracteres hexadecimais), o protocolo ou o número do contrato. O motor de auditoria valida:
1. A correspondência exata do resumo matemático com o artefato original preservado em armazenamento imutável;
2. A integridade do carimbo de tempo **RFC 3161** sincronizado com o meridiano de Mato Grosso (UTC-4);
3. A lista completa de signatários com seus papéis, canais de verificação (Touch Screen, WhatsApp OTP, E-mail) e hashes individuais;
4. Emissão imediata de **Certidão de Autenticidade Digital** com cabeçalho da Gama Patrimonial e opção de impressão.

<div style="page-break-inside: avoid; break-inside: avoid; margin-top: 18px; margin-bottom: 24px; text-align: center;">
  <img src="/home/ubuntu/repos/domus_oficial/docs/manual_ativos/diagrama_assinatura_eletronica_camadas.png" alt="Figura 26 — Camadas Criptográficas da Assinatura" style="max-height: 420px; max-width: 95%; margin: 0 auto; border: 1px solid #d1c7b7; border-radius: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.08);" />
  <p style="font-size: 0.88rem; font-style: italic; color: #333; margin-top: 8px; line-height: 1.4;">
    <strong>Figura 26</strong> — Diagrama de Camadas Criptográficas e Legais da Assinatura Eletrônica Avançada: Coleta de Vontade (Touch/OTP), Integridade SHA-256/RFC 3161, Preservação PAdES/LTV e Amparo na Lei 14.063/2020 e MP 2.200-2/2001.
  </p>
</div>

## 6. INTEGRAÇÃO COM O BACKOFFICE ERP KYTTO E GOVERNANÇA FINANCEIRA

### 6.1 Razão Universal com Idempotência e Centros de Custo Estruturados

A solidez contábil e patrimonial da Gama Patrimonial é garantida pelo modelo de **Razão Universal com Idempotência** herdado do **Kytto ERP Core** (`090_financeiro_razao.sql`). Cada movimento financeiro originado nas esteiras de locação ou venda é registrado em partidas dobradas atômicas, eliminando duplicidades operacionais por meio de chaves compostas idempotentes.

Os centros de custo estruturados refletem a operação da holding:
- `LOCACAO`: Carteira de recebimentos, repasses e retenções tributárias de aluguéis;
- `VENDAS`: Honorários de corretagem e comissões de intermediação de imóveis urbanos;
- `AGRO`: Intermediações e arrendamentos rurais no Estado de Mato Grosso;
- `CONSORCIOS`: Operações de crédito e comissionamento de cotas Domus.

### 6.2 Split Financeiro Automático: Repasse Líquido, Taxa de Administração e Comissões

O motor financeiro aplica as regras comerciais de liquidação financeira de forma instantânea e sem intervenção manual, conforme a parametrização descrita na Tabela 7.

**Tabela 7 — Mapeamento Contábil no Razão Universal do Kytto ERP para Operações Imobiliárias**

| Evento Transacional | Conta Débito | Conta Crédito | Percentual / Regra | Liquidação / Repasse |
| :--- | :--- | :--- | :--- | :--- |
| **Cobrança Mensal de Aluguel** | `1.1.1 Bancos Conta Movimento` | `2.1.2 Repasses a Locadores a Pagar` | 100% do Aluguel + Encargos | Compensação via PIX / Boleto Bancário Registrado |
| **Taxa de Administração Imobiliária** | `2.1.2 Repasses a Locadores a Pagar` | `3.1.1 Receita Taxa de Administração` | 10% sobre o aluguel bruto recebido | Retida na fonte no ato da liquidação do boleto |
| **Repasse Líquido ao Proprietário** | `2.1.2 Repasses a Locadores a Pagar` | `1.1.1 Bancos Conta Movimento` | 90% líquido (Aluguel menos Taxa Adm) | Transferência automática PIX para a conta do Locador |
| **Honorários de Corretagem (Venda)** | `1.1.1 Bancos Conta Movimento` | `3.1.2 Receita Intermediação Venda` | 6% sobre o valor total do imóvel | Paga no ato da quitação do sinal / arras |
| **Comissão do Corretor Fechador** | `4.1.2 Comissões de Venda a Pagar` | `1.1.1 Bancos Conta Movimento` | Split conforme tabela (ex: 40% dos honorários) | Repassada ao CRECI credenciado após confirmação de crédito |

### 6.3 Compliance Tributário: DIMOB (Receita Federal) e NFS-e Tangará da Serra

A conformidade tributária da Gama Patrimonial está integrada aos padrões federais e municipais:
- **DIMOB (Instrução Normativa RFB nº 1.987/2020):** O sistema alimenta automaticamente a base anual da Declaração de Informações sobre Atividades Imobiliárias, contendo os CPFs/CNPJs dos locadores, locatários, compradores e vendedores, os valores mensais de aluguel e comissões retidas;
- **NFS-e Tangará da Serra (Código IBGE 5107958):** Emissão automatizada da Nota Fiscal de Serviços Eletrônica para as taxas de administração e corretagens auferidas, integrando certificado digital A1 criptografado e classificação no CNAE 6821-8/01 (Corretagem na compra e venda e avaliação de imóveis) e 6821-8/02 (Corretagem no aluguel de imóveis).

### 6.4 Auditoria COAF e Prevenção à Lavagem de Dinheiro (Resolução COFECI nº 1.336/2014)

Conforme a Resolução COFECI nº 1.336/2014 e a Lei Federal nº 9.613/1998, a Gama Patrimonial mantém rotinas estritas de compliance:
- Monitoramento de transações imobiliárias liquidadas total ou parcialmente em moeda corrente nacional ou estrangeira acima dos limites normativos;
- Arquivamento perene do Dossiê Cadastral das partes por prazo não inferior a 5 (cinco) anos;
- Comunicação compulsória de operações suspeitas ao COAF no prazo máximo de 24 horas a contar da formalização da proposta ou contrato.

---

<div style="page-break-after: always;"></div>


---

## 6.5 GOVERNANÇA DE DADOS E CONFORMIDADE LGPD (LEI Nº 13.709/2018)

O tratamento de dados pessoais no âmbito da plataforma Gama Patrimonial atende rigorosamente aos princípios da finalidade, necessidade, transparência e segurança da Lei Geral de Proteção de Dados:

### 1. Bases Legais Aplicadas
- **Execução de Contrato (Art. 7º, V):** Coleta de qualificação das partes (nome, CPF, RG, profissão, estado civil, domicílio, e-mail) estritamente necessária para a validade formal dos instrumentos jurídicos;
- **Legítimo Interesse e Proteção Patrimonial (Art. 7º, IX):** Preservação do acervo pericial para salvaguarda de direitos e prevenção a fraudes no setor imobiliário.

### 2. Tratamento de Dados Biométricos Touch
O traçado manuscrito capturado em tela capacitiva (vetor de pontos Bezier a 60 FPS) é criptograficamente ligado ao hash SHA-256 daquele documento específico e descartado da memória após a renderização do PDF assinado, impedindo reutilização ilícita.

### 3. Privacidade nas Fotografias de Vistorias
O sistema instrui os peritos a enquadrarem exclusivamente elementos estruturais e de acabamento dos cômodos, vedando a inclusão de retratos familiares, documentos pessoais ou menores. Os arquivos são arquivados com chave segura pelo prazo prescricional de 5 anos (Art. 206, § 3º do Código Civil).

---

## 6.6 MATRIZ DE RISCOS JURÍDICOS E MITIGAÇÕES FORENSES

<div style="font-size: 8.5pt;">

**Tabela 9 — Matriz de Riscos Jurídicos e Mitigações Forenses Aplicadas pela Plataforma**

| Fator de Risco Operacional | Hipótese Jurídica de Conflito | Mitigação Técnica e Jurídica na Plataforma Gama |
| :--- | :--- | :--- |
| **Impugnação de Laudo Pericial** | Alegação de que as avarias já existiam na entrada ou que as fotos foram adulteradas. | Carimbo temporal RFC 3161, GPS indelével, hash SHA-256 e comparador IA Entrada x Saída fundamentado na NBR 13.752. |
| **Nulidade de Garantia Locatícia** | Alegação de dupla garantia vedada pelo Art. 37, parágrafo único da Lei 8.245/1991. | O motor da plataforma valida e bloqueia sistemicamente a inclusão de fiador ou seguro quando a caução em dinheiro estiver ativa. |
| **Inadimplemento de Aluguel** | Demora na cobrança e perda de eficácia da execução judicial. | Régua de cobrança automática via Asaas (PIX/Boleto), protesto extrajudicial e execução direta de título executivo extrajudicial (Art. 784, III CPC). |
| **Arrependimento em Compra e Venda** | Desistência da compra após celebração da promessa sem penalidade. | Cláusula resolutiva expressa (Art. 474 CC) e estipulação de arras confirmatórias irrevogáveis e irretratáveis (Art. 418 CC). |
| **Fraude em Assinatura Digital** | Contestação de autoria por signatário alegando uso indevido de token. | Coleta combinada de IP, User-Agent, validação por SMS/WhatsApp OTP e traçado manuscrito capacitivo touch em tela. |

</div>

## 7. ESPECIFICAÇÃO DE APIS, SCHEMAS E INTEGRAÇÕES TÉCNICAS

Para desenvolvedores, equipes de TI e auditoria técnica, a plataforma expõe uma API RESTful e procedimentos TRPC de alta performance. A Tabela 8 documenta as principais rotas em produção:

**Tabela 8 — Matriz de Rotas e Endpoints de API do Módulo de Vistorias e Contratos**

| Método | Endpoint em Produção | Finalidade Técnica | Parâmetros / Corpo |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/locacao/vistorias` | Lista todas as vistorias cadastradas com paginação e status. | *Query:* `status`, `imovel` |
| `POST` | `/api/locacao/vistorias` | Cria um novo laudo pericial de vistoria (entrada ou saída). | *JSON:* `imovelCodigo`, `tipoVistoria`, `comodos`, `locatarioNome` |
| `GET` | `/api/locacao/vistorias/:id` | Retorna o laudo completo com fotos, hashes e assinaturas. | *Param:* `id` (UUID do laudo) |
| `POST` | `/api/locacao/vistorias/:id/fotos` | Anexa uma foto pericial ao cômodo com carimbo forense e GPS. | *JSON:* `comodoNome`, `imagemBase64`, `gps`, `legenda` |
| `POST` | `/api/locacao/vistorias/:id/assinar` | Registra a assinatura manuscrita touch em tela das partes. | *JSON:* `tipoSignatario`, `meio`, `imagemAssinatura` |
| `POST` | `/api/locacao/vistorias/:id/vistoria-automatica` | Executa a visão computacional IA para pontuação e avarias. | *Vazio* |
| `POST` | `/api/locacao/vistorias/:id/assinar-pades-icp` | Sela o laudo em PDF PAdES A1 com carimbo de tempo RFC 3161. | *Vazio* |
| `GET` | `/api/locacao/vistorias/:id/laudo-pades-icp` | Efetua o download do laudo oficial assinado em PDF. | *Download binário application/pdf* |
| `TRPC` | `construtora.compras.gerarMinutaOperacional` | Redige minuta jurídica inteligente com guardrails IA. | *Object:* `tipo`, `partes`, `valores`, `prazos` |
| `TRPC` | `construtora.compras.aprovarMinutaOperacional` | Homologa formalmente a minuta pela Diretoria Executiva. | *Object:* `minutaId`, `aprovadorNome` |
| `TRPC` | `construtora.compras.assinarMinutaOperacional` | Dispara o fluxo de assinaturas digitais com SHA-256. | *Object:* `minutaId`, `ip`, `protocolo` |

### 7.1 Exemplos Práticos de Invocação via cURL

**1. Consulta de Vistorias em Produção:**
```bash
curl -X GET "https://gamapatrimonial.com.br/api/locacao/vistorias" \
  -H "Authorization: Bearer <TOKEN_DE_SESSAO>" \
  -H "Accept: application/json"
```

**2. Envio de Assinatura Touch em Tela via API:**
```bash
curl -X POST "https://gamapatrimonial.com.br/api/locacao/vistorias/LAUDO-2026-TGA-001/assinar" \
  -H "Authorization: Bearer <TOKEN_DE_SESSAO>" \
  -H "Content-Type: application/json" \
  -d '{
    "tipoSignatario": "locatario",
    "meio": "presencial_no_aparelho",
    "imagemAssinatura": "iVBORw0KGgoAAAANSUhEUgAA..."
  }'
```

---

<div style="page-break-after: always;"></div>

## 8. GUIA RÁPIDO DO OPERADOR E CORRETOR CREDENCIADO

### 8.1 Autenticação Segura no Painel Administrativo

1. Acesse o portal corporativo no navegador seguro (Google Chrome, Safari, Edge):
   [`https://gamapatrimonial.com.br/plataforma/login`](https://gamapatrimonial.com.br/plataforma/login)
2. Digite suas credenciais corporativas credenciadas perante a holding;
3. O sistema autenticará sua sessão e redirecionará automaticamente para o módulo operacional autorizado.

### 8.2 Emissão de Minutas e Gestão da Central de Contratos

1. Acesse a rota [`/plataforma/contratos-minutas`](https://gamapatrimonial.com.br/plataforma/contratos-minutas) no menu superior da plataforma;
2. Selecione o tipo de instrumento desejado:
   - **Locação Residencial com Garantias:** Escolha o modelo `imob_locacao_garantia`, selecione a modalidade de garantia (Caução, Fiança ou Seguro) e defina o valor mensal e o prazo contratual;
   - **Promessa de Compra e Venda:** Escolha o modelo `imob_compra_venda`, preencha o valor total da negociação, as arras confirmatórias de entrada e as parcelas/saldo financiado;
3. Preencha os dados completos do Contratante (Locatário ou Comprador) e do Contratado (Vendedor ou Imobiliária);
4. Clique em **"Gerar Minuta Oficial em 1 Minuto"** para visualizar a redação jurídica parametrizada;
5. Revise o parecer técnico de conformidade gerado pela Inteligência Artificial;
6. O Diretor Executivo aciona o botão **"Aprovar Minuta (Diretoria)"** para autorizar o despacho;
7. Clique em **"Disparar Assinaturas Digitais Automáticas"** para remeter os links criptográficos aos celulares e e-mails de todas as partes intervenientes;
8. Para assinar no ato pelo smartphone presente, clique no botão **"✍️ Assinar no Celular (Touch)"** ao lado do signatário.

### 8.3 Execução de Vistorias de Campo em Dispositivos Móveis (iPhone e Android)

1. No smartphone de campo do vistoriador ou corretor, abra o endereço [`/plataforma/vistorias`](https://gamapatrimonial.com.br/plataforma/vistorias);
2. Clique sobre a vistoria do imóvel agendado para abrir a ficha de vistoria;
3. Para registrar fotos com carimbo pericial forense:
   - Clique em **"📸 Anexar Foto com Câmera"**;
   - Selecione o ambiente a ser inspecionado (ex.: "Sala de Estar", "Cozinha", "Banheiro Social");
   - Defina a tag pericial aplicável (ex.: "Pintura", "Instalação Hidráulica", "Piso Cerâmico");
   - Permita o acesso à câmera e utilize o botão de alternância para o sensor traseiro de alta resolução;
   - Enquadre o elemento periciado e clique em **"🔘 Bater Foto Agora"**;
   - O sistema imprimirá no rodapé da imagem o ID do laudo, data/hora local, coordenadas GPS e hash SHA-256;
   - Clique em **"💾 Salvar Foto no Laudo"**.

### 8.4 Coleta e Validação de Assinaturas Digitais Touch

1. Na seção de **Assinaturas Eletrônicas**, localize a linha do signatário presente (Vistoriador, Locatário ou Locador);
2. Clique no botão dourado **"✍️ Assinar na Tela do Celular (Touch)"**;
3. Entregue o smartphone ou tablet para que o signatário trace sua assinatura manuscrita com o dedo ou caneta stylus no quadro demarcado em dourado;
4. Caso haja erro no traçado, o operador pode clicar em **"🔄 Limpar traço"** e solicitar novo desenho;
5. Com a assinatura perfeitamente legível, clique em **"✓ Confirmar Assinatura Touch"**;
6. O status mudará imediatamente para "✓ Assinado em [Data/Hora] - Certificado Digital Gama Touch", ficando blindado contra qualquer alteração futura;
7. Caso o signatário não esteja presente, utilize o botão verde **"💬 Link WhatsApp"** ou **"📋 Copiar Link"** para enviar a anuência remota.

### 8.5 Resolução de Problemas Frequentes de Campo (Troubleshooting)

**Tabela 9 — Matriz de Resolução de Problemas e Diagnóstico em Dispositivos Móveis**

| Sintoma Observado | Causa Mais Provável | Procedimento de Correção Imediata |
| :--- | :--- | :--- |
| **Câmera ao vivo não abre no iPhone (iOS Safari)** | Permissão de câmera bloqueada pelo Safari ou navegação em aba anônima restritiva. | 1. Clique no ícone 'aA' na barra de endereços do Safari.<br>2. Acesse 'Ajustes do Site' e marque Câmera como 'Permitir'.<br>3. Alternativamente, use o botão '📱 Câmera Smartphone' para acionar o obturador nativo do iOS. |
| **Traço de assinatura touch corta ou desloca a tela** | Gesto de rolagem nativo do smartphone interceptando o canvas. | O componente já possui `touch-action: none`. Caso ocorra, segure o aparelho na orientação vertical e efetue o traço contínuo sem soltar o dedo até o fim do nome. |
| **Coordenadas GPS não aparecem na foto pericial** | Serviços de localização do navegador ou do aparelho desligados. | 1. Ative o GPS nas configurações do smartphone.<br>2. Autorize a plataforma a acessar a localização quando solicitado pelo diálogo do navegador. |
| **Link do WhatsApp não abre no aparelho do cliente** | Bloqueador de pop-ups ou ausência do aplicativo WhatsApp. | 1. Copie o link pelo botão '📋 Copiar Link' e cole manualmente em qualquer mensageiro.<br>2. O link funciona em qualquer navegador mobile moderno. |

---

<div style="page-break-after: always;"></div>

## 9. CONSIDERAÇÕES FINAIS E DIRETRIZES DE CONTINUIDADE OPERACIONAL

A implementação e homologação em produção do ecossistema integrado **Gama Patrimonial × Kytto Enterprise** consolida uma das mais modernas e seguras infraestruturas imobiliárias do Estado de Mato Grosso e do Brasil.

A convergência entre a estrita legalidade imposta pela Lei do Inquilinato (Lei 8.245/1991), Código Civil e ABNT NBR 13.752, aliada à vanguarda tecnológica de câmeras WebRTC periciais, assinaturas touch capacitivas, auditoria de minutas por Inteligência Artificial e Razão Universal ERP idempotente, estabelece um novo paradigma de segurança jurídica, transparência corporativa e eficiência transacional para a **Gama Patrimonial**.

Recomenda-se a revisão semestral deste manual por parte do Comitê de Governança Técnica e a manutenção de rotinas periódicas de simulação e contingência, assegurando a continuidade plena das operações da holding.

---

<div style="page-break-after: always;"></div>

## REFERÊNCIAS NORMATIVAS E BIBLIOGRÁFICAS (ABNT NBR 6023)

1. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 13752:** Perícias de engenharia na construção civil. Rio de Janeiro: ABNT, 1996.
2. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 14724:** Informação e documentação — Trabalhos acadêmicos — Apresentação. Rio de Janeiro: ABNT, 2011.
3. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 6023:** Informação e documentação — Referências — Elaboração. Rio de Janeiro: ABNT, 2018.
4. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 6024:** Informação e documentação — Numeração progressiva das seções de um documento escrito — Apresentação. Rio de Janeiro: ABNT, 2012.
5. ASSOCIAÇÃO BRASILEIRA DE NORMAS TÉCNICAS. **NBR 6027:** Informação e documentação — Sumário — Apresentação. Rio de Janeiro: ABNT, 2012.
6. BRASIL. **Lei nº 8.245, de 18 de outubro de 1991.** Dispõe sobre as locações dos imóveis urbanos e os procedimentos a elas pertinentes. Diário Oficial da União: Brasília, DF, 21 out. 1991. Disponível em: <http://www.planalto.gov.br/ccivil_03/leis/l8245.htm>. Acesso em: 27 nov. 2026.
7. BRASIL. **Lei nº 10.406, de 10 de janeiro de 2002.** Institui o Código Civil. Diário Oficial da União: Brasília, DF, 11 jan. 2002. Disponível em: <http://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm>. Acesso em: 27 nov. 2026.
8. BRASIL. **Lei nº 14.063, de 23 de setembro de 2020.** Dispõe sobre o uso de assinaturas eletrônicas em interações com entes públicos e transações privadas. Diário Oficial da União: Brasília, DF, 24 set. 2020. Disponível em: <http://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14063.htm>. Acesso em: 27 nov. 2026.
9. BRASIL. **Medida Provisória nº 2.200-2, de 24 de agosto de 2001.** Institui a Infra-Estrutura de Chaves Públicas Brasileira - ICP-Brasil. Diário Oficial da União: Brasília, DF, 25 ago. 2001. Disponível em: <http://www.planalto.gov.br/ccivil_03/mpv/2200-2.htm>. Acesso em: 27 nov. 2026.
10. CONSELHO FEDERAL DE CORRETORES DE IMÓVEIS (COFECI). **Resolução COFECI nº 1.065/2007.** Estabelece normas gerais para elaboração de Parecer Técnico de Avaliação Mercadológica - PTAM. Brasília: COFECI, 2007.
11. CONSELHO FEDERAL DE CORRETORES DE IMÓVEIS (COFECI). **Resolução COFECI nº 1.336/2014.** Dispõe sobre os procedimentos e comunicações ao COAF de operações imobiliárias sujeitas a controle. Brasília: COFECI, 2014.
12. INTERNET ENGINEERING TASK FORCE (IETF). **RFC 3161:** Internet X.509 Public Key Infrastructure Time-Stamp Protocol (TSP). Reston: IETF, 2001. Disponível em: <https://www.rfc-editor.org/rfc/rfc3161>. Acesso em: 27 nov. 2026.
13. SCAVONE JÚNIOR, Luiz Antonio. **Direito Imobiliário: Teoria e Prática.** 18. ed. Rio de Janeiro: Forense, 2023.

---

<div style="page-break-after: always;"></div>

## APÊNDICE A — DICIONÁRIO DE DADOS TÉCNICOS E HASHLIST OFICIAL

```
====================================================================================================
                        TRILHA DE AUDITORIA CRIPTOGRÁFICA — SIMULAÇÕES EM PRODUÇÃO
====================================================================================================
Ambiente Operacional: Google Cloud Run (domus-site-00047-5jx) | Região: us-central1
Projeto GCP: kytto-514916 | Domínio Oficial: https://gamapatrimonial.com.br
Data de Execução das Simulações: 27/11/2026 entre 19:40 e 20:30 (Fuso UTC-4 Tangará da Serra - MT)

1. PROCESSO DE LOCAÇÃO RESIDENCIAL (LEI 8.245/1991):
   - ID da Minuta: 7f5bdcfc-6338-4f81-a0a6-1ecf0ce22616
   - URL do Processo: https://gamapatrimonial.com.br/plataforma/contratos-minutas?minutaId=7f5bdcfc-6338-4f81-a0a6-1ecf0ce22616
   - Tipo de Instrumento: imob_locacao_garantia
   - Locatário: Dr. Rodrigo Ribeiro Gonçalves (rodrigo.goncalves@kytto.com.br | CPF 000.000.011-99)
   - Locador: Guilherme Gama (ggamas@gmail.com | CPF 123.456.789-00)
   - Intermediadora: Gama Patrimonial Gestão e Participações Ltda (CRECI-MT J-14280 | CNPJ 52.894.120/0001-44)
   - Valor do Aluguel: R$ 3.800,00 / mês
   - Modalidade de Garantia: Caução em Dinheiro (R$ 11.400,00 - 3 meses de aluguel)
   - Hash SHA-256 do Contrato: e8b4a9c148286a111400d75005c317ad22a00c619cbdf52047ff69dbd3fdf2a1
   - Status da Homologação Executiva: APROVADO pela Diretoria Executiva (CRECI-MT J-14280)
   - Status das Assinaturas: DISPARADO PARA WEBAUTHN / E-MAILS CRIPTOGRÁFICOS / CELULAR TOUCH / WHATSAPP

2. PROCESSO DE PROMESSA DE COMPRA E VENDA (CÓDIGO CIVIL):
   - ID da Minuta: d9a4e211-127b-478a-9a99-88b1ccf77290
   - URL do Processo: https://gamapatrimonial.com.br/plataforma/contratos-minutas?minutaId=d9a4e211-127b-478a-9a99-88b1ccf77290
   - Tipo de Instrumento: imob_compra_venda
   - Promitente Comprador: Dr. Rodrigo Ribeiro Gonçalves (rodrigo.goncalves@kytto.com.br)
   - Promitente Vendedor: Guilherme Gama (ggamas@gmail.com)
   - Intermediadora: Gama Patrimonial Gestão e Participações Ltda (CRECI-MT J-14280)
   - Valor Total do Imóvel: R$ 850.000,00
   - Sinal / Arras Confirmatórias: R$ 170.000,00 (20% à vista)
   - Saldo Financiado / Parcelado: R$ 680.000,00 (80%)
   - Hash SHA-256 do Contrato: 3c91af6d90a78912eeb805373a466fc4938b8120b411d332d966e66bf31b87a0
   - Status da Homologação Executiva: APROVADO pela Diretoria Executiva (CRECI-MT J-14280)
   - Status das Assinaturas: DISPARADO PARA WEBAUTHN / E-MAILS CRIPTOGRÁFICOS / CELULAR TOUCH / WHATSAPP

3. LAUDO DE VISTORIA PERICIAL COM CÂMERA E ASSINATURA TOUCH:
   - ID do Laudo: LAUDO-2026-TGA-001
   - URL da Vistoria: https://gamapatrimonial.com.br/plataforma/vistorias
   - Sensor de Câmera: WebRTC MediaDevices (Sensor Traseiro com Alternância Frontal)
   - Carimbo Pericial Forense: Integrado com Data/Hora UTC-4, GPS Tangará da Serra - MT e Hash SHA-256
   - Assinatura Touch em Tela: Canvas Retina 60 FPS com registro de vetor de traço e carimbo temporal
   - Status: HOMOLOGADO EM PRODUÇÃO NO GOOGLE CLOUD RUN
====================================================================================================
```
