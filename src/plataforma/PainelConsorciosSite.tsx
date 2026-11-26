import React, { useState } from "react";
import { formatarMoeda, TABELAS_ADMINISTRADORAS } from "../lib/motor-consorcios";
import type { AdministradoraConsorcio, LeadConsorcio } from "../types/consorcio";

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
    prazoPreferencialMeses: 100,
    temValorParaLance: true,
    valorLanceEstimado: 200_000,
    desejaUsarFgts: false,
    etapaFunil: "proposta_elaborada",
    criadoEm: "2026-11-26 08:30",
    atualizadoEm: "2026-11-26 09:15",
    atendenteResponsavel: "Consultor Domus",
  },
  {
    id: "lead-02",
    nome: "Juliana Mendes da Silva",
    telefone: "(65) 99654-1189",
    email: "juliana.mendes@hotmail.com",
    cidade: "Tangará da Serra",
    uf: "MT",
    categoriaDesejada: "imobiliario",
    valorCreditoAlvo: 500_000,
    prazoPreferencialMeses: 200,
    temValorParaLance: true,
    desejaUsarFgts: true,
    etapaFunil: "simulacao_enviada",
    criadoEm: "2026-11-26 07:45",
    atualizadoEm: "2026-11-26 08:00",
    atendenteResponsavel: "Casito IA / Consultor",
  },
  {
    id: "lead-03",
    nome: "Carlos Eduardo Ferreira",
    telefone: "(65) 99912-8877",
    cidade: "Cuiabá",
    uf: "MT",
    categoriaDesejada: "veiculo_leve",
    valorCreditoAlvo: 120_000,
    prazoPreferencialMeses: 84,
    temValorParaLance: false,
    etapaFunil: "novo_lead",
    criadoEm: "2026-11-26 09:05",
    atualizadoEm: "2026-11-26 09:05",
  },
];

