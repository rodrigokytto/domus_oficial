-- ============================================================================
-- GAMA PATRIMONIAL × KYTTO ERP - SCHEMA DDL BACKOFFICE ENTERPRISE
-- ============================================================================
-- Empresa: Gama Patrimonial Gestão e Participações Ltda
-- CNPJ: 52.894.120/0001-44 | CRECI Jurídico: J-14280 MT
-- Sede: Tangará da Serra - MT | Código IBGE: 5107958
-- Origem Arquitetural: Kytto ERP Core (git agro-open / imob_facil)
-- Escopo Exclusivo: Módulos de Backoffice, Financeiro, Fiscal, Carteira e Governança
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- ============================================================================
-- 1. GOVERNANÇA, MULTIEMPRESA & CONTROLE DE ACESSO (RBAC)
-- ============================================================================

CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_fantasia VARCHAR(255) NOT NULL DEFAULT 'Gama Patrimonial',
  razao_social VARCHAR(255) NOT NULL DEFAULT 'Gama Patrimonial Gestão e Participações Ltda',
  cnpj VARCHAR(14) UNIQUE NOT NULL,
  inscricao_estadual VARCHAR(20),
  inscricao_municipal VARCHAR(20),
  creci_juridico VARCHAR(20) NOT NULL DEFAULT 'J-14280 MT',
  codigo_municipio_ibge CHAR(7) NOT NULL DEFAULT '5107958', -- Tangará da Serra - MT
  uf CHAR(2) NOT NULL DEFAULT 'MT',
  endereco_completo JSONB NOT NULL DEFAULT '{
    "logradouro": "Av. Brasil",
    "numero": "500-E",
    "bairro": "Centro",
    "cidade": "Tangará da Serra",
    "estado": "MT",
    "cep": "78300-000"
  }'::jsonb,
  regime_tributario VARCHAR(30) NOT NULL DEFAULT 'lucro_presumido', -- simples, lucro_presumido, lucro_real
  email_contato VARCHAR(255) NOT NULL DEFAULT 'contato@gamapatrimonial.com.br',
  telefone_contato VARCHAR(30) NOT NULL DEFAULT '(65) 99987-1239',
  ativa BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS unidades_negocio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  codigo VARCHAR(30) NOT NULL,
  nome VARCHAR(120) NOT NULL,
  tipo VARCHAR(40) NOT NULL DEFAULT 'imobiliaria', -- 'imobiliaria_sede', 'fazendas_agro', 'consorcios_domus', 'incorporacao'
  ativo BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_unidade_empresa_codigo UNIQUE (empresa_id, codigo)
);

CREATE TABLE IF NOT EXISTS usuarios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  nome_completo VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  cpf VARCHAR(11) UNIQUE,
  creci_fisico VARCHAR(20), -- CRECI individual do corretor
  cargo VARCHAR(100) NOT NULL, -- 'diretor', 'gestor_financeiro', 'corretor', 'auditor_compliance', 'vistoriador'
  role VARCHAR(50) NOT NULL DEFAULT 'corretor',
  senha_hash VARCHAR(255) NOT NULL,
  segundo_fator_ativo BOOLEAN NOT NULL DEFAULT true,
  totp_secret VARCHAR(64),
  ativo BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_usuario_empresa_email UNIQUE (empresa_id, email)
);

CREATE TABLE IF NOT EXISTS perfis_permissoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  modulo VARCHAR(50) NOT NULL, -- 'financeiro', 'repasses', 'fiscal', 'contratos', 'consorcios', 'auditoria'
  pode_ler BOOLEAN NOT NULL DEFAULT true,
  pode_escrever BOOLEAN NOT NULL DEFAULT false,
  pode_excluir BOOLEAN NOT NULL DEFAULT false,
  pode_aprovar_pagamento BOOLEAN NOT NULL DEFAULT false,
  pode_estornar BOOLEAN NOT NULL DEFAULT false,
  pode_emitir_fiscal BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT uq_usuario_modulo UNIQUE (usuario_id, modulo)
);

-- ============================================================================
-- 2. CADASTROS MESTRES DE CONTRAPARTES (CLIENTES, PROPRIETÁRIOS E FORNECEDORES)
-- ============================================================================

