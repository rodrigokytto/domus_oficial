import type {
  AdministradoraConsorcio,
  CategoriaConsorcio,
  RegraAdministradora,
  SimulacaoEntrada,
  SimulacaoResultado,
} from "../types/consorcio";

export const TABELAS_ADMINISTRADORAS: Record<AdministradoraConsorcio, RegraAdministradora> = {
  porto_seguro: {
    id: "porto_seguro",
    nome: "Porto Seguro Consórcios",
    taxaAdmMediaPct: 18.0,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.038,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 90, 120, 150, 180, 200],
    categoriasAtendidas: ["imobiliario", "veiculo_leve", "servicos"],
  },
  caixa_consorcios: {
    id: "caixa_consorcios",
    nome: "Caixa Consórcios",
    taxaAdmMediaPct: 16.0,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.035,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [120, 150, 180, 200, 240],
    categoriasAtendidas: ["imobiliario", "pesados_agro"],
  },
  rodobens: {
    id: "rodobens",
    nome: "Rodobens Consórcios",
    taxaAdmMediaPct: 17.5,
    fundoReservaPct: 2.5,
    seguroVidaMensalPct: 0.040,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 84, 100, 120, 180],
    categoriasAtendidas: ["imobiliario", "veiculo_leve", "pesados_agro"],
  },
  embracon: {
    id: "embracon",
    nome: "Embracon Consórcios",
    taxaAdmMediaPct: 19.0,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.042,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 25.0,
    prazosDisponiveis: [48, 60, 80, 100, 180],
    categoriasAtendidas: ["imobiliario", "veiculo_leve", "servicos"],
  },
  santander: {
    id: "santander",
    nome: "Santander Consórcios",
    taxaAdmMediaPct: 17.0,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.039,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 84, 120, 180, 220],
    categoriasAtendidas: ["imobiliario", "veiculo_leve"],
  },
  itau: {
    id: "itau",
    nome: "Itaú Consórcios",
    taxaAdmMediaPct: 17.0,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.038,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 84, 120, 180],
    categoriasAtendidas: ["imobiliario", "veiculo_leve"],
  },
  bb_consorcios: {
    id: "bb_consorcios",
    nome: "BB Consórcios (Banco do Brasil)",
    taxaAdmMediaPct: 16.5,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.036,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 100, 120, 180, 200],
    categoriasAtendidas: ["imobiliario", "pesados_agro", "veiculo_leve"],
  },
  magalu: {
    id: "magalu",
    nome: "Consórcio Magalu",
    taxaAdmMediaPct: 18.5,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.040,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 25.0,
    prazosDisponiveis: [36, 48, 60, 80, 100],
    categoriasAtendidas: ["veiculo_leve", "servicos"],
  },
  yamaha: {
    id: "yamaha",
    nome: "Consórcio Yamaha",
    taxaAdmMediaPct: 19.5,
    fundoReservaPct: 3.0,
    seguroVidaMensalPct: 0.045,
    permiteLanceEmbutido: false,
    maxLanceEmbutidoPct: 0,
    prazosDisponiveis: [36, 48, 60, 72],
    categoriasAtendidas: ["veiculo_leve"],
  },
  randon: {
    id: "randon",
    nome: "Randon Consórcios",
    taxaAdmMediaPct: 15.5,
    fundoReservaPct: 2.0,
    seguroVidaMensalPct: 0.035,
    permiteLanceEmbutido: true,
    maxLanceEmbutidoPct: 30.0,
    prazosDisponiveis: [60, 84, 100, 120],
    categoriasAtendidas: ["pesados_agro"],
  },
};

export const TAXAS_PADRAO_CATEGORIA: Record<
  CategoriaConsorcio,
  { taxaAdm: number; prazoMax: number; jurosFinanciamentoAnual: number }
> = {
  imobiliario: { taxaAdm: 17.0, prazoMax: 240, jurosFinanciamentoAnual: 11.5 },
  veiculo_leve: { taxaAdm: 18.0, prazoMax: 100, jurosFinanciamentoAnual: 18.5 },
  pesados_agro: { taxaAdm: 16.0, prazoMax: 120, jurosFinanciamentoAnual: 15.0 },
  servicos: { taxaAdm: 19.0, prazoMax: 48, jurosFinanciamentoAnual: 24.0 },
  carta_contemplada: { taxaAdm: 17.0, prazoMax: 180, jurosFinanciamentoAnual: 12.0 },
};

/**
 * Calcula a simulação completa de um consórcio e o comparativo de economia
 * contra o financiamento bancário tradicional de mercado.
 */
