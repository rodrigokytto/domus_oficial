export interface ParcelaFinanciamento {
  mes: number;
  prestacao: number;
  amortizacao: number;
  juros: number;
  saldoDevedor: number;
}

export interface ResultadoFinanciamento {
  valorImovel: number;
  valorEntrada: number;
  valorFinanciado: number;
  prazoMeses: number;
  taxaJurosAnualPct: number;
  taxaJurosMensalPct: number;
  sistema: "SAC" | "PRICE";
  primeiraParcela: number;
  ultimaParcela: number;
  totalAmortizado: number;
  totalJuros: number;
  custoTotal: number;
  cronograma: ParcelaFinanciamento[];
}

export function simularFinanciamento({
  valorImovel,
  valorEntrada,
  prazoMeses,
  taxaJurosAnualPct = 10.5,
  sistema = "SAC",
}: {
  valorImovel: number;
  valorEntrada: number;
  prazoMeses: number;
  taxaJurosAnualPct?: number;
  sistema?: "SAC" | "PRICE";
}): ResultadoFinanciamento {
  const valorFinanciado = Math.max(0, valorImovel - valorEntrada);
  const taxaMensal = Math.pow(1 + taxaJurosAnualPct / 100, 1 / 12) - 1;

  const cronograma: ParcelaFinanciamento[] = [];
  let saldoDevedor = valorFinanciado;
  let totalJuros = 0;
  let primeiraParcela = 0;
  let ultimaParcela = 0;

  if (sistema === "SAC") {
    const amortizacaoConstante = valorFinanciado / prazoMeses;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      const jurosMes = saldoDevedor * taxaMensal;
      const prestacao = amortizacaoConstante + jurosMes;
      saldoDevedor = Math.max(0, saldoDevedor - amortizacaoConstante);
      totalJuros += jurosMes;

      if (mes === 1) primeiraParcela = prestacao;
      if (mes === prazoMeses) ultimaParcela = prestacao;

      if (mes <= 12 || mes % 12 === 0 || mes === prazoMeses) {
        cronograma.push({
          mes,
          prestacao,
          amortizacao: amortizacaoConstante,
          juros: jurosMes,
          saldoDevedor,
        });
      }
    }
  } else {
    // PRICE
    const f = Math.pow(1 + taxaMensal, prazoMeses);
    const prestacaoFixa = (valorFinanciado * (taxaMensal * f)) / (f - 1);
    primeiraParcela = prestacaoFixa;
    ultimaParcela = prestacaoFixa;

    for (let mes = 1; mes <= prazoMeses; mes++) {
      const jurosMes = saldoDevedor * taxaMensal;
      const amortizacao = prestacaoFixa - jurosMes;
      saldoDevedor = Math.max(0, saldoDevedor - amortizacao);
      totalJuros += jurosMes;

      if (mes <= 12 || mes % 12 === 0 || mes === prazoMeses) {
        cronograma.push({
          mes,
          prestacao: prestacaoFixa,
          amortizacao,
          juros: jurosMes,
          saldoDevedor,
        });
      }
    }
  }

  return {
    valorImovel,
    valorEntrada,
    valorFinanciado,
    prazoMeses,
    taxaJurosAnualPct,
    taxaJurosMensalPct: taxaMensal * 100,
    sistema,
    primeiraParcela,
    ultimaParcela,
    totalAmortizado: valorFinanciado,
    totalJuros,
    custoTotal: valorEntrada + valorFinanciado + totalJuros,
    cronograma,
  };
}
