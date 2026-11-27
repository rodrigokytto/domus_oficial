import type { UsuarioDomus, PerfilUsuario, CredenciaisLogin, RespostaAutenticacao } from "../types/usuario";

const CHAVE_STORAGE_SESSAO = "domus_usuario_sessao";
const CHAVE_STORAGE_USERS = "domus_usuarios_cadastrados";

// Usuário executivo oficial: rodrigo.goncalves@kytto.com.br (Dr. Rodrigo Ribeiro Gonçalves)
export const USUARIO_OFICIAL_RODRIGO: UsuarioDomus = {
  id: "usr_rodrigo_goncalves_kytto",
  email: "rodrigo.goncalves@kytto.com.br",
  nome: "Dr. Rodrigo Ribeiro Gonçalves",
  cargo: "Diretor Executivo & Responsável Técnico (CRECI J-14280 MT)",
  creci: "CRECI J-14280 MT",
  telefone: "(65) 99902-5800",
  perfis: ["gerente", "corretor", "vendedor", "cliente"],
  perfilAtivo: "gerente",
  ativo: true,
  criadoEm: "2026-11-27T12:00:00Z",
  ultimoAcesso: new Date().toISOString(),
  doisFatoresAtivo: true,
  permissoes: [
    { modulo: "hoje", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "imoveis", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "crm", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "vistorias", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "contratos", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "financeiro", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "repasses", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "fiscal", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "consorcios", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "compliance", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "agenda", podeLer: true, podeGravar: true, podeAprovar: true },
  ],
  detalhesPerfis: {
    gerente: {
      departamento: "Diretoria Executiva & Gestão Patrimonial Gama",
      alcadaAprovacaoMax: 50000000.0,
      equipeSupervisionada: 24,
    },
    corretor: {
      creci: "CRECI J-14280 MT",
      metaMensal: 5000000.0,
      comissaoPadraoPerc: 50.0,
      clientesAtivos: 35,
    },
    vendedor: {
      imoveisCadastrados: 12,
      totalVgvAnunciado: 45000000.0,
      propostasRecebidas: 8,
      chavePixRepasse: "rodrigo.goncalves@kytto.com.br",
    },
    cliente: {
      preferencia: "Ativos Alto Padrão, Fazendas MT & Consórcios Estruturados",
      faixaOrcamento: "R$ 2.5M - R$ 15.0M",
      imoveisSalvos: 14,
      simulacoesRealizadas: 20,
    },
  },
};

// Usuário oficial solicitado: ggamas@gmail.com com senha #231215Verdao e todos os 4 perfis
export const USUARIO_OFICIAL_GGAMAS: UsuarioDomus = {
  id: "usr_ggamas_20261127",
  email: "ggamas@gmail.com",
  nome: "G. Gamas",
  cargo: "Executivo Multiperfil (Gerente, Corretor, Vendedor e Cliente)",
  creci: "CRECI 14280-MT",
  telefone: "(65) 99902-5800",
  perfis: ["corretor", "cliente", "vendedor", "gerente"],
  perfilAtivo: "gerente",
  ativo: true,
  criadoEm: "2026-11-27T12:00:00Z",
  ultimoAcesso: new Date().toISOString(),
  doisFatoresAtivo: true,
  permissoes: [
    { modulo: "hoje", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "imoveis", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "crm", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "vistorias", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "contratos", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "financeiro", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "repasses", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "fiscal", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "consorcios", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "compliance", podeLer: true, podeGravar: true, podeAprovar: true },
    { modulo: "agenda", podeLer: true, podeGravar: true, podeAprovar: true },
  ],
  detalhesPerfis: {
    gerente: {
      departamento: "Diretoria de Operações & Gestão Financeira",
      alcadaAprovacaoMax: 5000000.0,
      equipeSupervisionada: 12,
    },
    corretor: {
      creci: "CRECI J-14280 / PF 8921-MT",
      metaMensal: 1500000.0,
      comissaoPadraoPerc: 50.0,
      clientesAtivos: 18,
    },
    vendedor: {
      imoveisCadastrados: 4,
      totalVgvAnunciado: 9800000.0,
      propostasRecebidas: 3,
      chavePixRepasse: "ggamas@gmail.com",
    },
    cliente: {
      preferencia: "Imóveis de Alto Padrão & Consórcios Agro",
      faixaOrcamento: "R$ 1.5M - R$ 4.5M",
      imoveisSalvos: 6,
      simulacoesRealizadas: 9,
    },
  },
};

// Senha oficial cadastrada
const SENHA_OFICIAL_GGAMAS = "#231215Verdao";

export function rotuloPerfil(perfil: PerfilUsuario): string {
  switch (perfil) {
    case "gerente":
      return "Gerente Geral";
    case "corretor":
      return "Corretor Credenciado";
    case "vendedor":
      return "Vendedor / Proprietário";
    case "cliente":
      return "Cliente / Investidor";
    default:
      return perfil;
  }
}

