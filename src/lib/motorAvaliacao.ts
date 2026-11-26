export interface ParametrosAvaliacao {
  tipo: "casa" | "apartamento" | "cobertura" | "terreno" | "comercial" | "fazenda";
  bairro: string;
  padraoAcabamento: "economico" | "medio" | "alto" | "luxo";
  areaM2: number;
  quartos: number;
  vagas: number;
  estadoConservacao: "novo" | "bom" | "regular" | "reforma";
}

export interface ResultadoAvaliacao {
  valorMedioSugerido: number;
  valorMinimo: number;
  valorMaximo: number;
  precoM2Medio: number;
  liquidezEstimada: "Alta" | "Média" | "Exclusiva / Longo Prazo";
  confiancaAlgoritmoPct: number;
  faixaAluguelEstimado?: {
    min: number;
    medio: number;
    max: number;
    yieldMensalPct: number;
  };
}

const PRECO_BASE_M2_POR_BAIRRO: Record<string, number> = {
  Centro: 6200,
  "Jardim Europa": 5800,
  Tarumã: 4800,
  "Vila Alta": 4200,
  "Jardim Tangará": 3900,
  "Zona Rural": 25000, // por hectare
  Outros: 4500,
};

const FATOR_PADRAO: Record<string, number> = {
  economico: 0.82,
  medio: 1.0,
  alto: 1.28,
  luxo: 1.55,
};

const FATOR_ESTADO: Record<string, number> = {
  novo: 1.12,
  bom: 1.0,
  regular: 0.88,
  reforma: 0.75,
};

export function avaliarImovelInstantaneo(p: ParametrosAvaliacao): ResultadoAvaliacao {
  const baseM2 = PRECO_BASE_M2_POR_BAIRRO[p.bairro] || PRECO_BASE_M2_POR_BAIRRO["Outros"];
  const fatorPadrao = FATOR_PADRAO[p.padraoAcabamento] || 1.0;
  const fatorEstado = FATOR_ESTADO[p.estadoConservacao] || 1.0;

  // Bônus de quartos e vagas
  const bonusQuartos = Math.max(0, (p.quartos - 2) * 0.04);
  const bonusVagas = Math.max(0, (p.vagas - 1) * 0.03);

  const precoM2Ajustado = baseM2 * fatorPadrao * fatorEstado * (1 + bonusQuartos + bonusVagas);
  const valorMedio = Math.round((precoM2Ajustado * p.areaM2) / 1000) * 1000;

  const margem = 0.08; // 8% margem de assertividade
  const valorMinimo = Math.round(valorMedio * (1 - margem));
  const valorMaximo = Math.round(valorMedio * (1 + margem));

  const yieldAnual = 0.065; // 6.5% ao ano
  const aluguelMedio = Math.round((valorMedio * yieldAnual) / 12 / 50) * 50;

  return {
    valorMedioSugerido: valorMedio,
    valorMinimo,
    valorMaximo,
    precoM2Medio: Math.round(precoM2Ajustado),
    liquidezEstimada:
      valorMedio < 1200000 ? "Alta" : valorMedio < 3000000 ? "Média" : "Exclusiva / Longo Prazo",
    confiancaAlgoritmoPct: 92,
    faixaAluguelEstimado: {
      min: Math.round(aluguelMedio * 0.9),
      medio: aluguelMedio,
      max: Math.round(aluguelMedio * 1.1),
      yieldMensalPct: Number(((yieldAnual / 12) * 100).toFixed(2)),
    },
  };
}
