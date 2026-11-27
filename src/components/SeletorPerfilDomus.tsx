import React, { useState, useRef, useEffect } from "react";
import {
  ShieldCheck,
  ChevronDown,
  UserCheck,
  Building,
  Briefcase,
  Users,
  LogOut,
  Info,
  Check,
  KeyRound,
} from "lucide-react";
import type { PerfilUsuario, UsuarioDomus } from "../types/usuario";
import { rotuloPerfil, descricaoPerfil, badgeCorPerfil } from "../lib/authDomus";

interface Props {
  usuario: UsuarioDomus;
  aoMudarPerfil: (perfil: PerfilUsuario) => void;
  aoAbrirDetalhesUsuario: () => void;
  aoSair?: () => void;
}

export const SeletorPerfilDomus: React.FC<Props> = ({
  usuario,
  aoMudarPerfil,
  aoAbrirDetalhesUsuario,
  aoSair,
}) => {
  const [aberto, setAberto] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickFora = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setAberto(false);
      }
    };
    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const badgeAtual = badgeCorPerfil(usuario.perfilAtivo);

  const obterIcone = (perfil: PerfilUsuario, tamanho = 16) => {
    switch (perfil) {
      case "gerente":
        return <ShieldCheck size={tamanho} color="#C6A15B" />;
      case "corretor":
        return <Briefcase size={tamanho} color="#10b981" />;
      case "vendedor":
        return <Building size={tamanho} color="#3b82f6" />;
      case "cliente":
        return <Users size={tamanho} color="#a855f7" />;
    }
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {/* Botão de Trigger no Cabeçalho */}
      <button
        onClick={() => setAberto(!aberto)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "#ffffff",
          border: `1.5px solid ${aberto ? "#C6A15B" : "#e2e8f0"}`,
          borderRadius: "10px",
          padding: "6px 14px",
          cursor: "pointer",
          transition: "all 0.15s ease",
          boxShadow: aberto ? "0 4px 12px rgba(198, 161, 91, 0.15)" : "none",
        }}
        title="Clique para alternar entre os seus 4 perfis cadastrados"
      >
        {/* Avatar com iniciais */}
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
            border: "1.5px solid #C6A15B",
            flexShrink: 0,
          }}
        >
          GG
        </div>

        {/* Informações de Nome e Perfil Ativo */}
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>
              {usuario.nome}
            </span>
            <span
              style={{
                fontSize: "10px",
                fontWeight: "700",
                background: badgeAtual.bg,
                color: badgeAtual.texto,
                border: `1px solid ${badgeAtual.borda}`,
                padding: "1px 6px",
                borderRadius: "12px",
                display: "inline-flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              {obterIcone(usuario.perfilAtivo, 11)}
              {rotuloPerfil(usuario.perfilAtivo)}
            </span>
          </div>
          <div style={{ fontSize: "11px", color: "#64748b" }}>
            {usuario.email}
          </div>
        </div>

        <ChevronDown
          size={16}
          color="#64748b"
          style={{
            transition: "transform 0.2s ease",
            transform: aberto ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {/* Dropdown Menu com os 4 Perfis */}
      {aberto && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "330px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e2e8f0",
            zIndex: 1000,
            overflow: "hidden",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          {/* Header do Menu */}
          <div
            style={{
              padding: "14px 16px",
              background: "#121212",
              color: "#ffffff",
              borderBottom: "1px solid rgba(198, 161, 91, 0.3)",
            }}
          >
            <div style={{ fontSize: "11px", color: "#C6A15B", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>
              Conta Multiperfil Domus
            </div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff", marginTop: "2px" }}>
              {usuario.email}
            </div>
            <div style={{ fontSize: "12px", color: "#cbd5e1" }}>
              4 perfis integrados com acesso simultâneo
            </div>
          </div>

          {/* Lista de Perfis Alternáveis */}
          <div style={{ padding: "8px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#64748b",
                textTransform: "uppercase",
                padding: "6px 10px",
                letterSpacing: "0.5px",
              }}
            >
              Alternar Modo de Operação
            </div>

            {usuario.perfis.map((perfil) => {
              const ativo = usuario.perfilAtivo === perfil;
              const cores = badgeCorPerfil(perfil);

              return (
                <button
                  key={perfil}
                  onClick={() => {
                    aoMudarPerfil(perfil);
                    setAberto(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    border: ativo ? `1.5px solid ${cores.borda}` : "1.5px solid transparent",
                    background: ativo ? cores.bg : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    marginBottom: "4px",
                  }}
                >
                  <div
                    style={{
                      marginTop: "2px",
                      padding: "6px",
                      borderRadius: "6px",
                      background: ativo ? cores.borda : "#f1f5f9",
                      color: ativo ? "#ffffff" : "#64748b",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {obterIcone(perfil, 16)}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: ativo ? "800" : "600",
                          color: ativo ? "#121212" : "#334155",
                        }}
                      >
                        {rotuloPerfil(perfil)}
                      </span>
                      {ativo && <Check size={16} color={cores.borda} strokeWidth={3} />}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: ativo ? "#475569" : "#64748b",
                        lineHeight: "1.3",
                        marginTop: "2px",
                      }}
                    >
                      {descricaoPerfil(perfil)}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rodapé com Ações Rápidas */}
          <div
            style={{
              padding: "10px 14px",
              background: "#f8fafc",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <button
              onClick={() => {
                setAberto(false);
                aoAbrirDetalhesUsuario();
              }}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                background: "#ffffff",
                fontSize: "12px",
                fontWeight: "600",
                color: "#1e293b",
                cursor: "pointer",
              }}
            >
              <Info size={14} color="#C6A15B" />
              <span>Ver Ficha Cadastral & Permissões</span>
            </button>

            {aoSair && (
              <button
                onClick={() => {
                  setAberto(false);
                  aoSair();
                }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  border: "none",
                  background: "transparent",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#dc2626",
                  cursor: "pointer",
                }}
              >
                <LogOut size={14} color="#dc2626" />
                <span>Encerrar Sessão / Trocar de Conta</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