export function descricaoPerfil(perfil: PerfilUsuario): string {
  switch (perfil) {
    case "gerente":
      return "Visão executiva 360°, aprovação de propostas, DRE, conciliação e compliance";
    case "corretor":
      return "Gestão de carteira, envio de lâminas PDF WhatsApp, comissões e funil de vendas";
    case "vendedor":
      return "Meus imóveis anunciados, propostas recebidas de compradores e extrato de repasses";
    case "cliente":
      return "Vitrine de ativos favoritos, simulações de financiamento, consórcios e propostas";
    default:
      return "";
  }
}

export function badgeCorPerfil(perfil: PerfilUsuario): { bg: string; texto: string; borda: string } {
  switch (perfil) {
    case "gerente":
      return { bg: "rgba(198, 161, 91, 0.2)", texto: "#C6A15B", borda: "#C6A15B" };
    case "corretor":
      return { bg: "rgba(16, 185, 129, 0.15)", texto: "#10b981", borda: "#10b981" };
    case "vendedor":
      return { bg: "rgba(59, 130, 246, 0.15)", texto: "#3b82f6", borda: "#3b82f6" };
    case "cliente":
      return { bg: "rgba(168, 85, 247, 0.15)", texto: "#a855f7", borda: "#a855f7" };
  }
}

export function secoesPermitidasPorPerfil(perfil: PerfilUsuario): string[] {
  switch (perfil) {
    case "gerente":
      return [
        "hoje",
        "imoveis",
        "crm",
        "vistorias",
        "contratos",
        "financeiro",
        "repasses",
        "fiscal",
        "consorcios",
        "compliance",
        "agenda",
      ];
    case "corretor":
      return ["hoje", "imoveis", "crm", "vistorias", "consorcios", "repasses", "agenda"];
    case "vendedor":
      return ["hoje", "imoveis", "contratos", "repasses", "vistorias"];
    case "cliente":
      return ["hoje", "imoveis", "consorcios", "vistorias"];
    default:
      return ["hoje", "imoveis"];
  }
}

export function autenticarUsuario(credenciais: CredenciaisLogin): RespostaAutenticacao {
  const emailNorm = credenciais.email.trim().toLowerCase();
  const senhaInformada = credenciais.senha.trim();

  if (
    (emailNorm === "rodrigo.goncalves@kytto.com.br" || emailNorm === "rodrigo@kytto.com.br") &&
    senhaInformada === SENHA_OFICIAL_GGAMAS
  ) {
    const usuarioLogado: UsuarioDomus = {
      ...USUARIO_OFICIAL_RODRIGO,
      ultimoAcesso: new Date().toISOString(),
    };
    salvarSessao(usuarioLogado);
    return {
      sucesso: true,
      usuario: usuarioLogado,
      token: `dms_tk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    };
  }

  if (emailNorm === "ggamas@gmail.com" && senhaInformada === SENHA_OFICIAL_GGAMAS) {
    const usuarioLogado: UsuarioDomus = {
      ...USUARIO_OFICIAL_GGAMAS,
      ultimoAcesso: new Date().toISOString(),
    };
    salvarSessao(usuarioLogado);
    return {
      sucesso: true,
      usuario: usuarioLogado,
      token: `dms_tk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    };
  }

  // Permite também se estiver salvo no storage local
  if (typeof window !== "undefined") {
    try {
      const extra = localStorage.getItem(CHAVE_STORAGE_USERS);
      if (extra) {
        const salvos = JSON.parse(extra) as Record<string, { senha: string; usuario: UsuarioDomus }>;
        if (salvos[emailNorm] && salvos[emailNorm].senha === senhaInformada) {
          const u = salvos[emailNorm].usuario;
          salvarSessao(u);
          return {
            sucesso: true,
            usuario: u,
            token: `dms_tk_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
          };
        }
      }
    } catch {
      // Ignora erro de storage
    }
  }

  return {
    sucesso: false,
    mensagem: "E-mail ou senha incorretos. Para o usuário ggamas@gmail.com, confira a senha definida.",
  };
}

export function obterSessao(): UsuarioDomus | null {
  if (typeof window === "undefined") {
    return USUARIO_OFICIAL_RODRIGO;
  }
  try {
    const salva = localStorage.getItem(CHAVE_STORAGE_SESSAO);
    if (salva) {
      return JSON.parse(salva) as UsuarioDomus;
    }
  } catch {
    // fallback
  }
  // Retorna o usuário oficial padrão ativo por padrão
  return USUARIO_OFICIAL_RODRIGO;
}

export function salvarSessao(usuario: UsuarioDomus): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CHAVE_STORAGE_SESSAO, JSON.stringify(usuario));
    } catch {
      // Sem storage
    }
  }
}

export function alternarPerfilAtivo(novoPerfil: PerfilUsuario): UsuarioDomus {
  const usuario = obterSessao() ?? USUARIO_OFICIAL_GGAMAS;
  if (!usuario.perfis.includes(novoPerfil)) {
    throw new Error(`O usuário não possui o perfil ${novoPerfil}`);
  }
  const atualizado: UsuarioDomus = {
    ...usuario,
    perfilAtivo: novoPerfil,
  };
  salvarSessao(atualizado);
  return atualizado;
}

export function encerrarSessao(): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem(CHAVE_STORAGE_SESSAO);
    } catch {
      // Sem storage
    }
  }
}
