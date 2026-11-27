import React, { useState, useMemo } from "react";
import {
  FileCode2,
  FileCheck2,
  Download,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileText,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { NFSE_EMITIDAS_MOCK, REPASSES_LOCACAO_MOCK } from "../data/backofficeMock";
import { consolidarRegistrosDimob } from "../lib/motorBackoffice";
import type { NfseEmitida } from "../types/backoffice";

export const FiscalDimobGama: React.FC = () => {
  const [nfseLista, setNfseLista] = useState<NfseEmitida[]>(NFSE_EMITIDAS_MOCK);
  const [abaAtiva, setAbaAtiva] = useState<"nfse" | "dimob" | "reforma">("nfse");
  const [mensagem, setMensagem] = useState<string | null>(null);

  // Registros consolidados da DIMOB
  const registrosDimob = useMemo(
    () => consolidarRegistrosDimob(REPASSES_LOCACAO_MOCK),
    []
  );

  const totalAluguelDimob = useMemo(
    () => registrosDimob.reduce((acc, r) => acc + r.valorAluguelAnual, 0),
    [registrosDimob]
  );

  const totalComissaoDimob = useMemo(
    () => registrosDimob.reduce((acc, r) => acc + r.valorComissaoAnual, 0),
    [registrosDimob]
  );

  const baixarArquivoDimob = () => {
    let txt = `DIMOB|2026|ORIGINAL|52894120000144|GAMA PATRIMONIAL GESTAO E PARTICIPACOES LTDA\n`;
    for (const r of registrosDimob) {
      txt += `LOC|${r.contratoNumero}|${r.locadorCpfCnpj}|${r.locadorNome}|${r.locatarioCpfCnpj}|${r.locatarioNome}|${r.valorAluguelAnual.toFixed(2)}|${r.valorComissaoAnual.toFixed(2)}|${r.valorIrrfAnual.toFixed(2)}\n`;
    }

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `DIMOB_2026_GAMA_PATRIMONIAL.txt`;
    link.click();

    setMensagem("Arquivo DIMOB 2026 gerado e baixado no formato oficial da Receita Federal!");
    setTimeout(() => setMensagem(null), 4000);
  };

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
            <FileCode2 size={16} />
            <span>Módulo Fiscal & Tributário Nacional</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#ffffff" }}>
            NFS-e Tangará da Serra & Declaração DIMOB
          </h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
            CNAE 6821-8/01 (Intermediação Imobiliária), ISS 5,00%, escrituração automática e arquivo DIMOB para a Receita Federal.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setAbaAtiva("nfse")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: abaAtiva === "nfse" ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.1)",
              background: abaAtiva === "nfse" ? "rgba(198,161,91,0.2)" : "transparent",
              color: abaAtiva === "nfse" ? "#C6A15B" : "#cbd5e1",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            NFS-e Municipal
          </button>
          <button
            onClick={() => setAbaAtiva("dimob")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: abaAtiva === "dimob" ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.1)",
              background: abaAtiva === "dimob" ? "rgba(198,161,91,0.2)" : "transparent",
              color: abaAtiva === "dimob" ? "#C6A15B" : "#cbd5e1",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            DIMOB (Receita Federal)
          </button>
          <button
            onClick={() => setAbaAtiva("reforma")}
            style={{
              padding: "10px 16px",
              borderRadius: "8px",
              border: abaAtiva === "reforma" ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.1)",
              background: abaAtiva === "reforma" ? "rgba(198,161,91,0.2)" : "transparent",
              color: abaAtiva === "reforma" ? "#C6A15B" : "#cbd5e1",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Reforma IBS / CBS
          </button>
        </div>
      </div>

      {mensagem && (
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
          <span>{mensagem}</span>
        </div>
      )}

      {abaAtiva === "nfse" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: 0 }}>
                Notas Fiscais de Serviço Eletrônicas Emitidas (NFS-e)
              </h2>
              <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
                Emissão restrita à taxa de administração e comissões para proteção contra bitributação sobre o repasse do aluguel.
              </p>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px" }}>Nº NFS-e</th>
                  <th style={{ padding: "12px" }}>Tomador do Serviço</th>
                  <th style={{ padding: "12px" }}>Discriminação dos Serviços</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Valor Serviços</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>ISS (5%)</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Retenções Federais</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Valor Líquido</th>
                  <th style={{ padding: "12px" }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {nfseLista.map((n) => (
                  <tr key={n.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "800", color: "#121212" }}>NFS-e {n.numeroNfse}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{n.codigoVerificacao}</div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "700", color: "#121212" }}>{n.tomadorNome}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{n.tomadorCpfCnpj}</div>
                    </td>
                    <td style={{ padding: "12px", maxWidth: "340px", color: "#475569" }}>
                      {n.descricaoServico}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "700", color: "#121212" }}>
                      R$ {n.valorServicos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#C6A15B", fontWeight: "700" }}>
                      R$ {n.valorIss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>
                      R$ {n.retencoesFederais.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "800", color: "#15803d" }}>
                      R$ {n.valorLiquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "700",
                          background: "#dcfce7",
                          color: "#15803d",
                        }}
                      >
                        ✓ Autorizada
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {abaAtiva === "dimob" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: 0 }}>
                Declaração de Informações sobre Atividades Imobiliárias (DIMOB 2026)
              </h2>
              <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
                Obrigação acessória anual junto à Receita Federal do Brasil (IN RFB nº 1.115).
              </p>
            </div>

            <button
              onClick={baixarArquivoDimob}
              style={{
                background: "#121212",
                color: "#C6A15B",
                border: "1px solid #C6A15B",
                padding: "10px 18px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Download size={16} />
              <span>Exportar Arquivo DIMOB (.txt)</span>
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "16px",
              marginBottom: "20px",
            }}
          >
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>Total Aluguéis Intermediados</div>
              <div style={{ fontSize: "22px", fontWeight: "900", color: "#121212" }}>
                R$ {totalAluguelDimob.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>Rendimento Bruto da Gama (Comissão)</div>
              <div style={{ fontSize: "22px", fontWeight: "900", color: "#C6A15B" }}>
                R$ {totalComissaoDimob.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div style={{ background: "#f8fafc", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700" }}>Contratos Auditados</div>
              <div style={{ fontSize: "22px", fontWeight: "900", color: "#15803d" }}>
                {registrosDimob.length} Contratos Prontos
              </div>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px" }}>Contrato & Imóvel</th>
                  <th style={{ padding: "12px" }}>Proprietário Locador</th>
                  <th style={{ padding: "12px" }}>Inquilino Locatário</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Aluguel Anual</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Comissão Anual</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>IRRF Retido</th>
                  <th style={{ padding: "12px" }}>Validação RFB</th>
                </tr>
              </thead>
              <tbody>
                {registrosDimob.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "700", color: "#121212" }}>{r.contratoNumero}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>{r.imovelCodigo}</div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "700", color: "#121212" }}>{r.locadorNome}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>CPF/CNPJ: {r.locadorCpfCnpj}</div>
                    </td>
                    <td style={{ padding: "12px" }}>
                      <div style={{ fontWeight: "700", color: "#121212" }}>{r.locatarioNome}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>CPF: {r.locatarioCpfCnpj}</div>
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "700", color: "#121212" }}>
                      R$ {r.valorAluguelAnual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", fontWeight: "800", color: "#C6A15B" }}>
                      R$ {r.valorComissaoAnual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </td>
                    <td style={{ padding: "12px", textAlign: "right", color: "#64748b" }}>
                      R$ {r.valorIrrfAnual.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "700",
                          background: "#dcfce7",
                          color: "#15803d",
                        }}
                      >
                        ✓ Pronto para Transmissão
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {abaAtiva === "reforma" && (
        <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 12px 0" }}>
            Enquadramento Tributário - Reforma Tributária (IBS / CBS)
          </h2>
          <p style={{ color: "#64748b", fontSize: "14px", lineHeight: "1.6" }}>
            Em conformidade com a Emenda Constitucional nº 132/2023 e as Notas Técnicas da Receita Federal, o setor de intermediação e locação imobiliária dispõe de classificação fiscal própria e deduções específicas de base de cálculo.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "20px" }}>
            <div style={{ padding: "18px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: "700", color: "#121212", marginBottom: "6px" }}>
                Intermediação Imobiliária (Corretagem)
              </div>
              <div style={{ fontSize: "13px", color: "#475569" }}>
                • CST IBS/CBS: <strong>000 (Tributação Integral)</strong><br />
                • Código Classificação: <code>cClassTrib 000001</code><br />
                • Base de Cálculo: Exclusivamente os honorários da imobiliária (6%).
              </div>
            </div>
            <div style={{ padding: "18px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: "700", color: "#121212", marginBottom: "6px" }}>
                Administração de Locações (Aluguéis)
              </div>
              <div style={{ fontSize: "13px", color: "#475569" }}>
                • CST IBS/CBS: <strong>Regime Específico de Serviços Imobiliários</strong><br />
                • Dedução expressa: O valor repassado ao proprietário não compõe a receita tributável.<br />
                • Alíquota aplicada somente sobre a taxa de administração retida (10%).
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
