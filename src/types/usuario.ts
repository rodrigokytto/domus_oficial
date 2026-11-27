// Definições de Tipos para Usuários e Perfis da Plataforma Domus / Gama Patrimonial

export type PerfilUsuario = "corretor" | "cliente" | "vendedor" | "gerente";

export interface PermissaoModulo {
  modulo: string;
  podeLer: boolean;
  podeGravar: boolean;
  podeAprovar: boolean;
}

export interface UsuarioDomus {
  id: string;
  email: string;
  nome: string;
  cargo: string;
  creci?: string;
  telefone?: string;
  avatar?: string;
  perfis: PerfilUsuario[];
  perfilAtivo: PerfilUsuario;
  ativo: boolean;
  criadoEm: string;
  ultimoAcesso?: string;
  doisFatoresAtivo: boolean;
  permissoes: PermissaoModulo[];
  detalhesPerfis: {
    corretor?: {
      creci: string;
      metaMensal: number;
      comissaoPadraoPerc: number;
      clientesAtivos: number;
    };
    cliente?: {
      preferencia: string;
      faixaOrcamento: string;
      imoveisSalvos: number;
      simulacoesRealizadas: number;
    };
    vendedor?: {
      imoveisCadastrados: number;
      totalVgvAnunciado: number;
      propostasRecebidas: number;
      chavePixRepasse: string;
    };
    gerente?: {
      departamento: string;
      alcadaAprovacaoMax: number;
      equipeSupervisionada: number;
    };
  };
}

export interface CredenciaisLogin {
  email: string;
  senha: string;
}

export interface RespostaAutenticacao {
  sucesso: boolean;
  usuario?: UsuarioDomus;
  token?: string;
  mensagem?: string;
}
