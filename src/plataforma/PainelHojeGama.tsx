import React from "react";
import {
  Building2,
  Users,
  ClipboardCheck,
  TrendingUp,
  Landmark,
  Calendar,
  ArrowRight,
  Plus,
  FileText,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import type { Imovel } from "../types/imovel";

interface Props {
  imoveis: Imovel[];
  aoNavegarSecao: (secao: any) => void;
  aoAbrirPaperPdf: (imovel: Imovel) => void;
}

export const PainelHojeGama: React.FC<Props> = ({ imoveis, aoNavegarSecao, aoAbrirPaperPdf }) => {
  const valorTotalCarteira = imoveis.reduce((acc, curr) => acc + (curr.precoVenda || 0), 0);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Banner de Boas-Vindas */}
      <div
        style={{
          background: "linear-gradient(135deg, #121212 0%, #2B2B2B 100%)",
          color: "#ffffff",
          borderRadius: "16px",
          padding: "24px 28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          border: "1px solid #C6A15B",
        }}
      >
        <div>
          <span
            style={{
              background: "rgba(198, 161, 91, 0.2)",
              color: "#C6A15B",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            Mesa de Operações · Gama Patrimonial
          </span>
          <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "6px 0 4px 0" }}>
            Painel Executivo de Gestão Imobiliária & Crédito
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "14px", margin: 0 }}>
            Visão consolidada da carteira, funil de atendimento, vistorias eletrônicas e cotas de consórcios.
          </p>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => aoNavegarSecao("imoveis")}
            style={{
              background: "#C6A15B",
              color: "#121212",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Building2 size={16} />
            Gerenciar Imóveis
          </button>
          <button
            type="button"
            onClick={() => aoNavegarSecao("vistorias")}
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "10px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ClipboardCheck size={16} />
            Nova Vistoria
          </button>
        </div>
      </div>

      {/* Grid de Métricas Executivas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Carteira de Venda</span>
            <Building2 size={20} color="#C6A15B" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>
            {formatarDinheiro(valorTotalCarteira)}
          </div>
          <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>
            {imoveis.length} ativos cadastrados
          </div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Leads no Funil (CRM)</span>
            <Users size={20} color="#C6A15B" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>8 Oportunidades</div>
          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>3 em visita agendada</div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Volume em Consórcios</span>
            <Landmark size={20} color="#C6A15B" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>R$ 4.750.000</div>
          <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>5 cartas contempladas ativas</div>
        </div>

        <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
            <span style={{ fontSize: "13px", fontWeight: "600" }}>Laudos & Vistorias</span>
            <ClipboardCheck size={20} color="#C6A15B" />
          </div>
          <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>12 Concluídas</div>
          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Assinatura eletrônica ativa</div>
        </div>
      </div>

      {/* Ações Rápidas & Atalhos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
        }}
      >
        {/* Lista Rápida de Imóveis para Gerar Paper PDF */}
        <div style={{ background: "#ffffff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", margin: 0 }}>
                Emissão Instantânea de Paper PDF A4
              </h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Envie a lâmina formatada em PDF/WhatsApp com QR Code para seus clientes
              </span>
            </div>
            <button
              type="button"
              onClick={() => aoNavegarSecao("imoveis")}
              style={{
                background: "none",
                border: "none",
                color: "#C6A15B",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Ver todos →
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {imoveis.slice(0, 4).map((imovel) => (
              <div
                key={imovel.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #f1f5f9",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img
                    src={imovel.fotos[0]}
                    alt=""
                    style={{ width: "48px", height: "40px", borderRadius: "6px", objectFit: "cover" }}
                  />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>
                      {imovel.titulo}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>
                      Cód. {imovel.codigo} · {imovel.bairro} · {formatarDinheiro(imovel.precoVenda || 0)}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => aoAbrirPaperPdf(imovel)}
                  style={{
                    background: "#121212",
                    color: "#C6A15B",
                    border: "1px solid #C6A15B",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <FileText size={14} />
                  Gerar Paper PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compromissos do Dia */}
        <div style={{ background: "#ffffff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
            Agenda do Dia
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                borderLeft: "3px solid #C6A15B",
                paddingLeft: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#C6A15B" }}>10:00 · Visita Presencial</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#121212" }}>
                Mansão Vale do Sol (Cód. GM101)
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Cliente: Dr. Marcos Vinicius</div>
            </div>

            <div
              style={{
                borderLeft: "3px solid #15803d",
                paddingLeft: "12px",
                paddingBottom: "8px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#15803d" }}>14:30 · Vistoria de Entrega</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#121212" }}>
                Bellagio Executive (Cód. GM102)
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Assinatura eletrônica de laudo</div>
            </div>

            <div
              style={{
                borderLeft: "3px solid #0284c7",
                paddingLeft: "12px",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "700", color: "#0284c7" }}>16:00 · Reunião de Crédito</div>
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#121212" }}>
                Simulação de Consórcio Agro R$ 1,5 Mi
              </div>
              <div style={{ fontSize: "11px", color: "#64748b" }}>Produtor: Grupo Santa Fé</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