CREATE TABLE IF NOT EXISTS contrapartes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  tipo_pessoa VARCHAR(2) NOT NULL DEFAULT 'PF', -- 'PF' ou 'PJ'
  nome_razao VARCHAR(255) NOT NULL,
  nome_fantasia VARCHAR(255),
  documento VARCHAR(18) NOT NULL, -- CPF (11) ou CNPJ (14)
  inscricao_estadual VARCHAR(30),
  rg_ie VARCHAR(30),
  email VARCHAR(320),
  telefone VARCHAR(30) NOT NULL,
  whatsapp VARCHAR(30),
  papel VARCHAR(40) NOT NULL, -- 'proprietario_locador', 'locatario', 'comprador', 'vendedor', 'consorciado', 'fornecedor', 'prestador'
  estado_civil VARCHAR(30),
  conjuge_nome VARCHAR(255),
  conjuge_cpf VARCHAR(11),
  regime_bens VARCHAR(40),
  dados_bancarios_repasse JSONB DEFAULT '{
    "banco": "",
    "agencia": "",
    "conta": "",
    "tipo_conta": "corrente",
    "chave_pix": ""
  }'::jsonb,
  limite_credito NUMERIC(14,2) DEFAULT 0,
  score_credito INTEGER DEFAULT 0,
  restricoes_spc_serasa BOOLEAN DEFAULT false,
  status VARCHAR(20) NOT NULL DEFAULT 'ativo', -- 'ativo', 'suspenso', 'bloqueado'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_contraparte_empresa_doc UNIQUE (empresa_id, documento)
);

-- ============================================================================
-- 3. ERP FINANCEIRO & TESOURARIA (RAZÃO UNIVERSAL KYTTO)
-- ============================================================================

CREATE TABLE IF NOT EXISTS fin_centros_custo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  codigo VARCHAR(30) NOT NULL,
  nome VARCHAR(120) NOT NULL,
  responsavel_id UUID REFERENCES usuarios(id),
  ativo BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_fin_centro_empresa_id UNIQUE (empresa_id, id),
  CONSTRAINT uq_fin_centro_codigo UNIQUE (empresa_id, codigo)
);

CREATE TABLE IF NOT EXISTS fin_plano_contas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  codigo_estruturado VARCHAR(40) NOT NULL, -- Ex: '1.1.01.001', '3.1.02.005'
  nome VARCHAR(120) NOT NULL,
  tipo VARCHAR(10) NOT NULL, -- 'ativo', 'passivo', 'receita', 'despesa'
  natureza VARCHAR(10) NOT NULL, -- 'devedora', 'credora'
  grupo_dre VARCHAR(30) NOT NULL, -- 'receita_bruta', 'deducoes', 'custos_diretos', 'despesas_operacionais', 'despesas_financeiras', 'impostos'
  aceita_lancamento BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_fin_plano_codigo UNIQUE (empresa_id, codigo_estruturado)
);

