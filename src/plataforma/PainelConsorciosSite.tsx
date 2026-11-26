import type React from "react";
import { useState } from "react";
import { formatarMoeda, TABELAS_ADMINISTRADORAS } from "../lib/motor-consorcios";
import type { LeadConsorcio } from "../types/consorcio";

const LEADS_DEMO: LeadConsorcio[] = [
  {
    id: "lead-01",
    nome: "Marcos Vinicius de Oliveira",
    telefone: "(65) 99981-2234",
    email: "marcos.agro@gmail.com",
    cidade: "Tangará da Serra",
    uf: "MT",
    categoriaDesejada: "pesados_agro",
    valorCreditoAlvo: 850_000,
    prazoPreferencialMeses: 120,
    temValorParaLance: true,
    etapaFunil: "analise_perfil",
    criadoEm: "2026-11-26T10:15:00Z",
    atualizadoEm: "Hoje, 10:15",
  },
  {
    id: "lead-02",
    nome: "Juliana Mendes Andrade",
    telefone: "(65) 99877-1122",
    email: "juliana.imob@outlook.com",
    cidade: "Cuiabá",
    uf: "MT",
    categoriaDesejada: "imobiliario",
    valorCreditoAlvo: 600_000,
    prazoPreferencialMeses: 200,
    temValorParaLance: false,
    etapaFunil: "proposta_elaborada",
    criadoEm: "2026-11-25T14:40:00Z",
    atualizadoEm: "Ontem, 14:40",
  },
  {
    id: "lead-03",
    nome: "Cleber Roberto Dalmolin",
    telefone: "(66) 99901-8844",
    email: "cleber.soja@uol.com.br",
    cidade: "Campo Novo do Parecis",
    uf: "MT",
    categoriaDesejada: "pesados_agro",
    valorCreditoAlvo: 1_800_000,
    prazoPreferencialMeses: 120,
    temValorParaLance: true,
    etapaFunil: "novo_lead",
    criadoEm: "2026-11-26T15:20:00Z",
    atualizadoEm: "Hoje, 15:20",
  },
];

