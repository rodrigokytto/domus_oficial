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
  Briefcase,
  ShieldCheck,
  Award,
  Wallet,
  Sparkles,
  Search,
  KeyRound,
} from "lucide-react";
import type { Imovel } from "../types/imovel";
import type { PerfilUsuario, UsuarioDomus } from "../types/usuario";
import { rotuloPerfil, badgeCorPerfil } from "../lib/authDomus";

interface Props {
  imoveis: Imovel[];
  aoNavegarSecao: (secao: any) => void;
  aoAbrirPaperPdf: (imovel: Imovel) => void;
  usuario?: UsuarioDomus;
  aoMudarPerfil?: (perfil: PerfilUsuario) => void;
}

export const PainelHojeGama: React.FC<Props> = ({
  imoveis,
  aoNavegarSecao,
  aoAbrirPaperPdf,
  usuario,
  aoMudarPerfil,
}) => {
  const perfilAtivo: PerfilUsuario = usuario?.perfilAtivo || "gerente";

  const valorTotalCarteira = imoveis.reduce((acc, curr) => acc + (curr.precoVenda || 0), 0);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  // Cores do perfil ativo
  const badgeConfig = badgeCorPerfil(perfilAtivo);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Banner de Boas-Vindas Contextualizado ao Perfil Ativo */}
      <div
        style={{
          background: "linear-gradient(135deg, #121212 0%, #1f1f1f 50%, #2b2b2b 100%)",
          color: "#ffffff",
          borderRadius: "16px",
          padding: "26px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          border: "1px solid #C6A15B",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ zIndex: 1, maxWidth: "680px" }}>
          {/* Badge do Perfil Ativo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span
              style={{
                background: badgeConfig.bg,
                color: badgeConfig.texto,
                border: `1px solid ${badgeConfig.borda}`,
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: "800",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <ShieldCheck size={13} />
              MODO {rotuloPerfil(perfilAtivo).toUpperCase()}
            </span>

            {usuario && usuario.perfis.length > 1 && (
              <span style={{ fontSize: "12px", color: "#cbd5e1" }}>
                · {usuario.nome} ({usuario.email})
              </span>
            )}
          </div>

          {/* Título e Descrição Dinâmicos por Perfil */}
          {perfilAtivo === "gerente" && (
            <>
              <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "4px 0 6px 0", color: "#ffffff" }}>
                Mesa Diretiva & Painel Geral de Operações
              </h1>
              <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>
                Supervisão de equipe, gestão financeira integrada, conciliação de DIMOB fiscal, conformidade COAF
                e aprovação de minutas contratuais.
              </p>
            </>
          )}

          {perfilAtivo === "corretor" && (
            <>
              <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "4px 0 6px 0", color: "#ffffff" }}>
                Central Comercial do Corretor Credenciado
              </h1>
              <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>
                CRECI-MT 14.821-F · Emissão rápida de Lâminas A4 para WhatsApp, funil de atendimento a compradores,
                agendamento de visitas e simulações de crédito imobiliário.
              </p>
            </>
          )}

          {perfilAtivo === "vendedor" && (
            <>
              <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "4px 0 6px 0", color: "#ffffff" }}>
                Painel do Vendedor & Proprietário de Ativos
              </h1>
              <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>
                Acompanhe o andamento de divulgação dos seus imóveis, visitas realizadas por corretores, propostas recebidas
                e previsão de repasses financeiros.
              </p>
            </>
          )}

          {perfilAtivo === "cliente" && (
            <>
              <h1 style={{ fontSize: "26px", fontWeight: "800", margin: "4px 0 6px 0", color: "#ffffff" }}>
                Espaço Exclusivo do Cliente & Investidor
              </h1>
              <p style={{ color: "#e2e8f0", fontSize: "14px", margin: 0, lineHeight: "1.5" }}>
                Oportunidades selecionadas no Mato Grosso, simulações de consórcios com economia de juros bancários
                e consulta a laudos digitais de vistoria de entrega.
              </p>
            </>
          )}

          {/* Atalhos rápidos para alternar entre os outros 3 perfis */}
          {aoMudarPerfil && usuario && usuario.perfis.length > 1 && (
            <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "11px", color: "#94a3b8", fontWeight: "600" }}>Alternar visão:</span>
              {usuario.perfis.map((p) => {
                const ativo = p === perfilAtivo;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => aoMudarPerfil(p)}
                    style={{
                      background: ativo ? "#C6A15B" : "rgba(255,255,255,0.08)",
                      color: ativo ? "#121212" : "#ffffff",
                      border: ativo ? "1px solid #C6A15B" : "1px solid rgba(255,255,255,0.2)",
                      padding: "3px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: ativo ? "800" : "500",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {rotuloPerfil(p)}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Botões de Ação por Perfil */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", zIndex: 1 }}>
          {perfilAtivo === "gerente" && (
            <>
              <button
                type="button"
                onClick={() => aoNavegarSecao("financeiro")}
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
                  gap: "8px",
                }}
              >
                <TrendingUp size={16} />
                Painel Financeiro & Repasses
              </button>
              <button
                type="button"
                onClick={() => aoNavegarSecao("fiscal")}
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
                  gap: "8px",
                }}
              >
                <ShieldCheck size={16} color="#C6A15B" />
                Fiscal DIMOB & COAF
              </button>
            </>
          )}

          {perfilAtivo === "corretor" && (
            <>
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
                  gap: "8px",
                }}
              >
                <FileText size={16} />
                Lâminas Paper PDF A4
              </button>
              <button
                type="button"
                onClick={() => aoNavegarSecao("crm")}
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
                  gap: "8px",
                }}
              >
                <Users size={16} color="#C6A15B" />
                Meus Leads no Funil (CRM)
              </button>
            </>
          )}

          {perfilAtivo === "vendedor" && (
            <>
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
                  gap: "8px",
                }}
              >
                <Building2 size={16} />
                Meus Imóveis Anunciados
              </button>
              <button
                type="button"
                onClick={() => aoNavegarSecao("repasses")}
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
                  gap: "8px",
                }}
              >
                <Wallet size={16} color="#C6A15B" />
                Extrato de Repasses
              </button>
            </>
          )}

          {perfilAtivo === "cliente" && (
            <>
              <button
                type="button"
                onClick={() => aoNavegarSecao("consorcios")}
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
                  gap: "8px",
                }}
              >
                <Landmark size={16} />
                Cartas Contempladas
              </button>
              <button
                type="button"
                onClick={() => aoNavegarSecao("imoveis")}
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
                  gap: "8px",
                }}
              >
                <Search size={16} color="#C6A15B" />
                Explorar Catálogo
              </button>
            </>
          )}
        </div>
      </div>

      {/* Grid de Métricas Personalizado conforme o Perfil Ativo */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {perfilAtivo === "gerente" && (
          <>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>VGV da Carteira</span>
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
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Funil Global de Leads</span>
                <Users size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>8 Oportunidades</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>3 em negociação final</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Volume de Consórcios</span>
                <Landmark size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>R$ 4.750.000</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>5 cartas ativas</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Conformidade Fiscal</span>
                <ShieldCheck size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>100% Regular</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>DIMOB & COAF em dia</div>
            </div>
          </>
        )}

        {perfilAtivo === "corretor" && (
          <>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Minha Meta do Mês</span>
                <Award size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>
                R$ 1.500.000
              </div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>
                78% atingido neste ciclo
              </div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Meus Leads Ativos</span>
                <Users size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>5 Compradores</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>2 visitas agendadas hoje</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Comissão Prevista</span>
                <Wallet size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>R$ 84.000</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>Alíquota padrão de 6%</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Lâminas Geradas</span>
                <FileText size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>28 PDFs</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Enviados via WhatsApp</div>
            </div>
          </>
        )}

        {perfilAtivo === "vendedor" && (
          <>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Meus Imóveis Cadastrados</span>
                <Building2 size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>2 Imóveis</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>Ambos ativos e divulgados</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>VGV Total Anunciado</span>
                <Landmark size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>R$ 3.400.000</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Mansão e Casa Condomínio</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Propostas Recebidas</span>
                <Users size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>3 Propostas</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>1 com consórcio em aprovação</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Previsão de Repasse Líquido</span>
                <Wallet size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>R$ 1.250.000</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>Via PIX cadastrado</div>
            </div>
          </>
        )}

        {perfilAtivo === "cliente" && (
          <>
            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Imóveis de Interesse</span>
                <Building2 size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>4 Selecionados</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Perfil Alto Padrão & Agro</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Simulações Salvas</span>
                <TrendingUp size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>3 Cenários</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>Até 68% de economia vs banco</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Cartas Homologadas</span>
                <Landmark size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>5 Oportunidades</div>
              <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px" }}>Créditos de 500k a 1,5M</div>
            </div>

            <div style={{ background: "#ffffff", padding: "20px", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#64748b" }}>
                <span style={{ fontSize: "13px", fontWeight: "600" }}>Laudos Disponíveis</span>
                <ClipboardCheck size={20} color="#C6A15B" />
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "#121212", marginTop: "8px" }}>1 Laudo Vistoria</div>
              <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>Bellagio Executive (GM102)</div>
            </div>
          </>
        )}
      </div>

      {/* Ações Rápidas & Atalhos */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Lista Rápida de Imóveis para Gerar Paper PDF */}
        <div style={{ background: "#ffffff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", margin: 0 }}>
                {perfilAtivo === "vendedor" ? "Meus Imóveis Divulgados" : "Emissão Instantânea de Paper PDF A4"}
              </h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                {perfilAtivo === "vendedor"
                  ? "Status de apresentação e material oficial de divulgação"
                  : "Envie a lâmina formatada em PDF/WhatsApp com QR Code para seus clientes"}
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
                  Ver Paper PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Compromissos e Avisos do Perfil */}
        <div style={{ background: "#ffffff", borderRadius: "14px", padding: "24px", border: "1px solid #e2e8f0" }}>
          <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", margin: "0 0 16px 0" }}>
            {perfilAtivo === "cliente" ? "Minhas Próximas Atividades" : "Agenda & Compromissos do Dia"}
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
              <div style={{ fontSize: "11px", color: "#64748b" }}>Assinatura eletrônica de laudo touch</div>
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