CREATE TABLE IF NOT EXISTS fin_contas_bancarias (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  codigo_banco VARCHAR(10) NOT NULL, -- '001' (BB), '237' (Bradesco), '341' (Itaú), '748' (Sicredi), '756' (Sicoob)
  nome_instituicao VARCHAR(100) NOT NULL,
  agencia VARCHAR(20) NOT NULL,
  conta_numero VARCHAR(30) NOT NULL,
  tipo_conta VARCHAR(20) NOT NULL DEFAULT 'corrente', -- 'corrente', 'poupanca', 'aplicacao_liquidez', 'conta_garantida'
  saldo_atual NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  data_ultimo_saldo DATE NOT NULL DEFAULT CURRENT_DATE,
  ativa BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS fin_lancamentos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  unidade_id UUID REFERENCES unidades_negocio(id),
  conta_bancaria_id UUID REFERENCES fin_contas_bancarias(id),
  plano_contas_id UUID NOT NULL REFERENCES fin_plano_contas(id),
  centro_custo_id UUID NOT NULL REFERENCES fin_centros_custo(id),
  contraparte_id UUID REFERENCES contrapartes(id),
  tipo VARCHAR(10) NOT NULL, -- 'receita' ou 'despesa'
  natureza VARCHAR(15) NOT NULL, -- 'pagar', 'receber', 'avulso'
  descricao VARCHAR(255) NOT NULL,
  valor_nominal NUMERIC(14,2) NOT NULL CHECK (valor_nominal > 0),
  valor_juros NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  valor_multa NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  valor_desconto NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  valor_efetivo NUMERIC(14,2) GENERATED ALWAYS AS (valor_nominal + valor_juros + valor_multa - valor_desconto) STORED,
  data_competencia DATE NOT NULL,
  data_vencimento DATE NOT NULL,
  data_liquidacao TIMESTAMPTZ,
  meio_liquidacao VARCHAR(30), -- 'pix', 'ted', 'boleto_bancario', 'debito_conta', 'compensacao_repasse'
  status VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'pendente', 'liquidado', 'cancelado', 'estornado'
  chave_idempotencia VARCHAR(200) NOT NULL, -- Evita duplicidade transacional
  numero_documento VARCHAR(80),
  numero_parcela SMALLINT DEFAULT 1,
  total_parcelas SMALLINT DEFAULT 1,
  serie_recorrencia_id UUID,
  origem_modulo VARCHAR(40) NOT NULL DEFAULT 'manual', -- 'imob_aluguel', 'imob_repasse', 'imob_comissao', 'consorcio_fat', 'nfs_impostos'
  origem_id UUID, -- Chave externa do módulo originador
  estorno_de_id UUID REFERENCES fin_lancamentos(id),
  criado_por UUID REFERENCES usuarios(id),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  atualizado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_fin_lanc_empresa_chave UNIQUE (empresa_id, chave_idempotencia)
);
CREATE INDEX idx_fin_lanc_vencimento ON fin_lancamentos (empresa_id, data_vencimento, status);
CREATE INDEX idx_fin_lanc_competencia ON fin_lancamentos (empresa_id, data_competencia);

CREATE TABLE IF NOT EXISTS fin_conciliacoes_extrato (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conta_bancaria_id UUID NOT NULL REFERENCES fin_contas_bancarias(id) ON DELETE CASCADE,
  lancamento_id UUID REFERENCES fin_lancamentos(id),
  data_movimento DATE NOT NULL,
  fitid_ofx VARCHAR(100),
  descricao_extrato VARCHAR(255) NOT NULL,
  valor NUMERIC(14,2) NOT NULL,
  tipo_dc CHAR(1) NOT NULL, -- 'C' (Crédito) ou 'D' (Débito)
  status_conciliacao VARCHAR(20) NOT NULL DEFAULT 'pendente', -- 'conciliado', 'divergente', 'manual'
  conciliado_por UUID REFERENCES usuarios(id),
  conciliado_em TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS fin_fechamentos_periodo (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  ano_mes CHAR(7) NOT NULL, -- '2026-11'
  total_receita_bruta NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  total_deducoes_impostos NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  total_repasses_proprietarios NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  total_comissoes_corretores NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  total_despesas_operacionais NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  resultado_liquido_dre NUMERIC(14,2) NOT NULL DEFAULT 0.00,
  totais_consolidados JSONB NOT NULL DEFAULT '{}'::jsonb,
  fechado_por UUID NOT NULL REFERENCES usuarios(id),
  data_fechamento TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_fin_fechamento_mes UNIQUE (empresa_id, ano_mes)
);

-- ============================================================================
-- 4. BACKOFFICE IMOBILIÁRIO & CARTEIRA (CONTRATOS, REPASSES E COMISSÕES GAMA)
-- ============================================================================

CREATE TABLE IF NOT EXISTS imob_imoveis_patrimonio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  codigo_referencia VARCHAR(30) NOT NULL, -- Ex: 'GAMA-FAZ-001', 'GAMA-RES-045'
  proprietario_id UUID NOT NULL REFERENCES contrapartes(id),
  finalidade VARCHAR(20) NOT NULL, -- 'venda', 'locacao', 'ambos'
  tipo_imovel VARCHAR(50) NOT NULL, -- 'casa_condominio', 'apartamento_luxo', 'fazenda_agro', 'sala_comercial'
  titulo VARCHAR(255) NOT NULL,
  cidade VARCHAR(100) NOT NULL DEFAULT 'Tangará da Serra',
  uf CHAR(2) NOT NULL DEFAULT 'MT',
  area_total_m2 NUMERIC(14,2) NOT NULL,
  area_util_m2 NUMERIC(14,2),
  valor_pretendido_venda NUMERIC(14,2),
  valor_pretendido_locacao NUMERIC(14,2),
  valor_iptu_mensal NUMERIC(14,2) DEFAULT 0.00,
  valor_condominio NUMERIC(14,2) DEFAULT 0.00,
  status_disponibilidade VARCHAR(20) NOT NULL DEFAULT 'disponivel', -- 'disponivel', 'em_negociacao', 'locado', 'vendido'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_imovel_referencia UNIQUE (empresa_id, codigo_referencia)
);

