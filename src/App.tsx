import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Building2,
  Tractor,
  Car,
  Briefcase,
  TrendingUp,
  Calculator,
  Sparkles,
  Layers,
  FileText,
  Calendar,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

// Dados e Configurações
import { MARCA_GAMA } from "./lib/marcaGama";
import { IMOVEIS_MOCK } from "./data/imoveisMock";
import type { Imovel } from "./types/imovel";
import { simularConsorcio, TABELAS_ADMINISTRADORAS } from "./lib/motor-consorcios";

// Componentes do Site Público
import { NavbarGama } from "./components/NavbarGama";
import { FooterGama } from "./components/FooterGama";
import { CatalogoImoveis } from "./components/CatalogoImoveis";
import { ModalFichaImovel } from "./components/ModalFichaImovel";
import { ModalPaperPdfImovel } from "./components/ModalPaperPdfImovel";
import { DescobertaIaModal } from "./components/DescobertaIaModal";
import { ComparadorImoveisModal } from "./components/ComparadorImoveisModal";
import { SimuladorFinanciamento } from "./components/SimuladorFinanciamento";
import { AvaliacaoImovelModal } from "./components/AvaliacaoImovelModal";

// Componentes de Consórcios
import { SimuladorConsorcio } from "./components/SimuladorConsorcio";
import { ComparadorEconomia } from "./components/ComparadorEconomia";
import { VitrineCartasContempladas } from "./components/VitrineCartasContempladas";

// Plataforma de Gestão Interna (/plataforma)
import { LayoutPlataformaGama, type SecaoPlataforma } from "./plataforma/LayoutPlataformaGama";
import { PainelHojeGama } from "./plataforma/PainelHojeGama";
import { GestaoImoveisGama } from "./plataforma/GestaoImoveisGama";
import { CrmFunilGama } from "./plataforma/CrmFunilGama";
import { VistoriaDigitalGama } from "./plataforma/VistoriaDigitalGama";
import { CentralMinutasGama } from "./plataforma/CentralMinutasGama";
import { PainelConsorciosSite } from "./plataforma/PainelConsorciosSite";

