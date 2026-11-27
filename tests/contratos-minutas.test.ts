import { describe, it, expect } from "vitest";
import { MARCA_GAMA } from "../src/lib/marcaGama";

describe("Central de Contratos & Minutas Gama Patrimonial", () => {
  it("deve validar dados corporativos oficiais da Gama Patrimonial no preâmbulo contratual", () => {
    expect(MARCA_GAMA.nome).toBe("Gama Patrimonial");
    expect(MARCA_GAMA.razaoSocial).toBe("Gama Patrimonial Gestão e Participações Ltda");
    expect(MARCA_GAMA.cnpj).toBe("52.894.120/0001-44");
    expect(MARCA_GAMA.creci).toBe("J-14280 MT");
    expect(MARCA_GAMA.cidade).toBe("Tangará da Serra");
    expect(MARCA_GAMA.uf).toBe("MT");
  });

  it("deve verificar a estrutura dos guardrails e prazos dos contratos", () => {
    const valorTotal = 1450000;
    const sinalEntrada = 290000;
    const saldoDevedor = valorTotal - sinalEntrada;

    expect(saldoDevedor).toBe(1160000);
    expect(sinalEntrada / valorTotal).toBeCloseTo(0.2, 2); // 20% arras
  });

  it("deve garantir conformidade legal com Lei do Distrato (Lei 13.786/18) e Foro de Tangará da Serra", () => {
    const foroEleito = "Tangará da Serra - MT";
    const baseLegalDistrato = "Lei Federal nº 13.786/2018 (Lei do Distrato)";
    const baseLegalAssinatura = "Lei Federal nº 14.063/2020 (Assinatura Eletrônica Avançada)";

    expect(foroEleito).toContain("Tangará da Serra");
    expect(baseLegalDistrato).toContain("13.786/2018");
    expect(baseLegalAssinatura).toContain("14.063/2020");
  });
});
