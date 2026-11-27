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
  UserCheck,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";
import type { PerfilUsuario, UsuarioDomus } from "../types/usuario";
import {
  obterSessao,
  USUARIO_OFICIAL_GGAMAS,
  rotuloPerfil,
  badgeCorPerfil,
  secoesPermitidasPorPerfil,
} from "../lib/authDomus";
import { SeletorPerfilDomus } from "../components/SeletorPerfilDomus";
import { ModalDetalhesUsuarioDomus } from "../components/ModalDetalhesUsuarioDomus";
import { ModalLoginDomus } from "../components/ModalLoginDomus";

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
  usuario?: UsuarioDomus;
  aoMudarPerfil?: (perfil: PerfilUsuario) => void;
  aoDeslogar?: () => void;
  children: React.ReactNode;
}

export const LayoutPlataformaGama: React.FC<Props> = ({
  secaoAtiva,
  aoMudarSecao,
  aoVoltarSite,
  usuario,
  aoMudarPerfil,
  aoDeslogar,
  children,
}) => {
  const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
  const [modalLoginAberto, setModalLoginAberto] = useState(false);

  // Usuário ativo (se não fornecido via prop, busca do storage ou usa o oficial ggamas@gmail.com)
  const usuarioAtual = usuario ?? obterSessao() ?? USUARIO_OFICIAL_GGAMAS;
  const perfilAtivo = usuarioAtual.perfilAtivo;
  const badgePerfil = badgeCorPerfil(perfilAtivo);

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

  // Filtra as opções da barra lateral com base no perfil ativo da conta
  const secoesPermitidas = secoesPermitidasPorPerfil(perfilAtivo);
  const itensMenuFiltrados = itensMenu.filter((item) => secoesPermitidas.includes(item.id));

  const lidarMudancaPerfil = (novoPerfil: PerfilUsuario) => {
    if (aoMudarPerfil) {
      aoMudarPerfil(novoPerfil);
    }
    // Ajusta a rota caso a tela atual não pertença ao novo perfil
    const permitidasNovo = secoesPermitidasPorPerfil(novoPerfil);
    if (!permitidasNovo.includes(secaoAtiva)) {
      aoMudarSecao((permitidasNovo[0] as SecaoPlataforma) || "hoje");
    }
  };

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
        <div style={{ padding: "20px 20px", borderBottom: "1px solid rgba(198, 161, 91, 0.25)" }}>
          <img
            src={MARCA_GAMA.logos.claro}
            alt={MARCA_GAMA.nome}
            style={{ height: "40px", objectFit: "contain", marginBottom: "8px" }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgba(198, 161, 91, 0.15)",
              color: "#C6A15B",
              padding: "4px 8px",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: "700",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <ShieldCheck size={14} />
              <span>CRECI {MARCA_GAMA.creci}</span>
            </div>
            <span
              style={{
                fontSize: "10px",
                background: badgePerfil.bg,
                color: badgePerfil.texto,
                border: `1px solid ${badgePerfil.borda}`,
                padding: "1px 6px",
                borderRadius: "10px",
                textTransform: "uppercase",
              }}
            >
              {perfilAtivo}
            </span>
          </div>
        </div>

        {/* Links de Seções */}
        <nav style={{ padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px", flex: 1, overflowY: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "4px 12px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
                color: "#94a3b8",
                fontWeight: "700",
              }}
            >
              Menu · {rotuloPerfil(perfilAtivo)}
            </span>
          </div>

          {itensMenuFiltrados.map((item) => {
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

        {/* Rodapé da Sidebar com Botão de Ficha Cadastral e Portal Público */}
        <div
          style={{
            padding: "14px 16px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <button
            onClick={() => setModalDetalhesAberto(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "6px",
              background: "rgba(198, 161, 91, 0.1)",
              color: "#C6A15B",
              border: "1px solid rgba(198, 161, 91, 0.3)",
              fontSize: "11px",
              fontWeight: "700",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <UserCheck size={14} color="#C6A15B" />
            <span>Ver Ficha: {usuarioAtual.email}</span>
          </button>

          <button
            onClick={aoVoltarSite}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 10px",
              borderRadius: "6px",
              background: "rgba(255, 255, 255, 0.05)",
              color: "#ffffff",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontSize: "11px",
              fontWeight: "600",
              cursor: "pointer",
              width: "100%",
            }}
          >
            <ExternalLink size={14} color="#C6A15B" />
            <span>Voltar ao Portal Público</span>
          </button>

          <div style={{ fontSize: "10px", color: "#64748b", textAlign: "center" }}>
            {MARCA_GAMA.cidade} · Tangará da Serra - MT
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar da Plataforma com Seletor Multiperfil Interativo */}
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

          {/* Componente do Usuário e Seletor dos 4 Perfis */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <SeletorPerfilDomus
              usuario={usuarioAtual}
              aoMudarPerfil={lidarMudancaPerfil}
              aoAbrirDetalhesUsuario={() => setModalDetalhesAberto(true)}
              aoSair={() => setModalLoginAberto(true)}
            />
          </div>
        </header>

        {/* Corpo da Página */}
        <main style={{ padding: "28px", flex: 1 }}>{children}</main>
      </div>

      {/* Modal de Detalhes da Conta do Usuário e Permissões */}
      {modalDetalhesAberto && (
        <ModalDetalhesUsuarioDomus
          usuario={usuarioAtual}
          aoFechar={() => setModalDetalhesAberto(false)}
          aoMudarPerfil={lidarMudancaPerfil}
        />
      )}

      {/* Modal de Login / Troca de Credenciais */}
      {modalLoginAberto && (
        <ModalLoginDomus
          aoSucesso={(novoUsuario) => {
            setModalLoginAberto(false);
            if (aoMudarPerfil) {
              aoMudarPerfil(novoUsuario.perfilAtivo);
            }
          }}
          aoFechar={() => setModalLoginAberto(false)}
        />
      )}
    </div>
  );
};
