import React, { useState } from "react";
import {
  FileText,
  Printer,
  Copy,
  Check,
  Scale,
  ShieldCheck,
  Building2,
  Users,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

export const CentralMinutasGama: React.FC = () => {
  const [tipoModelo, setTipoModelo] = useState<string>("locacao_residencial");
  const [nomeCliente, setNomeCliente] = useState("Dr. Marcos Vinicius de Oliveira");
  const [cpfCliente, setCpfCliente] = useState("892.411.091-20");
  const [rgCliente, setRgCliente] = useState("1.849.201 SSP/MT");
  const [profissao, setProfissao] = useState("Médico Cirurgião");
  const [imovelDescricao, setImovelDescricao] = useState(
    "Mansão Contemporânea situada na Alameda das Palmeiras, Condomínio Vale do Sol, Jardim Europa, Tangará da Serra - MT, Cód. GM101",
  );
  const [valorTotal, setValorTotal] = useState<number>(2450000);
  const [valorMensal, setValorMensal] = useState<number>(8500);
  const [prazoMeses, setPrazoMeses] = useState<number>(30);
  const [copiado, setCopiado] = useState(false);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const hojeFormatado = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const gerarTextoMinuta = () => {
    if (tipoModelo === "locacao_residencial") {
      return `INSTRUMENTO PARTICULAR DE CONTRATO DE LOCAÇÃO RESIDENCIAL
Em conformidade com a Lei Federal nº 8.245, de 18 de outubro de 1991.

LOCADORA / ADMINISTRADORA:
${MARCA_GAMA.razaoSocial}, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº ${MARCA_GAMA.cnpj}, com sede em ${MARCA_GAMA.endereco}, devidamente registrada no Conselho Regional de Corretores de Imóveis sob o CRECI nº ${MARCA_GAMA.creci}.

LOCATÁRIO(A):
${nomeCliente}, brasileiro(a), ${profissao}, portador(a) da Cédula de Identidade RG nº ${rgCliente} e inscrito(a) no CPF/MF sob o nº ${cpfCliente}.

CLÁUSULA PRIMEIRA - DO OBJETO:
O presente contrato tem por objeto a locação exclusivamente para fins residenciais do imóvel de propriedade/administração da LOCADORA, situado em:
${imovelDescricao}.

CLÁUSULA SEGUNDA - DO PRAZO:
A locação é celebrada pelo prazo determinado de ${prazoMeses} (trinta) meses, iniciando-se na data da assinatura deste instrumento e entrega formal do Termo de Vistoria de Entrada.

CLÁUSULA TERCEIRA - DO VALOR DO ALUGUEL E ENCARGOS:
O valor mensal da locação é fixado em ${formatarDinheiro(valorMensal)}, a ser pago até o dia 10 (dez) de cada mês subsequente ao vencido.
Parágrafo Primeiro: O reajuste do aluguel ocorrerá anualmente, com base na variação acumulada do IPCA/IBGE ou, na sua falta, pelo índice oficial que o substituir.
Parágrafo Segundo: Incumbirá ao LOCATÁRIO o adimplemento pontual das taxas de condomínio, consumo individualizado de água, energia elétrica e seguro contra incêndio.

CLÁUSULA QUARTA - DO ESTADO DO IMÓVEL E VISTORIA:
O LOCATÁRIO declara receber o imóvel no exato estado de conservação especificado no Laudo de Vistoria Digital assinado eletronicamente entre as partes, obrigando-se a restituí-lo nas mesmíssimas condições, ressalvado exclusivamente o desgaste natural pelo uso regular nos termos do Art. 23, III da Lei 8.245/91.

CLÁUSULA QUINTA - DO FORO:
Para dirimir quaisquer controvérsias oriundas deste instrumento, as partes elegem o Foro da Comarca de Tangará da Serra, Estado de Mato Grosso, com renúncia expressa a qualquer outro.

Tangará da Serra - MT, ${hojeFormatado}.

_____________________________________________________
${MARCA_GAMA.razaoSocial}
CRECI ${MARCA_GAMA.creci} · Administradora

_____________________________________________________
${nomeCliente}
CPF: ${cpfCliente} · Locatário`;
    }

    if (tipoModelo === "compra_venda_urbana") {
      return `INSTRUMENTO PARTICULAR DE PROMESSA DE COMPRA E VENDA DE IMÓVEL URBANO
Com garantia fiduciária e observância à Lei nº 4.591/64 e Código Civil Brasileiro.

PROMITENTE VENDEDORA / INTERMEDIADORA:
${MARCA_GAMA.razaoSocial}, CNPJ ${MARCA_GAMA.cnpj}, CRECI ${MARCA_GAMA.creci}, estabelecida em ${MARCA_GAMA.cidade} - ${MARCA_GAMA.uf}.

PROMISSÁRIO(A) COMPRADOR(A):
${nomeCliente}, inscrito(a) no CPF nº ${cpfCliente}, RG nº ${rgCliente}, ${profissao}.

CLÁUSULA PRIMEIRA - DO OBJETO E CARACTERIZAÇÃO:
Pelo presente instrumento, a PROMITENTE VENDEDORA compromete-se a vender e o PROMISSÁRIO COMPRADOR a adquirir o seguinte imóvel urbano:
${imovelDescricao}.

CLÁUSULA SEGUNDA - DO PREÇO E CONDIÇÕES DE PAGAMENTO:
O preço total, certo e ajustado para a compra e venda do imóvel é de ${formatarDinheiro(valorTotal)}, que será quitado nas seguintes condições:
a) Sinal e princípio de pagamento no ato da assinatura deste instrumento;
b) Saldo restante liquidado via financiamento imobiliário bancário ou liberação de carta de crédito contemplada de consórcio.

CLÁUSULA TERCEIRA - DA POSSE E ESCRITURAÇÃO:
A posse direta do imóvel será transferida ao COMPRADOR no momento da quitação integral do saldo ou da emissão do contrato de financiamento bancário com força de escritura pública.

CLÁUSULA QUARTA - DA EVICÇÃO E ÔNUS:
A VENDEDORA declara sob as penas da lei que o imóvel se encontra livre e desembaraçado de quaisquer dúvidas, dívidas, hipotecas ou litígios judiciais.

Tangará da Serra - MT, ${hojeFormatado}.

_____________________________________________________
${MARCA_GAMA.razaoSocial} · CRECI ${MARCA_GAMA.creci}

_____________________________________________________
${nomeCliente} · Comprador`;
    }

    // Minuta Rural / Agro
    return `COMPROMISSO DE COMPRA E VENDA DE IMÓVEL RURAL (AGROPECUÁRIO)
Com georreferenciamento e Cadastro Ambiental Rural (CAR) em conformidade com a Lei Federal nº 10.267/2001 e Código Florestal (Lei 12.651/2012).

INTERMEDIADORA CREDENCIADA:
${MARCA_GAMA.razaoSocial}, CRECI ${MARCA_GAMA.creci}, ${MARCA_GAMA.cidade} - MT.

PROMITENTE COMPRADOR:
${nomeCliente}, CPF ${cpfCliente}, RG ${rgCliente}, ${profissao}.

CLÁUSULA PRIMEIRA - DO OBJETO RURAL:
Propriedade rural denominada ${imovelDescricao}, devidamente georreferenciada junto ao INCRA, com matrícula imobiliária regularizada e CAR ativo.

CLÁUSULA SEGUNDA - DA CONDIÇÃO FINANCEIRA:
Valor total ajustado em ${formatarDinheiro(valorTotal)}, com indexação facultada em sacas de soja pelo valor da cotação ESALQ/BM&F ou liquidação em moeda corrente nacional.

Tangará da Serra - MT, ${hojeFormatado}.

_____________________________________________________
${MARCA_GAMA.razaoSocial} · CRECI ${MARCA_GAMA.creci}

_____________________________________________________
${nomeCliente} · Promitente Comprador`;
  };

  const handleCopiar = async () => {
    try {
      await navigator.clipboard.writeText(gerarTextoMinuta());
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleImprimir = () => {
    window.print();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: 0 }}>
            Central de Minutas & Contratos Oficiais
          </h1>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            Modelos jurídicos chancelados pela Gama Patrimonial (CRECI {MARCA_GAMA.creci}) com preenchimento automatizado
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={handleCopiar}
            style={{
              background: "#ffffff",
              color: "#121212",
              border: "1px solid #cbd5e1",
              padding: "10px 16px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            {copiado ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
            {copiado ? "Copiado!" : "Copiar Texto"}
          </button>
          <button
            type="button"
            onClick={handleImprimir}
            style={{
              background: "#121212",
              color: "#C6A15B",
              border: "1px solid #C6A15B",
              padding: "10px 18px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Printer size={16} />
            Imprimir / Salvar PDF
          </button>
        </div>
      </div>

      {/* Painel Duplo: Controles à esquerda, Pré-visualização à direita */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >
        {/* Parâmetros do Contrato */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Modelo de Minuta Jurídica
            </label>
            <select
              value={tipoModelo}
              onChange={(e) => setTipoModelo(e.target.value)}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
            >
              <option value="locacao_residencial">Locação Residencial (Lei 8.245/91)</option>
              <option value="compra_venda_urbana">Promessa de Compra e Venda Urbana</option>
              <option value="agro_rural">Compromisso Rural / Fazenda (com CAR e Geo)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Nome do Cliente (Contratante)
            </label>
            <input
              type="text"
              value={nomeCliente}
              onChange={(e) => setNomeCliente(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
                CPF
              </label>
              <input
                type="text"
                value={cpfCliente}
                onChange={(e) => setCpfCliente(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
                RG
              </label>
              <input
                type="text"
                value={rgCliente}
                onChange={(e) => setRgCliente(e.target.value)}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Profissão
            </label>
            <input
              type="text"
              value={profissao}
              onChange={(e) => setProfissao(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
              Descrição e Endereço do Imóvel
            </label>
            <textarea
              rows={3}
              value={imovelDescricao}
              onChange={(e) => setImovelDescricao(e.target.value)}
              style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box", resize: "vertical" }}
            />
          </div>

          {tipoModelo === "locacao_residencial" ? (
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
                Aluguel Mensal (R$)
              </label>
              <input
                type="number"
                value={valorMensal}
                onChange={(e) => setValorMensal(Number(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
          ) : (
            <div>
              <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
                Valor Total da Negociação (R$)
              </label>
              <input
                type="number"
                value={valorTotal}
                onChange={(e) => setValorTotal(Number(e.target.value))}
                style={{ width: "100%", padding: "8px 12px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
              />
            </div>
          )}
        </div>

        {/* Pré-visualização do Documento Formatado */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "12px",
            padding: "36px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
            fontFamily: "Georgia, serif",
            fontSize: "13px",
            lineHeight: "1.8",
            color: "#121212",
            whiteSpace: "pre-wrap",
            maxHeight: "680px",
            overflowY: "auto",
          }}
        >
          {gerarTextoMinuta()}
        </div>
      </div>
    </div>
  );
};
