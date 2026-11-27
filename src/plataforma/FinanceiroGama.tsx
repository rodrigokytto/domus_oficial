import React, { useState, useMemo } from "react";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Landmark,
  ShieldAlert,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  CONTAS_BANCARIAS_MOCK,
  LANCAMENTOS_FINANCEIROS_MOCK,
} from "../data/backofficeMock";
import { calcularDreConsolidado, gerarChaveIdempotencia } from "../lib/motorBackoffice";
import type { LancamentoFinanceiro } from "../types/backoffice";

export const FinanceiroGama: React.FC = () => {
  const [lancamentos, setLancamentos] = useState<LancamentoFinanceiro[]>(
    LANCAMENTOS_FINANCEIROS_MOCK
  );
  const [filtroCentro, setFiltroCentro] = useState<string>("TODOS");
  const [filtroTipo, setFiltroTipo] = useState<string>("TODOS");
  const [busca, setBusca] = useState("");
  const [modalNovoAberto, setModalNovoAberto] = useState(false);

  // Form novo lançamento
  const [novoDescricao, setNovoDescricao] = useState("");
  const [novoValor, setNovoValor] = useState("");
  const [novoTipo, setNovoTipo] = useState<"receita" | "despesa">("receita");
  const [novoCentro, setNovoCentro] = useState<
    "LOCACAO" | "VENDAS" | "AGRO_MT" | "CONSORCIOS" | "ADMINISTRATIVO"
  >("LOCACAO");
  const [novoContraparte, setNovoContraparte] = useState("");

  // DRE Consolidado
  const dre = useMemo(() => calcularDreConsolidado(lancamentos), [lancamentos]);

  // Saldo bancário total
  const saldoTotalBancos = useMemo(
    () => CONTAS_BANCARIAS_MOCK.reduce((acc, c) => acc + c.saldo, 0),
    []
  );

  // Filtragem
  const lancamentosFiltrados = useMemo(() => {
    return lancamentos.filter((l) => {
      const matchCentro = filtroCentro === "TODOS" || l.centroCusto === filtroCentro;
      const matchTipo = filtroTipo === "TODOS" || l.tipo === filtroTipo;
      const matchBusca =
        !busca ||
        l.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        l.contraparteNome.toLowerCase().includes(busca.toLowerCase()) ||
        l.chaveIdempotencia.toLowerCase().includes(busca.toLowerCase());
      return matchCentro && matchTipo && matchBusca;
    });
  }, [lancamentos, filtroCentro, filtroTipo, busca]);

  const handleCriarLancamento = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(novoValor.replace(",", "."));
    if (!novoDescricao || isNaN(val) || val <= 0) return;

    const novoId = `lanc_${Date.now()}`;
    const chave = gerarChaveIdempotencia("gama", "manual", novoId, "2026-11");

    const novo: LancamentoFinanceiro = {
      id: novoId,
      descricao: novoDescricao,
      tipo: novoTipo,
      natureza: novoTipo === "receita" ? "receber" : "pagar",
      centroCusto: novoCentro,
      contaBancaria: "Sicredi (Agência Tangará da Serra)",
      contraparteNome: novoContraparte || "Diversos",
      contraparteDoc: "000.000.000-00",
      valorNominal: val,
      valorEncargos: 0,
      valorDesconto: 0,
      valorEfetivo: val,
      dataCompetencia: "2026-11-27",
      dataVencimento: "2026-11-30",
      status: "pendente",
      chaveIdempotencia: chave,
      numeroDocumento: `MAN-${Date.now().toString().slice(-4)}`,
      origemModulo: "manual",
    };

    setLancamentos([novo, ...lancamentos]);
    setModalNovoAberto(false);
    setNovoDescricao("");
    setNovoValor("");
    setNovoContraparte("");
  };

  const liquidarLancamento = (id: string) => {
    setLancamentos((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "liquidado",
              dataLiquidacao: new Date().toISOString(),
              meioLiquidacao: "pix",
            }
          : l
      )
    );
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Top Header */}
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
            <DollarSign size={16} />
            <span>ERP Financeiro & Tesouraria · Kytto Core</span>
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", margin: 0, color: "#ffffff" }}>
            Razão Universal & DRE Consolidado
          </h1>
          <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "14px" }}>
            Gestão com idempotência transacional, rateio por centro de custo e conciliação bancária de Tangará da Serra.
          </p>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={() => setModalNovoAberto(true)}
            style={{
              background: "#C6A15B",
              color: "#121212",
              border: "none",
              padding: "12px 20px",
              borderRadius: "8px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Plus size={18} />
            <span>Novo Lançamento</span>
          </button>
        </div>
      </div>

      {/* Cartões de Indicadores e DRE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
        }}
      >
        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
            Saldo Consolidado Bancos
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#121212", margin: "6px 0" }}>
            R$ {saldoTotalBancos.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#15803d", display: "flex", alignItems: "center", gap: "4px" }}>
            <CheckCircle2 size={14} /> 3 Contas Conciliadas (Sicredi / BB / Itaú)
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
            Receita Bruta Operacional (DRE)
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#C6A15B", margin: "6px 0" }}>
            R$ {dre.receitaBruta.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Honorários 6%, Taxas Adm 10% e Consórcios
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "700", textTransform: "uppercase" }}>
            Repasses & Custos Diretos
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#dc2626", margin: "6px 0" }}>
            R$ {dre.custosServicosERepasses.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Repasses a Locadores e Split Corretores
          </div>
        </div>

        <div style={{ background: "#121212", color: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #C6A15B" }}>
          <div style={{ fontSize: "12px", color: "#C6A15B", fontWeight: "700", textTransform: "uppercase" }}>
            Resultado Líquido do Exercício
          </div>
          <div style={{ fontSize: "26px", fontWeight: "900", color: "#ffffff", margin: "6px 0" }}>
            R$ {dre.resultadoLiquidoDRE.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>
            Margem Líquida Operacional: <strong style={{ color: "#C6A15B" }}>{dre.margemLiquidaPerc}%</strong>
          </div>
        </div>
      </div>

      {/* Contas Bancárias da Tesouraria */}
      <div style={{ background: "#ffffff", borderRadius: "12px", padding: "20px", border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
          <Landmark size={20} color="#C6A15B" />
          <h2 style={{ fontSize: "16px", fontWeight: "800", color: "#121212", margin: 0 }}>
            Tesouraria & Contas Bancárias Homologadas
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
          {CONTAS_BANCARIAS_MOCK.map((c) => (
            <div
              key={c.id}
              style={{
                padding: "16px",
                background: "#f8fafc",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: "700", color: "#121212", fontSize: "14px" }}>{c.bancoNome}</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>
                  Ag: {c.agencia} · Conta: {c.conta}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "800", color: "#121212", fontSize: "15px" }}>
                  R$ {c.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: "11px", color: "#15803d", fontWeight: "700" }}>✓ OFX Sincronizado</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabela do Razão Universal de Lançamentos */}
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
              Razão Financeiro Universal ({lancamentosFiltrados.length} lançamentos)
            </h2>
            <p style={{ margin: "4px 0 0 0", color: "#64748b", fontSize: "13px" }}>
              Idempotência garantida contra duplicidade e conciliação em tempo real.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Buscar lançamento..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                style={{
                  padding: "8px 12px 8px 32px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <select
              value={filtroCentro}
              onChange={(e) => setFiltroCentro(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontWeight: "600",
                color: "#121212",
              }}
            >
              <option value="TODOS">Todos os Centros de Custo</option>
              <option value="LOCACAO">Locação</option>
              <option value="VENDAS">Vendas</option>
              <option value="AGRO_MT">Agro MT (Fazendas)</option>
              <option value="CONSORCIOS">Consórcios</option>
              <option value="ADMINISTRATIVO">Administrativo</option>
            </select>

            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                fontWeight: "600",
                color: "#121212",
              }}
            >
              <option value="TODOS">Todas as Naturezas</option>
              <option value="receita">Receitas</option>
              <option value="despesa">Despesas</option>
            </select>
          </div>
        </div>

        {/* Tabela */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                <th style={{ padding: "12px" }}>Tipo</th>
                <th style={{ padding: "12px" }}>Descrição & Contraparte</th>
                <th style={{ padding: "12px" }}>Centro de Custo</th>
                <th style={{ padding: "12px" }}>Competência</th>
                <th style={{ padding: "12px" }}>Vencimento</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Valor Efetivo</th>
                <th style={{ padding: "12px" }}>Status</th>
                <th style={{ padding: "12px", textAlign: "center" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {lancamentosFiltrados.map((l) => (
                <tr key={l.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "11px",
                        fontWeight: "700",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        background: l.tipo === "receita" ? "#dcfce7" : "#fee2e2",
                        color: l.tipo === "receita" ? "#15803d" : "#b91c1c",
                      }}
                    >
                      {l.tipo === "receita" ? <ArrowDownRight size={12} /> : <ArrowUpRight size={12} />}
                      {l.tipo === "receita" ? "Receita" : "Despesa"}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <div style={{ fontWeight: "700", color: "#121212" }}>{l.descricao}</div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      {l.contraparteNome} · <code style={{ color: "#94a3b8" }}>{l.chaveIdempotencia}</code>
                    </div>
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        background: "#f1f5f9",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        color: "#334155",
                      }}
                    >
                      {l.centroCusto}
                    </span>
                  </td>
                  <td style={{ padding: "12px", color: "#475569" }}>{l.dataCompetencia}</td>
                  <td style={{ padding: "12px", color: "#475569" }}>{l.dataVencimento}</td>
                  <td
                    style={{
                      padding: "12px",
                      textAlign: "right",
                      fontWeight: "800",
                      color: l.tipo === "receita" ? "#15803d" : "#b91c1c",
                    }}
                  >
                    R$ {l.valorEfetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                        background: l.status === "liquidado" ? "#dcfce7" : "#fef3c7",
                        color: l.status === "liquidado" ? "#15803d" : "#b45309",
                      }}
                    >
                      {l.status === "liquidado" ? "Liquidado" : "Pendente"}
                    </span>
                  </td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    {l.status === "pendente" ? (
                      <button
                        onClick={() => liquidarLancamento(l.id)}
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
                        Liquidar PIX
                      </button>
                    ) : (
                      <span style={{ fontSize: "11px", color: "#64748b" }}>Conciliado</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo Lançamento */}
      {modalNovoAberto && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "28px",
              maxWidth: "520px",
              width: "100%",
              boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
              Novo Lançamento no Razão Universal
            </h3>
            <form onSubmit={handleCriarLancamento} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Descrição</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pagamento de Vistoria Externa"
                  value={novoDescricao}
                  onChange={(e) => setNovoDescricao(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Tipo</label>
                  <select
                    value={novoTipo}
                    onChange={(e) => setNovoTipo(e.target.value as any)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="receita">Receita</option>
                    <option value="despesa">Despesa</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Valor (R$)</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 1500,00"
                    value={novoValor}
                    onChange={(e) => setNovoValor(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Centro de Custo</label>
                  <select
                    value={novoCentro}
                    onChange={(e) => setNovoCentro(e.target.value as any)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="LOCACAO">Locação</option>
                    <option value="VENDAS">Vendas</option>
                    <option value="AGRO_MT">Agro MT</option>
                    <option value="CONSORCIOS">Consórcios</option>
                    <option value="ADMINISTRATIVO">Administrativo</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: "700", color: "#475569" }}>Contraparte</label>
                  <input
                    type="text"
                    placeholder="Nome do favorecido/pagador"
                    value={novoContraparte}
                    onChange={(e) => setNovoContraparte(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setModalNovoAberto(false)}
                  style={{
                    background: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    background: "#C6A15B",
                    color: "#121212",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Registrar Lançamento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
