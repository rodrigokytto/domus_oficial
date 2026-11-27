import { describe, it, expect } from "vitest";
import {
  calcularRepasseLocacao,
  calcularSplitComissao,
  calcularDreConsolidado,
  gerarChaveIdempotencia,
  consolidarRegistrosDimob,
} from "../src/lib/motorBackoffice";
import type { LancamentoFinanceiro, RepasseLocacao } from "../src/types/backoffice";

describe("Motor de Backoffice ERP Gama × Kytto", () => {
  it("deve calcular repasse líquido do locador com retenção correta de taxa de administração e IRRF", () => {
    // Aluguel R$ 12.500, taxa adm 10%, sem manutenções, IRRF 27.5%
    const repasse = calcularRepasseLocacao(12500, 10, 0, 27.5);

    // Taxa ADM: 12500 * 10% = 1250
    expect(repasse.taxaAdmValor).toBe(1250);
    // IRRF retido: 12500 * 27.5% = 3437.5
    expect(repasse.retencaoIrrf).toBe(3437.5);
    // Repasse: 12500 - 1250 - 3437.5 = 7812.5
    expect(repasse.valorLiquidoRepasse).toBe(7812.5);
  });

  it("deve calcular split de comissões imobiliárias entre corretor e imobiliária Gama", () => {
    // Venda de R$ 12.000.000, 5% comissão total, split 50% corretor
    const split = calcularSplitComissao(12000000, 5, 50);

    expect(split.valorHonorariosTotal).toBe(600000);
    expect(split.valorCorretorLiquido).toBe(300000);
    expect(split.valorGamaLiquido).toBe(300000);
    expect(split.valorCorretorLiquido + split.valorGamaLiquido).toBe(split.valorHonorariosTotal);
  });

  it("deve gerar chave de idempotência determinística e única por payload no padrão Kytto", () => {
    const chave1 = gerarChaveIdempotencia("GAMA", "locacao_repasse", "REP-001", "2026-11");
    const chave2 = gerarChaveIdempotencia("GAMA", "locacao_repasse", "REP-001", "2026-11");
    const chave3 = gerarChaveIdempotencia("GAMA", "locacao_repasse", "REP-002", "2026-11");

    expect(chave1).toBe(chave2);
    expect(chave1).not.toBe(chave3);
    expect(chave1).toBe("fin:gama:locacao_repasse:rep-001:2026-11");
  });

  it("deve calcular DRE consolidado com receitas, custos operacionais e resultado líquido", () => {
    const lancamentos: LancamentoFinanceiro[] = [
      {
        id: "1",
        descricao: "Taxa adm locação Bellagio",
        tipo: "receita",
        natureza: "receber",
        centroCusto: "LOCACAO",
        contaBancaria: "Sicredi Principal",
        contraparteNome: "Dr. Marcos Vinicius",
        contraparteDoc: "123.456.789-00",
        valorNominal: 1250,
        valorEncargos: 0,
        valorDesconto: 0,
        valorEfetivo: 1250,
        dataCompetencia: "2026-11-01",
        dataVencimento: "2026-11-05",
        dataLiquidacao: "2026-11-05",
        meioLiquidacao: "pix",
        status: "liquidado",
        origemModulo: "imob_aluguel",
        chaveIdempotencia: "fin:gama:loc:001",
      },
      {
        id: "2",
        descricao: "Honorários venda Fazenda Três Pontes",
        tipo: "receita",
        natureza: "receber",
        centroCusto: "VENDAS",
        contaBancaria: "Banco do Brasil Agro",
        contraparteNome: "Grupo Agropecuário MT",
        contraparteDoc: "11.222.333/0001-44",
        valorNominal: 300000,
        valorEncargos: 0,
        valorDesconto: 0,
        valorEfetivo: 300000,
        dataCompetencia: "2026-11-01",
        dataVencimento: "2026-11-10",
        dataLiquidacao: "2026-11-10",
        meioLiquidacao: "ted",
        status: "liquidado",
        origemModulo: "imob_comissao",
        chaveIdempotencia: "fin:gama:vnd:042",
      },
      {
        id: "3",
        descricao: "Software ERP Kytto e Servidores",
        tipo: "despesa",
        natureza: "pagar",
        centroCusto: "ADMINISTRATIVO",
        contaBancaria: "Sicredi Principal",
        contraparteNome: "Kytto Cloud",
        contraparteDoc: "55.666.777/0001-88",
        valorNominal: 25000,
        valorEncargos: 0,
        valorDesconto: 0,
        valorEfetivo: 25000,
        dataCompetencia: "2026-11-01",
        dataVencimento: "2026-11-10",
        dataLiquidacao: "2026-11-10",
        meioLiquidacao: "pix",
        status: "liquidado",
        origemModulo: "manual",
        chaveIdempotencia: "fin:gama:op:101",
      },
    ];

    const dre = calcularDreConsolidado(lancamentos);

    expect(dre.receitaBruta).toBe(301250);
    expect(dre.despesasOperacionais).toBe(25000);
    expect(dre.resultadoLiquidoDRE).toBeGreaterThan(0);
    expect(dre.margemLiquidaPerc).toBeGreaterThan(70);
  });

  it("deve consolidar registros anuais para a DIMOB da Receita Federal", () => {
    const repasses: RepasseLocacao[] = [
      {
        id: "1",
        contratoNumero: "LOC-2026-001",
        imovelTitulo: "Bellagio Executive",
        locadorNome: "DR. MARCOS VINICIUS",
        locadorCpfCnpj: "123.456.789-00",
        locadorChavePix: "marcos@email.com",
        locatarioNome: "ENG. EDUARDO COSTA",
        mesCompetencia: "2026-10",
        aluguelBruto: 12500,
        taxaAdmValor: 1250,
        taxaAdmPerc: 10,
        retencaoIrrf: 3437.5,
        deducoesManutencao: 0,
        valorLiquidoRepasse: 7812.5,
        dataVencimentoAluguel: "2026-10-10",
        dataPrevistaRepasse: "2026-10-15",
        status: "repassado_proprietario",
        dataLiquidacaoRepasse: "2026-10-15",
      },
      {
        id: "2",
        contratoNumero: "LOC-2026-001",
        imovelTitulo: "Bellagio Executive",
        locadorNome: "DR. MARCOS VINICIUS",
        locadorCpfCnpj: "123.456.789-00",
        locadorChavePix: "marcos@email.com",
        locatarioNome: "ENG. EDUARDO COSTA",
        mesCompetencia: "2026-11",
        aluguelBruto: 12500,
        taxaAdmValor: 1250,
        taxaAdmPerc: 10,
        retencaoIrrf: 3437.5,
        deducoesManutencao: 0,
        valorLiquidoRepasse: 7812.5,
        dataVencimentoAluguel: "2026-11-10",
        dataPrevistaRepasse: "2026-11-15",
        status: "repassado_proprietario",
        dataLiquidacaoRepasse: "2026-11-15",
      },
    ];

    const dimob = consolidarRegistrosDimob(repasses);

    expect(dimob.length).toBe(1);
    expect(dimob[0].contratoNumero).toBe("LOC-2026-001");
    expect(dimob[0].valorAluguelAnual).toBe(25000);
    expect(dimob[0].valorComissaoAnual).toBe(2500);
    expect(dimob[0].valorIrrfAnual).toBe(6875);
    expect(dimob[0].mesesVigencia).toBe(2);
    expect(dimob[0].statusReceita).toBe("pronto_transmissao");
  });
});
