import React from "react";
import { formatarMoeda } from "../lib/motor-consorcios";
import type { CartaContemplada } from "../types/consorcio";

interface VitrineProps {
  cartas?: CartaContemplada[];
  telefoneWhatsappPadrao?: string;
}

const CARTAS_EXEMPLO: CartaContemplada[] = [
  {
    id: "c1",
    codigo: "DOM-IMOB-850K",
    categoria: "imobiliario",
    administradora: "caixa_consorcios",
    valorCredito: 850_000,
    valorEntradaAgio: 195_000,
    saldoDevedor: 715_000,
    parcelasRestantes: 184,
    valorParcelaMensal: 3_885.86,
    status: "disponivel",
    destaque: true,
    observacoes: "Cota contemplada liberada para compra de casa, apartamento, terreno ou construção em Tangará e MT.",
  },
  {
    id: "c2",
    codigo: "DOM-AGRO-1200K",
    categoria: "pesados_agro",
    administradora: "rodobens",
    valorCredito: 1_200_000,
    valorEntradaAgio: 280_000,
    saldoDevedor: 1_010_000,
    parcelasRestantes: 96,
    valorParcelaMensal: 10_520.83,
    status: "disponivel",
    destaque: true,
    observacoes: "Ideal para trator, colheitadeira ou caminhão bitrem. Faturamento direto pela concessionária.",
  },
  {
    id: "c3",
    codigo: "DOM-AUTO-140K",
    categoria: "veiculo_leve",
    administradora: "porto_seguro",
    valorCredito: 140_000,
    valorEntradaAgio: 38_000,
    saldoDevedor: 114_000,
    parcelasRestantes: 62,
    valorParcelaMensal: 1_838.70,
    status: "disponivel",
    destaque: false,
    observacoes: "Crédito para compra de automóvel novo ou seminovo nacional ou importado.",
  },
  {
    id: "c4",
    codigo: "DOM-IMOB-450K",
    categoria: "imobiliario",
    administradora: "santander",
    valorCredito: 450_000,
    valorEntradaAgio: 115_000,
    saldoDevedor: 380_000,
    parcelasRestantes: 160,
    valorParcelaMensal: 2_375.00,
    status: "disponivel",
    destaque: true,
    observacoes: "Excelente oportunidade para aquisição de primeiro imóvel ou reforma com liberação imediata.",
  },
];

export const VitrineCartasContempladas: React.FC<VitrineProps> = ({
  cartas = CARTAS_EXEMPLO,
  telefoneWhatsappPadrao = "5565999025800",
}) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h3 style={{ fontSize: "26px", fontWeight: "800", color: "#1e293b", margin: "0 0 8px 0" }}>
          Cartas Contempladas Disponíveis
        </h3>
        <p style={{ color: "#64748b", fontSize: "15px", maxWidth: "700px", margin: "0 auto" }}>
          Para quem tem urgência e quer o bem agora: créditos aprovados e contemplados prontos para transferência
          imediata mediante entrada (ágio) e assunção das parcelas restantes.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {cartas.map((c) => {
          const textoWpp = encodeURIComponent(
            `Olá! Tenho interesse na Carta Contemplada ${c.codigo} (${c.categoria}) de crédito ${formatarMoeda(
              c.valorCredito,
            )} com entrada de ${formatarMoeda(c.valorEntradaAgio)} e ${c.parcelasRestantes}x de ${formatarMoeda(
              c.valorParcelaMensal,
            )}. Como podemos formalizar a transferência?`,
          );
          const link = `https://wa.me/${telefoneWhatsappPadrao}?text=${textoWpp}`;

          return (
            <div
              key={c.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "24px",
                border: c.destaque ? "2px solid #0e6b57" : "1px solid #e2e8f0",
                boxShadow: c.destaque ? "0 8px 24px rgba(14, 107, 87, 0.12)" : "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span
                    style={{
                      background: "#e6f4f1",
                      color: "#0e6b57",
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    {c.categoria.replace("_", " ")}
                  </span>
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>{c.codigo}</span>
                </div>

                <div style={{ fontSize: "13px", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  Crédito Disponível
                </div>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#0e6b57", margin: "4px 0 16px 0" }}>
                  {formatarMoeda(c.valorCredito)}
                </div>

                <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                    <span style={{ color: "#64748b" }}>Entrada (Ágio):</span>
                    <strong style={{ color: "#1e293b" }}>{formatarMoeda(c.valorEntradaAgio)}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
                    <span style={{ color: "#64748b" }}>Parcelas a assumir:</span>
                    <strong style={{ color: "#1e293b" }}>
                      {c.parcelasRestantes}x de {formatarMoeda(c.valorParcelaMensal)}
                    </strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                    <span style={{ color: "#64748b" }}>Administradora:</span>
                    <strong style={{ color: "#1e293b", textTransform: "capitalize" }}>
                      {c.administradora.replace("_", " ")}
                    </strong>
                  </div>
                </div>

                {c.observacoes && (
                  <p style={{ fontSize: "12px", color: "#64748b", lineHeight: "1.4", margin: "0 0 16px 0" }}>
                    {c.observacoes}
                  </p>
                )}
              </div>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#0e6b57",
                  color: "#ffffff",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
                }}
              >
                Quero Esta Carta Contemplada
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};
