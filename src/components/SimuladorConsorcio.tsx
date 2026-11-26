import React, { useMemo, useState } from "react";
import {
  calcularSimulacaoConsorcio,
  formatarMoeda,
  formatarPercentual,
  TABELAS_ADMINISTRADORAS,
  TAXAS_PADRAO_CATEGORIA,
} from "../lib/motor-consorcios";
import type { AdministradoraConsorcio, CategoriaConsorcio } from "../types/consorcio";

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
    descricao: "Tratores, colheitadeiras, caminhões e implementos agrícolas",
    valorPadrao: 600_000,
    valorMin: 200_000,
    valorMax: 2_000_000,
    passo: 50_000,
    prazoPadrao: 100,
    prazosDisponiveis: [60, 84, 100, 120],
  },
  {
    id: "servicos",
    titulo: "Serviços & Solar",
    icone: "☀️",
    descricao: "Energia solar fotovoltaica, reformas, cirurgias e viagens",
    valorPadrao: 35_000,
    valorMin: 15_000,
    valorMax: 100_000,
    passo: 2_500,
    prazoPadrao: 36,
    prazosDisponiveis: [24, 36, 48],
  },
];

export const SimuladorConsorcio: React.FC<SimuladorProps> = ({
  telefoneWhatsappPadrao = "5565999025800",
  aoSubmeterLead,
}) => {
  const [categoria, setCategoria] = useState<CategoriaConsorcio>("imobiliario");
  const configCat = CATEGORIAS_CONFIG.find((c) => c.id === categoria) || CATEGORIAS_CONFIG[0];

  const [valorCredito, setValorCredito] = useState<number>(configCat.valorPadrao);
  const [prazoMeses, setPrazoMeses] = useState<number>(configCat.prazoPadrao);
  const [modalidade, setModalidade] = useState<"integral" | "reduzida_70" | "reduzida_50">("integral");
  const [administradora, setAdministradora] = useState<AdministradoraConsorcio | "todas">("todas");

  // Dados do formulário de contato rápido
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [enviado, setEnviado] = useState(false);

  // Ao mudar de categoria, ajusta limites e prazos padrão
  const handleTrocaCategoria = (novaCat: CategoriaConsorcio) => {
    setCategoria(novaCat);
    const novaConfig = CATEGORIAS_CONFIG.find((c) => c.id === novaCat) || CATEGORIAS_CONFIG[0];
    setValorCredito(novaConfig.valorPadrao);
    setPrazoMeses(novaConfig.prazoPadrao);
    setAdministradora("todas");
  };

  const resultado = useMemo(() => {
    return calcularSimulacaoConsorcio({
      categoria,
      valorCredito,
      prazoMeses,
      modalidadeParcela: modalidade,
      administradoraSugerida: administradora === "todas" ? undefined : administradora,
    });
  }, [categoria, valorCredito, prazoMeses, modalidade, administradora]);

  const linkWhatsapp = useMemo(() => {
    const texto = encodeURIComponent(
      `Olá! Estive no site da Domus e simulei um Consórcio ${configCat.titulo}.\n\n` +
        `• Crédito: ${formatarMoeda(valorCredito)}\n` +
        `• Prazo: ${prazoMeses} meses\n` +
        `• Parcela estimada: ${formatarMoeda(
          modalidade === "reduzida_70" && resultado.parcelaReduzidaMensal
            ? resultado.parcelaReduzidaMensal
            : resultado.parcelaIntegralMensal,
        )}/mês\n` +
        `• Economia estimada vs Financiamento: ${formatarMoeda(
          resultado.comparativoFinanciamento.economiaConsorcioValor,
        )}\n\n` +
        `Gostaria de receber uma proposta detalhada dos grupos disponíveis com maior chance de contemplação.`,
    );
    return `https://wa.me/${telefoneWhatsappPadrao}?text=${texto}`;
  }, [configCat, valorCredito, prazoMeses, modalidade, resultado, telefoneWhatsappPadrao]);

  const handleSubmitLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !telefone.trim()) return;
    if (aoSubmeterLead) {
      aoSubmeterLead({
        nome,
        telefone,
        categoria,
        valorCredito,
        prazoMeses,
      });
    }
    setEnviado(true);
  };

  return (
    <div style={{ background: "#ffffff", borderRadius: "16px", padding: "32px", border: "1px solid #e2e8f0" }}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0e6b57", margin: "0 0 8px 0" }}>
          Simulador Inteligente Domus Consórcios
        </h2>
        <p style={{ color: "#4a5568", fontSize: "16px", margin: 0 }}>
          Descubra o plano ideal para conquistar seu patrimônio sem pagar os juros abusivos do financiamento.
        </p>
      </div>

      {/* Seletor de Categorias */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "12px",
          marginBottom: "28px",
        }}
      >
        {CATEGORIAS_CONFIG.map((cat) => {
          const ativo = cat.id === categoria;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleTrocaCategoria(cat.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 12px",
                borderRadius: "12px",
                border: ativo ? "2px solid #0e6b57" : "1px solid #cbd5e1",
                background: ativo ? "#e6f4f1" : "#f8fafc",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: "28px", marginBottom: "6px" }}>{cat.icone}</span>
              <span style={{ fontWeight: "700", color: ativo ? "#0e6b57" : "#1e293b", fontSize: "15px" }}>
                {cat.titulo}
              </span>
              <span style={{ fontSize: "11px", color: "#64748b", textAlign: "center", marginTop: "4px" }}>
                {cat.descricao}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Configuração do Crédito e Prazo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        {/* Controle do Valor do Crédito */}
        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>
            Valor do Crédito Desejado
          </label>
          <div style={{ fontSize: "32px", fontWeight: "800", color: "#0e6b57", marginBottom: "12px" }}>
            {formatarMoeda(valorCredito)}
          </div>
          <input
            type="range"
            min={configCat.valorMin}
            max={configCat.valorMax}
            step={configCat.passo}
            value={valorCredito}
            onChange={(e) => setValorCredito(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#0e6b57", cursor: "pointer" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginTop: "6px" }}>
            <span>{formatarMoeda(configCat.valorMin)}</span>
            <span>{formatarMoeda(configCat.valorMax)}</span>
          </div>
        </div>

        {/* Controle do Prazo */}
        <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#334155", marginBottom: "8px" }}>
            Prazo do Plano
          </label>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
            {configCat.prazosDisponiveis.map((p) => {
              const selecionado = p === prazoMeses;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPrazoMeses(p)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    border: selecionado ? "2px solid #0e6b57" : "1px solid #cbd5e1",
                    background: selecionado ? "#0e6b57" : "#ffffff",
                    color: selecionado ? "#ffffff" : "#334155",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {p} meses ({Math.floor(p / 12)}a{p % 12 ? ` ${p % 12}m` : ""})
                </button>
              );
            })}
          </div>

          <div style={{ marginTop: "16px" }}>
            <label style={{ fontSize: "13px", fontWeight: "600", color: "#475569" }}>Modalidade de Parcela:</label>
            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button
                type="button"
                onClick={() => setModalidade("integral")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: modalidade === "integral" ? "1px solid #0e6b57" : "1px solid #cbd5e1",
                  background: modalidade === "integral" ? "#e6f4f1" : "#ffffff",
                  color: modalidade === "integral" ? "#0e6b57" : "#64748b",
                }}
              >
                100% Integral
              </button>
              <button
                type="button"
                onClick={() => setModalidade("reduzida_70")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                  border: modalidade === "reduzida_70" ? "1px solid #0e6b57" : "1px solid #cbd5e1",
                  background: modalidade === "reduzida_70" ? "#e6f4f1" : "#ffffff",
                  color: modalidade === "reduzida_70" ? "#0e6b57" : "#64748b",
                }}
              >
                70% até contemplar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados e Comparativo Financeiro */}
      <div
        style={{
          background: "linear-gradient(135deg, #0e6b57 0%, #08493b 100%)",
          borderRadius: "16px",
          padding: "28px",
          color: "#ffffff",
          marginBottom: "32px",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          <div>
            <div style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.85 }}>
              Parcela Estimada no Consórcio
            </div>
            <div style={{ fontSize: "36px", fontWeight: "900", margin: "6px 0" }}>
              {formatarMoeda(
                modalidade === "reduzida_70" && resultado.parcelaReduzidaMensal
                  ? resultado.parcelaReduzidaMensal
                  : resultado.parcelaIntegralMensal,
              )}
              <span style={{ fontSize: "16px", fontWeight: "500" }}>/mês</span>
            </div>
            {modalidade === "reduzida_70" && (
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                * Parcela reduzida de 70% até a contemplação. Integral: {formatarMoeda(resultado.parcelaIntegralMensal)}
                /mês.
              </div>
            )}
            <div style={{ fontSize: "13px", marginTop: "10px", opacity: 0.9 }}>
              Taxa de administração: {formatarPercentual(resultado.taxaAdmTotalPct)} total diluída (apenas{" "}
              {formatarPercentual(resultado.taxaAdmMensalPct, 3)}/mês). Sem juros!
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.85 }}>
              Economia Real vs Financiamento
            </div>
            <div style={{ fontSize: "30px", fontWeight: "900", color: "#5eead4", margin: "6px 0" }}>
              {formatarMoeda(resultado.comparativoFinanciamento.economiaConsorcioValor)}
            </div>
            <div style={{ fontSize: "13px", opacity: 0.9 }}>
              Você economiza cerca de {resultado.comparativoFinanciamento.economiaConsorcioPercentual.toFixed(1)}% do
              valor total que pagaria em juros para o banco!
            </div>
          </div>

          <div
            style={{
              background: "rgba(255, 255, 255, 0.12)",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <div style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", opacity: 0.85 }}>
              Lance Embutido Permitido
            </div>
            <div style={{ fontSize: "28px", fontWeight: "800", margin: "6px 0" }}>
              Até {formatarMoeda(resultado.lanceEmbutidoMaximo.valorMaximoLance)}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>
              Você pode ofertar até 30% da própria carta para acelerar sua contemplação sem tirar dinheiro do bolso.
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "28px" }}>
          <a
            href={linkWhatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              background: "#25d366",
              color: "#ffffff",
              padding: "16px 36px",
              borderRadius: "50px",
              fontSize: "17px",
              fontWeight: "700",
              textDecoration: "none",
              boxShadow: "0 10px 25px rgba(37, 211, 102, 0.35)",
              transition: "transform 0.2s ease",
            }}
          >
            Solicitar Esta Proposta no WhatsApp Oficial
          </a>
        </div>
      </div>

      {/* Formulário Rápido de Consultoria */}
      <div style={{ background: "#f8fafc", padding: "24px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#1e293b", margin: "0 0 8px 0" }}>
          Prefere que nossa assessoria entre em contato com você?
        </h3>
        <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 16px 0" }}>
          Nossos consultores analisarão os grupos abertos com menor índice de lances para a sua faixa de crédito.
        </p>

        {enviado ? (
          <div style={{ background: "#ecfdf5", color: "#065f46", padding: "16px", borderRadius: "8px", fontWeight: "600" }}>
            Obrigado, {nome}! Sua solicitação foi recebida e nossa equipe entrará em contato em breve.
          </div>
        ) : (
          <form
            onSubmit={handleSubmitLead}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}
          >
            <input
              type="text"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
            <input
              type="tel"
              placeholder="Seu WhatsApp (com DDD)"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              style={{ padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            />
            <button
              type="submit"
              style={{
                background: "#0e6b57",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontWeight: "700",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Receber Estudo de Grupos
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