CREATE TABLE IF NOT EXISTS imob_contratos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  imovel_id UUID NOT NULL REFERENCES imob_imoveis_patrimonio(id),
  locador_vendedor_id UUID NOT NULL REFERENCES contrapartes(id),
  locatario_comprador_id UUID NOT NULL REFERENCES contrapartes(id),
  corretor_responsavel_id UUID NOT NULL REFERENCES usuarios(id),
  tipo_contrato VARCHAR(30) NOT NULL, -- 'locacao_residencial', 'locacao_comercial', 'compra_venda_promessa', 'arrendamento_agro'
  numero_contrato VARCHAR(50) NOT NULL,
  data_inicio DATE NOT NULL,
  data_termino DATE,
  dia_vencimento_aluguel SMALLINT DEFAULT 10,
  valor_contrato NUMERIC(14,2) NOT NULL,
  taxa_administracao_perc NUMERIC(5,2) NOT NULL DEFAULT 10.00, -- 8% a 10% padrão Gama
  tipo_garantia VARCHAR(40) NOT NULL DEFAULT 'caucao_financeiro', -- 'caucao_financeiro', 'seguro_fianca', 'fiador', 'titulo_capitalizacao'
  valor_garantia_caucao NUMERIC(14,2) DEFAULT 0.00,
  status VARCHAR(20) NOT NULL DEFAULT 'ativo', -- 'ativo', 'encerrado', 'rescindido', 'juridico'
  documento_minuta_assinado_url TEXT,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_contrato_numero UNIQUE (empresa_id, numero_contrato)
);

CREATE TABLE IF NOT EXISTS imob_repasses_locacao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  contrato_id UUID NOT NULL REFERENCES imob_contratos(id) ON DELETE CASCADE,
  mes_competencia CHAR(7) NOT NULL, -- '2026-11'
  data_cobranca DATE NOT NULL,
  valor_aluguel_bruto NUMERIC(14,2) NOT NULL,
  valor_iptu NUMERIC(14,2) DEFAULT 0.00,
  valor_condominio NUMERIC(14,2) DEFAULT 0.00,
  taxa_administracao_retida NUMERIC(14,2) NOT NULL, -- Receita da Gama Patrimonial
  retencao_irrf NUMERIC(14,2) DEFAULT 0.00, -- Para a DIMOB / Carnê Leão
  deducoes_manutencao NUMERIC(14,2) DEFAULT 0.00,
  valor_liquido_repasse NUMERIC(14,2) NOT NULL, -- Valor que vai para o proprietário
  data_prevista_repasse DATE NOT NULL,
  data_efetiva_repasse TIMESTAMPTZ,
  lancamento_financeiro_id UUID REFERENCES fin_lancamentos(id),
  status VARCHAR(20) NOT NULL DEFAULT 'pendente_cobranca', -- 'pendente_cobranca', 'recebido_locatario', 'repassado', 'inadimplente'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_repasse_contrato_mes UNIQUE (contrato_id, mes_competencia)
);

