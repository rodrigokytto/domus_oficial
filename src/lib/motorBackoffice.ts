// Motor de Cálculos de Backoffice ERP - Gama Patrimonial & Kytto ERP

import type { LancamentoFinanceiro, RepasseLocacao, ComissaoFechamento, RegistroDimob } from "../types/backoffice";

/**
 * Calcula os valores de um repasse de aluguel:
 * Taxa de administração retida pela Gama (ex: 10%),
 * Dedução do Carnê-Leão / IRRF retido,
 * Despesas de manutenção autorizadas e
 * Valor líquido final creditado ao proprietário locador.
 */
export function calcularRepasseLocacao(
  aluguelBruto: number,
  taxaAdmPerc: number = 10,
  deducoesManutencao: number = 0,
  aliquotaIrrfPerc: number = 0
): {
  taxaAdmValor: number;
  retencaoIrrf: number;
  valorLiquidoRepasse: number;
} {
  const taxaAdmValor = Number(((aluguelBruto * taxaAdmPerc) / 100).toFixed(2));
  const retencaoIrrf = Number(((aluguelBruto * aliquotaIrrfPerc) / 100).toFixed(2));
  const valorLiquidoRepasse = Number(
    (aluguelBruto - taxaAdmValor - retencaoIrrf - deducoesManutencao).toFixed(2)
  );

  return {
    taxaAdmValor,
    retencaoIrrf,
    valorLiquidoRepasse: Math.max(0, valorLiquidoRepasse),
  };
}

/**
 * Calcula o split de comissões de fechamento de venda ou locação:
 * Honorários totais (ex: 6% CRECI-MT),
 * Divisão entre imobiliária Gama e Corretor credenciado (ex: 50%/50% ou 60%/40%).
 */
export function calcularSplitComissao(
  valorBaseOperacao: number,
  honorariosTotalPerc: number = 6,
  splitCorretorPerc: number = 50
): {
  valorHonorariosTotal: number;
  valorCorretorLiquido: number;
  valorGamaLiquido: number;
} {
  const valorHonorariosTotal = Number(
    ((valorBaseOperacao * honorariosTotalPerc) / 100).toFixed(2)
  );
  const valorCorretorLiquido = Number(
    ((valorHonorariosTotal * splitCorretorPerc) / 100).toFixed(2)
  );
  const valorGamaLiquido = Number(
    (valorHonorariosTotal - valorCorretorLiquido).toFixed(2)
  );

  return {
    valorHonorariosTotal,
    valorCorretorLiquido,
    valorGamaLiquido,
  };
}

/**
 * Gera uma chave única e determinística de idempotência (Padrão Kytto Razão Universal).
 * Impede que a mesma cobrança, repasse ou comissão seja liquidada ou lançada duplamente.
 */
export function gerarChaveIdempotencia(
  empresa: string,
  modulo: string,
  idOrigem: string,
  competenciaOuParcela: string
): string {
  const sanitize = (str: string) => str.toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  return `fin:${sanitize(empresa)}:${sanitize(modulo)}:${sanitize(idOrigem)}:${sanitize(competenciaOuParcela)}`;
}

/**
 * Consolida o DRE Gerencial em tempo real a partir dos lançamentos liquidados e provisionados.
 */
export function calcularDreConsolidado(lancamentos: LancamentoFinanceiro[]): {
  receitaBruta: number;
  deducoesImpostos: number;
  receitaLiquida: number;
  custosServicosERepasses: number;
  lucroBruto: number;
  despesasOperacionais: number;
  resultadoLiquidoDRE: number;
  margemLiquidaPerc: number;
} {
  let receitaBruta = 0;
  let deducoesImpostos = 0;
  let custosServicosERepasses = 0;
  let despesasOperacionais = 0;

  for (const l of lancamentos) {
    if (l.status === "cancelado" || l.status === "estornado") continue;

    if (l.tipo === "receita") {
      receitaBruta += l.valorEfetivo;
    } else if (l.tipo === "despesa") {
      if (l.centroCusto === "ADMINISTRATIVO") {
        despesasOperacionais += l.valorEfetivo;
      } else if (l.origemModulo === "imob_repasse" || l.origemModulo === "imob_comissao") {
        custosServicosERepasses += l.valorEfetivo;
      } else {
        despesasOperacionais += l.valorEfetivo;
      }
    }
  }

  // Dedução estimada de impostos (ISS 5% Tangará da Serra + PIS/COFINS/CSLL ~ 11.33% Lucro Presumido)
  deducoesImpostos = Number((receitaBruta * 0.1133).toFixed(2));
  const receitaLiquida = Number((receitaBruta - deducoesImpostos).toFixed(2));
  const lucroBruto = Number((receitaLiquida - custosServicosERepasses).toFixed(2));
  const resultadoLiquidoDRE = Number((lucroBruto - despesasOperacionais).toFixed(2));
  const margemLiquidaPerc =
    receitaBruta > 0 ? Number(((resultadoLiquidoDRE / receitaBruta) * 100).toFixed(1)) : 0;

  return {
    receitaBruta: Number(receitaBruta.toFixed(2)),
    deducoesImpostos,
    receitaLiquida,
    custosServicosERepasses: Number(custosServicosERepasses.toFixed(2)),
    lucroBruto,
    despesasOperacionais: Number(despesasOperacionais.toFixed(2)),
    resultadoLiquidoDRE,
    margemLiquidaPerc,
  };
}

/**
 * Agrupa os repasses de locação e gera os registros anuais padronizados para a DIMOB (Receita Federal).
 */
export function consolidarRegistrosDimob(repasses: RepasseLocacao[]): RegistroDimob[] {
  const mapa = new Map<string, RegistroDimob>();

  for (const r of repasses) {
    const chave = `${r.contratoNumero}_${r.locadorCpfCnpj}_${r.locatarioNome}`;
    if (!mapa.has(chave)) {
      mapa.set(chave, {
        id: `dimob_${r.contratoNumero}`,
        contratoNumero: r.contratoNumero,
        imovelCodigo: `IMO-${r.contratoNumero.slice(-3)}`,
        locadorCpfCnpj: r.locadorCpfCnpj,
        locadorNome: r.locadorNome,
        locatarioCpfCnpj: "000.000.000-00", // Anonimizado em visualização
        locatarioNome: r.locatarioNome,
        valorAluguelAnual: 0,
        valorComissaoAnual: 0,
        valorIrrfAnual: 0,
        mesesVigencia: 0,
        statusReceita: "pronto_transmissao",
      });
    }

    const reg = mapa.get(chave)!;
    reg.valorAluguelAnual += r.aluguelBruto;
    reg.valorComissaoAnual += r.taxaAdmValor;
    reg.valorIrrfAnual += r.retencaoIrrf;
    reg.mesesVigencia += 1;
  }

  return Array.from(mapa.values()).map((reg) => ({
    ...reg,
    valorAluguelAnual: Number(reg.valorAluguelAnual.toFixed(2)),
    valorComissaoAnual: Number(reg.valorComissaoAnual.toFixed(2)),
    valorIrrfAnual: Number(reg.valorIrrfAnual.toFixed(2)),
  }));
}
