import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import {
  X,
  Printer,
  Copy,
  Check,
  MessageCircle,
  Building2,
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  FileText,
} from "lucide-react";
import type { Imovel } from "../types/imovel";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  imovel: Imovel;
  aoFechar: () => void;
}

export const ModalPaperPdfImovel: React.FC<Props> = ({ imovel, aoFechar }) => {
  const [copiado, setCopiado] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const folhaRef = useRef<HTMLDivElement>(null);

  const origem = typeof window !== "undefined" ? window.location.origin : MARCA_GAMA.siteUrl;
  const urlImovel = `${origem}/imoveis/${imovel.slug || imovel.codigo.toLowerCase()}`;

  const formatarDinheiro = (val?: number | null) => {
    if (!val || Number.isNaN(val)) return null;
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const hoje = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  useEffect(() => {
    let ativo = true;
    QRCode.toDataURL(urlImovel, {
      width: 400,
      margin: 1,
      color: {
        dark: "#121212",
        light: "#ffffff",
      },
      errorCorrectionLevel: "M",
    })
      .then((url: string) => {
        if (ativo) setQrDataUrl(url);
      })
      .catch(() => {
        if (ativo) {
          setQrDataUrl(
            `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(urlImovel)}`,
          );
        }
      });

    return () => {
      ativo = false;
    };
  }, [urlImovel]);

  const montarTextoWhatsApp = () => {
    const precosLista: string[] = [];
    if (imovel.precoVenda) precosLista.push(`Venda: ${formatarDinheiro(imovel.precoVenda)}`);
    if (imovel.precoAluguel) precosLista.push(`Aluguel: ${formatarDinheiro(imovel.precoAluguel)}/mês`);
    const precoTxt = precosLista.join(" · ") || "Sob consulta";

    const specs: string[] = [];
    if (imovel.quartos)
      specs.push(`🛏️ ${imovel.quartos} quartos${imovel.suites ? ` (${imovel.suites} suítes)` : ""}`);
    if (imovel.banheiros) specs.push(`🚿 ${imovel.banheiros} banheiros`);
    if (imovel.vagas) specs.push(`🚗 ${imovel.vagas} vagas`);
    if (imovel.areaConstruida) specs.push(`📐 ${imovel.areaConstruida} m²`);

    const texto = [
      `*${MARCA_GAMA.nome}* | Lâmina Executiva A4`,
      `*${imovel.titulo}* (Cód. ${imovel.codigo})`,
      `📍 ${imovel.bairro}, ${imovel.cidade} - ${imovel.uf}`,
      `💰 *${precoTxt}*`,
      specs.length ? `\n*Características:* \n${specs.join("\n")}` : "",
      `\n🔗 *Acesse a ficha completa no portal:* \n${urlImovel}`,
      `\n_Atendimento oficial CRECI ${MARCA_GAMA.creci}_`,
    ]
      .filter(Boolean)
      .join("\n");

    return encodeURIComponent(texto);
  };

  const handleImprimir = () => {
    window.print();
  };

  const handleCopiarLink = async () => {
    try {
      await navigator.clipboard.writeText(urlImovel);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(18, 18, 18, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      {/* Barra de Ações Superior */}
      <div
        style={{
          maxWidth: "850px",
          width: "100%",
          margin: "0 auto 16px auto",
          background: "#121212",
          border: "1px solid #C6A15B",
          borderRadius: "12px",
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FileText size={20} color="#C6A15B" />
          <span style={{ fontWeight: "700", fontSize: "14px" }}>
            Lâmina Executiva Paper PDF A4 · {imovel.codigo}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            type="button"
            onClick={handleCopiarLink}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copiado ? <Check size={14} color="#C6A15B" /> : <Copy size={14} />}
            {copiado ? "Copiado!" : "Copiar Link"}
          </button>
          <a
            href={`https://wa.me/?text=${montarTextoWhatsApp()}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: "#25D366",
              color: "#ffffff",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              textDecoration: "none",
            }}
          >
            <MessageCircle size={15} />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={handleImprimir}
            style={{
              background: "#C6A15B",
              color: "#121212",
              border: "none",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Printer size={15} />
            Imprimir / Salvar PDF
          </button>
          <button
            type="button"
            onClick={aoFechar}
            style={{
              background: "transparent",
              color: "#94a3b8",
              border: "none",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Folha A4 para Impressão */}
      <div
        ref={folhaRef}
        id="folha-paper-pdf-a4"
        style={{
          width: "100%",
          maxWidth: "800px",
          margin: "0 auto",
          background: "#ffffff",
          color: "#121212",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          borderRadius: "8px",
          padding: "36px 40px",
          boxSizing: "border-box",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Cabeçalho Nobre com Logo Gama */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "2px solid #C6A15B",
            paddingBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <img
              src={MARCA_GAMA.logos.escuro}
              alt={MARCA_GAMA.nome}
              style={{ height: "48px", objectFit: "contain" }}
            />
            <div>
              <div
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "#C6A15B",
                  fontWeight: "800",
                }}
              >
                GAMA PATRIMONIAL · CRECI {MARCA_GAMA.creci}
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>{MARCA_GAMA.slogan}</div>
            </div>
          </div>
          <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
            <div style={{ fontWeight: "700", color: "#121212" }}>Emissão: {hoje}</div>
            <div>Cód. Ref: {imovel.codigo}</div>
            <div>{MARCA_GAMA.cidade} - {MARCA_GAMA.uf}</div>
          </div>
        </div>

        {/* Título & Localização */}
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#F7F3EA",
              color: "#C6A15B",
              border: "1px solid #E5DFC9",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            {imovel.tipo} · {imovel.finalidade === "venda" ? "Venda" : "Locação"}
          </div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: "0 0 6px 0" }}>
            {imovel.titulo}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#64748b", fontSize: "13px" }}>
            <MapPin size={15} color="#C6A15B" />
            <span>
              {imovel.endereco}, {imovel.bairro} · {imovel.cidade} - {imovel.uf}
            </span>
          </div>
        </div>

        {/* Grid de Fotos Principais */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: imovel.fotos.length > 1 ? "2fr 1fr" : "1fr",
            gap: "10px",
            borderRadius: "8px",
            overflow: "hidden",
            maxHeight: "320px",
          }}
        >
          {imovel.fotos[0] && (
            <img
              src={imovel.fotos[0]}
              alt={imovel.titulo}
              style={{ width: "100%", height: "100%", maxHeight: "320px", objectFit: "cover" }}
            />
          )}
          {imovel.fotos.length > 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {imovel.fotos.slice(1, 3).map((f, i) => (
                <img
                  key={i}
                  src={f}
                  alt=""
                  style={{ width: "100%", height: "155px", objectFit: "cover" }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Especificações & Valores */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "20px",
            background: "#F7F3EA",
            padding: "16px 20px",
            borderRadius: "8px",
            border: "1px solid #E5DFC9",
          }}
        >
          <div>
            <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
              Dimensões e Estrutura
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginTop: "10px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Maximize2 size={16} color="#C6A15B" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700" }}>{imovel.areaConstruida} m²</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>Área Útil</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Bed size={16} color="#C6A15B" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700" }}>{imovel.quartos} Qts</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>{imovel.suites} Suítes</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Car size={16} color="#C6A15B" />
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "700" }}>{imovel.vagas} Vagas</div>
                  <div style={{ fontSize: "10px", color: "#64748b" }}>Garagem</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderLeft: "1px solid #E5DFC9", paddingLeft: "16px" }}>
            <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "700" }}>
              Condições Financeiras
            </div>
            <div style={{ marginTop: "6px" }}>
              {imovel.precoVenda && (
                <div style={{ fontSize: "20px", fontWeight: "800", color: "#121212" }}>
                  {formatarDinheiro(imovel.precoVenda)}
                </div>
              )}
              {imovel.precoAluguel && (
                <div style={{ fontSize: "16px", fontWeight: "700", color: "#C6A15B" }}>
                  Aluguel: {formatarDinheiro(imovel.precoAluguel)}/mês
                </div>
              )}
              <div style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                {imovel.condominio ? `Condomínio: ${formatarDinheiro(imovel.condominio)}` : ""}
                {imovel.iptu ? ` · IPTU: ${formatarDinheiro(imovel.iptu)}/ano` : ""}
              </div>
            </div>
          </div>
        </div>

        {/* Diferenciais & Descrição */}
        <div>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#121212", marginBottom: "8px" }}>
            Destaques e Acabamentos
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "6px 12px",
              fontSize: "12px",
              color: "#334155",
            }}
          >
            {imovel.diferenciais.slice(0, 6).map((item, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <CheckCircle2 size={13} color="#C6A15B" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé da Folha com QR Code e Contato Gama */}
        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #e2e8f0",
            paddingTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {qrDataUrl && (
              <img
                src={qrDataUrl}
                alt="QR Code do Imóvel"
                style={{ width: "72px", height: "72px", border: "1px solid #e2e8f0", borderRadius: "4px" }}
              />
            )}
            <div>
              <div style={{ fontSize: "12px", fontWeight: "800", color: "#121212" }}>
                Consulte esta ficha online no smartphone
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>
                Aponte a câmera para fotos em 360°, localização exata e proposta online.
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", fontWeight: "800", color: "#C6A15B" }}>
              GAMA PATRIMONIAL
            </div>
            <div style={{ fontSize: "11px", color: "#121212", fontWeight: "600" }}>
              {MARCA_GAMA.telefoneFormatado}
            </div>
            <div style={{ fontSize: "10px", color: "#64748b" }}>
              {MARCA_GAMA.email} · {MARCA_GAMA.siteUrl}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