CREATE TABLE IF NOT EXISTS imob_comissoes_corretagem (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  contrato_id UUID NOT NULL REFERENCES imob_contratos(id) ON DELETE CASCADE,
  corretor_id UUID NOT NULL REFERENCES usuarios(id),
  tipo_operacao VARCHAR(20) NOT NULL, -- 'venda', 'locacao_taxa_primeiro_aluguel', 'consorcio'
  valor_base_operacao NUMERIC(14,2) NOT NULL,
  perc_honorarios_total NUMERIC(5,2) NOT NULL DEFAULT 6.00, -- Padrão CRECI-MT 6%
  valor_honorarios_gama NUMERIC(14,2) NOT NULL,
  perc_comissao_corretor NUMERIC(5,2) NOT NULL DEFAULT 40.00, -- 40% a 50% para o corretor
  valor_liquido_corretor NUMERIC(14,2) NOT NULL,
  data_previsao_pagamento DATE NOT NULL,
  data_liquidacao TIMESTAMPTZ,
  lancamento_financeiro_id UUID REFERENCES fin_lancamentos(id),
  status VARCHAR(20) NOT NULL DEFAULT 'a_pagar', -- 'a_pagar', 'pago', 'cancelado'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS imob_vistorias_digitais (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  contrato_id UUID NOT NULL REFERENCES imob_contratos(id) ON DELETE CASCADE,
  tipo_vistoria VARCHAR(20) NOT NULL, -- 'entrada', 'saida', 'constatacao'
  data_vistoria DATE NOT NULL,
  vistoriador_id UUID NOT NULL REFERENCES usuarios(id),
  resumo_comodos JSONB NOT NULL,
  fotos_hash_sha256 TEXT[] NOT NULL,
  assinatura_vistoriador_base64 TEXT,
  assinatura_cliente_base64 TEXT,
  ip_assinatura VARCHAR(45),
  laudo_pdf_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'concluida',
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. BACKOFFICE DE CONSÓRCIOS & CRÉDITO (DOMUS CONSÓRCIOS × GAMA)
-- ============================================================================

CREATE TABLE IF NOT EXISTS consorcio_administradoras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nome_administradora VARCHAR(100) NOT NULL, -- 'Porto Seguro', 'Rodobens', 'Itaú', 'Embracon'
  cnpj VARCHAR(14) NOT NULL,
  registro_bacen VARCHAR(30) NOT NULL,
  perc_comissao_padrao NUMERIC(5,2) NOT NULL DEFAULT 4.00, -- Comissão de faturamento
  ativa BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS consorcio_cotas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  administradora_id UUID NOT NULL REFERENCES consorcio_administradoras(id),
  cliente_id UUID NOT NULL REFERENCES contrapartes(id),
  consultor_id UUID NOT NULL REFERENCES usuarios(id),
  segmento VARCHAR(30) NOT NULL, -- 'imovel', 'agro_maquinas', 'pesados', 'veiculos'
  grupo VARCHAR(20) NOT NULL,
  cota VARCHAR(20) NOT NULL,
  credito_nominal NUMERIC(14,2) NOT NULL,
  taxa_administracao_total NUMERIC(5,2) NOT NULL,
  fundo_reserva NUMERIC(5,2) NOT NULL DEFAULT 2.00,
  prazo_meses SMALLINT NOT NULL,
  parcela_mensal NUMERIC(14,2) NOT NULL,
  status_cota VARCHAR(30) NOT NULL DEFAULT 'ativa', -- 'ativa', 'contemplada_lance', 'contemplada_sorteio', 'cancelada'
  data_contemplacao DATE,
  valor_lance_ofertado NUMERIC(14,2),
  tipo_lance VARCHAR(20), -- 'livre', 'embutido', 'fidelidade'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_consorcio_grupo_cota UNIQUE (administradora_id, grupo, cota)
);

CREATE TABLE IF NOT EXISTS consorcio_comissoes_faturamento (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  cota_id UUID NOT NULL REFERENCES consorcio_cotas(id) ON DELETE CASCADE,
  consultor_id UUID NOT NULL REFERENCES usuarios(id),
  valor_credito NUMERIC(14,2) NOT NULL,
  perc_recebimento_gama NUMERIC(5,2) NOT NULL,
  valor_comissao_gama NUMERIC(14,2) NOT NULL,
  perc_repasse_consultor NUMERIC(5,2) NOT NULL DEFAULT 50.00,
  valor_repasse_consultor NUMERIC(14,2) NOT NULL,
  numero_parcela_comissao SMALLINT NOT NULL DEFAULT 1,
  total_parcelas_comissao SMALLINT NOT NULL DEFAULT 1,
  data_vencimento_comissao DATE NOT NULL,
  data_recebimento_gama TIMESTAMPTZ,
  data_pagamento_consultor TIMESTAMPTZ,
  lancamento_financeiro_id UUID REFERENCES fin_lancamentos(id),
  status VARCHAR(20) NOT NULL DEFAULT 'aguardando_faturamento'
);

-- ============================================================================
-- 6. MÓDULO FISCAL, TRIBUTÁRIO NACIONAL & DIMOB
-- ============================================================================

CREATE TABLE IF NOT EXISTS fis_certificados_a1 (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  titular VARCHAR(255) NOT NULL,
  cnpj VARCHAR(14) NOT NULL,
  valido_de TIMESTAMPTZ NOT NULL,
  valido_ate TIMESTAMPTZ NOT NULL,
  impressao_digital CHAR(64) NOT NULL,
  pfx_cifrado_aes256 TEXT NOT NULL, -- PFX criptografado em repouso
  senha_cifrada_aes256 TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_fis_cert_ativo UNIQUE (empresa_id, ativo)
);

CREATE TABLE IF NOT EXISTS fis_emitentes_servico (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  cnpj VARCHAR(14) NOT NULL DEFAULT '52894120000144',
  razao_social VARCHAR(255) NOT NULL DEFAULT 'Gama Patrimonial Gestão e Participações Ltda',
  inscricao_municipal VARCHAR(30) NOT NULL,
  codigo_municipio_ibge CHAR(7) NOT NULL DEFAULT '5107958', -- Tangará da Serra
  cnae_principal CHAR(7) NOT NULL DEFAULT '6821801', -- Intermediação na compra, venda e locação de imóveis
  regime_especial_tributacao VARCHAR(20) DEFAULT 'nenhum',
  aliquota_iss_padrao NUMERIC(5,2) NOT NULL DEFAULT 5.00, -- 5% em Tangará da Serra
  provedor_nfse VARCHAR(30) NOT NULL DEFAULT 'padrao_nacional', -- 'padrao_nacional', 'betha', 'equiplano'
  ativo BOOLEAN NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS fis_nfse_emitidas (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  contrato_id UUID REFERENCES imob_contratos(id),
  tomador_id UUID NOT NULL REFERENCES contrapartes(id),
  numero_nfse BIGINT NOT NULL,
  codigo_verificacao VARCHAR(50) NOT NULL,
  serie VARCHAR(10) NOT NULL DEFAULT 'E',
  data_emissao TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  discriminacao_servicos TEXT NOT NULL,
  valor_servicos NUMERIC(14,2) NOT NULL,
  base_calculo NUMERIC(14,2) NOT NULL,
  aliquota_iss NUMERIC(5,2) NOT NULL DEFAULT 5.00,
  valor_iss NUMERIC(14,2) NOT NULL,
  retencao_iss BOOLEAN NOT NULL DEFAULT false,
  valor_pis NUMERIC(14,2) DEFAULT 0.00,
  valor_cofins NUMERIC(14,2) DEFAULT 0.00,
  valor_csll NUMERIC(14,2) DEFAULT 0.00,
  valor_irrf NUMERIC(14,2) DEFAULT 0.00,
  valor_liquido_nfse NUMERIC(14,2) NOT NULL,
  xml_assinado_url TEXT,
  danfse_pdf_url TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'autorizada', -- 'autorizada', 'cancelada', 'substituida'
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT uq_nfse_numero UNIQUE (empresa_id, serie, numero_nfse)
);

CREATE TABLE IF NOT EXISTS fis_dimob_declaracoes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  ano_calendario SMALLINT NOT NULL, -- Ex: 2026
  tipo_declaracao VARCHAR(20) NOT NULL DEFAULT 'original', -- 'original' ou 'retificadora'
  recibo_entrega_receita VARCHAR(60),
  data_transmissao TIMESTAMPTZ,
  total_operacoes_locacao INTEGER NOT NULL DEFAULT 0,
  total_operacoes_venda INTEGER NOT NULL DEFAULT 0,
  total_valor_intermediado NUMERIC(16,2) NOT NULL DEFAULT 0.00,
  total_comissao_recebida NUMERIC(16,2) NOT NULL DEFAULT 0.00,
  arquivo_gerado_dimob TEXT,
  status VARCHAR(20) NOT NULL DEFAULT 'rascunho', -- 'rascunho', 'validada', 'transmitida'
  CONSTRAINT uq_dimob_ano_empresa UNIQUE (empresa_id, ano_calendario, tipo_declaracao)
);

CREATE TABLE IF NOT EXISTS fis_dimob_registros_locacao (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  declaracao_id UUID NOT NULL REFERENCES fis_dimob_declaracoes(id) ON DELETE CASCADE,
  contrato_id UUID NOT NULL REFERENCES imob_contratos(id),
  proprietario_cpf_cnpj VARCHAR(14) NOT NULL,
  proprietario_nome VARCHAR(255) NOT NULL,
  locatario_cpf_cnpj VARCHAR(14) NOT NULL,
  locatario_nome VARCHAR(255) NOT NULL,
  codigo_imovel_ref VARCHAR(30) NOT NULL,
  valor_aluguel_anual NUMERIC(14,2) NOT NULL,
  valor_comissao_anual NUMERIC(14,2) NOT NULL,
  valor_imposto_retido_anual NUMERIC(14,2) NOT NULL DEFAULT 0.00
);

-- Suporte à Reforma Tributária Nacional (Emenda Constitucional 132/2023 - IBS / CBS)
CREATE TABLE IF NOT EXISTS fis_classificacao_ibs_cbs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  operacao_tipo VARCHAR(40) NOT NULL, -- 'intermediacao_venda', 'administracao_locacao', 'taxa_consorcio'
  cst_ibscbs CHAR(3) NOT NULL, -- Código de Situação Tributária IBS/CBS
  c_class_trib CHAR(6) NOT NULL, -- Código de Classificação Tributária da Reforma
  aliquota_ibs NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  aliquota_cbs NUMERIC(5,2) NOT NULL DEFAULT 0.00,
  descricao_enquadramento TEXT NOT NULL,
  vigencia_inicio DATE NOT NULL DEFAULT '2026-01-01',
  CONSTRAINT uq_fis_operacao_reforma UNIQUE (empresa_id, operacao_tipo)
);

