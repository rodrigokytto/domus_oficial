import React from "react";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  aoNavegarPlataforma: () => void;
}

export const FooterGama: React.FC<Props> = ({ aoNavegarPlataforma }) => {
  return (
    <footer style={{ background: "#121212", color: "#ffffff", padding: "48px 24px 24px 24px", borderTop: "1px solid #C6A15B" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "36px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          paddingBottom: "36px",
          marginBottom: "24px",
        }}
      >
        <div>
          <img
            src={MARCA_GAMA.logos.claro}
            alt={MARCA_GAMA.nome}
            style={{ height: "46px", objectFit: "contain", marginBottom: "14px" }}
          />
          <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.6" }}>
            {MARCA_GAMA.descricao} Operamos com inteligência em ativos reais, gestão de carteiras imobiliárias, laudos técnicos
            e intermediação de consórcios autorizados pelo Banco Central do Brasil.
          </div>
        </div>

        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#C6A15B", marginBottom: "14px" }}>
            Unidade Tangará da Serra · MT
          </div>
          <div style={{ fontSize: "13px", color: "#cbd5e1", lineHeight: "1.8" }}>
            <div>{MARCA_GAMA.endereco}</div>
            <div>WhatsApp: {MARCA_GAMA.telefoneFormatado}</div>
            <div>E-mail: {MARCA_GAMA.email}</div>
            <div>Registro CRECI: {MARCA_GAMA.creci}</div>
          </div>
        </div>

        <div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#C6A15B", marginBottom: "14px" }}>
            Soluções & Governança
          </div>
          <div style={{ fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px" }}>
            <button
              type="button"
              onClick={aoNavegarPlataforma}
              style={{
                background: "none",
                border: "none",
                color: "#C6A15B",
                textAlign: "left",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
                padding: 0,
              }}
            >
              → Plataforma Interna (/plataforma)
            </button>
            <a href="#imoveis" style={{ color: "#cbd5e1" }}>
              → Catálogo de Imóveis
            </a>
            <a href="#simulador-financiamento" style={{ color: "#cbd5e1" }}>
              → Simulador SAC & PRICE
            </a>
            <a href="#consorcios" style={{ color: "#cbd5e1" }}>
              → Consórcio Domus
            </a>
            <a href="#cartas" style={{ color: "#cbd5e1" }}>
              → Cartas Contempladas
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          fontSize: "12px",
          color: "#94a3b8",
        }}
      >
        <div>© 2026 {MARCA_GAMA.razaoSocial} · CNPJ {MARCA_GAMA.cnpj} · CRECI {MARCA_GAMA.creci}.</div>
        <div>Soluções financeiras estruturadas sob a Lei Federal nº 11.795/2008 e Banco Central.</div>
      </div>
    </footer>
  );
};
