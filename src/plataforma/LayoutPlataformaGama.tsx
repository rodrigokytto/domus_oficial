import React, { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  Users,
  ClipboardCheck,
  FileText,
  Landmark,
  Calendar,
  LogOut,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  DollarSign,
  Coins,
  FileCode2,
  ShieldAlert,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

export type SecaoPlataforma =
  | "hoje"
  | "imoveis"
  | "crm"
  | "vistorias"
  | "contratos"
  | "financeiro"
  | "repasses"
  | "fiscal"
  | "consorcios"
  | "compliance"
  | "agenda";

interface Props {
  secaoAtiva: SecaoPlataforma;
  aoMudarSecao: (secao: SecaoPlataforma) => void;
  aoVoltarSite: () => void;
  children: React.ReactNode;
}

export const LayoutPlataformaGama: React.FC<Props> = ({
  secaoAtiva,
  aoMudarSecao,
  aoVoltarSite,
  children,
}) => {
  const itensMenu: { id: SecaoPlataforma; label: string; icon: any; badge?: string }[] = [
    { id: "hoje", label: "Hoje & Visão Geral", icon: LayoutDashboard },
    { id: "imoveis", label: "Carteira de Imóveis", icon: Building2, badge: "6 ativos" },
    { id: "crm", label: "CRM & Funil de Vendas", icon: Users, badge: "8 leads" },
    { id: "vistorias", label: "Vistorias & Laudos Digitais", icon: ClipboardCheck },
    { id: "contratos", label: "Contratos & Minutas IA", icon: FileText, badge: "ICP-Brasil" },
    { id: "financeiro", label: "ERP Financeiro & DRE", icon: DollarSign, badge: "Kytto" },
    { id: "repasses", label: "Repasses & Comissões", icon: Coins },
    { id: "fiscal", label: "NFS-e & DIMOB (Receita)", icon: FileCode2 },
    { id: "consorcios", label: "Mesa de Consórcios Domus", icon: Landmark },
    { id: "compliance", label: "Auditoria & COAF", icon: ShieldAlert },
    { id: "agenda", label: "Agenda & Compromissos", icon: Calendar },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Menu Lateral Nobre Gama (#121212) */}
      <aside
        style={{
          width: "270px",
          background: "#121212",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #C6A15B",
          position: "sticky",
          top: 0,
          height: "100vh",
          flexShrink: 0,
        }}
      >
        {/* Header da Sidebar com Logo Branco da Gama */}
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(198, 161, 91, 0.25)" }}>
          <img
            src={MARCA_GAMA.logos.claro}
            alt={MARCA_GAMA.nome}
            style={{ height: "42px", objectFit: "contain", marginBottom: "10px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(198, 161, 91, 0.15)",
              color: "#C6A15B",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            <ShieldCheck size={14} />
            <span>PLATAFORMA CRECI {MARCA_GAMA.creci}</span>
          </div>
        </div>

        {/* Links de Seções */}
        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          <div
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "1.5px",
              color: "#94a3b8",
              padding: "6px 12px",
              fontWeight: "700",
            }}
          >
            Gestão & Backoffice
          </div>

          {itensMenu.map((item) => {
            const Icon = item.icon;
            const ativo = secaoAtiva === item.id;
            return (
              <button
                key={item.id}
                onClick={() => aoMudarSecao(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: ativo ? "rgba(198, 161, 91, 0.2)" : "transparent",
                  color: ativo ? "#C6A15B" : "#cbd5e1",
                  fontWeight: ativo ? "700" : "500",
                  fontSize: "13px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  borderLeft: ativo ? "3px solid #C6A15B" : "3px solid transparent",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Icon size={18} color={ativo ? "#C6A15B" : "#94a3b8"} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    style={{
                      background: ativo ? "#C6A15B" : "rgba(255, 255, 255, 0.1)",
                      color: ativo ? "#121212" : "#cbd5e1",
                      fontSize: "10px",
                      fontWeight: "700",
                      padding: "2px 6px",
                      borderRadius: "10px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Rodapé da Sidebar */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            onClick={aoVoltarSite}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 12px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <ExternalLink size={14} color="#C6A15B" />
            <span>Voltar ao Portal Público</span>
          </button>

          <div style={{ fontSize: "11px", color: "#64748b", textAlign: "center" }}>
            {MARCA_GAMA.cidade} · Tangará da Serra - MT
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar da Plataforma */}
        <header
          style={{
            height: "64px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "14px", fontWeight: "700", color: "#121212" }}>Gama Patrimonial</span>
            <ChevronRight size={14} color="#94a3b8" />
            <span style={{ fontSize: "13px", color: "#64748b", textTransform: "capitalize" }}>
              {secaoAtiva}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>
                Diretoria Executiva
              </div>
              <div style={{ fontSize: "11px", color: "#C6A15B", fontWeight: "600" }}>
                CRECI J-14280 MT
              </div>
            </div>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#121212",
                color: "#C6A15B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "14px",
                border: "1px solid #C6A15B",
              }}
            >
              GP
            </div>
          </div>
        </header>

        {/* Corpo da Página */}
        <main style={{ padding: "28px", flex: 1 }}>{children}</main>
      </div>
    </div>
  );
};
