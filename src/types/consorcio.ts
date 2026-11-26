export type CategoriaConsorcio =
  | "imobiliario"
  | "veiculo_leve"
  | "pesados_agro"
  | "servicos"
  | "carta_contemplada";

export type AdministradoraConsorcio =
  | "porto_seguro"
  | "caixa_consorcios"
  | "rodobens"
  | "embracon"
  | "santander"
  | "itau"
  | "bb_consorcios"
  | "magalu"
  | "yamaha"
  | "randon";

export interface RegraAdministradora {
  id: AdministradoraConsorcio;
  nome: string;
  logoUrl?: string;
  taxaAdmMediaPct: number;
  fundoReservaPct: number;
  seguroVidaMensalPct: number;
  permiteLanceEmbutido: boolean;
  maxLanceEmbutidoPct: number;
  prazosDisponiveis: number[];
  categoriasAtendidas: CategoriaConsorcio[];
}

export interface SimulacaoEntrada {
  categoria: CategoriaConsorcio;
  valorCredito: number;
  prazoMeses: number;
  modalidadeParcela?: "integral" | "reduzida_70" | "reduzida_50";
  administradoraSugerida?: AdministradoraConsorcio;
}

export interface SimulacaoResultado {
  valorCredito: number;
  prazoMeses: number;
  categoria: CategoriaConsorcio;
  taxaAdmTotalPct: number;
  fundoReservaPct: number;
  taxaAdmMensalPct: number;
  parcelaIntegralMensal: number;
  parcelaReduzidaMensal?: number;
  custoTotalConsorcio: number;
  comparativoFinanciamento: {
    taxaJurosAnualEstimadaPct: number;
    parcelaInicialFinanciamento: number;
    parcelaFinalFinanciamento: number;
    custoTotalFinanciamento: number;
    economiaConsorcioValor: number;
    economiaConsorcioPercentual: number;
  };
  lanceEmbutidoMaximo: {
    permite: boolean;
    percentualMaximo: number;
    valorMaximoLance: number;
    creditoLiquidoRecebido: number;
  };
}

export interface CartaContemplada {
  id: string;
  codigo: string;
  categoria: CategoriaConsorcio;
  administradora: AdministradoraConsorcio;
  valorCredito: number;
  valorEntradaAgio: number;
  saldoDevedor: number;
  parcelasRestantes: number;
  valorParcelaMensal: number;
  status: "disponivel" | "reservada" | "vendida";
  destaque: boolean;
  observacoes?: string;
}

export interface LeadConsorcio {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  cidade: string;
  uf: string;
  categoriaDesejada: CategoriaConsorcio;
  valorCreditoAlvo: number;
  prazoPreferencialMeses: number;
  temValorParaLance: boolean;
  valorLanceEstimado?: number;
  desejaUsarFgts?: boolean;
  etapaFunil:
    | "novo_lead"
    | "simulacao_enviada"
    | "analise_perfil"
    | "proposta_elaborada"
    | "fechamento_aguardando"
    | "cota_ativa"
    | "contemplado";
  criadoEm: string;
  atualizadoEm: string;
  atendenteResponsavel?: string;
}
