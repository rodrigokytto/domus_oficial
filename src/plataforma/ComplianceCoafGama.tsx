import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  FileLock2,
  Lock,
  CheckCircle2,
  AlertTriangle,
  History,
  Fingerprint,
} from "lucide-react";
import { LOGS_AUDITORIA_MOCK } from "../data/backofficeMock";
import type { LogAuditoria } from "../types/backoffice";

export const ComplianceCoafGama: React.FC = () => {
  const [logs] = useState<LogAuditoria[]>(LOGS_AUDITORIA_MOCK);
  const [aba, setAba] = useState<"auditoria" | "coaf">("auditoria");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #121212 0%, #1f1f1f 100%)",
          padding: "24px 28px",
          borderRadius: "14px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: "1px solid #C6A15B",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "#C6A15B",
              fontSize: "12px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            <ShieldCheck size={16} />
            <span>Auditoria Imutável & Compliance COAF</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#ffffff" }}>
            Trilha Criptográfica & Prevenção à Lavagem de Dinheiro
          </h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
            Conformidade obrigatória com a Resolução COAF nº 40/2021 e registros imutáveis com assinatura SHA-256 encadeada.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setAba("auditoria")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: aba === "auditoria" ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.1)",
              background: aba === "auditoria" ? "rgba(198,161,91,0.2)" : "transparent",
              color: aba === "auditoria" ? "#C6A15B" : "#cbd5e1",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Trilha SHA-256
          </button>
          <button
            onClick={() => setAba("coaf")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: aba === "coaf" ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.1)",
              background: aba === "coaf" ? "rgba(198,161,91,0.2)" : "transparent",
              color: aba === "coaf" ? "#C6A15B" : "#cbd5e1",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Diligência COAF
          </button>
        </div>
      </div>

      {aba === "auditoria" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
            Logs Imutáveis de Operações (Kytto Security Standard)
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px" }}>Timestamp (UTC)</th>
                  <th style={{ padding: "12px" }}>Ação</th>
                  <th style={{ padding: "12px" }}>Tabela / Registro</th>
                  <th style={{ padding: "12px" }}>Operador Responsável</th>
                  <th style={{ padding: "12px" }}>Descrição do Evento</th>
                  <th style={{ padding: "12px" }}>Hash Integridade SHA-256</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", color: "#64748b" }}>{log.timestamp}</td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "800",
                          background: log.acao === "INSERT" ? "#dcfce7" : "#fef3c7",
                          color: log.acao === "INSERT" ? "#15803d" : "#b45309",
                        }}
                      >
                        {log.acao}
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "700", color: "#121212" }}>
                      {log.tabela} <span style={{ color: "#94a3b8", fontWeight: "normal" }}>({log.registroId})</span>
                    </td>
                    <td style={{ padding: "12px", color: "#334155", fontWeight: "600" }}>{log.usuarioNome}</td>
                    <td style={{ padding: "12px", color: "#475569" }}>{log.descricao}</td>
                    <td style={{ padding: "12px" }}>
                      <code style={{ fontSize: "10px", background: "#f1f5f9", padding: "2px 6px", borderRadius: "4px", color: "#C6A15B" }}>
                        {log.hashSha256.slice(0, 24)}...
                      </code>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {aba === "coaf" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 12px 0" }}>
            Painel de Diligência e Comunicações ao SISCOAF (Resolução COAF nº 40/2021)
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
            Gatilhos obrigatórios de monitoramento no mercado imobiliário: recebimento em espécie &ge; R$ 100.000,00, inconsistência entre renda e valor do imóvel ou partes com registro de Pessoa Exposta Politicamente (PEP).
          </p>

          <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #15803d" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "700", color: "#121212" }}>Contrato VND-2026-042 (Fazenda Três Pontes) · R$ 12.000.000,00</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#15803d" }}>✓ DISPENSADO SISCOAF</span>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                Liquidação 100% bancária via TED e Financiamento Rural. Sem valores em espécie. Partes não enquadradas em PEP.
              </div>
            </div>

            <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #C6A15B" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: "700", color: "#121212" }}>Contrato LOC-2026-001 (Reserva do Parque) · R$ 12.500,00/mês</span>
                <span style={{ fontSize: "11px", fontWeight: "700", color: "#C6A15B" }}>✓ CONFORME</span>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                Garantia locatícia via caução financeiro em conta custódia no Sicredi. Renda comprovada compatível com a locação.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
