// Tipos do Backoffice ERP Gama Patrimonial (derivados do Kytto ERP Core)

export type TipoLancamento = "receita" | "despesa";
export type NaturezaLancamento = "pagar" | "receber" | "avulso";
export type StatusLancamento = "pendente" | "liquidado" | "cancelado" | "estornado";

export interface LancamentoFinanceiro {
  id: string;
  descricao: string;
  tipo: TipoLancamento;
  natureza: NaturezaLancamento;
  centroCusto: "LOCACAO" | "VENDAS" | "AGRO_MT" | "CONSORCIOS" | "ADMINISTRATIVO";
  contaBancaria: string;
  contraparteNome: string;
  contraparteDoc: string;
  valorNominal: number;
  valorEncargos: number;
  valorDesconto: number;
  valorEfetivo: number;
  dataCompetencia: string; // YYYY-MM-DD
  dataVencimento: string; // YYYY-MM-DD
  dataLiquidacao?: string;
  meioLiquidacao?: "pix" | "ted" | "boleto" | "compensacao";
  status: StatusLancamento;
  chaveIdempotencia: string;
  numeroDocumento?: string;
  origemModulo: "imob_aluguel" | "imob_repasse" | "imob_comissao" | "consorcio_fat" | "manual";
}

export interface ContaBancaria {
  id: string;
  bancoNome: string;
  codigoBanco: string;
  agencia: string;
  conta: string;
  saldo: number;
  tipo: "corrente" | "aplicacao";
  conciliada: boolean;
}

export interface RepasseLocacao {
  id: string;
  contratoNumero: string;
  imovelTitulo: string;
  locadorNome: string;
  locadorCpfCnpj: string;
  locadorChavePix: string;
  locatarioNome: string;
  mesCompetencia: string;
  aluguelBruto: number;
  taxaAdmPerc: number;
  taxaAdmValor: number; // Receita Gama
  retencaoIrrf: number; // Para DIMOB
  deducoesManutencao: number;
  valorLiquidoRepasse: number;
  dataVencimentoAluguel: string;
  dataPrevistaRepasse: string;
  status: "pendente_cobranca" | "recebido_locatario" | "repassado_proprietario";
  dataLiquidacaoRepasse?: string;
}

export interface ComissaoFechamento {
  id: string;
  contratoNumero: string;
  imovelTitulo: string;
  tipoOperacao: "venda" | "locacao_primeiro_aluguel" | "consorcio";
  valorBase: number;
  honorariosTotalPerc: number;
  valorHonorariosTotal: number;
  corretorNome: string;
  corretorCreci: string;
  splitCorretorPerc: number;
  valorCorretorLiquido: number;
  valorGamaLiquido: number;
  dataPrevisao: string;
  status: "a_pagar" | "liquidado";
}

export interface RegistroDimob {
  id: string;
  contratoNumero: string;
  imovelCodigo: string;
  locadorCpfCnpj: string;
  locadorNome: string;
  locatarioCpfCnpj: string;
  locatarioNome: string;
  valorAluguelAnual: number;
  valorComissaoAnual: number;
  valorIrrfAnual: number;
  mesesVigencia: number;
  statusReceita: "pronto_transmissao" | "validado";
}

export interface NfseEmitida {
  id: string;
  numeroNfse: number;
  codigoVerificacao: string;
  tomadorNome: string;
  tomadorCpfCnpj: string;
  descricaoServico: string;
  valorServicos: number;
  aliquotaIss: number;
  valorIss: number;
  retencoesFederais: number;
  valorLiquido: number;
  dataEmissao: string;
  linkDanfse: string;
  status: "autorizada" | "cancelada";
}

export interface LogAuditoria {
  id: string;
  tabela: string;
  registroId: string;
  acao: "INSERT" | "UPDATE" | "DELETE";
  usuarioNome: string;
  descricao: string;
  hashSha256: string;
  timestamp: string;
}
