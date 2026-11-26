import React, { useState } from "react";
import { X, TrendingUp, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle } from "lucide-react";
import { avaliarImovelInstantaneo, type ParametrosAvaliacao, type ResultadoAvaliacao } from "../lib/motorAvaliacao";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  aoFechar: () => void;
}

export const AvaliacaoImovelModal: React.FC<Props> = ({ aoFechar }) => {
  const [parametros, setParametros] = useState<ParametrosAvaliacao>({
    tipo: "casa",
    bairro: "Jardim Europa",
    padraoAcabamento: "alto",
    areaM2: 220,
    quartos: 3,
    vagas: 2,
    estadoConservacao: "bom",
  });

  const [resultado, setResultado] = useState<ResultadoAvaliacao | null>(null);
  const [calculando, setCalculando] = useState(false);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleCalcular = () => {
    setCalculando(true);
    setTimeout(() => {
      const res = avaliarImovelInstantaneo(parametros);
      setResultado(res);
      setCalculando(false);
    }, 500);
  };

  const handleAgendarVistoriaPericial = () => {
    const texto = encodeURIComponent(
      `Olá! Fiz a avaliação preliminar do meu imóvel (${parametros.tipo} de ${parametros.areaM2}m² no bairro ${parametros.bairro}) no portal da Gama Patrimonial. Gostaria de solicitar um laudo presencial e avaliação oficial com perito credenciado CRECI ${MARCA_GAMA.creci}.`,
    );
    window.open(`https://wa.me/${MARCA_GAMA.telefoneWhatsapp}?text=${texto}`, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9993,
        background: "rgba(18, 18, 18, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          maxWidth: "800px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          position: "relative",
        }}
      >
        <button
          type="button"
          onClick={aoFechar}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#f1f5f9",
            border: "none",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b",
          }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ background: "#F7F3EA", padding: "8px", borderRadius: "8px" }}>
            <TrendingUp size={22} color="#C6A15B" />
          </div>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#121212", margin: 0 }}>
              Quanto Vale Meu Imóvel? · Avaliação Instantânea (AVM)
            </h2>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Algoritmo de inteligência de mercado imobiliário em Tangará da Serra e Mato Grosso
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginTop: "20px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Tipo de Imóvel
            </label>
            <select
              value={parametros.tipo}
              onChange={(e) => setParametros({ ...parametros, tipo: e.target.value as any })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            >
              <option value="casa">Casa Residencial</option>
              <option value="apartamento">Apartamento</option>
              <option value="cobertura">Cobertura</option>
              <option value="terreno">Terreno / Lote</option>
              <option value="comercial">Comercial / Sala</option>
              <option value="fazenda">Fazenda / Agro</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Bairro / Região
            </label>
            <select
              value={parametros.bairro}
              onChange={(e) => setParametros({ ...parametros, bairro: e.target.value })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            >
              <option value="Centro">Centro</option>
              <option value="Jardim Europa">Jardim Europa</option>
              <option value="Tarumã">Tarumã</option>
              <option value="Vila Alta">Vila Alta</option>
              <option value="Jardim Tangará">Jardim Tangará</option>
              <option value="Zona Rural">Zona Rural / MT-358</option>
              <option value="Outros">Outro Bairro</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Área Privativa / Construída (m²)
            </label>
            <input
              type="number"
              value={parametros.areaM2}
              onChange={(e) => setParametros({ ...parametros, areaM2: Math.max(10, Number(e.target.value)) })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Padrão Construtivo
            </label>
            <select
              value={parametros.padraoAcabamento}
              onChange={(e) => setParametros({ ...parametros, padraoAcabamento: e.target.value as any })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            >
              <option value="economico">Econômico / Básico</option>
              <option value="medio">Médio Padrão</option>
              <option value="alto">Alto Padrão</option>
              <option value="luxo">Altíssimo Padrão / Luxo</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Estado de Conservação
            </label>
            <select
              value={parametros.estadoConservacao}
              onChange={(e) => setParametros({ ...parametros, estadoConservacao: e.target.value as any })}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "14px" }}
            >
              <option value="novo">Novo / Recém Construído</option>
              <option value="bom">Bom Estado</option>
              <option value="regular">Regular</option>
              <option value="reforma">Necessita Reforma</option>
            </select>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button
              type="button"
              onClick={handleCalcular}
              style={{
                width: "100%",
                background: "#121212",
                color: "#C6A15B",
                border: "1px solid #C6A15B",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "800",
                cursor: "pointer",
              }}
            >
              {calculando ? "Calculando..." : "Calcular Estimativa AVM"}
            </button>
          </div>
        </div>

        {/* Resultado */}
        {resultado && (
          <div
            style={{
              marginTop: "24px",
              background: "#F7F3EA",
              borderRadius: "12px",
              border: "1px solid #E5DFC9",
              padding: "24px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <div>
                <span
                  style={{
                    background: "#121212",
                    color: "#ffffff",
                    padding: "3px 8px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontWeight: "700",
                  }}
                >
                  ESTIMATIVA DE MERCADO SUGERIDA
                </span>
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#121212", marginTop: "6px" }}>
                  {formatarDinheiro(resultado.valorMedioSugerido)}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b" }}>
                  Faixa de negociação: {formatarDinheiro(resultado.valorMinimo)} até{" "}
                  {formatarDinheiro(resultado.valorMaximo)}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "12px", color: "#64748b" }}>Valor Médio Estimado por m²</div>
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#C6A15B" }}>
                  {formatarDinheiro(resultado.precoM2Medio)}/m²
                </div>
                <div style={{ fontSize: "12px", color: "#15803d", fontWeight: "700", marginTop: "4px" }}>
                  Assertividade: {resultado.confiancaAlgoritmoPct}% · Liquidez {resultado.liquidezEstimada}
                </div>
              </div>
            </div>

            {resultado.faixaAluguelEstimado && (
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "16px",
                  borderTop: "1px solid #E5DFC9",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  color: "#334155",
                }}
              >
                <div>
                  <strong>Potencial de Locação:</strong> {formatarDinheiro(resultado.faixaAluguelEstimado.medio)}/mês{" "}
                  <span style={{ color: "#64748b" }}>
                    (yield anual de {(resultado.faixaAluguelEstimado.yieldMensalPct * 12).toFixed(1)}%)
                  </span>
                </div>
                <div style={{ color: "#64748b" }}>Base Tangará da Serra · Amostragem 2026</div>
              </div>
            )}

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={handleAgendarVistoriaPericial}
                style={{
                  background: "#25D366",
                  color: "#ffffff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MessageCircle size={16} />
                Agendar Avaliação Oficial Presencial (CRECI {MARCA_GAMA.creci})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
