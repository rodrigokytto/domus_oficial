import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Maximize2,
  Bed,
  Bath,
  Car,
  MapPin,
  FileText,
  Eye,
  Layers,
  Sparkles,
  Check,
} from "lucide-react";
import type { Imovel, FiltrosImoveis } from "../types/imovel";
import { MARCA_GAMA } from "../lib/marcaGama";

interface Props {
  imoveis: Imovel[];
  aoAbrirFicha: (imovel: Imovel) => void;
  aoAbrirPaperPdf: (imovel: Imovel) => void;
  aoAlternarComparador: (imovel: Imovel) => void;
  imoveisComparadorIds: string[];
}

export const CatalogoImoveis: React.FC<Props> = ({
  imoveis,
  aoAbrirFicha,
  aoAbrirPaperPdf,
  aoAlternarComparador,
  imoveisComparadorIds,
}) => {
  const [filtros, setFiltros] = useState<FiltrosImoveis>({
    finalidade: "todas",
    tipo: "todos",
    bairro: "todos",
    termoBusca: "",
  });

  const formatarDinheiro = (val?: number | null) => {
    if (!val || Number.isNaN(val)) return null;
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const bairrosDisponiveis = useMemo(() => {
    const set = new Set<string>();
    imoveis.forEach((im) => set.add(im.bairro));
    return Array.from(set);
  }, [imoveis]);

  const imoveisFiltrados = useMemo(() => {
    return imoveis.filter((im) => {
      if (filtros.finalidade && filtros.finalidade !== "todas") {
        if (filtros.finalidade === "venda" && im.finalidade === "aluguel") return false;
        if (filtros.finalidade === "aluguel" && im.finalidade === "venda") return false;
      }
      if (filtros.tipo && filtros.tipo !== "todos" && im.tipo !== filtros.tipo) {
        return false;
      }
      if (filtros.bairro && filtros.bairro !== "todos" && im.bairro !== filtros.bairro) {
        return false;
      }
      if (filtros.termoBusca) {
        const t = filtros.termoBusca.toLowerCase();
        const texto = `${im.titulo} ${im.descricao} ${im.codigo} ${im.bairro} ${im.cidade}`.toLowerCase();
        if (!texto.includes(t)) return false;
      }
      return true;
    });
  }, [imoveis, filtros]);

  return (
    <section id="imoveis" style={{ padding: "60px 24px", maxWidth: "1250px", margin: "0 auto" }}>
      {/* Título da Seção */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <span
          style={{
            background: "#F7F3EA",
            color: "#C6A15B",
            border: "1px solid #E5DFC9",
            padding: "4px 14px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "800",
            textTransform: "uppercase",
            letterSpacing: "1px",
            display: "inline-block",
            marginBottom: "10px",
          }}
        >
          CARTEIRA EXCLUSIVA GAMA PATRIMONIAL
        </span>
        <h2 style={{ fontSize: "34px", fontWeight: "800", color: "#121212", margin: "0 0 10px 0" }}>
          Imóveis e Oportunidades Selecionadas
        </h2>
        <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "700px", margin: "0 auto" }}>
          Explore residências de alto padrão, fazendas de dupla aptidão no Mato Grosso e imóveis comerciais com
          lâmina executiva A4 para envio imediato aos seus clientes.
        </p>
      </div>

      {/* Barra de Filtros Facetados */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "14px",
          padding: "20px",
          border: "1px solid #E5DFC9",
          boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            alignItems: "center",
          }}
        >
          {/* Busca por texto */}
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              color="#94a3b8"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Buscar por código, bairro ou palavra..."
              value={filtros.termoBusca}
              onChange={(e) => setFiltros({ ...filtros, termoBusca: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px 10px 38px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Finalidade */}
          <div>
            <select
              value={filtros.finalidade}
              onChange={(e) => setFiltros({ ...filtros, finalidade: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#ffffff",
              }}
            >
              <option value="todas">Todas as Finalidades (Venda & Locação)</option>
              <option value="venda">Apenas Venda</option>
              <option value="aluguel">Apenas Locação</option>
            </select>
          </div>

          {/* Tipo de Imóvel */}
          <div>
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#ffffff",
              }}
            >
              <option value="todos">Todos os Tipos de Imóveis</option>
              <option value="casa">Casas em Condomínio / Rua</option>
              <option value="apartamento">Apartamentos</option>
              <option value="fazenda">Fazendas & Imóveis Rurais</option>
              <option value="terreno">Terrenos & Lotes</option>
              <option value="comercial">Comerciais & Salas</option>
            </select>
          </div>

          {/* Bairro */}
          <div>
            <select
              value={filtros.bairro}
              onChange={(e) => setFiltros({ ...filtros, bairro: e.target.value })}
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                background: "#ffffff",
              }}
            >
              <option value="todos">Todos os Bairros</option>
              {bairrosDisponiveis.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Imóveis */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "28px",
        }}
      >
        {imoveisFiltrados.map((imovel) => {
          const selecionadoComparador = imoveisComparadorIds.includes(imovel.id);

          return (
            <div
              key={imovel.id}
              style={{
                background: "#ffffff",
                borderRadius: "14px",
                overflow: "hidden",
                border: "1px solid #E5DFC9",
                boxShadow: "0 4px 15px rgba(0,0,0,0.04)",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              {/* Imagem do Imóvel & Badges */}
              <div style={{ position: "relative", height: "230px", overflow: "hidden" }}>
                <img
                  src={imovel.fotos[0]}
                  alt={imovel.titulo}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "12px",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <span
                    style={{
                      background: "#121212",
                      color: "#ffffff",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: "700",
                    }}
                  >
                    {imovel.codigo}
                  </span>
                  <span
                    style={{
                      background: "#C6A15B",
                      color: "#121212",
                      padding: "4px 8px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: "800",
                      textTransform: "uppercase",
                    }}
                  >
                    {imovel.finalidade === "venda" ? "Venda" : "Locação"}
                  </span>
                </div>

                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    background: "rgba(18, 18, 18, 0.75)",
                    backdropFilter: "blur(4px)",
                    color: "#ffffff",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <MapPin size={13} color="#C6A15B" />
                  <span>
                    {imovel.bairro}, {imovel.cidade}
                  </span>
                </div>
              </div>

              {/* Corpo do Card */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: "#121212",
                    margin: "0 0 6px 0",
                    lineHeight: "1.3",
                    minHeight: "46px",
                  }}
                >
                  {imovel.titulo}
                </h3>
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    margin: "0 0 16px 0",
                    flex: 1,
                  }}
                >
                  {imovel.subtitulo || imovel.descricao.slice(0, 100) + "..."}
                </p>

                {/* Especificações Rápidas */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "6px",
                    padding: "10px 0",
                    borderTop: "1px solid #f1f5f9",
                    borderBottom: "1px solid #f1f5f9",
                    marginBottom: "16px",
                    fontSize: "12px",
                    color: "#334155",
                    textAlign: "center",
                  }}
                >
                  <div>
                    <Maximize2 size={15} color="#C6A15B" style={{ margin: "0 auto 2px auto" }} />
                    <div style={{ fontWeight: "700" }}>{imovel.areaConstruida} m²</div>
                  </div>
                  <div>
                    <Bed size={15} color="#C6A15B" style={{ margin: "0 auto 2px auto" }} />
                    <div style={{ fontWeight: "700" }}>{imovel.quartos} Qts</div>
                  </div>
                  <div>
                    <Bath size={15} color="#C6A15B" style={{ margin: "0 auto 2px auto" }} />
                    <div style={{ fontWeight: "700" }}>{imovel.suites} Suítes</div>
                  </div>
                  <div>
                    <Car size={15} color="#C6A15B" style={{ margin: "0 auto 2px auto" }} />
                    <div style={{ fontWeight: "700" }}>{imovel.vagas} Vagas</div>
                  </div>
                </div>

                {/* Preço e Ações */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
                  <div>
                    {imovel.precoVenda && (
                      <div style={{ fontSize: "20px", fontWeight: "800", color: "#121212" }}>
                        {formatarDinheiro(imovel.precoVenda)}
                      </div>
                    )}
                    {imovel.precoAluguel && (
                      <div style={{ fontSize: "16px", fontWeight: "700", color: "#C6A15B" }}>
                        Aluguel: {formatarDinheiro(imovel.precoAluguel)}/mês
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                    {imovel.precoVenda && imovel.areaConstruida ? (
                      <div>{formatarDinheiro(Math.round(imovel.precoVenda / imovel.areaConstruida))}/m²</div>
                    ) : null}
                  </div>
                </div>

                {/* Botões do Card */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => aoAbrirFicha(imovel)}
                    style={{
                      background: "#121212",
                      color: "#ffffff",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <Eye size={14} />
                    Ver Detalhes
                  </button>

                  <button
                    type="button"
                    onClick={() => aoAbrirPaperPdf(imovel)}
                    style={{
                      background: "#F7F3EA",
                      color: "#121212",
                      border: "1px solid #C6A15B",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                    }}
                  >
                    <FileText size={14} color="#C6A15B" />
                    Paper PDF A4
                  </button>
                </div>

                {/* Botão de Comparação */}
                <div style={{ marginTop: "10px", textAlign: "center" }}>
                  <button
                    type="button"
                    onClick={() => aoAlternarComparador(imovel)}
                    style={{
                      background: "none",
                      border: "none",
                      color: selecionadoComparador ? "#C6A15B" : "#64748b",
                      fontSize: "11px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    {selecionadoComparador ? <Check size={13} color="#C6A15B" /> : <Layers size={13} />}
                    {selecionadoComparador ? "Adicionado para comparar" : "+ Comparar este imóvel"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
