import React from "react";
import { X, ArrowRight, Check, Trash2, Building2 } from "lucide-react";
import type { Imovel } from "../types/imovel";

interface Props {
  imoveis: Imovel[];
  aoFechar: () => void;
  aoRemover: (id: string) => void;
  aoVerImovel: (imovel: Imovel) => void;
}

export const ComparadorImoveisModal: React.FC<Props> = ({
  imoveis,
  aoFechar,
  aoRemover,
  aoVerImovel,
}) => {
  const formatarDinheiro = (val?: number | null) => {
    if (!val || Number.isNaN(val)) return "-";
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9992,
        background: "rgba(18, 18, 18, 0.85)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          borderRadius: "16px",
          maxWidth: "1100px",
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: "800", color: "#121212", margin: "0 0 4px 0" }}>
              Comparador de Imóveis Lado a Lado ({imoveis.length}/4)
            </h2>
            <div style={{ fontSize: "13px", color: "#64748b" }}>
              Compare especificações, preços por metro quadrado e custos operacionais
            </div>
          </div>
          <button
            type="button"
            onClick={aoFechar}
            style={{
              background: "#f1f5f9",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748b",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {imoveis.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>
            Nenhum imóvel selecionado para comparação. Adicione imóveis clicando no botão "Comparar" no catálogo.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "600px" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "12px", borderBottom: "2px solid #e2e8f0", width: "160px" }}>
                    Critério
                  </th>
                  {imoveis.map((imovel) => (
                    <th
                      key={imovel.id}
                      style={{
                        padding: "12px",
                        borderBottom: "2px solid #e2e8f0",
                        textAlign: "left",
                        verticalAlign: "top",
                      }}
                    >
                      <div style={{ position: "relative", marginBottom: "8px" }}>
                        <img
                          src={imovel.fotos[0]}
                          alt={imovel.titulo}
                          style={{ width: "100%", height: "120px", borderRadius: "8px", objectFit: "cover" }}
                        />
                        <button
                          type="button"
                          onClick={() => aoRemover(imovel.id)}
                          style={{
                            position: "absolute",
                            top: "6px",
                            right: "6px",
                            background: "rgba(0,0,0,0.6)",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div style={{ fontWeight: "700", fontSize: "14px", color: "#121212" }}>{imovel.titulo}</div>
                      <div style={{ fontSize: "11px", color: "#64748b" }}>Cód. {imovel.codigo}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody style={{ fontSize: "13px" }}>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Preço de Venda</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px", fontWeight: "800", color: "#121212" }}>
                      {formatarDinheiro(im.precoVenda)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Preço Aluguel</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px", color: "#C6A15B", fontWeight: "700" }}>
                      {im.precoAluguel ? `${formatarDinheiro(im.precoAluguel)}/mês` : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Valor do m²</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      {im.precoVenda && im.areaConstruida
                        ? formatarDinheiro(Math.round(im.precoVenda / im.areaConstruida))
                        : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Área Construída</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      {im.areaConstruida} m²
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Dormitórios / Suítes</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      {im.quartos} quartos ({im.suites} suítes)
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Vagas de Garagem</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      {im.vagas} vagas
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Bairro</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      {im.bairro}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Condomínio / IPTU</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px", color: "#64748b" }}>
                      {im.condominio ? formatarDinheiro(im.condominio) : "Sem cond."} /{" "}
                      {im.iptu ? formatarDinheiro(im.iptu) : "-"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td style={{ padding: "10px 12px", fontWeight: "700", background: "#f8fafc" }}>Ações</td>
                  {imoveis.map((im) => (
                    <td key={im.id} style={{ padding: "10px 12px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          aoVerImovel(im);
                          aoFechar();
                        }}
                        style={{
                          background: "#C6A15B",
                          color: "#121212",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Ver Detalhes
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
