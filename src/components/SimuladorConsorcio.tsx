import type React from "react";
import { useMemo, useState } from "react";
import {
  calcularSimulacaoConsorcio,
  formatarMoeda,
  formatarPercentual,
} from "../lib/motor-consorcios";
import type { CategoriaConsorcio } from "../types/consorcio";
import { MARCA_GAMA } from "../lib/marcaGama";

interface SimuladorProps {
  telefoneWhatsappPadrao?: string;
  aoSubmeterLead?: (dados: {
    nome: string;
    telefone: string;
    categoria: CategoriaConsorcio;
    valorCredito: number;
    prazoMeses: number;
  }) => void;
}

const CATEGORIAS_CONFIG: {
  id: CategoriaConsorcio;
  titulo: string;
  icone: string;
  descricao: string;
  valorPadrao: number;
  valorMin: number;
  valorMax: number;
  passo: number;
  prazoPadrao: number;
  prazosDisponiveis: number[];
}[] = [
  {
    id: "imobiliario",
    titulo: "Imobiliário",
    icone: "🏠",
    descricao: "Casas, apartamentos, terrenos, obras e quitação de financiamento",
    valorPadrao: 500_000,
    valorMin: 150_000,
    valorMax: 2_500_000,
    passo: 25_000,
    prazoPadrao: 200,
    prazosDisponiveis: [120, 150, 180, 200, 240],
  },
  {
    id: "veiculo_leve",
    titulo: "Veículos & Autos",
    icone: "🚗",
    descricao: "Carros novos e seminovos, utilitários e frotas leves",
    valorPadrao: 90_000,
    valorMin: 40_000,
    valorMax: 350_000,
    passo: 5_000,
    prazoPadrao: 84,
    prazosDisponiveis: [36, 48, 60, 72, 84, 100],
  },
  {
    id: "pesados_agro",
    titulo: "Pesados & Agro",
    icone: "🚜",
    descricao: "Tratores, colheitadeiras, caminhões, implementos e pivôs",
    valorPadrao: 800_000,
    valorMin: 200_000,
    valorMax: 3_000_000,
    passo: 50_000,
    prazoPadrao: 120,
    prazosDisponiveis: [60, 84, 100, 120, 150],
  },
  {
    id: "servicos",
    titulo: "Alavancagem & Serviços",
    icone: "📈",
    descricao: "Construção de patrimônio, capital de giro e reformas",
    valorPadrao: 60_000,
    valorMin: 20_000,
    valorMax: 200_000,
    passo: 5_000,
    prazoPadrao: 40,
    prazosDisponiveis: [24, 36, 40, 48],
  },
];

