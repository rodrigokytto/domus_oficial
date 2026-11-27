import React, { useState } from "react";
import {
  X,
  UserCheck,
  Shield,
  KeyRound,
  Mail,
  Phone,
  Building,
  Briefcase,
  Users,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import type { PerfilUsuario, UsuarioDomus } from "../types/usuario";
import { rotuloPerfil, badgeCorPerfil } from "../lib/authDomus";

interface Props {
  usuario: UsuarioDomus;
  aoFechar: () => void;
  aoMudarPerfil: (perfil: PerfilUsuario) => void;
}

export const ModalDetalhesUsuarioDomus: React.FC<Props> = ({
  usuario,
  aoFechar,
  aoMudarPerfil,
}) => {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const senhaCadastrada = "#231215Verdao";

  const copiarCredenciais = () => {
    navigator.clipboard.writeText(`Usuário: ${usuario.email}\nSenha: ${senhaCadastrada}`);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
      onClick={aoFechar}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "850px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div
          style={{
            padding: "20px 24px",
            background: "#121212",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #C6A15B",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "#1e1e1e",
                border: "2px solid #C6A15B",
                color: "#C6A15B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "800",
                fontSize: "16px",
              }}
            >
              GG
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "800", color: "#ffffff" }}>
                Ficha do Usuário Multiperfil Domus
              </h2>
              <div style={{ fontSize: "12px", color: "#C6A15B" }}>
                Identificador: {usuario.id} · Cadastrado em Produção
              </div>
            </div>
          </div>

          <button
            onClick={aoFechar}
            style={{
              background: "transparent",
              border: "none",
              color: "#94a3b8",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Conteúdo com rolagem */}
        <div style={{ padding: "24px", overflowY: "auto", flex: 1 }}>
          {/* Card de Credenciais Oficiais */}
          <div
            style={{
              background: "#F7F3EA",
              border: "1.5px solid #C6A15B",
              borderRadius: "12px",
              padding: "16px 20px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  background: "#121212",
                  color: "#C6A15B",
                  padding: "10px",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KeyRound size={22} />
              </div>
              <div>
                <div style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: "700", color: "#854d0e" }}>
                  Credenciais Oficiais de Acesso
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "3px" }}>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#121212" }}>
                    E-mail: <strong>{usuario.email}</strong>
                  </span>
                  <span style={{ color: "#94a3b8" }}>|</span>
                  <span style={{ fontSize: "14px", fontWeight: "700", color: "#121212", display: "inline-flex", alignItems: "center", gap: "6px" }}>
                    Senha: <code>{mostrarSenha ? senhaCadastrada : "•••••••••••••"}</code>
                    <button
                      onClick={() => setMostrarSenha(!mostrarSenha)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        color: "#64748b",
                        display: "flex",
                      }}
                      title={mostrarSenha ? "Ocultar" : "Mostrar"}
                    >
                      {mostrarSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={copiarCredenciais}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                background: copiado ? "#15803d" : "#121212",
                color: copiado ? "#ffffff" : "#C6A15B",
                border: "none",
                borderRadius: "8px",
                padding: "8px 14px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {copiado ? <CheckCircle2 size={14} /> : <Copy size={14} />}
              <span>{copiado ? "Credenciais Copiadas!" : "Copiar Acesso"}</span>
            </button>
          </div>

          {/* Dados Gerais do Usuário */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "24px" }}>
            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Nome Canônico</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#121212", marginTop: "4px" }}>{usuario.nome}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Registro Profissional</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#121212", marginTop: "4px" }}>{usuario.creci}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Contato WhatsApp</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#121212", marginTop: "4px" }}>{usuario.telefone}</div>
            </div>

            <div style={{ background: "#f8fafc", padding: "14px", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: "11px", color: "#64748b", textTransform: "uppercase", fontWeight: "600" }}>Segurança da Conta</div>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "#15803d", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
                <CheckCircle2 size={16} /> 2FA Ativo & Ativo em PRD
              </div>
            </div>
          </div>

          {/* Os 4 Perfis Vinculados */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "800", color: "#121212" }}>
                Os 4 Perfis Integrados desta Conta
              </h3>
              <span style={{ fontSize: "12px", color: "#64748b" }}>
                Perfil Ativo Atual: <strong>{rotuloPerfil(usuario.perfilAtivo)}</strong>
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "16px" }}>
              {/* 1. GERENTE */}
              <div
                style={{
                  border: usuario.perfilAtivo === "gerente" ? "2px solid #C6A15B" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                  background: usuario.perfilAtivo === "gerente" ? "rgba(198, 161, 91, 0.05)" : "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Shield size={18} color="#C6A15B" />
                    <span style={{ fontWeight: "800", fontSize: "14px", color: "#121212" }}>1. Gerente Geral</span>
                  </div>
                  {usuario.perfilAtivo === "gerente" ? (
                    <span style={{ fontSize: "10px", fontWeight: "700", background: "#C6A15B", color: "#121212", padding: "2px 8px", borderRadius: "10px" }}>
                      ATIVO
                    </span>
                  ) : (
                    <button
                      onClick={() => aoMudarPerfil("gerente")}
                      style={{
                        background: "none",
                        border: "1px solid #C6A15B",
                        color: "#C6A15B",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Ativar Perfil
                    </button>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0" }}>
                  Alçada máxima de R$ 5M, auditoria DRE, aprovação de repasses e compliance COAF.
                </p>
                <div style={{ fontSize: "11px", color: "#334155", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  • Departamento: Diretoria de Operações<br />
                  • Equipe supervisionada: 12 corretores credenciados
                </div>
              </div>

              {/* 2. CORRETOR */}
              <div
                style={{
                  border: usuario.perfilAtivo === "corretor" ? "2px solid #10b981" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                  background: usuario.perfilAtivo === "corretor" ? "rgba(16, 185, 129, 0.05)" : "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Briefcase size={18} color="#10b981" />
                    <span style={{ fontWeight: "800", fontSize: "14px", color: "#121212" }}>2. Corretor Credenciado</span>
                  </div>
                  {usuario.perfilAtivo === "corretor" ? (
                    <span style={{ fontSize: "10px", fontWeight: "700", background: "#10b981", color: "#ffffff", padding: "2px 8px", borderRadius: "10px" }}>
                      ATIVO
                    </span>
                  ) : (
                    <button
                      onClick={() => aoMudarPerfil("corretor")}
                      style={{
                        background: "none",
                        border: "1px solid #10b981",
                        color: "#10b981",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Ativar Perfil
                    </button>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0" }}>
                  Atendimento de leads no funil, agendamentos, geração de Lâminas Paper PDF A4 e split de honorários.
                </p>
                <div style={{ fontSize: "11px", color: "#334155", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  • CRECI: J-14280 / PF 8921-MT<br />
                  • Split padrão de comissão: 50% dos honorários brutos
                </div>
              </div>

              {/* 3. VENDEDOR */}
              <div
                style={{
                  border: usuario.perfilAtivo === "vendedor" ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                  background: usuario.perfilAtivo === "vendedor" ? "rgba(59, 130, 246, 0.05)" : "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Building size={18} color="#3b82f6" />
                    <span style={{ fontWeight: "800", fontSize: "14px", color: "#121212" }}>3. Vendedor / Proprietário</span>
                  </div>
                  {usuario.perfilAtivo === "vendedor" ? (
                    <span style={{ fontSize: "10px", fontWeight: "700", background: "#3b82f6", color: "#ffffff", padding: "2px 8px", borderRadius: "10px" }}>
                      ATIVO
                    </span>
                  ) : (
                    <button
                      onClick={() => aoMudarPerfil("vendedor")}
                      style={{
                        background: "none",
                        border: "1px solid #3b82f6",
                        color: "#3b82f6",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Ativar Perfil
                    </button>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0" }}>
                  Visualização dos próprios imóveis sob gestão, propostas recebidas e extratos de repasses mensais via PIX.
                </p>
                <div style={{ fontSize: "11px", color: "#334155", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  • Imóveis cadastrados: 4 ativos (R$ 9.8M VGV)<br />
                  • Chave PIX cadastrada para repasse: ggamas@gmail.com
                </div>
              </div>

              {/* 4. CLIENTE */}
              <div
                style={{
                  border: usuario.perfilAtivo === "cliente" ? "2px solid #a855f7" : "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                  background: usuario.perfilAtivo === "cliente" ? "rgba(168, 85, 247, 0.05)" : "#ffffff",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <Users size={18} color="#a855f7" />
                    <span style={{ fontWeight: "800", fontSize: "14px", color: "#121212" }}>4. Cliente / Investidor</span>
                  </div>
                  {usuario.perfilAtivo === "cliente" ? (
                    <span style={{ fontSize: "10px", fontWeight: "700", background: "#a855f7", color: "#ffffff", padding: "2px 8px", borderRadius: "10px" }}>
                      ATIVO
                    </span>
                  ) : (
                    <button
                      onClick={() => aoMudarPerfil("cliente")}
                      style={{
                        background: "none",
                        border: "1px solid #a855f7",
                        color: "#a855f7",
                        borderRadius: "6px",
                        padding: "2px 8px",
                        fontSize: "11px",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      Ativar Perfil
                    </button>
                  )}
                </div>
                <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 10px 0" }}>
                  Vitrine personalizada de imóveis salvos, simulações de cartas de consórcio e laudos de vistorias de entrega.
                </p>
                <div style={{ fontSize: "11px", color: "#334155", background: "#f8fafc", padding: "8px", borderRadius: "6px" }}>
                  • Faixa de orçamento: R$ 1.500.000 a R$ 4.500.000<br />
                  • 6 imóveis favoritados · 9 estudos de consórcio gerados
                </div>
              </div>
            </div>
          </div>

          {/* Matriz de Permissões RBAC */}
          <div>
            <h3 style={{ margin: "0 0 12px 0", fontSize: "15px", fontWeight: "800", color: "#121212" }}>
              Matriz de Permissões por Módulo (RBAC)
            </h3>
            <div style={{ border: "1px solid #e2e8f0", borderRadius: "10px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <th style={{ padding: "10px 14px", color: "#475569" }}>Módulo</th>
                    <th style={{ padding: "10px 14px", color: "#475569", textAlign: "center" }}>Leitura</th>
                    <th style={{ padding: "10px 14px", color: "#475569", textAlign: "center" }}>Gravação / Edição</th>
                    <th style={{ padding: "10px 14px", color: "#475569", textAlign: "center" }}>Aprovação / Execução</th>
                  </tr>
                </thead>
                <tbody>
                  {usuario.permissoes.map((p, idx) => (
                    <tr key={p.modulo} style={{ borderBottom: idx < usuario.permissoes.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                      <td style={{ padding: "10px 14px", fontWeight: "700", color: "#121212", textTransform: "capitalize" }}>
                        {p.modulo}
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <span style={{ color: p.podeLer ? "#15803d" : "#94a3b8", fontWeight: "700" }}>✓ Sim</span>
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <span style={{ color: p.podeGravar ? "#15803d" : "#94a3b8", fontWeight: "700" }}>✓ Sim</span>
                      </td>
                      <td style={{ padding: "10px 14px", textAlign: "center" }}>
                        <span style={{ color: p.podeAprovar ? "#15803d" : "#94a3b8", fontWeight: "700" }}>✓ Sim</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div
          style={{
            padding: "16px 24px",
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "12px", color: "#64748b" }}>
            Usuário sincronizado no PostgreSQL (`usuarios` e `acesso.registro`) sob tenant Domus
          </div>
          <button
            onClick={aoFechar}
            style={{
              background: "#121212",
              color: "#C6A15B",
              border: "1px solid #C6A15B",
              borderRadius: "8px",
              padding: "8px 20px",
              fontWeight: "700",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