export const PainelConsorciosSite: React.FC = () => {
  const [aba, setAba] = useState<"leads" | "administradoras" | "parametros">("leads");
  const [filtroEtapa, setFiltroEtapa] = useState<string>("todas");

  const leadsFiltrados = LEADS_DEMO.filter((l) => filtroEtapa === "todas" || l.etapaFunil === filtroEtapa);

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontSize: "26px", fontWeight: "800", color: "#0e6b57", margin: "0 0 4px 0" }}>
            Domus Plataforma · Gestão de Consórcios e Site
          </h1>
          <p style={{ color: "#64748b", margin: 0, fontSize: "14px" }}>
            Controle de leads, propostas, administradoras parceiras e configurações do portal domus.kytto.com.br
          </p>
        </div>
        <div style={{ background: "#e6f4f1", color: "#0e6b57", padding: "8px 16px", borderRadius: "8px", fontWeight: "700", fontSize: "13px" }}>
          Status do Site: Ativo (Produção)
        </div>
      </div>

      {/* Navegação entre abas */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", marginBottom: "24px" }}>
        <button
          type="button"
          onClick={() => setAba("leads")}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderBottom: aba === "leads" ? "3px solid #0e6b57" : "3px solid transparent",
            color: aba === "leads" ? "#0e6b57" : "#64748b",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Esteira de Leads e Propostas ({LEADS_DEMO.length})
        </button>
        <button
          type="button"
          onClick={() => setAba("administradoras")}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderBottom: aba === "administradoras" ? "3px solid #0e6b57" : "3px solid transparent",
            color: aba === "administradoras" ? "#0e6b57" : "#64748b",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Administradoras Homologadas (10)
        </button>
        <button
          type="button"
          onClick={() => setAba("parametros")}
          style={{
            padding: "10px 20px",
            background: "none",
            border: "none",
            borderBottom: aba === "parametros" ? "3px solid #0e6b57" : "3px solid transparent",
            color: aba === "parametros" ? "#0e6b57" : "#64748b",
            fontWeight: "700",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Parâmetros do Simulador & WhatsApp
        </button>
      </div>

      {/* Aba de Leads */}
      {aba === "leads" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Filtrar etapa:</span>
              <select
                value={filtroEtapa}
                onChange={(e) => setFiltroEtapa(e.target.value)}
                style={{ padding: "6px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              >
                <option value="todas">Todas as Etapas</option>
                <option value="novo_lead">Novo Lead</option>
                <option value="simulacao_enviada">Simulação Enviada</option>
                <option value="proposta_elaborada">Proposta Elaborada</option>
                <option value="cota_ativa">Cota Ativa</option>
              </select>
            </div>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Volume em negociação: <strong>{formatarMoeda(1_470_000)}</strong>
            </div>
          </div>

          <div style={{ background: "#ffffff", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Cliente</th>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Categoria</th>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Crédito Alvo</th>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Lance / FGTS</th>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Etapa do Funil</th>
                  <th style={{ padding: "12px 16px", color: "#475569" }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {leadsFiltrados.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ fontWeight: "700", color: "#1e293b" }}>{lead.nome}</div>
                      <div style={{ fontSize: "12px", color: "#64748b" }}>
                        {lead.telefone} · {lead.cidade}/{lead.uf}
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: "#e6f4f1",
                          color: "#0e6b57",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {lead.categoriaDesejada.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", fontWeight: "700", color: "#0e6b57" }}>
                      {formatarMoeda(lead.valorCreditoAlvo)}
                      <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "normal" }}>
                        {lead.prazoPreferencialMeses} meses
                      </div>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      {lead.temValorParaLance ? (
                        <span style={{ color: "#0e6b57", fontWeight: "600" }}>
                          Sim ({lead.valorLanceEstimado ? formatarMoeda(lead.valorLanceEstimado) : "A definir"})
                        </span>
                      ) : (
                        <span style={{ color: "#64748b" }}>Não (Sorteio/Embutido)</span>
                      )}
                      {lead.desejaUsarFgts && <div style={{ fontSize: "11px", color: "#2563eb" }}>+ Usa FGTS</div>}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          background: "#fef3c7",
                          color: "#92400e",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                        }}
                      >
                        {lead.etapaFunil.replace("_", " ").toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <a
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          background: "#25d366",
                          color: "#ffffff",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          textDecoration: "none",
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

      {/* Aba de Administradoras */}
      {aba === "administradoras" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
          {Object.entries(TABELAS_ADMINISTRADORAS).map(([key, adm]) => (
            <div
              key={key}
              style={{ background: "#ffffff", padding: "18px", borderRadius: "10px", border: "1px solid #e2e8f0" }}
            >
              <h4 style={{ margin: "0 0 6px 0", fontSize: "16px", color: "#1e293b" }}>{adm.nome}</h4>
              <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "12px" }}>
                Taxa Adm Média: <strong>{adm.taxaAdmMediaPct}%</strong> · Fundo Reserva:{" "}
                <strong>{adm.fundoReservaPct}%</strong>
              </div>
              <div style={{ fontSize: "12px", color: "#475569" }}>
                Lance embutido:{" "}
                {adm.permiteLanceEmbutido ? (
                  <span style={{ color: "#0e6b57", fontWeight: "700" }}>Até {adm.maxLanceEmbutidoPct}%</span>
                ) : (
                  <span style={{ color: "#dc2626" }}>Não permite</span>
                )}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                Prazos: {adm.prazosDisponiveis.join(", ")} meses
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Aba de Parâmetros */}
      {aba === "parametros" && (
        <div style={{ background: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", marginBottom: "16px" }}>
            Configurações do Simulador e Atendimento Domus
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                Telefone Oficial do WhatsApp para Recebimento de Simulações:
              </label>
              <input
                type="text"
                defaultValue="+55 (65) 99902-5800"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: "600", marginBottom: "6px" }}>
                Taxa de Juros de Financiamento de Referência (para cálculo de economia):
              </label>
              <input
                type="text"
                defaultValue="11.5% ao ano (TR)"
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
