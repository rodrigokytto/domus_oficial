import React, { useState, useEffect } from "react";
import { SimuladorConsorcio } from "./components/SimuladorConsorcio";
import { ComparadorEconomia } from "./components/ComparadorEconomia";
import { VitrineCartasContempladas } from "./components/VitrineCartasContempladas";
import { PainelConsorciosSite } from "./plataforma/PainelConsorciosSite";
import { simularConsorcio, TABELAS_ADMINISTRADORAS } from "./lib/motor-consorcios";
import {
  ShieldCheck,
  TrendingDown,
  Building2,
  Tractor,
  Car,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  PhoneCall,
  LayoutDashboard,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

export const App: React.FC = () => {
  const [rotaAtual, setRotaAtual] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/plataforma") || hash.includes("plataforma")) {
        return "plataforma";
      }
    }
    return "site";
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/plataforma") || hash.includes("plataforma")) {
        setRotaAtual("plataforma");
      } else {
        setRotaAtual("site");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navegarPara = (novaRota: "site" | "plataforma") => {
    setRotaAtual(novaRota);
    if (typeof window !== "undefined") {
      const url = novaRota === "plataforma" ? "/plataforma/site" : "/";
      window.history.pushState({}, "", url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Simulação de referência para exibição do comparador na página inicial
  const simulacaoReferencia = simularConsorcio({
    categoria: "imobiliario",
    valorCredito: 500_000,
    prazoMeses: 200,
    modalidadeParcela: "reduzida_70",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Barra de Notificação Superior */}
      <div
        style={{
          background: "#094739",
          color: "#e6f4f1",
          padding: "8px 16px",
          fontSize: "13px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <ShieldCheck size={16} color="#d99b26" />
          <span>
            <strong>Domus Consórcios & Soluções Financeiras:</strong> Em conformidade com a Lei nº 11.795/2008 e BACEN.
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            type="button"
            onClick={() => navegarPara(rotaAtual === "plataforma" ? "site" : "plataforma")}
            style={{
              background: "rgba(255,255,255,0.15)",
              color: "#ffffff",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "4px 12px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <LayoutDashboard size={14} />
            {rotaAtual === "plataforma" ? "Ver Site Público" : "Acessar /plataforma/site"}
          </button>
        </div>
      </div>

      {/* Rota da Plataforma de Gestão (/plataforma/site) */}
      {rotaAtual === "plataforma" ? (
        <main style={{ flex: 1, background: "#f8fafc" }}>
          <div
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              padding: "12px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  background: "#0e6b57",
                  color: "#ffffff",
                  fontWeight: "800",
                  fontSize: "18px",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  letterSpacing: "1px",
                }}
              >
                DOMUS
              </div>
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "600" }}>
                Módulo /plataforma/site · Gestão Comercial
              </span>
            </div>
            <button
              type="button"
              onClick={() => navegarPara("site")}
              style={{
                background: "#0e6b57",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              ← Voltar ao Portal do Cliente
            </button>
          </div>
          <PainelConsorciosSite />
        </main>
      ) : (
        /* Rota do Site Público */
        <>
          {/* Header Principal */}
          <header
            style={{
              background: "#ffffff",
              borderBottom: "1px solid #e2e8f0",
              position: "sticky",
              top: 0,
              zIndex: 100,
              boxShadow: "0 2px 10px rgba(0,0,0,0.03)",
            }}
          >
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "16px 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    background: "#0e6b57",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "22px",
                    padding: "8px 16px",
                    borderRadius: "10px",
                    letterSpacing: "1.5px",
                  }}
                >
                  DOMUS
                </div>
                <div>
                  <div style={{ fontSize: "17px", fontWeight: "800", color: "#0e6b57", lineHeight: "1.2" }}>
                    Consórcios & Soluções Financeiras
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>Tangará da Serra & Região · Mato Grosso</div>
                </div>
              </div>

              <nav style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                <a href="#simulador" style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                  Simulador
                </a>
                <a href="#comparativo" style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                  Consórcio vs Financiamento
                </a>
                <a href="#cartas" style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                  Cartas Contempladas
                </a>
                <a href="#administradoras" style={{ fontSize: "14px", fontWeight: "600", color: "#475569" }}>
                  Administradoras
                </a>
                <a
                  href="https://wa.me/5565999025800?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20especialista%20da%20Domus%20Cons%C3%B3rcios"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#25d366",
                    color: "#ffffff",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: "700",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MessageCircle size={16} />
                  Falar com Consultor
                </a>
              </nav>
            </div>
          </header>

          <main>
            {/* Hero Section */}
            <section
              style={{
                background: "linear-gradient(135deg, #0e6b57 0%, #094739 100%)",
                color: "#ffffff",
                padding: "60px 24px 80px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <span
                  style={{
                    background: "rgba(217, 155, 38, 0.2)",
                    color: "#f5d179",
                    padding: "6px 14px",
                    borderRadius: "20px",
                    fontSize: "13px",
                    fontWeight: "700",
                    display: "inline-block",
                    marginBottom: "16px",
                    border: "1px solid rgba(217, 155, 38, 0.4)",
                  }}
                >
                  PLANILHA INTELIGENTE DE CRÉDITO PATRIMONIAL
                </span>
                <h1
                  style={{
                    fontSize: "42px",
                    fontWeight: "800",
                    lineHeight: "1.2",
                    marginBottom: "20px",
                    letterSpacing: "-0.5px",
                  }}
                >
                  Construa seu patrimônio e invista no Agro sem pagar juros bancários
                </h1>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#cce8e2",
                    lineHeight: "1.6",
                    marginBottom: "32px",
                    maxWidth: "760px",
                    margin: "0 auto 32px auto",
                  }}
                >
                  A <strong>Domus</strong> conecta você às 10 maiores administradoras do país com as menores taxas de
                  administração, lances embutidos de até 30%, uso de FGTS e parcelas reduzidas até a contemplação.
                </p>

                {/* Cards rápidos das categorias */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "16px",
                    maxWidth: "850px",
                    margin: "0 auto",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <Building2 size={24} color="#f5d179" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Imobiliário</div>
                    <div style={{ fontSize: "12px", color: "#cce8e2" }}>Até R$ 2,5 Mi em 200 meses</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <Tractor size={24} color="#f5d179" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Agro & Pesados</div>
                    <div style={{ fontSize: "12px", color: "#cce8e2" }}>Tratores, colheitadeiras e caminhões</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <Car size={24} color="#f5d179" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Veículos</div>
                    <div style={{ fontSize: "12px", color: "#cce8e2" }}>Novos e seminovos em até 100x</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.08)",
                      padding: "16px",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    <Briefcase size={24} color="#f5d179" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Cartas Prontas</div>
                    <div style={{ fontSize: "12px", color: "#cce8e2" }}>Contempladas para retirada rápida</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção do Simulador */}
            <section id="simulador" style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "32px" }}>
                <span
                  style={{
                    color: "#0e6b57",
                    fontWeight: "700",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  SIMULAÇÃO INSTANTÂNEA
                </span>
                <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#1e293b", margin: "6px 0 12px 0" }}>
                  Calcule sua Parcela e Proposta Sob Medida
                </h2>
                <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>
                  Ajuste o valor do crédito desejado e descubra o valor da parcela mensal com opção de parcela reduzida até a
                  contemplação.
                </p>
              </div>

              <SimuladorConsorcio />
            </section>

            {/* Seção Comparativo Consórcio vs Financiamento */}
            <section id="comparativo" style={{ background: "#f1f5f9", padding: "60px 24px" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <ComparadorEconomia resultado={simulacaoReferencia} />
              </div>
            </section>

            {/* Seção de Cartas Contempladas */}
            <section id="cartas" style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
              <VitrineCartasContempladas />
            </section>

            {/* Administradoras Homologadas */}
            <section id="administradoras" style={{ background: "#ffffff", padding: "60px 24px", borderTop: "1px solid #e2e8f0" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#1e293b", marginBottom: "12px" }}>
                  Administradoras Parceiras Homologadas pelo Banco Central
                </h3>
                <p style={{ color: "#64748b", fontSize: "15px", marginBottom: "32px" }}>
                  Trabalhamos com as maiores e mais sólidas instituições financeiras do país para garantir solidez e
                  segurança patrimonial aos nossos clientes.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {Object.values(TABELAS_ADMINISTRADORAS).map((adm) => (
                    <div
                      key={adm.nome}
                      style={{
                        padding: "16px",
                        background: "#f8fafc",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ fontWeight: "700", color: "#0e6b57", fontSize: "15px" }}>{adm.nome}</div>
                      <div style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}>
                        Tx. Adm.: {adm.taxaAdmMediaPct}% · Prazos até {Math.max(...adm.prazosDisponiveis)}m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          {/* Rodapé Institucional */}
          <footer style={{ background: "#094739", color: "#ffffff", padding: "40px 24px 24px 24px" }}>
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "32px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "32px",
                marginBottom: "24px",
              }}
            >
              <div>
                <div style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "1px", marginBottom: "8px" }}>
                  DOMUS
                </div>
                <div style={{ fontSize: "13px", color: "#cce8e2", lineHeight: "1.5" }}>
                  Consórcios & Soluções Financeiras especializadas em Imóveis, Agro, Pesados e Veículos. A forma
                  inteligente de alavancar seu patrimônio sem pagar juros bancários.
                </div>
              </div>

              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Atendimento Oficial</div>
                <div style={{ fontSize: "13px", color: "#cce8e2", lineHeight: "1.8" }}>
                  <div>WhatsApp: +55 (65) 99902-5800</div>
                  <div>Tangará da Serra · Mato Grosso</div>
                  <div>Segunda a Sexta: 08:00 às 18:00</div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Links e Governança</div>
                <div style={{ fontSize: "13px", color: "#cce8e2", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => navegarPara("plataforma")}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#f5d179",
                      textAlign: "left",
                      fontSize: "13px",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    → Painel da Plataforma (/plataforma/site)
                  </button>
                  <a href="#simulador" style={{ color: "#cce8e2" }}>
                    → Simulador de Consórcio
                  </a>
                  <a href="#cartas" style={{ color: "#cce8e2" }}>
                    → Cartas Contempladas
                  </a>
                </div>
              </div>
            </div>

            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "12px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              <div>© 2026 Domus Consórcios & Soluções Financeiras. Todos os direitos reservados.</div>
              <div>Operações em estrita conformidade com a Lei Federal nº 11.795/2008 e Banco Central do Brasil.</div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};
