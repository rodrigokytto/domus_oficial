import React from "react";
import {
  ShieldCheck,
  LayoutDashboard,
  MessageCircle,
  Sparkles,
  Layers,
  Calculator,
  Search,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  rotaAtual: "site" | "plataforma";
  aoNavegar: (rota: "site" | "plataforma") => void;
  aoAbrirIa: () => void;
  aoAbrirComparador: () => void;
  totalComparador: number;
}

export const NavbarGama: React.FC<Props> = ({
  rotaAtual,
  aoNavegar,
  aoAbrirIa,
  aoAbrirComparador,
  totalComparador,
}) => {
  return (
    <>
      {/* Top Banner de Compliance & Credibilidade */}
      <div
        style={{
          background: "#121212",
          color: "#F7F3EA",
          borderBottom: "1px solid rgba(198, 161, 91, 0.3)",
          padding: "8px 24px",
          fontSize: "12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={14} color="#C6A15B" />
          <span>
            <strong>{MARCA_GAMA.nome}:</strong> Inteligência Imobiliária e Crédito Estruturado · CRECI {MARCA_GAMA.creci}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={() => aoNavegar(rotaAtual === "plataforma" ? "site" : "plataforma")}
            style={{
              background: rotaAtual === "plataforma" ? "#C6A15B" : "rgba(198, 161, 91, 0.15)",
              color: rotaAtual === "plataforma" ? "#121212" : "#C6A15B",
              border: "1px solid #C6A15B",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LayoutDashboard size={13} />
            {rotaAtual === "plataforma" ? "Ir para o Portal Público" : "Acessar Plataforma Gama (/plataforma)"}
          </button>
        </div>
      </div>

      {/* Header Principal */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #E5DFC9",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            maxWidth: "1250px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Oficial Gama */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px", cursor: "pointer" }}
            onClick={() => aoNavegar("site")}
          >
            <img
              src={MARCA_GAMA.logos.escuro}
              alt={MARCA_GAMA.nome}
              style={{ height: "42px", objectFit: "contain" }}
            />
            <div style={{ borderLeft: "1px solid #E5DFC9", paddingLeft: "14px" }}>
              <div style={{ fontSize: "16px", fontWeight: "800", color: "#121212", lineHeight: "1.2" }}>
                Gama Patrimonial
              </div>
              <div style={{ fontSize: "11px", color: "#C6A15B", fontWeight: "700" }}>
                {MARCA_GAMA.slogan}
              </div>
            </div>
          </div>

          {/* Links de Navegação */}
          <nav style={{ display: "flex", gap: "22px", alignItems: "center" }}>
            <a href="#imoveis" style={{ fontSize: "14px", fontWeight: "600", color: "#121212" }}>
              Imóveis
            </a>
            <a href="#simulador-financiamento" style={{ fontSize: "14px", fontWeight: "600", color: "#121212" }}>
              Financiamento
            </a>
            <a href="#consorcios" style={{ fontSize: "14px", fontWeight: "600", color: "#121212" }}>
              Consórcios
            </a>
            <a href="#cartas" style={{ fontSize: "14px", fontWeight: "600", color: "#121212" }}>
              Cartas Contempladas
            </a>

            <button
              type="button"
              onClick={aoAbrirIa}
              style={{
                background: "#F7F3EA",
                color: "#121212",
                border: "1px solid #C6A15B",
                padding: "6px 12px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <Sparkles size={14} color="#C6A15B" />
              Busca com IA
            </button>

            {totalComparador > 0 && (
              <button
                type="button"
                onClick={aoAbrirComparador}
                style={{
                  background: "#121212",
                  color: "#ffffff",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "700",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                }}
              >
                <Layers size={14} color="#C6A15B" />
                Comparar ({totalComparador})
              </button>
            )}

            <a
              href={`https://wa.me/${MARCA_GAMA.telefoneWhatsapp}?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20Gama%20Patrimonial`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#C6A15B",
                color: "#121212",
                padding: "8px 16px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                textDecoration: "none",
              }}
            >
              <MessageCircle size={15} />
              WhatsApp Oficial
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};
