import React, { useState } from "react";
import { Lock, Mail, KeyRound, ShieldCheck, CheckCircle2, AlertCircle, X } from "lucide-react";
import { autenticarUsuario } from "../lib/authDomus";
import type { UsuarioDomus } from "../types/usuario";

interface Props {
  aoSucesso: (usuario: UsuarioDomus) => void;
  aoFechar?: () => void;
}

export const ModalLoginDomus: React.FC<Props> = ({ aoSucesso, aoFechar }) => {
  const [email, setEmail] = useState("ggamas@gmail.com");
  const [senha, setSenha] = useState("#231215Verdao");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    const r = autenticarUsuario({ email, senha });
    setCarregando(false);

    if (r.sucesso && r.usuario) {
      aoSucesso(r.usuario);
    } else {
      setErro(r.mensagem || "Não foi possível autenticar.");
    }
  };

  const preencherGgamas = () => {
    setEmail("ggamas@gmail.com");
    setSenha("#231215Verdao");
    setErro("");
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(6px)",
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
          maxWidth: "460px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
          border: "1px solid #C6A15B",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Topo Nobre */}
        <div
          style={{
            padding: "24px",
            background: "#121212",
            color: "#ffffff",
            textAlign: "center",
            position: "relative",
          }}
        >
          {aoFechar && (
            <button
              onClick={aoFechar}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                background: "transparent",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          )}

          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "rgba(198, 161, 91, 0.15)",
              border: "2px solid #C6A15B",
              color: "#C6A15B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 12px auto",
            }}
          >
            <ShieldCheck size={28} />
          </div>

          <h3 style={{ margin: 0, fontSize: "19px", fontWeight: "800", color: "#ffffff" }}>
            Autenticação Domus & Gama
          </h3>
          <p style={{ margin: "6px 0 0 0", fontSize: "12px", color: "#C6A15B" }}>
            Acesso Unificado · Plataforma CRECI J-14280 MT
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
          {erro && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 12px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "8px",
                color: "#991b1b",
                fontSize: "12px",
                marginBottom: "16px",
              }}
            >
              <AlertCircle size={16} />
              <span>{erro}</span>
            </div>
          )}

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
              E-mail do Usuário
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <KeyRound size={16} color="#94a3b8" style={{ position: "absolute", left: "12px", top: "12px" }} />
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite sua senha"
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 36px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "14px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Atalho de Credenciais Solicitadas */}
          <div
            style={{
              padding: "12px",
              background: "#F7F3EA",
              border: "1px dashed #C6A15B",
              borderRadius: "8px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "11px", fontWeight: "700", color: "#854d0e" }}>Usuário Homologado:</div>
              <div style={{ fontSize: "12px", fontWeight: "600", color: "#121212" }}>
                ggamas@gmail.com · 4 perfis
              </div>
            </div>
            <button
              type="button"
              onClick={preencherGgamas}
              style={{
                background: "#121212",
                color: "#C6A15B",
                border: "none",
                borderRadius: "6px",
                padding: "4px 8px",
                fontSize: "11px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Preencher
            </button>
          </div>

          <button
            type="submit"
            disabled={carregando}
            style={{
              width: "100%",
              padding: "12px",
              background: "#121212",
              color: "#C6A15B",
              border: "1px solid #C6A15B",
              borderRadius: "8px",
              fontWeight: "800",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {carregando ? "Autenticando..." : "Entrar na Plataforma"}
          </button>
        </form>
      </div>
    </div>
  );
};
