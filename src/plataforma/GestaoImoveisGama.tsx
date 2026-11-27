import React, { useState } from "react";
import {
  Building2,
  Plus,
  Search,
  FileText,
  Eye,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
} from "lucide-react";
import type { Imovel } from "../types/imovel";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  imoveis: Imovel[];
  aoAbrirPaperPdf: (imovel: Imovel) => void;
  aoAbrirFicha: (imovel: Imovel) => void;
}

export const GestaoImoveisGama: React.FC<Props> = ({
  imoveis,
  aoAbrirPaperPdf,
  aoAbrirFicha,
}) => {
  const [busca, setBusca] = useState("");
  const [statusFiltro, setStatusFiltro] = useState<string>("todos");

  const formatarDinheiro = (val?: number | null) => {
    if (!val || Number.isNaN(val)) return "-";
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const imoveisFiltrados = imoveis.filter((im) => {
    if (statusFiltro !== "todos" && im.status !== statusFiltro) return false;
    if (busca) {
      const b = busca.toLowerCase();
      const txt = `${im.titulo} ${im.codigo} ${im.bairro} ${im.cidade}`.toLowerCase();
      if (!txt.includes(b)) return false;
    }
    return true;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Cabeçalho da Gestão */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: 0 }}>
            Carteira de Imóveis & Ativos
          </h1>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            Gestão de anúncios, fichas de captação e geração instantânea de Paper PDF A4 para WhatsApp
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            alert(
              "Módulo de Captação Rápida: Empreendimento conectado à API Gama Patrimonial. Para cadastrar novo imóvel, utilize a ficha de captação ou sincronize com o ERP.",
            )
          }
          style={{
            background: "#C6A15B",
            color: "#121212",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Plus size={16} />
          Cadastrar Novo Imóvel
        </button>
      </div>

      {/* Barra de Filtro e Busca */}
      <div
        style={{
          background: "#ffffff",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div style={{ position: "relative", minWidth: "280px" }}>
          <Search
            size={16}
            color="#94a3b8"
            style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Filtrar por código, título ou bairro..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              width: "100%",
              padding: "8px 12px 8px 36px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              fontSize: "13px",
              boxSizing: "border-box",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "todos", label: "Todos" },
            { id: "disponivel", label: "Disponíveis" },
            { id: "reservado", label: "Reservados" },
          ].map((st) => (
            <button
              key={st.id}
              type="button"
              onClick={() => setStatusFiltro(st.id)}
              style={{
                background: statusFiltro === st.id ? "#121212" : "#f1f5f9",
                color: statusFiltro === st.id ? "#ffffff" : "#475569",
                border: "none",
                borderRadius: "6px",
                padding: "6px 14px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabela de Imóveis */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
          <thead>
            <tr style={{ background: "#F7F3EA", borderBottom: "1px solid #E5DFC9", color: "#121212" }}>
              <th style={{ padding: "12px 16px" }}>Imóvel</th>
              <th style={{ padding: "12px 16px" }}>Tipo & Finalidade</th>
              <th style={{ padding: "12px 16px" }}>Valores</th>
              <th style={{ padding: "12px 16px" }}>Dimensões</th>
              <th style={{ padding: "12px 16px" }}>Status</th>
              <th style={{ padding: "12px 16px", textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {imoveisFiltrados.map((im) => (
              <tr key={im.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <img
                      src={im.fotos[0]}
                      alt=""
                      style={{ width: "52px", height: "42px", borderRadius: "6px", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: "700", color: "#121212" }}>{im.titulo}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>
                        Cód. {im.codigo} · {im.bairro}, {im.cidade}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      background: "#F7F3EA",
                      color: "#C6A15B",
                      padding: "2px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "uppercase",
                    }}
                  >
                    {im.tipo} · {im.finalidade}
                  </span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  {im.precoVenda && (
                    <div style={{ fontWeight: "700", color: "#121212" }}>{formatarDinheiro(im.precoVenda)}</div>
                  )}
                  {im.precoAluguel && (
                    <div style={{ fontSize: "12px", color: "#C6A15B", fontWeight: "600" }}>
                      {formatarDinheiro(im.precoAluguel)}/mês
                    </div>
                  )}
                </td>
                <td style={{ padding: "14px 16px", color: "#475569" }}>
                  <div>{im.areaConstruida} m² útil</div>
                  <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                    {im.quartos} qts · {im.vagas} vagas
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      background: im.status === "disponivel" ? "#dcfce7" : "#fef3c7",
                      color: im.status === "disponivel" ? "#15803d" : "#b45309",
                      padding: "3px 8px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "700",
                      textTransform: "capitalize",
                    }}
                  >
                    ● {im.status}
                  </span>
                </td>
                <td style={{ padding: "14px 16px", textAlign: "right" }}>
                  <div style={{ display: "inline-flex", gap: "8px" }}>
                    <button
                      type="button"
                      onClick={() => aoAbrirFicha(im)}
                      title="Ver Ficha"
                      style={{
                        background: "#f1f5f9",
                        border: "1px solid #cbd5e1",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Eye size={13} />
                      Ficha
                    </button>
                    <button
                      type="button"
                      onClick={() => aoAbrirPaperPdf(im)}
                      title="Gerar PDF - Paper Executivo A4 para WhatsApp"
                      style={{
                        background: "#121212",
                        color: "#C6A15B",
                        border: "1px solid #C6A15B",
                        padding: "6px 12px",
                        borderRadius: "6px",
                        fontSize: "12px",
                        fontWeight: "700",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <FileText size={13} />
                      Gerar PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