export const SimuladorConsorcio: React.FC<SimuladorProps> = ({
  telefoneWhatsappPadrao = MARCA_GAMA.telefoneWhatsapp,
  aoSubmeterLead,
}) => {
  const [categoriaAtiva, setCategoriaAtiva] = useState<CategoriaConsorcio>("imobiliario");
  const configAtual = useMemo(
    () => CATEGORIAS_CONFIG.find((c) => c.id === categoriaAtiva) ?? CATEGORIAS_CONFIG[0],
    [categoriaAtiva],
  );

  const [valorCredito, setValorCredito] = useState<number>(configAtual.valorPadrao);
  const [prazoMeses, setPrazoMeses] = useState<number>(configAtual.prazoPadrao);
  const [modalidade, setModalidade] = useState<"integral" | "reduzida_70">("reduzida_70");

  // Form Lead
  const [nomeLead, setNomeLead] = useState("");
  const [telefoneLead, setTelefoneLead] = useState("");
  const [leadEnviado, setLeadEnviado] = useState(false);

  const trocarCategoria = (nova: CategoriaConsorcio) => {
    setCategoriaAtiva(nova);
    const novaCfg = CATEGORIAS_CONFIG.find((c) => c.id === nova) ?? CATEGORIAS_CONFIG[0];
    setValorCredito(novaCfg.valorPadrao);
    setPrazoMeses(novaCfg.prazoPadrao);
    setLeadEnviado(false);
  };

  const resultado = useMemo(() => {
    return calcularSimulacaoConsorcio({
      categoria: categoriaAtiva,
      valorCredito,
      prazoMeses,
      modalidadeParcela: modalidade,
    });
  }, [categoriaAtiva, valorCredito, prazoMeses, modalidade]);

  const parcelaExibida = resultado.parcelaReduzidaMensal ?? resultado.parcelaIntegralMensal;

  const enviarWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (aoSubmeterLead && nomeLead && telefoneLead) {
      aoSubmeterLead({
        nome: nomeLead,
        telefone: telefoneLead,
        categoria: categoriaAtiva,
        valorCredito,
        prazoMeses,
      });
    }

    const mensagem = encodeURIComponent(
      `Olá! Fiz uma simulação na Domus Consórcios & Gama Patrimonial:\n\n` +
        `• Categoria: ${configAtual.titulo}\n` +
        `• Crédito: ${formatarMoeda(valorCredito)}\n` +
        `• Prazo: ${prazoMeses} meses\n` +
        `• Parcela Inicial: ${formatarMoeda(parcelaExibida)}\n` +
        `• Modalidade: ${modalidade === "reduzida_70" ? "Parcela Reduzida 70%" : "Integral"}\n\n` +
        `Meu nome é ${nomeLead || "Cliente"} (${telefoneLead || "Contato"}). Gostaria de receber uma proposta detalhada.`,
    );

    window.open(`https://wa.me/${telefoneWhatsappPadrao}?text=${mensagem}`, "_blank");
    setLeadEnviado(true);
  };

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05)",
        border: "1px solid #E5DFC9",
        padding: "32px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#121212", margin: "0 0 8px 0" }}>
          Simulador de Consórcio Domus & Gama Patrimonial
        </h2>
        <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>
          Descubra o valor exato da sua parcela sem juros e compare com o financiamento bancário
        </p>
      </div>

      {/* Seletor de Categoria */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        {CATEGORIAS_CONFIG.map((cat) => {
          const ativo = cat.id === categoriaAtiva;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => trocarCategoria(cat.id)}
              style={{
                border: ativo ? "2px solid #C6A15B" : "1px solid #cbd5e1",
                background: ativo ? "#F7F3EA" : "#ffffff",
                borderRadius: "12px",
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "6px" }}>{cat.icone}</div>
              <span style={{ fontWeight: "700", color: ativo ? "#121212" : "#1e293b", fontSize: "15px" }}>
                {cat.titulo}
              </span>
              <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 0 0" }}>{cat.descricao}</p>
            </button>
          );
        })}
      </div>

      {/* Controles de Valor e Prazo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "28px",
          marginBottom: "32px",
        }}
      >
        {/* Controle do Valor do Crédito */}
        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>Valor da Carta de Crédito</span>
            <span style={{ fontSize: "12px", color: "#64748b" }}>
              Mín: {formatarMoeda(configAtual.valorMin)}
            </span>
          </div>
          <div style={{ fontSize: "32px", fontWeight: "800", color: "#121212", marginBottom: "12px" }}>
            {formatarMoeda(valorCredito)}
          </div>
          <input
            type="range"
            min={configAtual.valorMin}
            max={configAtual.valorMax}
            step={configAtual.passo}
            value={valorCredito}
            onChange={(e) => setValorCredito(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#C6A15B", cursor: "pointer" }}
          />
        </div>

        {/* Controle do Prazo */}
        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>Prazo do Plano</span>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#121212" }}>
              {prazoMeses} meses ({Math.round(prazoMeses / 12)} anos)
            </span>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
            {configAtual.prazosDisponiveis.map((p) => {
              const selecionado = p === prazoMeses;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrazoMeses(p)}
                  style={{
                    border: selecionado ? "2px solid #C6A15B" : "1px solid #cbd5e1",
                    background: selecionado ? "#121212" : "#ffffff",
                    color: selecionado ? "#ffffff" : "#1e293b",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontWeight: "600",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {p}m
                </button>
              );
            })}
          </div>

          {/* Modalidade de Parcela */}
          <div style={{ marginTop: "16px" }}>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#475569", display: "block", marginBottom: "6px" }}>
              Opção de Parcela
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              <button
                type="button"
                onClick={() => setModalidade("integral")}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: modalidade === "integral" ? "1px solid #C6A15B" : "1px solid #cbd5e1",
                  background: modalidade === "integral" ? "#F7F3EA" : "#ffffff",
                  color: modalidade === "integral" ? "#121212" : "#64748b",
                  fontWeight: "600",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Parcela Integral
              </button>
              <button
                type="button"
                onClick={() => setModalidade("reduzida_70")}
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: modalidade === "reduzida_70" ? "1px solid #C6A15B" : "1px solid #cbd5e1",
                  background: modalidade === "reduzida_70" ? "#F7F3EA" : "#ffffff",
                  color: modalidade === "reduzida_70" ? "#121212" : "#64748b",
                  fontWeight: "700",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                ⭐ Reduzida 70%
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cartão de Resultado */}
      <div
        style={{
          background: "linear-gradient(135deg, #121212 0%, #2B2B2B 100%)",
          color: "#ffffff",
          borderRadius: "16px",
          padding: "28px",
          marginBottom: "28px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
          <div>
            <span style={{ fontSize: "13px", color: "#cbd5e1" }}>
              {modalidade === "reduzida_70" ? "Parcela Reduzida (até contemplação):" : "Parcela Mensal Estimada:"}
            </span>
            <div style={{ fontSize: "38px", fontWeight: "800", color: "#C6A15B", margin: "4px 0" }}>
              {formatarMoeda(parcelaExibida)}
            </div>
            <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
              Tx. Adm Total: {formatarPercentual(resultado.taxaAdmTotalPct)} ({formatarPercentual(resultado.taxaAdmTotalPct / (prazoMeses / 12))}/ano)
            </span>
          </div>

          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "16px" }}>
            <span style={{ fontSize: "13px", color: "#cbd5e1" }}>Economia vs Financiamento Bancário:</span>
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#4ade80", margin: "4px 0" }}>
              {formatarMoeda(resultado.comparativoFinanciamento.economiaConsorcioValor)}
            </div>
            <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
              Você deixa de pagar {formatarPercentual(resultado.comparativoFinanciamento.economiaConsorcioPercentual)} em juros
            </span>
          </div>
        </div>
      </div>

      {/* Formulário de Envio para WhatsApp */}
      <form
        onSubmit={enviarWhatsApp}
        style={{
          background: "#F7F3EA",
          border: "1px solid #E5DFC9",
          borderRadius: "12px",
          padding: "20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <div>
          <label style={{ fontSize: "12px", fontWeight: "600", color: "#121212", display: "block", marginBottom: "4px" }}>
            Seu Nome
          </label>
          <input
            type="text"
            required
            placeholder="Nome completo"
            value={nomeLead}
            onChange={(e) => setNomeLead(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}
          />
        </div>
        <div>
          <label style={{ fontSize: "12px", fontWeight: "600", color: "#121212", display: "block", marginBottom: "4px" }}>
            Seu WhatsApp
          </label>
          <input
            type="tel"
            required
            placeholder="(65) 99999-9999"
            value={telefoneLead}
            onChange={(e) => setTelefoneLead(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#25D366",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              padding: "12px",
              fontWeight: "700",
              fontSize: "14px",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.3)",
            }}
          >
            {leadEnviado ? "✓ Proposta Enviada!" : "Receber Proposta no WhatsApp"}
          </button>
        </div>
      </form>
    </div>
  );
};
