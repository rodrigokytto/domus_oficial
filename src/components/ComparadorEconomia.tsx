import React from "react";
import { formatarMoeda, formatarPercentual } from "../lib/motor-consorcios";
import type { SimulacaoResultado } from "../types/consorcio";

interface ComparadorProps {
  resultado: SimulacaoResultado;
}

export const ComparadorEconomia: React.FC<ComparadorProps> = ({ resultado }) => {
  const { valorCredito, custoTotalConsorcio, comparativoFinanciamento, taxaAdmTotalPct } = resultado;
  const { custoTotalFinanciamento, economiaConsorcioValor, economiaConsorcioPercentual, taxaJurosAnualEstimadaPct } =
    comparativoFinanciamento;

  return (
    <div style={{ background: "#ffffff", borderRadius: "16px", padding: "28px", border: "1px solid #E5DFC9" }}>
      <h3 style={{ fontSize: "22px", fontWeight: "700", color: "#1e293b", marginBottom: "8px" }}>
        Por que o Consórcio é Matematicamente Superior ao Financiamento?
      </h3>
      <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "24px" }}>
        Veja o confronto real entre a taxa de administração transparente da Domus & Gama Patrimonial e os juros compostos dos bancos para
        um crédito de {formatarMoeda(valorCredito)}.
      </p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#F7F3EA", borderBottom: "2px solid #E5DFC9" }}>
              <th style={{ padding: "14px", color: "#475569" }}>Critério de Análise</th>
              <th style={{ padding: "14px", color: "#121212", fontWeight: "700" }}>Domus Consórcios</th>
              <th style={{ padding: "14px", color: "#dc2626", fontWeight: "700" }}>Financiamento Bancário</th>
              <th style={{ padding: "14px", color: "#C6A15B", fontWeight: "700" }}>Sua Vantagem</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "14px", fontWeight: "600", color: "#1e293b" }}>Remuneração / Juros</td>
              <td style={{ padding: "14px", color: "#121212", fontWeight: "600" }}>
                Zero Juros (Tx. Adm. {formatarPercentual(taxaAdmTotalPct)} total)
              </td>
              <td style={{ padding: "14px", color: "#dc2626" }}>
                Juros Compostos (~{formatarPercentual(taxaJurosAnualEstimadaPct)} a.a. + TR)
              </td>
              <td style={{ padding: "14px", color: "#C6A15B", fontWeight: "700" }}>Economia linear garantida</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "14px", fontWeight: "600", color: "#1e293b" }}>Custo Total Pago</td>
              <td style={{ padding: "14px", color: "#121212", fontWeight: "700", fontSize: "16px" }}>
                {formatarMoeda(custoTotalConsorcio)}
              </td>
              <td style={{ padding: "14px", color: "#dc2626", fontWeight: "700", fontSize: "16px" }}>
                {formatarMoeda(custoTotalFinanciamento)}
              </td>
              <td style={{ padding: "14px", color: "#C6A15B", fontWeight: "800", fontSize: "16px" }}>
                - {formatarMoeda(economiaConsorcioValor)} ({economiaConsorcioPercentual.toFixed(1)}%)
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "14px", fontWeight: "600", color: "#1e293b" }}>Entrada Obrigatória</td>
              <td style={{ padding: "14px", color: "#121212" }}>
                Sem entrada mínima obrigatória (paga apenas a 1ª parcela)
              </td>
              <td style={{ padding: "14px", color: "#dc2626" }}>Exige no mínimo 20% a 30% à vista do valor do bem</td>
              <td style={{ padding: "14px", color: "#C6A15B", fontWeight: "700" }}>Acesso facilitado sem poupança prévia</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #f1f5f9" }}>
              <td style={{ padding: "14px", fontWeight: "600", color: "#1e293b" }}>Aceleração de Retirada</td>
              <td style={{ padding: "14px", color: "#121212" }}>
                Lances Livres, Lance Embutido (até 30%) e FGTS
              </td>
              <td style={{ padding: "14px", color: "#64748b" }}>Imediata (porém com juros abusivos de 30 anos)</td>
              <td style={{ padding: "14px", color: "#C6A15B", fontWeight: "700" }}>Estratégia sob medida de contemplação</td>
            </tr>
            <tr>
              <td style={{ padding: "14px", fontWeight: "600", color: "#1e293b" }}>Poder de Compra</td>
              <td style={{ padding: "14px", color: "#121212" }}>
                Atualização anual pelo INCC / IPCA / Tabela FIPE (seu crédito não perde valor)
              </td>
              <td style={{ padding: "14px", color: "#64748b" }}>Saldo devedor corrigido pela TR e inflação</td>
              <td style={{ padding: "14px", color: "#C6A15B", fontWeight: "700" }}>Patrimônio protegido contra a inflação</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