export const App: React.FC = () => {
  // Controle de Rotas
  const [rotaAtual, setRotaAtual] = useState<"site" | "plataforma">(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/plataforma") || hash.includes("plataforma")) {
        return "plataforma";
      }
    }
    return "site";
  });

  const [secaoPlataforma, setSecaoPlataforma] = useState<SecaoPlataforma>(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname.toLowerCase();
      if (p.includes("/imoveis")) return "imoveis";
      if (p.includes("/crm")) return "crm";
      if (p.includes("/vistorias")) return "vistorias";
      if (p.includes("/contratos")) return "contratos";
      if (p.includes("/consorcios")) return "consorcios";
      if (p.includes("/agenda")) return "agenda";
    }
    return "hoje";
  });

  // Estados dos Modais
  const [imovelFicha, setImovelFicha] = useState<Imovel | null>(null);
  const [imovelPaperPdf, setImovelPaperPdf] = useState<Imovel | null>(null);
  const [modalIaAberto, setModalIaAberto] = useState(false);
  const [modalComparadorAberto, setModalComparadorAberto] = useState(false);
  const [modalAvaliacaoAberto, setModalAvaliacaoAberto] = useState(false);

  // Imóveis selecionados para comparação
  const [comparadorIds, setComparadorIds] = useState<string[]>([]);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes("/plataforma") || hash.includes("plataforma")) {
        setRotaAtual("plataforma");
        if (path.includes("/vistorias")) setSecaoPlataforma("vistorias");
        else if (path.includes("/contratos")) setSecaoPlataforma("contratos");
        else if (path.includes("/imoveis")) setSecaoPlataforma("imoveis");
        else if (path.includes("/crm")) setSecaoPlataforma("crm");
        else if (path.includes("/consorcios")) setSecaoPlataforma("consorcios");
        else setSecaoPlataforma("hoje");
      } else {
        setRotaAtual("site");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navegarPara = (novaRota: "site" | "plataforma", secao?: SecaoPlataforma) => {
    setRotaAtual(novaRota);
    if (secao) setSecaoPlataforma(secao);

    if (typeof window !== "undefined") {
      const url =
        novaRota === "plataforma"
          ? secao && secao !== "hoje"
            ? `/plataforma/${secao}`
            : "/plataforma"
          : "/";
      window.history.pushState({}, "", url);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const alternarComparador = (imovel: Imovel) => {
    setComparadorIds((prev) => {
      if (prev.includes(imovel.id)) {
        return prev.filter((id) => id !== imovel.id);
      }
      if (prev.length >= 4) {
        alert("Você pode comparar até 4 imóveis simultaneamente.");
        return prev;
      }
      return [...prev, imovel.id];
    });
  };

  const removerComparador = (id: string) => {
    setComparadorIds((prev) => prev.filter((item) => item !== id));
  };

  const imoveisComparados = IMOVEIS_MOCK.filter((im) => comparadorIds.includes(im.id));

  // Simulação de referência para comparativo consórcio
  const simulacaoReferencia = simularConsorcio({
    categoria: "imobiliario",
    valorCredito: 500_000,
    prazoMeses: 200,
    modalidadeParcela: "reduzida_70",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
      {/* ROTA DA PLATAFORMA DE GESTÃO (/plataforma) */}
      {rotaAtual === "plataforma" ? (
        <LayoutPlataformaGama
          secaoAtiva={secaoPlataforma}
          aoMudarSecao={(secao) => {
            setSecaoPlataforma(secao);
            if (typeof window !== "undefined") {
              const url = secao === "hoje" ? "/plataforma" : `/plataforma/${secao}`;
              window.history.pushState({}, "", url);
            }
          }}
          aoVoltarSite={() => navegarPara("site")}
        >
          {secaoPlataforma === "hoje" && (
            <PainelHojeGama
              imoveis={IMOVEIS_MOCK}
              aoNavegarSecao={(s) => setSecaoPlataforma(s)}
              aoAbrirPaperPdf={(im) => setImovelPaperPdf(im)}
            />
          )}

          {secaoPlataforma === "imoveis" && (
            <GestaoImoveisGama
              imoveis={IMOVEIS_MOCK}
              aoAbrirPaperPdf={(im) => setImovelPaperPdf(im)}
              aoAbrirFicha={(im) => setImovelFicha(im)}
            />
          )}

          {secaoPlataforma === "crm" && <CrmFunilGama />}

          {secaoPlataforma === "vistorias" && <VistoriaDigitalGama />}

          {secaoPlataforma === "contratos" && <CentralMinutasGama />}

          {secaoPlataforma === "consorcios" && <PainelConsorciosSite />}

          {secaoPlataforma === "agenda" && (
            <div style={{ background: "#ffffff", borderRadius: "12px", padding: "28px", border: "1px solid #e2e8f0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <Calendar size={22} color="#C6A15B" />
                <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#121212", margin: 0 }}>
                  Agenda de Visitas & Vistorias · Equipe Gama
                </h2>
              </div>
              <p style={{ color: "#64748b", fontSize: "14px" }}>
                Todos os horários de visitas agendadas via WhatsApp e vistorias de entrega de chaves com os peritos credenciados.
              </p>
              <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #C6A15B" }}>
                  <div style={{ fontWeight: "700", color: "#121212" }}>Visita - Mansão Vale do Sol (GM101)</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>Hoje às 10:00 · Dr. Marcos Vinicius</div>
                </div>
                <div style={{ padding: "16px", background: "#f8fafc", borderRadius: "8px", borderLeft: "4px solid #15803d" }}>
                  <div style={{ fontWeight: "700", color: "#121212" }}>Vistoria Digital de Entrega - Bellagio Executive (GM102)</div>
                  <div style={{ fontSize: "13px", color: "#64748b" }}>Hoje às 14:30 · Laudo com assinatura touch na tela</div>
                </div>
              </div>
            </div>
          )}
        </LayoutPlataformaGama>
      ) : (
        /* ROTA DO SITE PÚBLICO GAMA PATRIMONIAL & DOMUS */
        <>
          <NavbarGama
            rotaAtual={rotaAtual}
            aoNavegar={(r) => navegarPara(r)}
            aoAbrirIa={() => setModalIaAberto(true)}
            aoAbrirComparador={() => setModalComparadorAberto(true)}
            totalComparador={comparadorIds.length}
          />

          <main>
            {/* HERO SECTION NOBRE GAMA (#121212 com toques dourados #C6A15B e fundo nobre #F7F3EA) */}
            <section
              style={{
                background: "linear-gradient(135deg, #121212 0%, #1f1f1f 50%, #2b2b2b 100%)",
                color: "#ffffff",
                padding: "70px 24px 90px 24px",
                textAlign: "center",
                position: "relative",
                borderBottom: "2px solid #C6A15B",
              }}
            >
              <div style={{ maxWidth: "950px", margin: "0 auto" }}>
                <div
                  style={{
                    background: "rgba(198, 161, 91, 0.15)",
                    color: "#C6A15B",
                    padding: "6px 16px",
                    borderRadius: "30px",
                    fontSize: "12px",
                    fontWeight: "800",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "20px",
                    border: "1px solid rgba(198, 161, 91, 0.4)",
                    letterSpacing: "1px",
                  }}
                >
                  <ShieldCheck size={16} />
                  INTELIGÊNCIA IMOBILIÁRIA & CRÉDITO PATRIMONIAL · CRECI {MARCA_GAMA.creci}
                </div>

                <h1
                  style={{
                    fontSize: "44px",
                    fontWeight: "800",
                    lineHeight: "1.15",
                    marginBottom: "20px",
                    letterSpacing: "-0.5px",
                    color: "#ffffff",
                  }}
                >
                  Decisões Estratégicas que Transformam Capital em Patrimônio Sólido
                </h1>

                <p
                  style={{
                    fontSize: "18px",
                    color: "#F7F3EA",
                    lineHeight: "1.6",
                    marginBottom: "36px",
                    maxWidth: "800px",
                    margin: "0 auto 36px auto",
                    opacity: 0.9,
                  }}
                >
                  A <strong>Gama Patrimonial</strong> conecta investidores e famílias aos melhores imóveis de Tangará da Serra
                  e Mato Grosso, com lâminas executivas A4 para WhatsApp, simulador de crédito SAC/PRICE e cotas de consórcios
                  sem juros bancários.
                </p>

                {/* Botões de Ação Imediata */}
                <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "40px" }}>
                  <a
                    href="#imoveis"
                    style={{
                      background: "#C6A15B",
                      color: "#121212",
                      padding: "12px 24px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "800",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      textDecoration: "none",
                    }}
                  >
                    <Building2 size={18} />
                    Explorar Imóveis & Fazendas
                  </a>

                  <button
                    type="button"
                    onClick={() => setModalAvaliacaoAberto(true)}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      color: "#ffffff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <TrendingUp size={18} color="#C6A15B" />
                    Quanto Vale Meu Imóvel? (AVM)
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalIaAberto(true)}
                    style={{
                      background: "rgba(198, 161, 91, 0.2)",
                      color: "#C6A15B",
                      border: "1px solid #C6A15B",
                      padding: "12px 20px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Sparkles size={18} />
                    Descoberta com IA
                  </button>
                </div>

                {/* Cards rápidos das categorias */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                    gap: "16px",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "18px",
                      borderRadius: "12px",
                      border: "1px solid rgba(198, 161, 91, 0.3)",
                    }}
                  >
                    <Building2 size={24} color="#C6A15B" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Residencial Alto Padrão</div>
                    <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Casas em condomínio e coberturas</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "18px",
                      borderRadius: "12px",
                      border: "1px solid rgba(198, 161, 91, 0.3)",
                    }}
                  >
                    <Tractor size={24} color="#C6A15B" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Agro & Fazendas MT</div>
                    <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Áreas de soja, milho e pecuária</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "18px",
                      borderRadius: "12px",
                      border: "1px solid rgba(198, 161, 91, 0.3)",
                    }}
                  >
                    <Calculator size={24} color="#C6A15B" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Crédito Estruturado</div>
                    <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Simulações SAC, PRICE e Consórcios</div>
                  </div>
                  <div
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      padding: "18px",
                      borderRadius: "12px",
                      border: "1px solid rgba(198, 161, 91, 0.3)",
                    }}
                  >
                    <FileText size={24} color="#C6A15B" style={{ marginBottom: "8px" }} />
                    <div style={{ fontWeight: "700", fontSize: "15px" }}>Paper PDF A4 Instantâneo</div>
                    <div style={{ fontSize: "12px", color: "#cbd5e1" }}>Lâminas prontas para WhatsApp</div>
                  </div>
                </div>
              </div>
            </section>

            {/* CATÁLOGO DE IMÓVEIS */}
            <CatalogoImoveis
              imoveis={IMOVEIS_MOCK}
              aoAbrirFicha={(im) => setImovelFicha(im)}
              aoAbrirPaperPdf={(im) => setImovelPaperPdf(im)}
              aoAlternarComparador={(im) => alternarComparador(im)}
              imoveisComparadorIds={comparadorIds}
            />

            {/* SEÇÃO SIMULADOR DE FINANCIAMENTO HABITACIONAL */}
            <section
              id="simulador-financiamento"
              style={{ background: "#F7F3EA", padding: "70px 24px", borderTop: "1px solid #E5DFC9" }}
            >
              <div style={{ maxWidth: "1150px", margin: "0 auto" }}>
                <SimuladorFinanciamento
                  valorPadraoImovel={800000}
                  aoIrParaConsorcio={() => {
                    const el = document.getElementById("consorcios");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              </div>
            </section>

            {/* SEÇÃO CONSÓRCIOS & SOLUÇÕES FINANCEIRAS */}
            <section id="consorcios" style={{ padding: "70px 24px", maxWidth: "1200px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "36px" }}>
                <span
                  style={{
                    color: "#C6A15B",
                    fontWeight: "800",
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                  }}
                >
                  DOMUS CONSÓRCIOS & SOLUÇÕES FINANCEIRAS
                </span>
                <h2 style={{ fontSize: "34px", fontWeight: "800", color: "#121212", margin: "6px 0 12px 0" }}>
                  Alavanque seu Patrimônio Sem Pagar Juros Bancários
                </h2>
                <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "720px", margin: "0 auto" }}>
                  Planos com parcelas reduzidas até a contemplação, lances embutidos de até 30% e uso de FGTS com
                  as maiores administradoras fiscalizadas pelo Banco Central.
                </p>
              </div>

              <SimuladorConsorcio />
            </section>

            {/* SEÇÃO COMPARATIVO CONSÓRCIO VS FINANCIAMENTO */}
            <section style={{ background: "#F7F3EA", padding: "60px 24px", borderTop: "1px solid #E5DFC9" }}>
              <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
                <ComparadorEconomia resultado={simulacaoReferencia} />
              </div>
            </section>

            {/* SEÇÃO CARTAS CONTEMPLADAS */}
            <section id="cartas" style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
              <VitrineCartasContempladas />
            </section>

            {/* ADMINISTRADORAS HOMOLOGADAS BACEN */}
            <section style={{ background: "#ffffff", padding: "60px 24px", borderTop: "1px solid #e2e8f0" }}>
              <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
                <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#121212", marginBottom: "10px" }}>
                  Administradoras Homologadas pelo Banco Central do Brasil
                </h3>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "28px" }}>
                  Parcerias estratégicas com as mais sólidas instituições financeiras do país.
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
                        border: "1px solid #E5DFC9",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ fontWeight: "700", color: "#121212", fontSize: "14px" }}>{adm.nome}</div>
                      <div style={{ fontSize: "11px", color: "#C6A15B", fontWeight: "700", marginTop: "4px" }}>
                        Tx. Adm.: {adm.taxaAdmMediaPct}% · Prazos até {Math.max(...adm.prazosDisponiveis)}m
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <FooterGama aoNavegarPlataforma={() => navegarPara("plataforma")} />
        </>
      )}

      {/* MODAL FICHA TÉCNICA DO IMÓVEL */}
      {imovelFicha && (
        <ModalFichaImovel
          imovel={imovelFicha}
          aoFechar={() => setImovelFicha(null)}
          aoAbrirPaperPdf={() => {
            const im = imovelFicha;
            setImovelFicha(null);
            setImovelPaperPdf(im);
          }}
          aoAbrirFinanciamento={() => {
            setImovelFicha(null);
            const el = document.getElementById("simulador-financiamento");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          aoAbrirConsorcio={() => {
            setImovelFicha(null);
            const el = document.getElementById("consorcios");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      )}

      {/* MODAL PAPER PDF A4 PARA WHATSAPP */}
      {imovelPaperPdf && (
        <ModalPaperPdfImovel
          imovel={imovelPaperPdf}
          aoFechar={() => setImovelPaperPdf(null)}
        />
      )}

      {/* MODAL DESCOBERTA COM IA */}
      {modalIaAberto && (
        <DescobertaIaModal
          imoveis={IMOVEIS_MOCK}
          aoFechar={() => setModalIaAberto(false)}
          aoSelecionarImovel={(im) => setImovelFicha(im)}
        />
      )}

      {/* MODAL COMPARADOR DE IMÓVEIS */}
      {modalComparadorAberto && (
        <ComparadorImoveisModal
          imoveis={imoveisComparados}
          aoFechar={() => setModalComparadorAberto(false)}
          aoRemover={(id) => removerComparador(id)}
          aoVerImovel={(im) => setImovelFicha(im)}
        />
      )}

      {/* MODAL AVALIAÇÃO INSTANTÂNEA AVM */}
      {modalAvaliacaoAberto && (
        <AvaliacaoImovelModal aoFechar={() => setModalAvaliacaoAberto(false)} />
      )}
    </div>
  );
};
