import React, { useState } from "react";
import { Sparkles, X, ArrowRight, Building2, CheckCircle2, Search } from "lucide-react";
import type { Imovel } from "../types/imovel";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  imoveis: Imovel[];
  aoFechar: () => void;
  aoSelecionarImovel: (imovel: Imovel) => void;
}

interface MatchResultado {
  imovel: Imovel;
  score: number;
  motivos: string[];
}

export const DescobertaIaModal: React.FC<Props> = ({ imoveis, aoFechar, aoSelecionarImovel }) => {
  const [consulta, setConsulta] = useState("");
  const [analisando, setAnalisando] = useState(false);
  const [resultados, setResultados] = useState<MatchResultado[]>([]);
  const [realizouBusca, setRealizouBusca] = useState(false);

  const sugestoes = [
    "Família com 3 filhos querendo casa ampla com piscina e churrasqueira perto de escolas",
    "Investidor buscando imóvel de renda com alta liquidez ou fazenda de grãos em MT",
    "Apartamento moderno de alto padrão no Centro com varanda gourmet e 3 suítes",
    "Terreno comercial em avenida de grande fluxo para construir clínica ou comércio",
  ];

  const handleAnalisarIa = (texto: string) => {
    const termo = texto.toLowerCase();
    setAnalisando(true);
    setRealizouBusca(true);

    setTimeout(() => {
      const pontuados: MatchResultado[] = imoveis.map((imovel) => {
        let score = 50;
        const motivos: string[] = [];

        if (termo.includes("fazenda") || termo.includes("agro") || termo.includes("grãos")) {
          if (imovel.tipo === "fazenda") {
            score += 45;
            motivos.push("Propriedade rural com aptidão agrícola e alta valorização.");
          }
        }
        if (termo.includes("família") || termo.includes("filhos") || termo.includes("ampla")) {
          if (imovel.quartos >= 3) {
            score += 25;
            motivos.push(`Espaço ideal: ${imovel.quartos} dormitórios e ${imovel.areaConstruida} m².`);
          }
        }
        if (termo.includes("piscina") || termo.includes("lazer")) {
          if (imovel.diferenciais.some((d) => d.toLowerCase().includes("piscina"))) {
            score += 20;
            motivos.push("Possui área de lazer completa com piscina.");
          }
        }
        if (termo.includes("apartamento") || termo.includes("centro")) {
          if (imovel.tipo === "apartamento" || imovel.bairro.toLowerCase().includes("centro")) {
            score += 25;
            motivos.push("Localização central e formato vertical com segurança.");
          }
        }
        if (termo.includes("investidor") || termo.includes("renda")) {
          if (imovel.precoAluguel || imovel.tipo === "comercial" || imovel.tipo === "terreno") {
            score += 25;
            motivos.push("Excelente vocação para renda passiva e valorização imobiliária.");
          }
        }

        score = Math.min(98, Math.max(45, score));
        if (motivos.length === 0) {
          motivos.push("Imóvel de alto padrão compatível com a carteira nobre Gama.");
        }

        return { imovel, score, motivos };
      });

      pontuados.sort((a, b) => b.score - a.score);
      setResultados(pontuados);
      setAnalisando(false);
    }, 600);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9995,
        background: "rgba(18, 18, 18, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          maxWidth: "850px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={aoFechar}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b",
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div
            style={{
              background: "#F7F3EA",
              color: "#C6A15B",
              padding: "6px",
              borderRadius: "8px",
              display: "flex",
            }}
          >
            <Sparkles size={22} color="#C6A15B" />
          </div>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#121212", margin: 0 }}>
              Descoberta com IA & Matchmaking Imobiliário
            </h2>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Descreva em suas palavras o imóvel dos seus sonhos e nossa inteligência encontrará os melhores matches
            </div>
          </div>
        </div>

        {/* Campo de Entrada da IA */}
        <div style={{ margin: "20px 0" }}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              background: "#f8fafc",
              border: "2px solid #C6A15B",
              borderRadius: "12px",
              padding: "8px 12px",
            }}
          >
            <textarea
              rows={3}
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder="Ex: Procuro uma casa de condomínio com 3 suítes, piscina aquecida e espaço gourmet espaçoso em Tangará da Serra..."
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "14px",
                color: "#121212",
                resize: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              type="button"
              onClick={() => handleAnalisarIa(consulta)}
              disabled={!consulta.trim() || analisando}
              style={{
                alignSelf: "flex-end",
                background: "#C6A15B",
                color: "#121212",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: !consulta.trim() || analisando ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                opacity: !consulta.trim() || analisando ? 0.6 : 1,
              }}
            >
              {analisando ? "Analisando..." : "Buscar Match"}
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Sugestões Rápidas */}
          <div style={{ marginTop: "12px" }}>
            <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>Sugestões rápidas:</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "6px" }}>
              {sugestoes.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setConsulta(sug);
                    handleAnalisarIa(sug);
                  }}
                  style={{
                    background: "#F7F3EA",
                    border: "1px solid #E5DFC9",
                    color: "#121212",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "11px",
                    fontWeight: "600",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados Ranqueados */}
        {realizouBusca && (
          <div style={{ marginTop: "24px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#121212", marginBottom: "12px" }}>
              Imóveis Mais Compatíveis ({resultados.length})
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {resultados.map(({ imovel, score, motivos }) => (
                <div
                  key={imovel.id}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    background: score >= 80 ? "#fffbf2" : "#ffffff",
                    borderColor: score >= 80 ? "#C6A15B" : "#e2e8f0",
                  }}
                >
                  <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                    <img
                      src={imovel.fotos[0]}
                      alt={imovel.titulo}
                      style={{ width: "90px", height: "70px", borderRadius: "8px", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span
                          style={{
                            background: score >= 80 ? "#C6A15B" : "#121212",
                            color: "#ffffff",
                            padding: "2px 8px",
                            borderRadius: "12px",
                            fontSize: "11px",
                            fontWeight: "800",
                          }}
                        >
                          {score}% Match
                        </span>
                        <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>
                          Cód. {imovel.codigo} · {imovel.bairro}
                        </span>
                      </div>
                      <div style={{ fontWeight: "700", fontSize: "15px", color: "#121212", marginTop: "2px" }}>
                        {imovel.titulo}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                        {motivos.map((m, idx) => (
                          <span key={idx} style={{ display: "inline-block", marginRight: "10px" }}>
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      aoSelecionarImovel(imovel);
                      aoFechar();
                    }}
                    style={{
                      background: "#121212",
                      color: "#ffffff",
                      border: "1px solid #C6A15B",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "700",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Ver Ficha
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
