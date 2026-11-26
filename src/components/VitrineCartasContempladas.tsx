import type React from "react";
import { useState } from "react";
import { formatarMoeda, TABELAS_ADMINISTRADORAS } from "../lib/motor-consorcios";
import type { CartaContemplada, CategoriaConsorcio } from "../types/consorcio";
import { MARCA_GAMA } from "../lib/marcaGama";

const CARTAS_DISPONIVEIS: CartaContemplada[] = [
  {
    id: "carta-01",
    codigo: "CT101",
    administradora: "porto_seguro",
    categoria: "imobiliario",
    valorCredito: 650_000,
    valorEntradaAgio: 185_000,
    saldoDevedor: 512_000,
    parcelasRestantes: 172,
    valorParcelaMensal: 3_840,
    status: "disponivel",
    destaque: true,
  },
  {
    id: "carta-02",
    codigo: "CT102",
    administradora: "caixa_consorcios",
    categoria: "imobiliario",
    valorCredito: 400_000,
    valorEntradaAgio: 110_000,
    saldoDevedor: 318_000,
    parcelasRestantes: 154,
    valorParcelaMensal: 2_420,
    status: "disponivel",
    destaque: false,
  },
  {
    id: "carta-03",
    codigo: "CT103",
    administradora: "rodobens",
    categoria: "pesados_agro",
    valorCredito: 950_000,
    valorEntradaAgio: 280_000,
    saldoDevedor: 740_000,
    parcelasRestantes: 98,
    valorParcelaMensal: 8_750,
    status: "disponivel",
    destaque: true,
  },
  {
    id: "carta-04",
    codigo: "CT104",
    administradora: "itau",
    categoria: "veiculo_leve",
    valorCredito: 120_000,
    valorEntradaAgio: 38_000,
    saldoDevedor: 92_000,
    parcelasRestantes: 64,
    valorParcelaMensal: 1_650,
    status: "disponivel",
    destaque: false,
  },
  {
    id: "carta-05",
    codigo: "CT105",
    administradora: "santander",
    categoria: "pesados_agro",
    valorCredito: 1_500_000,
    valorEntradaAgio: 450_000,
    saldoDevedor: 1_180_000,
    parcelasRestantes: 112,
    valorParcelaMensal: 12_400,
    status: "disponivel",
    destaque: true,
  },
];

interface VitrineProps {
  telefoneWhatsappPadrao?: string;
}

export const VitrineCartasContempladas: React.FC<VitrineProps> = ({
  telefoneWhatsappPadrao = MARCA_GAMA.telefoneWhatsapp,
}) => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas");

  const cartasFiltradas = CARTAS_DISPONIVEIS.filter((c) => {
    if (filtroCategoria === "todas") return true;
    return c.categoria === filtroCategoria;
  });

  const reservarCarta = (carta: CartaContemplada) => {
    const nomeAdm = TABELAS_ADMINISTRADORAS[carta.administradora]?.nome ?? carta.administradora;
    const texto = encodeURIComponent(
      `Olá! Tenho interesse na *Carta Contemplada ${carta.codigo}* da Gama & Domus Consórcios:\n` +
        `• Administradora: ${nomeAdm}\n` +
        `• Crédito Liberado: ${formatarMoeda(carta.valorCredito)}\n` +
        `• Entrada / Ágio: ${formatarMoeda(carta.valorEntradaAgio)}\n` +
        `• Saldo Devedor: ${carta.parcelasRestantes}x de ${formatarMoeda(carta.valorParcelaMensal)}\n\n` +
        `Gostaria de verificar a documentação e disponibilidade para transferência imediata.`,
    );
    window.open(`https://wa.me/${telefoneWhatsappPadrao}?text=${texto}`, "_blank");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div>
          <span
            style={{
              background: "#F7F3EA",
              color: "#C6A15B",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "800",
              textTransform: "uppercase",
              border: "1px solid #E5DFC9",
            }}
          >
            DISPONIBILIDADE IMEDIATA
          </span>
          <h3 style={{ fontSize: "26px", fontWeight: "800", color: "#121212", margin: "6px 0 2px 0" }}>
            Cartas de Crédito Já Contempladas
          </h3>
          <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>
            Compre seu imóvel, maquinário ou frota hoje mesmo sem esperar sorteio ou lance
          </p>
        </div>

        {/* Filtro de Categoria */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { id: "todas", label: "Todas" },
            { id: "imobiliario", label: "Imobiliário" },
            { id: "pesados_agro", label: "Agro & Pesados" },
            { id: "veiculo_leve", label: "Veículos" },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltroCategoria(f.id)}
              style={{
                background: filtroCategoria === f.id ? "#121212" : "#f1f5f9",
                color: filtroCategoria === f.id ? "#ffffff" : "#475569",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cartas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
          gap: "20px",
        }}
      >
        {cartasFiltradas.map((c) => {
          const nomeAdm = TABELAS_ADMINISTRADORAS[c.administradora]?.nome ?? c.administradora;

          return (
            <div
              key={c.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                padding: "24px",
                border: c.destaque ? "2px solid #C6A15B" : "1px solid #E5DFC9",
                boxShadow: c.destaque ? "0 10px 25px -5px rgba(198, 161, 91, 0.2)" : "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {c.destaque && (
                <span
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "16px",
                    background: "#C6A15B",
                    color: "#121212",
                    fontSize: "10px",
                    fontWeight: "800",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    textTransform: "uppercase",
                  }}
                >
                  Oportunidade Prime
                </span>
              )}

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span
                    style={{
                      background: "#F7F3EA",
                      color: "#121212",
                      fontSize: "11px",
                      fontWeight: "700",
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    {nomeAdm}
                  </span>
                  <span style={{ fontSize: "11px", color: "#64748b" }}>Cód. {c.codigo}</span>
                </div>

                <span style={{ fontSize: "12px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>
                  Crédito Disponível
                </span>
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#121212", margin: "4px 0 16px 0" }}>
                  {formatarMoeda(c.valorCredito)}
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "13px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Entrada (Ágio):</span>
                    <span style={{ fontWeight: "700", color: "#121212" }}>{formatarMoeda(c.valorEntradaAgio)}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#64748b" }}>Saldo Devedor:</span>
                    <span style={{ fontWeight: "600", color: "#334155" }}>
                      {c.parcelasRestantes}x de {formatarMoeda(c.valorParcelaMensal)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => reservarCarta(c)}
                style={{
                  width: "100%",
                  background: "#121212",
                  color: "#C6A15B",
                  border: "1px solid #C6A15B",
                  padding: "12px",
                  borderRadius: "8px",
                  fontWeight: "700",
                  fontSize: "13px",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
              >
                Reservar Carta Contemplada
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