export function calcularSimulacaoConsorcio(entrada: SimulacaoEntrada): SimulacaoResultado {
  const { categoria, valorCredito, prazoMeses, modalidadeParcela = "integral", administradoraSugerida } = entrada;

  const regraAdmin = administradoraSugerida ? TABELAS_ADMINISTRADORAS[administradoraSugerida] : null;
  const padrao = TAXAS_PADRAO_CATEGORIA[categoria];

  const taxaAdmTotalPct = regraAdmin?.taxaAdmMediaPct ?? padrao.taxaAdm;
  const fundoReservaPct = regraAdmin?.fundoReservaPct ?? 2.0;
  const seguroMensalPct = regraAdmin?.seguroVidaMensalPct ?? 0.038;

  // No consórcio, o custo total é: Fundo Comum (100%) + Taxa de Administração + Fundo de Reserva + Seguro
  const percentualTotal = 100 + taxaAdmTotalPct + fundoReservaPct;
  const montanteTotalBase = valorCredito * (percentualTotal / 100);
  const parcelaBaseMensal = montanteTotalBase / prazoMeses;
  const valorSeguroMensal = valorCredito * (seguroMensalPct / 100);

  const parcelaIntegralMensal = parcelaBaseMensal + valorSeguroMensal;
  const custoTotalConsorcio = parcelaIntegralMensal * prazoMeses;
  const taxaAdmMensalPct = taxaAdmTotalPct / prazoMeses;

  // Modalidade de parcela reduzida até a contemplação
  let parcelaReduzidaMensal: number | undefined;
  if (modalidadeParcela === "reduzida_70") {
    parcelaReduzidaMensal = parcelaIntegralMensal * 0.7;
  } else if (modalidadeParcela === "reduzida_50") {
    parcelaReduzidaMensal = parcelaIntegralMensal * 0.5;
  }

  // Comparativo com Financiamento Bancário (Tabela SAC / PRICE)
  const taxaJurosAnualEstimadaPct = padrao.jurosFinanciamentoAnual;
  const taxaJurosMensal = Math.pow(1 + taxaJurosAnualEstimadaPct / 100, 1 / 12) - 1;

  // Simulação Financiamento pela Tabela PRICE (parcela fixa) para comparação de CET
  const fatorPrice =
    (Math.pow(1 + taxaJurosMensal, prazoMeses) * taxaJurosMensal) /
    (Math.pow(1 + taxaJurosMensal, prazoMeses) - 1);
  const parcelaInicialFinanciamento = valorCredito * fatorPrice;
  const parcelaFinalFinanciamento = parcelaInicialFinanciamento;
  const custoTotalFinanciamento = parcelaInicialFinanciamento * prazoMeses;

  const economiaConsorcioValor = Math.max(0, custoTotalFinanciamento - custoTotalConsorcio);
  const economiaConsorcioPercentual = (economiaConsorcioValor / custoTotalFinanciamento) * 100;

  // Lance Embutido
  const permiteLanceEmbutido = regraAdmin ? regraAdmin.permiteLanceEmbutido : true;
  const percentualMaxLance = regraAdmin ? regraAdmin.maxLanceEmbutidoPct : 30.0;
  const valorMaximoLance = permiteLanceEmbutido ? valorCredito * (percentualMaxLance / 100) : 0;
  const creditoLiquidoRecebido = valorCredito - valorMaximoLance;

  return {
    valorCredito,
    prazoMeses,
    categoria,
    taxaAdmTotalPct,
    fundoReservaPct,
    taxaAdmMensalPct: Number(taxaAdmMensalPct.toFixed(4)),
    parcelaIntegralMensal: Math.round(parcelaIntegralMensal * 100) / 100,
    parcelaReduzidaMensal: parcelaReduzidaMensal ? Math.round(parcelaReduzidaMensal * 100) / 100 : undefined,
    custoTotalConsorcio: Math.round(custoTotalConsorcio * 100) / 100,
    comparativoFinanciamento: {
      taxaJurosAnualEstimadaPct,
      parcelaInicialFinanciamento: Math.round(parcelaInicialFinanciamento * 100) / 100,
      parcelaFinalFinanciamento: Math.round(parcelaFinalFinanciamento * 100) / 100,
      custoTotalFinanciamento: Math.round(custoTotalFinanciamento * 100) / 100,
      economiaConsorcioValor: Math.round(economiaConsorcioValor * 100) / 100,
      economiaConsorcioPercentual: Number(economiaConsorcioPercentual.toFixed(2)),
    },
    lanceEmbutidoMaximo: {
      permite: permiteLanceEmbutido,
      percentualMaximo: percentualMaxLance,
      valorMaximoLance: Math.round(valorMaximoLance * 100) / 100,
      creditoLiquidoRecebido: Math.round(creditoLiquidoRecebido * 100) / 100,
    },
  };
}

/** Formata valor numérico como moeda corrente nacional BRL. */
export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

/** Formata percentual padrão brasileiro. */
export function formatarPercentual(pct: number, decimais = 2): string {
  return `${pct.toFixed(decimais).replace(".", ",")}%`;
}
