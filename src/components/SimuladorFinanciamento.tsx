import React, { useState, useMemo } from "react";
import { Calculator, ArrowRight, CheckCircle2, TrendingDown, Landmark, Sparkles } from "lucide-react";
import { simularFinanciamento } from "../lib/motorFinanciamento";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  valorPadraoImovel?: number;
  aoIrParaConsorcio?: () => void;
}

export const SimuladorFinanciamento: React.FC<Props> = ({
  valorPadraoImovel = 800000,
  aoIrParaConsorcio,
}) => {
  const [valorImovel, setValorImovel] = useState<number>(valorPadraoImovel);
  const [percentualEntrada, setPercentualEntrada] = useState<number>(20);
  const [prazoMeses, setPrazoMeses] = useState<number>(360);
  const [taxaJurosAnual, setTaxaJurosAnual] = useState<number>(10.8);
  const [sistemaAmortizacao, setSistemaAmortizacao] = useState<"SAC" | "PRICE">("SAC");

  const valorEntrada = useMemo(
    () => Math.round((valorImovel * percentualEntrada) / 100),
    [valorImovel, percentualEntrada],
  );

  const resultado = useMemo(() => {
    return simularFinanciamento({
      valorImovel,
      valorEntrada,
      prazoMeses,
      taxaJurosAnualPct: taxaJurosAnual,
      sistema: sistemaAmortizacao,
    });
  }, [valorImovel, valorEntrada, prazoMeses, taxaJurosAnual, sistemaAmortizacao]);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "32px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
        <div style={{ background: "#F7F3EA", padding: "8px", borderRadius: "8px" }}>
          <Calculator size={22} color="#C6A15B" />
        </div>
        <div>
          <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#121212", margin: 0 }}>
            Simulador de Financiamento Habitacional (SAC vs PRICE)
          </h3>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            Compare as tabelas oficiais praticadas pelos principais bancos (Caixa, Itaú, Bradesco e Santander)
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          marginTop: "24px",
        }}
      >
        {/* Controles de Parâmetros */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>Valor do Imóvel</label>
              <span style={{ fontSize: "15px", fontWeight: "800", color: "#C6A15B" }}>
                {formatarDinheiro(valorImovel)}
              </span>
            </div>
            <input
              type="range"
              min={150000}
              max={5000000}
              step={25000}
              value={valorImovel}
              onChange={(e) => setValorImovel(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#C6A15B", cursor: "pointer" }}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>
                Entrada ({percentualEntrada}%)
              </label>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "#121212" }}>
                {formatarDinheiro(valorEntrada)}
              </span>
            </div>
            <input
              type="range"
              min={20}
              max={70}
              step={5}
              value={percentualEntrada}
              onChange={(e) => setPercentualEntrada(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#C6A15B", cursor: "pointer" }}
            />
            <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
              Saldo financiado: <strong>{formatarDinheiro(resultado.valorFinanciado)}</strong>
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <label style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>
                Prazo de Pagamento ({prazoMeses} meses / {prazoMeses / 12} anos)
              </label>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {[120, 180, 240, 300, 360, 420].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrazoMeses(p)}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    borderRadius: "6px",
                    border: prazoMeses === p ? "2px solid #C6A15B" : "1px solid #cbd5e1",
                    background: prazoMeses === p ? "#121212" : "#ffffff",
                    color: prazoMeses === p ? "#ffffff" : "#121212",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  {p}m
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "6px" }}>
              Sistema de Amortização
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setSistemaAmortizacao("SAC")}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: sistemaAmortizacao === "SAC" ? "2px solid #C6A15B" : "1px solid #cbd5e1",
                  background: sistemaAmortizacao === "SAC" ? "#F7F3EA" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#121212" }}>Tabela SAC</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Parcelas decrescentes (recomendado)</div>
              </button>
              <button
                type="button"
                onClick={() => setSistemaAmortizacao("PRICE")}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: sistemaAmortizacao === "PRICE" ? "2px solid #C6A15B" : "1px solid #cbd5e1",
                  background: sistemaAmortizacao === "PRICE" ? "#F7F3EA" : "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <div style={{ fontWeight: "800", fontSize: "13px", color: "#121212" }}>Tabela PRICE</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Parcelas fixas do início ao fim</div>
              </button>
            </div>
          </div>
        </div>

        {/* Painel de Resultados */}
        <div
          style={{
            background: "#121212",
            color: "#ffffff",
            borderRadius: "14px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span
                style={{
                  background: "rgba(198, 161, 91, 0.2)",
                  color: "#C6A15B",
                  padding: "4px 10px",
                  borderRadius: "20px",
                  fontSize: "11px",
                  fontWeight: "700",
                }}
              >
                RESULTADO DO FINANCIAMENTO
              </span>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>
                Taxa: {taxaJurosAnual}% a.a. ({resultado.taxaJurosMensalPct.toFixed(2)}% a.m.)
              </span>
            </div>

            <div style={{ margin: "20px 0" }}>
              <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                {sistemaAmortizacao === "SAC" ? "Primeira Parcela" : "Valor da Parcela Fixa"}
              </div>
              <div style={{ fontSize: "36px", fontWeight: "800", color: "#C6A15B" }}>
                {formatarDinheiro(resultado.primeiraParcela)}
              </div>
              {sistemaAmortizacao === "SAC" && (
                <div style={{ fontSize: "13px", color: "#cbd5e1", marginTop: "4px" }}>
                  Última parcela estimada: <strong>{formatarDinheiro(resultado.ultimaParcela)}</strong>
                </div>
              )}
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                padding: "16px",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8" }}>Total Amortizado (Principal):</span>
                <span>{formatarDinheiro(resultado.totalAmortizado)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#94a3b8" }}>Total Pago em Juros Bancários:</span>
                <span style={{ color: "#f87171", fontWeight: "700" }}>{formatarDinheiro(resultado.totalJuros)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingTop: "8px",
                  fontWeight: "700",
                }}
              >
                <span>Custo Efetivo Total do Imóvel:</span>
                <span style={{ color: "#C6A15B" }}>{formatarDinheiro(resultado.custoTotal)}</span>
              </div>
            </div>
          </div>

          {/* Destaque da Alternativa em Consórcio Domus */}
          {aoIrParaConsorcio && (
            <div
              style={{
                marginTop: "20px",
                background: "rgba(198, 161, 91, 0.15)",
                border: "1px solid #C6A15B",
                borderRadius: "10px",
                padding: "14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div>
                <div style={{ fontSize: "13px", fontWeight: "800", color: "#C6A15B" }}>
                  💡 Economize até {formatarDinheiro(resultado.totalJuros * 0.75)} no Consórcio!
                </div>
                <div style={{ fontSize: "11px", color: "#cbd5e1" }}>
                  Sem juros bancários compostos. Apenas taxa de administração fixa.
                </div>
              </div>
              <button
                type="button"
                onClick={aoIrParaConsorcio}
                style={{
                  background: "#C6A15B",
                  color: "#121212",
                  border: "none",
                  padding: "8px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "800",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Ver Consórcio
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
