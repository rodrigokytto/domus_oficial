import { describe, it, expect } from "vitest";
import { simularFinanciamento } from "../src/lib/motorFinanciamento";
import { avaliarImovelInstantaneo } from "../src/lib/motorAvaliacao";

describe("Motor de Financiamento Habitacional (SAC vs PRICE)", () => {
  it("deve calcular financiamento SAC com parcelas decrescentes e amortização constante", () => {
    const res = simularFinanciamento({
      valorImovel: 500_000,
      valorEntrada: 100_000,
      prazoMeses: 360,
      taxaJurosAnualPct: 10.5,
      sistema: "SAC",
    });

    expect(res.valorFinanciado).toBe(400_000);
    expect(res.primeiraParcela).toBeGreaterThan(res.ultimaParcela);
    expect(res.totalAmortizado).toBe(400_000);
    expect(res.totalJuros).toBeGreaterThan(0);
    expect(res.custoTotal).toBe(500_000 + res.totalJuros);
  });

  it("deve calcular financiamento PRICE com parcelas fixas", () => {
    const res = simularFinanciamento({
      valorImovel: 500_000,
      valorEntrada: 100_000,
      prazoMeses: 360,
      taxaJurosAnualPct: 10.5,
      sistema: "PRICE",
    });

    expect(res.valorFinanciado).toBe(400_000);
    expect(Math.round(res.primeiraParcela)).toBe(Math.round(res.ultimaParcela));
  });
});

describe("Motor de Avaliação Instantânea AVM (Quanto Vale Meu Imóvel)", () => {
  it("deve estimar valor de mercado coerente para casa de alto padrão no Jardim Europa", () => {
    const res = avaliarImovelInstantaneo({
      tipo: "casa",
      bairro: "Jardim Europa",
      padraoAcabamento: "alto",
      areaM2: 250,
      quartos: 3,
      vagas: 2,
      estadoConservacao: "bom",
    });

    expect(res.valorMedioSugerido).toBeGreaterThan(1_000_000);
    expect(res.valorMinimo).toBeLessThan(res.valorMedioSugerido);
    expect(res.valorMaximo).toBeGreaterThan(res.valorMedioSugerido);
    expect(res.precoM2Medio).toBeGreaterThan(5000);
    expect(res.confiancaAlgoritmoPct).toBeGreaterThanOrEqual(90);
    expect(res.faixaAluguelEstimado).toBeDefined();
    expect(res.faixaAluguelEstimado!.medio).toBeGreaterThan(0);
  });
});
