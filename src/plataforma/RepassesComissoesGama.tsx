import React, { useState } from "react";
import {
  Coins,
  SendHorizontal,
  CheckCircle2,
  Clock,
  UserCheck,
  Building,
  ArrowRight,
  ShieldCheck,
  FileCheck,
} from "lucide-react";
import {
  REPASSES_LOCACAO_MOCK,
  COMISSOES_FECHAMENTO_MOCK,
} from "../data/backofficeMock";
import type { RepasseLocacao, ComissaoFechamento } from "../types/backoffice";

export const RepassesComissoesGama: React.FC = () => {
  const [repasses, setRepasses] = useState<RepasseLocacao[]>(REPASSES_LOCACAO_MOCK);
  const [comissoes, setComissoes] = useState<ComissaoFechamento[]>(COMISSOES_FECHAMENTO_MOCK);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);

  const autorizarRepasse = (id: string) => {
    setRepasses((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: "repassado_proprietario",
              dataLiquidacaoRepasse: new Date().toISOString(),
            }
          : r
      )
    );
    setMensagemSucesso("Repasse PIX liquidado e comprovante enviado ao proprietário!");
    setTimeout(() => setMensagemSucesso(null), 4000);
  };

  const liquidarComissao = (id: string) => {
    setComissoes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "liquidado" } : c))
    );
    setMensagemSucesso("Comissão do corretor liquidada com sucesso via transferência bancária!");
    setTimeout(() => setMensagemSucesso(null), 4000);
  };

  const totalRepassesPendentes = repasses
    .filter((r) => r.status !== "repassado_proprietario")
    .reduce((acc, r) => acc + r.valorLiquidoRepasse, 0);

  const totalTaxaAdmRetida = repasses.reduce((acc, r) => acc + r.taxaAdmValor, 0);

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
            <Coins size={16} />
            <span>Backoffice Imobiliário · Repasses & Comissões</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#ffffff" }}>
            Repasses a Locadores & Split de Corretores
          </h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
            Cálculo automatizado de retenção de taxa de administração (10%), IRRF Carnê-Leão e split de honorários 6% CRECI-MT.
          </p>
        </div>
      </div>

      {mensagemSucesso && (
        <div
          style={{
            background: "#dcfce7",
            color: "#15803d",
            padding: "14px 20px",
            borderRadius: "8px",
            fontWeight: "700",
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid #86efac",
          }}
        >
          <CheckCircle2 size={18} />
          <span>{mensagemSucesso}</span>
        </div>
      )}

      {/* Cards de Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
            Repasses Pendentes para Locadores
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#b45309", margin: "6px 0" }}>
            R$ {totalRepassesPendentes.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Aguardando autorização de lote PIX Sicredi / BB
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
            Taxa de Administração Retida (Receita Gama)
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#C6A15B", margin: "6px 0" }}>
            R$ {totalTaxaAdmRetida.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#15803d", fontWeight: "600" }}>
            ✓ Faturado e base para emissão de NFS-e Tangará
          </div>
        </div>
      </div>

      {/* Tabela de Repasses Mensais a Locadores */}
      <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
          Repasses de Aluguel aos Proprietários (Competência 11/2026)
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "12px" }}>Contrato & Imóvel</th>
                <th style={{ padding: "12px" }}>Proprietário & Chave PIX</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Aluguel Bruto</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Taxa Adm (10%)</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Retenção IRRF</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Líquido Locador</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Ação PIX</th>
              </tr>
            </thead>
            <tbody>
              {repasses.map((r) => (
                <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#121212" }}>{r.contratoNumero}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{r.imovelTitulo}</div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#121212" }}>{r.locadorNome}</div>
                    <div style={{ fontSize: "11px", color: "#C6A15B", fontWeight: "600" }}>PIX: {r.locadorChavePix}</div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#121212", fontWeight: "600" }}>
                    R$ {r.aluguelBruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#C6A15B", fontWeight: "700" }}>
                    - R$ {r.taxaAdmValor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>
                    {r.retencaoIrrf > 0 ? `- R$ ${r.retencaoIrrf.toFixed(2)}` : "Isento"}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "800", color: "#15803d" }}>
                    R$ {r.valorLiquidoRepasse.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background:
                          r.status === "repassado_proprietario"
                            ? "#dcfce7"
                            : r.status === "recebido_locatario"
                            ? "#fef3c7"
                            : "#fee2e2",
                        color:
                          r.status === "repassado_proprietario"
                            ? "#15803d"
                            : r.status === "recebido_locatario"
                            ? "#b45309"
                            : "#b91c1c",
                      }}
                    >
                      {r.status === "repassado_proprietario"
                        ? "Repassado PIX"
                        : r.status === "recebido_locatario"
                        ? "Aguardando Envio"
                        : "Pendente Cobrança"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {r.status === "recebido_locatario" ? (
                      <button
                        onClick={() => autorizarRepasse(r.id)}
                        style={{
                          background: "#C6A15B",
                          color: "#121212",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "700",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <SendHorizontal size={12} />
                        <span>Enviar PIX</span>
                      </button>
                    ) : r.status === "repassado_proprietario" ? (
                      <span style={{ fontSize: "11px", color: "#15803d", fontWeight: "700" }}>✓ Liquidado</span>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#94a3b8" }}>Aguardando Aluguel</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabela de Comissões e Split de Corretores */}
      <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
          Split de Honorários de Vendas & Corretagem (6% CRECI-MT)
        </h2>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "12px" }}>Negócio Fechado</th>
                <th style={{ padding: "12px", textAlign: "right" }}>VGV Venda</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Honorários 6%</th>
                <th style={{ padding: "12px" }}>Corretor Responsável</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Split Corretor</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Líquido Gama</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {comissoes.map((c) => (
                <tr key={c.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#121212" }}>{c.contratoNumero}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{c.imovelTitulo}</div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "700", color: "#121212" }}>
                    R$ {c.valorBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#C6A15B", fontWeight: "800" }}>
                    R$ {c.valorHonorariosTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#121212" }}>{c.corretorNome}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>{c.corretorCreci}</div>
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "800", color: "#2563eb" }}>
                    R$ {c.valorCorretorLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} ({c.splitCorretorPerc}%)
                  </td>
                  <td style={{ padding: "12px", textAlign: "right", fontWeight: "800", color: "#15803d" }}>
                    R$ {c.valorGamaLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background: c.status === "liquidado" ? "#dcfce7" : "#fef3c7",
                        color: c.status === "liquidado" ? "#15803d" : "#b45309",
                      }}
                    >
                      {c.status === "liquidado" ? "Comissão Paga" : "Aguardando Liquidação"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {c.status === "a_pagar" ? (
                      <button
                        onClick={() => liquidarComissao(c.id)}
                        style={{
                          background: "#121212",
                          color: "#C6A15B",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Pagar Corretor
                      </button>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#15803d", fontWeight: "700" }}>✓ Liquidado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