-- ============================================================================
-- 7. AUDITORIA IMUTÁVEL, COMPLIANCE COAF & SEGURANÇA ENTERPRISE
-- ============================================================================

CREATE TABLE IF NOT EXISTS auditoria_trilha_imutavel (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  tabela_afetada VARCHAR(80) NOT NULL,
  registro_id UUID NOT NULL,
  acao VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  usuario_id UUID REFERENCES usuarios(id),
  payload_anterior JSONB,
  payload_novo JSONB,
  ip_origem VARCHAR(45) NOT NULL,
  user_agent TEXT,
  hash_integridade_sha256 CHAR(64) NOT NULL,
  criado_em TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_auditoria_registro ON auditoria_trilha_imutavel (tabela_afetada, registro_id);
CREATE INDEX idx_auditoria_data ON auditoria_trilha_imutavel (criado_em DESC);

CREATE TABLE IF NOT EXISTS compliance_coaf_diligencia (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  empresa_id UUID NOT NULL REFERENCES empresas(id) ON DELETE CASCADE,
  contrato_id UUID NOT NULL REFERENCES imob_contratos(id),
  cliente_id UUID NOT NULL REFERENCES contrapartes(id),
  valor_total_operacao NUMERIC(14,2) NOT NULL,
  forma_pagamento_identificada VARCHAR(40) NOT NULL, -- 'dinheiro_especie', 'ted_pix', 'consorcio', 'permuta'
  alerta_coaf_gatilho BOOLEAN NOT NULL DEFAULT false, -- Acima de R$ 100.000 em espécie ou inconsistência cadastral
  motivo_gatilho TEXT,
  parecer_compliance_interno TEXT NOT NULL,
  status_comunicacao_coaf VARCHAR(30) NOT NULL DEFAULT 'dispensado', -- 'dispensado', 'em_analise', 'comunicado_siscoaf'
  numero_protocolo_siscoaf VARCHAR(60),
  analisado_por UUID NOT NULL REFERENCES usuarios(id),
  data_analise TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
