-- ==============================================================================
-- SCRIPT DE CRIAÇÃO E CONFIGURAÇÃO DO USUÁRIO MULTIPERFIL DOMUS
-- Usuário: ggamas@gmail.com
-- Perfis: Corretor, Cliente, Vendedor e Gerente Geral
-- Senha de Acesso: #231215Verdao
-- ==============================================================================

BEGIN;

-- 1. Criação / Extensão da tabela de usuários com suporte a múltiplos perfis (JSONB / Array)
CREATE TABLE IF NOT EXISTS public.domus_usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf_cnpj VARCHAR(30),
    telefone VARCHAR(30),
    creci VARCHAR(50),
    senha_hash TEXT NOT NULL,
    perfis TEXT[] NOT NULL DEFAULT '{"corretor","cliente","vendedor","gerente"}',
    perfil_ativo VARCHAR(50) NOT NULL DEFAULT 'gerente',
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    segundo_fator_ativo BOOLEAN NOT NULL DEFAULT FALSE,
    dados_extras JSONB DEFAULT '{}'::jsonb,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Inserção ou atualização idempotente do usuário ggamas@gmail.com
-- A senha '#231215Verdao' pode ser validada pelo frontend/backend scrypt/bcrypt ou conferida diretamente
INSERT INTO public.domus_usuarios (
    email,
    nome,
    cpf_cnpj,
    telefone,
    creci,
    senha_hash,
    perfis,
    perfil_ativo,
    ativo,
    segundo_fator_ativo,
    dados_extras
) VALUES (
    'ggamas@gmail.com',
    'G. Gamas (Domus Multiperfil)',
    '028.914.731-00',
    '(65) 99641-0000',
    'CRECI-MT 14.821-F',
    -- Hash compatível ou valor de conferência criptográfica para #231215Verdao
    crypt('#231215Verdao', gen_salt('bf', 10)),
    ARRAY['corretor', 'cliente', 'vendedor', 'gerente'],
    'gerente',
    TRUE,
    FALSE,
    jsonb_build_object(
        'imobiliaria', 'Gama Patrimonial & Domus Inteligência',
        'cidade', 'Tangará da Serra',
        'uf', 'MT',
        'comissaoPadraoPct', 6.0,
        'carteiraAtiva', true,
        'limiteAprovacaoProposta', 5000000.00
    )
)
ON CONFLICT (email) DO UPDATE SET
    perfis = EXCLUDED.perfis,
    perfil_ativo = EXCLUDED.perfil_ativo,
    ativo = TRUE,
    atualizado_em = NOW();

-- 3. Integração com Schema de Pessoas (se disponível em arquitetura monorepo / ImobFacil)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'pessoas') THEN
        -- Insere ou atualiza em pessoas.pessoa
        INSERT INTO pessoas.pessoa (id, tenant_id, tipo, nome, documento)
        SELECT 
            'b1000000-0000-4000-8000-000000000001'::uuid,
            COALESCE((SELECT id FROM core.tenants LIMIT 1), gen_random_uuid()),
            'PF',
            'G. Gamas',
            '028.914.731-00'
        ON CONFLICT DO NOTHING;

        -- Insere contato de e-mail
        INSERT INTO pessoas.contato (tenant_id, pessoa_id, tipo, valor)
        SELECT 
            (SELECT tenant_id FROM pessoas.pessoa WHERE documento = '028.914.731-00' LIMIT 1),
            (SELECT id FROM pessoas.pessoa WHERE documento = '028.914.731-00' LIMIT 1),
            'email',
            'ggamas@gmail.com'
        ON CONFLICT DO NOTHING;

        -- Vincula como Corretor Parceiro
        INSERT INTO pessoas.vinculo (tenant_id, pessoa_id, empresa_id, papel)
        SELECT 
            p.tenant_id,
            p.id,
            COALESCE((SELECT id FROM core.empresas LIMIT 1), gen_random_uuid()),
            'corretor_parceiro'
        FROM pessoas.pessoa p WHERE p.documento = '028.914.731-00'
        ON CONFLICT DO NOTHING;

        -- Vincula como Cliente
        INSERT INTO pessoas.vinculo (tenant_id, pessoa_id, empresa_id, papel)
        SELECT 
            p.tenant_id,
            p.id,
            COALESCE((SELECT id FROM core.empresas LIMIT 1), gen_random_uuid()),
            'cliente'
        FROM pessoas.pessoa p WHERE p.documento = '028.914.731-00'
        ON CONFLICT DO NOTHING;

        -- Vincula como Proprietário (Vendedor)
        INSERT INTO pessoas.vinculo (tenant_id, pessoa_id, empresa_id, papel)
        SELECT 
            p.tenant_id,
            p.id,
            COALESCE((SELECT id FROM core.empresas LIMIT 1), gen_random_uuid()),
            'proprietario'
        FROM pessoas.pessoa p WHERE p.documento = '028.914.731-00'
        ON CONFLICT DO NOTHING;
    END IF;
END $$;

COMMIT;

-- Consulta de verificação
SELECT id, email, nome, perfis, perfil_ativo, ativo, criado_em 
FROM public.domus_usuarios 
WHERE email = 'ggamas@gmail.com';
