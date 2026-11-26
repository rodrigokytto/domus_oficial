import React, { useState } from "react";
import {
  X,
  MapPin,
  Maximize2,
  Bed,
  Bath,
  Car,
  FileText,
  Calculator,
  Landmark,
  MessageCircle,
  CheckCircle2,
  Share2,
  Calendar,
} from "lucide-react";
import type { Imovel } from "../types/imovel";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  imovel: Imovel;
  aoFechar: () => void;
  aoAbrirPaperPdf: () => void;
  aoAbrirFinanciamento: () => void;
  aoAbrirConsorcio: () => void;
}

export const ModalFichaImovel: React.FC<Props> = ({
  imovel,
  aoFechar,
  aoAbrirPaperPdf,
  aoAbrirFinanciamento,
  aoAbrirConsorcio,
}) => {
  const [fotoAtiva, setFotoAtiva] = useState(0);

  const formatarDinheiro = (val?: number | null) => {
    if (!val || Number.isNaN(val)) return null;
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const handleWhatsappCorretor = () => {
    const texto = encodeURIComponent(
      `Olá! Tenho interesse no imóvel "${imovel.titulo}" (Cód. ${imovel.codigo}), anunciado na Gama Patrimonial. Gostaria de mais detalhes e agendar uma visita.`,
    );
    window.open(`https://wa.me/${MARCA_GAMA.telefoneWhatsapp}?text=${texto}`, "_blank");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9990,
        background: "rgba(18, 18, 18, 0.8)",
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
          maxWidth: "1000px",
          width: "100%",
          maxHeight: "92vh",
          overflowY: "auto",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Cabeçalho do Modal */}
        <div
          style={{
            padding: "16px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            background: "#ffffff",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                background: "#F7F3EA",
                color: "#C6A15B",
                border: "1px solid #E5DFC9",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              Cód. {imovel.codigo}
            </span>
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "600" }}>
              {imovel.bairro} · {imovel.cidade} - {imovel.uf}
            </span>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            style={{
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
        </div>

        {/* Conteúdo Principal */}
        <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Galeria de Fotos */}
          <div>
            <div
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#1e293b",
                marginBottom: "12px",
              }}
            >
              <img
                src={imovel.fotos[fotoAtiva] || imovel.fotos[0]}
                alt={imovel.titulo}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {imovel.fotos.length > 1 && (
              <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "6px" }}>
                {imovel.fotos.map((f, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFotoAtiva(i)}
                    style={{
                      border: fotoAtiva === i ? "2px solid #C6A15B" : "2px solid transparent",
                      borderRadius: "8px",
                      overflow: "hidden",
                      padding: 0,
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <img src={f} alt="" style={{ width: "80px", height: "60px", objectFit: "cover" }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dados e Preço */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <h2 style={{ fontSize: "26px", fontWeight: "800", color: "#121212", margin: "0 0 6px 0" }}>
                {imovel.titulo}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "14px" }}>
                <MapPin size={16} color="#C6A15B" />
                <span>
                  {imovel.endereco}, {imovel.bairro} · {imovel.cidade} - {imovel.uf}
                </span>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              {imovel.precoVenda && (
                <div style={{ fontSize: "28px", fontWeight: "800", color: "#121212" }}>
                  {formatarDinheiro(imovel.precoVenda)}
                </div>
              )}
              {imovel.precoAluguel && (
                <div style={{ fontSize: "20px", fontWeight: "700", color: "#C6A15B" }}>
                  Aluguel: {formatarDinheiro(imovel.precoAluguel)}/mês
                </div>
              )}
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                {imovel.condominio ? `Condomínio: ${formatarDinheiro(imovel.condominio)}` : ""}
                {imovel.iptu ? ` · IPTU: ${formatarDinheiro(imovel.iptu)}` : ""}
              </div>
            </div>
          </div>

          {/* Métricas Principais */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "12px",
              background: "#F7F3EA",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #E5DFC9",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Maximize2 size={20} color="#C6A15B" />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#121212" }}>
                  {imovel.areaConstruida} m²
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Área Construída</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Bed size={20} color="#C6A15B" />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#121212" }}>
                  {imovel.quartos} Quartos
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>{imovel.suites} Suítes</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Bath size={20} color="#C6A15B" />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#121212" }}>
                  {imovel.banheiros} Banheiros
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Instalações</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Car size={20} color="#C6A15B" />
              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#121212" }}>
                  {imovel.vagas} Vagas
                </div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Garagem</div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#121212", marginBottom: "8px" }}>
              Sobre o Imóvel
            </h3>
            <p style={{ color: "#475569", lineHeight: "1.7", fontSize: "15px" }}>{imovel.descricao}</p>
          </div>

          {/* Diferenciais */}
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#121212", marginBottom: "12px" }}>
              Diferenciais & Acabamentos
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "10px",
              }}
            >
              {imovel.diferenciais.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#f8fafc",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    fontSize: "13px",
                    color: "#334155",
                  }}
                >
                  <CheckCircle2 size={16} color="#C6A15B" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Barra de Ações Integradas */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              borderTop: "1px solid #e2e8f0",
              paddingTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={aoAbrirPaperPdf}
              style={{
                background: "#121212",
                color: "#ffffff",
                border: "1px solid #C6A15B",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FileText size={18} color="#C6A15B" />
              Lâmina Executiva Paper PDF A4
            </button>

            <button
              type="button"
              onClick={aoAbrirFinanciamento}
              style={{
                background: "#f8fafc",
                color: "#1e293b",
                border: "1px solid #cbd5e1",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Calculator size={18} color="#C6A15B" />
              Simular Financiamento
            </button>

            <button
              type="button"
              onClick={aoAbrirConsorcio}
              style={{
                background: "#f8fafc",
                color: "#1e293b",
                border: "1px solid #cbd5e1",
                padding: "12px 20px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Landmark size={18} color="#C6A15B" />
              Simular Consórcio Domus
            </button>

            <button
              type="button"
              onClick={handleWhatsappCorretor}
              style={{
                background: "#25D366",
                color: "#ffffff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "800",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginLeft: "auto",
              }}
            >
              <MessageCircle size={18} />
              Falar no WhatsApp Oficial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
