import React, { useState } from "react";
import {
  Users,
  MessageCircle,
  PhoneCall,
  Calendar,
  Building2,
  ChevronRight,
  ChevronLeft,
  Plus,
  CheckCircle2,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

export type EtapaFunil =
  | "novo"
  | "atendimento"
  | "visita"
  | "proposta"
  | "contrato"
  | "fechado";

interface LeadCrm {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  imovelInteresse: string;
  valorEstimado: number;
  etapa: EtapaFunil;
  origem: "Portal Web" | "WhatsApp" | "Indicação" | "Consórcio";
  atualizadoEm: string;
}

const LEADS_INICIAIS: LeadCrm[] = [
  {
    id: "lead-1",
    nome: "Dr. Marcos Vinicius de Oliveira",
    telefone: "5565999812234",
    email: "marcos.med@gmail.com",
    imovelInteresse: "Mansão Vale do Sol (Cód. GM101)",
    valorEstimado: 2450000,
    etapa: "visita",
    origem: "Portal Web",
    atualizadoEm: "Hoje, 09:30",
  },
  {
    id: "lead-2",
    nome: "Aline Cristina Guimarães",
    telefone: "5565998774411",
    email: "aline.guimaraes@hotmail.com",
    imovelInteresse: "Bellagio Executive (Cód. GM102)",
    valorEstimado: 1180000,
    etapa: "proposta",
    origem: "WhatsApp",
    atualizadoEm: "Ontem, 16:45",
  },
  {
    id: "lead-3",
    nome: "Grupo Agro Santa Fé",
    telefone: "5565996541234",
    email: "compras@gruposantafe.agr.br",
    imovelInteresse: "Fazenda Santa Fé - 1.250 ha (Cód. GM103)",
    valorEstimado: 28500000,
    etapa: "atendimento",
    origem: "Indicação",
    atualizadoEm: "Hoje, 08:15",
  },
  {
    id: "lead-4",
    nome: "Thiago & Patrícia Meireles",
    telefone: "5565999018899",
    email: "thiago.meireles@gmail.com",
    imovelInteresse: "Casa Térrea Minimalista (Cód. GM104)",
    valorEstimado: 1490000,
    etapa: "novo",
    origem: "Portal Web",
    atualizadoEm: "Hoje, 11:20",
  },
  {
    id: "lead-5",
    nome: "Eng. Ricardo Batista",
    telefone: "5565998123344",
    email: "ricardo.construtora@gmail.com",
    imovelInteresse: "Terreno Comercial Av. Brasil (Cód. GM105)",
    valorEstimado: 890000,
    etapa: "contrato",
    origem: "Consórcio",
    atualizadoEm: "25/11/2026",
  },
  {
    id: "lead-6",
    nome: "Dra. Camila Fontana",
    telefone: "5565999332211",
    email: "camila.adv@fontana.com.br",
    imovelInteresse: "Edifício Prime Hub - Sala 402 (Cód. GM106)",
    valorEstimado: 4200,
    etapa: "fechado",
    origem: "WhatsApp",
    atualizadoEm: "24/11/2026",
  },
];

const ETAPAS: { id: EtapaFunil; label: string; cor: string }[] = [
  { id: "novo", label: "Novo Lead", cor: "#0284c7" },
  { id: "atendimento", label: "Em Atendimento", cor: "#8b5cf6" },
  { id: "visita", label: "Visita Agendada", cor: "#f59e0b" },
  { id: "proposta", label: "Proposta em Mesa", cor: "#ea580c" },
  { id: "contrato", label: "Minuta & Vistoria", cor: "#C6A15B" },
  { id: "fechado", label: "Negócio Fechado", cor: "#15803d" },
];

export const CrmFunilGama: React.FC = () => {
  const [leads, setLeads] = useState<LeadCrm[]>(LEADS_INICIAIS);

  const moverLead = (id: string, direcao: "proximo" | "anterior") => {
    setLeads((prev) =>
      prev.map((lead) => {
        if (lead.id !== id) return lead;
        const idxAtual = ETAPAS.findIndex((e) => e.id === lead.etapa);
        const novoIdx = direcao === "proximo" ? idxAtual + 1 : idxAtual - 1;
        if (novoIdx >= 0 && novoIdx < ETAPAS.length) {
          return { ...lead, etapa: ETAPAS[novoIdx].id };
        }
        return lead;
      }),
    );
  };

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: 0 }}>
            CRM & Funil Imobiliário de Vendas
          </h1>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            Acompanhe cada etapa da negociação comercial, desde a captação do lead até a assinatura e entrega de chaves
          </div>
        </div>
      </div>

      {/* Colunas Kanban */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          alignItems: "flex-start",
          overflowX: "auto",
          paddingBottom: "16px",
        }}
      >
        {ETAPAS.map((etapa) => {
          const leadsDaEtapa = leads.filter((l) => l.etapa === etapa.id);
          const totalValorEtapa = leadsDaEtapa.reduce((acc, curr) => acc + curr.valorEstimado, 0);

          return (
            <div
              key={etapa.id}
              style={{
                background: "#f1f5f9",
                borderRadius: "12px",
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderTop: `4px solid ${etapa.cor}`,
                minHeight: "450px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: "700", fontSize: "14px", color: "#121212" }}>{etapa.label}</span>
                <span
                  style={{
                    background: "#ffffff",
                    color: "#121212",
                    fontSize: "11px",
                    fontWeight: "800",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                  }}
                >
                  {leadsDaEtapa.length}
                </span>
              </div>

              <div style={{ fontSize: "11px", color: "#64748b", fontWeight: "600" }}>
                Volume: {formatarDinheiro(totalValorEtapa)}
              </div>

              {/* Cards dos Leads */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {leadsDaEtapa.map((lead) => (
                  <div
                    key={lead.id}
                    style={{
                      background: "#ffffff",
                      borderRadius: "10px",
                      padding: "14px",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.04)",
                      border: "1px solid #e2e8f0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontWeight: "700", fontSize: "13px", color: "#121212" }}>{lead.nome}</span>
                      <span
                        style={{
                          background: "#F7F3EA",
                          color: "#C6A15B",
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 6px",
                          borderRadius: "4px",
                        }}
                      >
                        {lead.origem}
                      </span>
                    </div>

                    <div style={{ fontSize: "12px", color: "#475569" }}>{lead.imovelInteresse}</div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#121212" }}>
                      {formatarDinheiro(lead.valorEstimado)}
                    </div>

                    {/* Ações Rápidas */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderTop: "1px solid #f1f5f9",
                        paddingTop: "8px",
                        marginTop: "4px",
                      }}
                    >
                      <a
                        href={`https://wa.me/${lead.telefone}?text=Ol%C3%A1%20${encodeURIComponent(lead.nome)}%2C%20aqui%20%C3%A9%20da%20Gama%20Patrimonial`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#15803d",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
                      >
                        <MessageCircle size={14} />
                        WhatsApp
                      </a>

                      <div style={{ display: "flex", gap: "4px" }}>
                        <button
                          type="button"
                          onClick={() => moverLead(lead.id, "anterior")}
                          title="Voltar etapa"
                          style={{
                            background: "#f1f5f9",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <ChevronLeft size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moverLead(lead.id, "proximo")}
                          title="Avançar etapa"
                          style={{
                            background: "#121212",
                            color: "#C6A15B",
                            border: "none",
                            borderRadius: "4px",
                            padding: "4px",
                            cursor: "pointer",
                          }}
                        >
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