export const PainelConsorciosSite: React.FC = () => {
  const [leads] = useState<LeadConsorcio[]>(LEADS_DEMO);
  const [filtroEtapa, setFiltroEtapa] = useState<string>("todas");
  const [aba, setAba] = useState<"leads" | "administradoras" | "parametros">("leads");

  const leadsFiltrados = leads.filter((l) => {
    if (filtroEtapa === "todas") return true;
    return l.etapaFunil === filtroEtapa;
  });

  const totalCreditoAlvo = leads.reduce((acc, curr) => acc + curr.valorCreditoAlvo, 0);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "inherit" }}>
      {/* Header do Painel */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
          borderBottom: "1px solid #e2e8f0",
          paddingBottom: "16px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: "0 0 4px 0" }}>
            Mesa de Consórcios Domus & Gama Patrimonial
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            Captação de leads, controle de cotas contempladas e taxas de administração vigentes
          </p>
        </div>
        <div style={{ background: "#F7F3EA", color: "#121212", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px", border: "1px solid #E5DFC9" }}>
          Pipeline Ativo: {formatarMoeda(totalCreditoAlvo)}
        </div>
      </div>

      {/* Navegação de Abas */}
      <div style={{ display: "flex", gap: "12px", borderBottom: "1px solid #e2e8f0", marginBottom: "24px" }}>
        <button
          type="button"
          onClick={() => setAba("leads")}
          style={{
            background: "none",
            border: "none",
            borderBottom: aba === "leads" ? "3px solid #C6A15B" : "3px solid transparent",
            color: aba === "leads" ? "#121212" : "#64748b",
            fontWeight: "700",
            fontSize: "14px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Propostas & Leads ({leads.length})
        </button>
        <button
          type="button"
          onClick={() => setAba("administradoras")}
          style={{
            background: "none",
            border: "none",
            borderBottom: aba === "administradoras" ? "3px solid #C6A15B" : "3px solid transparent",
            color: aba === "administradoras" ? "#121212" : "#64748b",
            fontWeight: "700",
            fontSize: "14px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Tabelas de Administradoras (BACEN)
        </button>
        <button
          type="button"
          onClick={() => setAba("parametros")}
          style={{
            background: "none",
            border: "none",
            borderBottom: aba === "parametros" ? "3px solid #C6A15B" : "3px solid transparent",
            color: aba === "parametros" ? "#121212" : "#64748b",
            fontWeight: "700",
            fontSize: "14px",
            padding: "10px 16px",
            cursor: "pointer",
          }}
        >
          Parâmetros do Simulador
        </button>
      </div>

      {/* Conteúdo Aba Leads */}
      {aba === "leads" && (
        <div>
          {/* Barra de Filtros */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "16px", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>Filtrar etapa:</span>
            {["todas", "novo_lead", "analise_perfil", "proposta_elaborada"].map((et) => (
              <button
                key={et}
                type="button"
                onClick={() => setFiltroEtapa(et)}
                style={{
                  background: filtroEtapa === et ? "#121212" : "#f1f5f9",
                  color: filtroEtapa === et ? "#ffffff" : "#475569",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                {et === "todas"
                  ? "Todas"
                  : et === "novo_lead"
                    ? "Novos"
                    : et === "analise_perfil"
                      ? "Em Análise"
                      : "Proposta Elaborada"}
              </button>
            ))}
          </div>

          {/* Tabela de Leads */}
          <div style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#F7F3EA", borderBottom: "1px solid #E5DFC9", color: "#121212" }}>
                  <th style={{ padding: "12px 16px" }}>Cliente</th>
                  <th style={{ padding: "12px 16px" }}>Categoria & Cidade</th>
                  <th style={{ padding: "12px 16px" }}>Crédito Alvo</th>
                  <th style={{ padding: "12px 16px" }}>Lance</th>
                  <th style={{ padding: "12px 16px" }}>Etapa Funil</th>
                  <th style={{ padding: "12px 16px" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: "700", color: "#1e293b" }}>{lead.nome}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {lead.telefone} · {lead.email}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: "#F7F3EA",
                          color: "#121212",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "700",
                          textTransform: "uppercase",
                        }}
                      >
                        {lead.categoriaDesejada}
                      </span>
                      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "2px" }}>
                        {lead.cidade} - {lead.uf}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: "700", color: "#121212" }}>
                      {formatarMoeda(lead.valorCreditoAlvo)}
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>
                        em {lead.prazoPreferencialMeses} meses
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ fontWeight: "600", color: lead.temValorParaLance ? "#15803d" : "#64748b" }}>
                        {lead.temValorParaLance ? "Com recurso próprio" : "Apenas sorteio / embutido"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: lead.etapaFunil === "novo_lead" ? "#dbeafe" : "#dcfce7",
                          color: lead.etapaFunil === "novo_lead" ? "#1e40af" : "#15803d",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "700",
                        }}
                      >
                        {lead.etapaFunil === "novo_lead"
                          ? "Novo"
                          : lead.etapaFunil === "analise_perfil"
                            ? "Em Análise"
                            : "Proposta Elaborada"}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <a
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}?text=Ol%C3%A1%20${encodeURIComponent(lead.nome)}%2C%20aqui%20%C3%A9%20da%20Gama%20Patrimonial%20e%20Domus%20Cons%C3%B3rcios.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#25D366",
                          color: "#ffffff",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          fontSize: "12px",
                          fontWeight: "700",
                          display: "inline-block",
                        }}
                      >
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Conteúdo Aba Administradoras */}
      {aba === "administradoras" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {Object.values(TABELAS_ADMINISTRADORAS).map((adm) => (
            <div
              key={adm.nome}
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #E5DFC9",
                boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#121212", margin: 0 }}>{adm.nome}</h3>
                <span
                  style={{
                    background: "#F7F3EA",
                    color: "#C6A15B",
                    fontSize: "11px",
                    fontWeight: "800",
                    padding: "2px 8px",
                    borderRadius: "4px",
                  }}
                >
                  BACEN Ativo
                </span>
              </div>
              <div style={{ fontSize: "13px", color: "#475569", lineHeight: "1.6" }}>
                <div>
                  Taxa Adm Média: <strong>{adm.taxaAdmMediaPct}%</strong>
                </div>
                <div>
                  Fundo de Reserva: <strong>{adm.fundoReservaPct}%</strong>
                </div>
                <div>
                  Lance Embutido Máx: <span style={{ color: "#121212", fontWeight: "700" }}>Até {adm.maxLanceEmbutidoPct}%</span>
                </div>
                <div style={{ marginTop: "6px", fontSize: "12px", color: "#64748b" }}>
                  Prazos: {adm.prazosDisponiveis.join(", ")} meses
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Conteúdo Aba Parâmetros */}
      {aba === "parametros" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#121212", marginBottom: "12px" }}>
            Parâmetros Globais do Motor Matemático
          </h3>
          <p style={{ fontSize: "13px", color: "#64748b", lineHeight: "1.6" }}>
            Os cálculos em tempo real no simulador utilizam a fórmula oficial do Sistema de Consórcios (Lei nº 11.795/2008),
            ponderando fundo comum, taxa de administração linear diluída, seguro prestamista e comparativo automático contra
            amortização bancária pelo Sistema de Amortização Constante (SAC).
          </p>
          <div style={{ marginTop: "16px", background: "#f8fafc", padding: "16px", borderRadius: "8px", fontSize: "13px" }}>
            <div>• <strong>Taxa Média Financiamento (Benchmark):</strong> 11,2% a.a.</div>
            <div>• <strong>Fator Parcela Reduzida:</strong> 70% da parcela integral até a contemplação</div>
            <div>• <strong>Seguro Prestamista Estimado:</strong> 0,038% ao mês sobre o saldo devedor</div>
          </div>
        </div>
      )}
    </div>
  );
};
