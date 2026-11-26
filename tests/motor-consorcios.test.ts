import { describe, expect, it } from "vitest";
import {
  calcularSimulacaoConsorcio,
  formatarMoeda,
  formatarPercentual,
  TABELAS_ADMINISTRADORAS,
} from "../src/lib/motor-consorcios";

describe("Motor de Cálculos de Consórcio Domus", () => {
  it("deve simular consórcio imobiliário de R$ 500.000 em 200 meses com economia expressiva contra financiamento", () => {
    const res = calcularSimulacaoConsorcio({
      categoria: "imobiliario",
      valorCredito: 500_000,
      prazoMeses: 200,
      administradoraSugerida: "porto_seguro",
    });

    expect(res.valorCredito).toBe(500_000);
    expect(res.prazoMeses).toBe(200);
    expect(res.taxaAdmTotalPct).toBe(18.0);
    expect(res.fundoReservaPct).toBe(2.0);

    // Parcela mensal deve ficar bem abaixo da parcela de financiamento bancário
    expect(res.parcelaIntegralMensal).toBeGreaterThan(2500);
    expect(res.parcelaIntegralMensal).toBeLessThan(3500);

    // O consórcio deve economizar mais de 40% em relação ao financiamento bancário
    expect(res.comparativoFinanciamento.economiaConsorcioValor).toBeGreaterThan(300_000);
    expect(res.comparativoFinanciamento.economiaConsorcioPercentual).toBeGreaterThan(35);

    // Lance embutido de 30% em R$ 500k = R$ 150k
    expect(res.lanceEmbutidoMaximo.permite).toBe(true);
    expect(res.lanceEmbutidoMaximo.valorMaximoLance).toBe(150_000);
    expect(res.lanceEmbutidoMaximo.creditoLiquidoRecebido).toBe(350_000);
  });

  it("deve calcular parcela reduzida de 70% corretamente", () => {
    const res = calcularSimulacaoConsorcio({
      categoria: "imobiliario",
      valorCredito: 300_000,
      prazoMeses: 180,
      modalidadeParcela: "reduzida_70",
    });

    expect(res.parcelaReduzidaMensal).toBeDefined();
    expect(res.parcelaReduzidaMensal).toBeCloseTo(res.parcelaIntegralMensal * 0.7, 1);
  });

  it("deve simular consórcio de pesados/agrícola de R$ 800.000 em 120 meses", () => {
    const res = calcularSimulacaoConsorcio({
      categoria: "pesados_agro",
      valorCredito: 800_000,
      prazoMeses: 120,
      administradoraSugerida: "randon",
    });

    expect(res.taxaAdmTotalPct).toBe(15.5);
    expect(res.lanceEmbutidoMaximo.permite).toBe(true);
    expect(res.lanceEmbutidoMaximo.valorMaximoLance).toBe(240_000);
    expect(res.comparativoFinanciamento.economiaConsorcioValor).toBeGreaterThan(500_000);
  });

  it("deve formatar moedas e percentuais no padrão brasileiro", () => {
    expect(formatarMoeda(1234.56)).toContain("1.234,56");
    expect(formatarPercentual(18.5)).toBe("18,50%");
  });

  it("deve conter regras válidas para as administradoras cadastradas", () => {
    const admins = Object.keys(TABELAS_ADMINISTRADORAS);
    expect(admins.length).toBeGreaterThanOrEqual(8);
    for (const key of admins) {
      const reg = TABELAS_ADMINISTRADORAS[key as keyof typeof TABELAS_ADMINISTRADORAS];
      expect(reg.taxaAdmMediaPct).toBeGreaterThan(10);
      expect(reg.fundoReservaPct).toBeGreaterThanOrEqual(1);
      expect(reg.prazosDisponiveis.length).toBeGreaterThan(0);
    }
  });
});
