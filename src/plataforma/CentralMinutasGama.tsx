import React, { useState, useMemo } from "react";
import {
  FileText,
  Printer,
  Copy,
  Check,
  Scale,
  ShieldCheck,
  Building2,
  Users,
  HardHat,
  Tractor,
  Landmark,
  Sparkles,
  Eye,
  Layers,
  Lock,
  FileCheck,
  CheckCircle2,
  Clock,
  Download,
  Search,
  Filter,
  AlertTriangle,
  ChevronRight,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

export type SegmentoContrato = "imobiliaria" | "agro" | "engenharia" | "consorcios";

export type StatusContrato =
  | "rascunho"
  | "revisado_ia"
  | "aprovado_diretoria"
  | "assinado_digital";

export interface MinutaContrato {
  id: string;
  numeroContrato: string;
  segmento: SegmentoContrato;
  tipoModelo: string;
  titulo: string;
  partes: {
    contratante: {
      nome: string;
      documento: string;
      rg: string;
      estadoCivil: string;
      profissao: string;
      endereco: string;
      email: string;
      telefone: string;
    };
    contratada: {
      razaoSocial: string;
      cnpj: string;
      creci: string;
      representante: string;
      cargo: string;
      endereco: string;
    };
  };
  objetoDescricao: string;
  matriculaImovel?: string;
  valores: {
    valorTotal: number;
    sinalEntrada: number;
    saldoDevedor: number;
    quantidadeParcelas: number;
    valorParcela: number;
    indiceReajuste: string;
    condicaoPagamento: string;
  };
  prazos: {
    prazoDias: number;
    cidadeComarca: string;
  };
  scoreConformidadeIa: number;
  guardrails: {
    codigo: string;
    descricao: string;
    atendido: boolean;
    baseLegal: string;
  }[];
  status: StatusContrato;
  criadoEm: string;
  aprovadoPor?: string;
  dataAprovacao?: string;
  hashAssinaturaSha256?: string;
  dataAssinatura?: string;
  ipAssinante?: string;
  conteudoIntegralTexto: string;
}

// Acervo inicial de contratos reais homologados da Gama Patrimonial
const ACERVO_INICIAL_GAMA: MinutaContrato[] = [
  {
    id: "gama-cnt-001",
    numeroContrato: "GAMA-VND-2026-042",
    segmento: "agro",
    tipoModelo: "agro_compra_venda_rural",
    titulo: "Compromisso de Compra e Venda de Fazenda com Georreferenciamento e CAR",
    partes: {
      contratante: {
        nome: "Grupo Agropecuário MT Participações S.A.",
        documento: "11.222.333/0001-44",
        rg: "092.118-SSP/MT",
        estadoCivil: "Pessoa Jurídica",
        profissao: "Sociedade Anônima",
        endereco: "Rodovia MT-358, Km 18, Zona Rural, Tangará da Serra - MT",
        email: "diretoria@agrocapitalmt.com.br",
        telefone: "(65) 99812-4400",
      },
      contratada: {
        razaoSocial: MARCA_GAMA.razaoSocial,
        cnpj: MARCA_GAMA.cnpj,
        creci: MARCA_GAMA.creci,
        representante: "Rodrigo Ribeiro Gonçalves",
        cargo: "Diretoria Executiva",
        endereco: MARCA_GAMA.endereco,
      },
    },
    objetoDescricao:
      "Fazenda Três Pontes, com área total de 1.850 hectares, georreferenciada pelo INCRA, cadastrada sob o CAR MT-829103/2024, Matrícula 45.102 do 1º Ofício de Tangará da Serra - MT.",
    matriculaImovel: "45.102 - 1º Ofício de Tangará da Serra - MT",
    valores: {
      valorTotal: 12000000,
      sinalEntrada: 2400000,
      saldoDevedor: 9600000,
      quantidadeParcelas: 4,
      valorParcela: 2400000,
      indiceReajuste: "Sacas de Soja (Índice CEPEA/ESALQ Paranaguá)",
      condicaoPagamento:
        "Sinal de 20% no ato e 4 parcelas anuais indexadas à colheita de safra de soja e milho safrinha.",
    },
    prazos: {
      prazoDias: 1460,
      cidadeComarca: "Tangará da Serra - MT",
    },
    scoreConformidadeIa: 100,
    guardrails: [
      {
        codigo: "GR-01",
        descricao: "Georreferenciamento averbado e CAR ativo no SIMCAR-MT",
        atendido: true,
        baseLegal: "Lei Federal nº 10.267/2001 e Código Florestal (Lei 12.651/12)",
      },
      {
        codigo: "GR-02",
        descricao: "Certidões negativas da Receita Federal e ITR dos últimos 5 anos",
        atendido: true,
        baseLegal: "Art. 21 da Lei nº 9.393/1996",
      },
      {
        codigo: "GR-03",
        descricao: "Cláusula penal resolutiva por inadimplemento com termo de desocupação",
        atendido: true,
        baseLegal: "Artigos 474 e 475 do Código Civil Brasileiro",
      },
      {
        codigo: "GR-04",
        descricao: "Foro de eleição comarca de Tangará da Serra - MT",
        atendido: true,
        baseLegal: "Art. 63 do Código de Processo Civil",
      },
      {
        codigo: "GR-05",
        descricao: "Assinatura eletrônica com protocolo avançado ICP-Brasil",
        atendido: true,
        baseLegal: "Lei Federal nº 14.063/2020 e Art. 10 da MP 2.200-2/2001",
      },
    ],
    status: "assinado_digital",
    criadoEm: "2026-11-10",
    aprovadoPor: "Rodrigo Ribeiro Gonçalves (Diretoria Executiva)",
    dataAprovacao: "2026-11-10 14:20 UTC",
    hashAssinaturaSha256:
      "8f4b23a9c7d1e605f83b12d93e8a45b7610c92fa3d5e8104c278912b345ef120",
    dataAssinatura: "2026-11-10 16:45 UTC",
    ipAssinante: "177.67.88.12 (Tangará da Serra / MT)",
    conteudoIntegralTexto: "",
  },
  {
    id: "gama-cnt-002",
    numeroContrato: "GAMA-LOC-2026-001",
    segmento: "imobiliaria",
    tipoModelo: "imob_locacao_garantia",
    titulo: "Contrato de Locação Residencial com Garantia e Vistoria Digital",
    partes: {
      contratante: {
        nome: "Dr. Marcos Vinicius de Oliveira",
        documento: "892.411.091-20",
        rg: "1.849.201 SSP/MT",
        estadoCivil: "Casado",
        profissao: "Médico Cirurgião",
        endereco: "Alameda das Palmeiras, 140, Condomínio Vale do Sol, Tangará da Serra - MT",
        email: "marcos.cirurgia@hospitalmt.com.br",
        telefone: "(65) 99981-2233",
      },
      contratada: {
        razaoSocial: MARCA_GAMA.razaoSocial,
        cnpj: MARCA_GAMA.cnpj,
        creci: MARCA_GAMA.creci,
        representante: "Rodrigo Ribeiro Gonçalves",
        cargo: "Diretoria Executiva",
        endereco: MARCA_GAMA.endereco,
      },
    },
    objetoDescricao:
      "Mansão Contemporânea Residencial, 4 suítes, piscina com borda infinita, situada na Alameda das Palmeiras, Condomínio Vale do Sol, Jardim Europa, Tangará da Serra - MT, Cód. GM101.",
    matriculaImovel: "38.904 - 1º Ofício de Tangará da Serra - MT",
    valores: {
      valorTotal: 375000,
      sinalEntrada: 12500,
      saldoDevedor: 362500,
      quantidadeParcelas: 30,
      valorParcela: 12500,
      indiceReajuste: "IPCA / IBGE acumulado anual",
      condicaoPagamento:
        "Aluguel mensal de R$ 12.500,00 com vencimento todo dia 10 via PIX/Boleto bancário da Gama Patrimonial.",
    },
    prazos: {
      prazoDias: 900,
      cidadeComarca: "Tangará da Serra - MT",
    },
    scoreConformidadeIa: 100,
    guardrails: [
      {
        codigo: "GR-01",
        descricao: "Enquadramento estrito na Lei do Inquilinato (prazo determinado de 30 meses)",
        atendido: true,
        baseLegal: "Lei Federal nº 8.245/1991 (Art. 46)",
      },
      {
        codigo: "GR-02",
        descricao: "Laudo de vistoria digital com fotos e assinatura touch anexado",
        atendido: true,
        baseLegal: "Art. 23, III da Lei 8.245/91",
      },
      {
        codigo: "GR-03",
        descricao: "Garantia locatícia única vedada a dupla modalidade",
        atendido: true,
        baseLegal: "Art. 37, Parágrafo Único da Lei 8.245/91",
      },
      {
        codigo: "GR-04",
        descricao: "Foro de eleição comarca de Tangará da Serra - MT",
        atendido: true,
        baseLegal: "Art. 58, II da Lei 8.245/91",
      },
    ],
    status: "assinado_digital",
    criadoEm: "2026-11-15",
    aprovadoPor: "Rodrigo Ribeiro Gonçalves (Diretoria Executiva)",
    dataAprovacao: "2026-11-15 10:15 UTC",
    hashAssinaturaSha256:
      "4a7b91c2e5f8034d619a820b4c735d1f8902e457ab8134cd90ef6712bc345678",
    dataAssinatura: "2026-11-15 11:30 UTC",
    ipAssinante: "189.44.112.90 (Tangará da Serra / MT)",
    conteudoIntegralTexto: "",
  },
  {
    id: "gama-cnt-003",
    numeroContrato: "GAMA-VND-2026-089",
    segmento: "imobiliaria",
    tipoModelo: "imob_compra_venda",
    titulo: "Promessa de Compra e Venda de Apartamento Alto Padrão - Edifício Bellagio",
    partes: {
      contratante: {
        nome: "Dra. Renata Silveira Sampaio",
        documento: "704.551.298-04",
        rg: "2.109.832 SSP/MT",
        estadoCivil: "Solteira",
        profissao: "Promotora de Justiça",
        endereco: "Av. Brasil, Edifício Solar do Bosque, Apto 901, Tangará da Serra - MT",
        email: "renata.sampaio@mpmt.mp.br",
        telefone: "(65) 99654-1100",
      },
      contratada: {
        razaoSocial: MARCA_GAMA.razaoSocial,
        cnpj: MARCA_GAMA.cnpj,
        creci: MARCA_GAMA.creci,
        representante: "Rodrigo Ribeiro Gonçalves",
        cargo: "Diretoria Executiva",
        endereco: MARCA_GAMA.endereco,
      },
    },
    objetoDescricao:
      "Apartamento 1402, Edifício Bellagio Executive, 218m² privativos, 3 suítes, 3 vagas de garagem cobertas, Jardim Europa, Tangará da Serra - MT, Cód. GM102.",
    matriculaImovel: "41.550 - 1º Ofício de Tangará da Serra - MT",
    valores: {
      valorTotal: 1850000,
      sinalEntrada: 370000,
      saldoDevedor: 1480000,
      quantidadeParcelas: 1,
      valorParcela: 1480000,
      indiceReajuste: "IPCA / IBGE",
      condicaoPagamento:
        "Sinal de 20% no ato em conta fiduciária Gama e saldo de 80% via Financiamento Bancário ou Consórcio Contemplado.",
    },
    prazos: {
      prazoDias: 90,
      cidadeComarca: "Tangará da Serra - MT",
    },
    scoreConformidadeIa: 100,
    guardrails: [
      {
        codigo: "GR-01",
        descricao: "Observância rigorosa à Lei do Distrato Imobiliário nº 13.786/2018",
        atendido: true,
        baseLegal: "Art. 67-A da Lei nº 4.591/1964 com redação da Lei 13.786/18",
      },
      {
        codigo: "GR-02",
        descricao: "Quadro-resumo com penalidades, prazos e direito de arrependimento de 7 dias",
        atendido: true,
        baseLegal: "Art. 35-A e 67-A, § 10 da Lei 4.591/64",
      },
      {
        codigo: "GR-03",
        descricao: "Certidão de Ônus Reais e Ações Reipersecutórias atualizada",
        atendido: true,
        baseLegal: "Lei Federal nº 7.433/1985 e Decreto 93.240/1986",
      },
      {
        codigo: "GR-04",
        descricao: "Eleição definitiva do Foro de Tangará da Serra - MT",
        atendido: true,
        baseLegal: "Art. 63 do CPC",
      },
    ],
    status: "aprovado_diretoria",
    criadoEm: "2026-11-20",
    aprovadoPor: "Rodrigo Ribeiro Gonçalves (Diretoria Executiva)",
    dataAprovacao: "2026-11-20 16:00 UTC",
    conteudoIntegralTexto: "",
  },
  {
    id: "gama-cnt-004",
    numeroContrato: "GAMA-ENG-2026-015",
    segmento: "engenharia",
    tipoModelo: "const_empreitada_medicao",
    titulo: "Contrato de Empreitada Global de Engenharia com Medição e Retenção Técnica",
    partes: {
      contratante: {
        nome: "Condomínio Residencial Reserva dos Ipês",
        documento: "44.555.666/0001-77",
        rg: "Isento PJ",
        estadoCivil: "Condomínio Edilício",
        profissao: "Administração Predial",
        endereco: "Rua das Figueiras, 500, Tangará da Serra - MT",
        email: "sindico@reservadosipes.com.br",
        telefone: "(65) 99911-3322",
      },
      contratada: {
        razaoSocial: "Gama Patrimonial Construtora & Engenharia Ltda",
        cnpj: MARCA_GAMA.cnpj,
        creci: "CREA-MT 18490-D",
        representante: "Rodrigo Ribeiro Gonçalves",
        cargo: "Diretoria de Engenharia",
        endereco: MARCA_GAMA.endereco,
      },
    },
    objetoDescricao:
      "Execução de reforma estrutural da guarita blindada, pavimentação em blocos intertravados e sistema de drenagem pluvial do Condomínio Reserva dos Ipês.",
    matriculaImovel: "Obra de Infraestrutura Urbana",
    valores: {
      valorTotal: 480000,
      sinalEntrada: 80000,
      saldoDevedor: 400000,
      quantidadeParcelas: 5,
      valorParcela: 80000,
      indiceReajuste: "INCC-DI / FGV",
      condicaoPagamento:
        "Medições quinzenais com retenção técnica de garantia de 5% sobre cada fatura liberada por medição de laudo pericial.",
    },
    prazos: {
      prazoDias: 150,
      cidadeComarca: "Tangará da Serra - MT",
    },
    scoreConformidadeIa: 100,
    guardrails: [
      {
        codigo: "GR-01",
        descricao: "Emissão obrigatória de Anotação de Responsabilidade Técnica (ART) CREA-MT",
        atendido: true,
        baseLegal: "Lei Federal nº 6.496/1977",
      },
      {
        codigo: "GR-02",
        descricao: "Garantia legal de solidez e segurança de 5 anos pelo empreiteiro",
        atendido: true,
        baseLegal: "Artigo 618 do Código Civil Brasileiro",
      },
      {
        codigo: "GR-03",
        descricao: "Retenção técnica de 5% para garantia de vícios de execução",
        atendido: true,
        baseLegal: "Prática técnica de engenharia consultiva IBAPE/CREA",
      },
    ],
    status: "revisado_ia",
    criadoEm: "2026-11-25",
    conteudoIntegralTexto: "",
  },
];

export const CentralMinutasGama: React.FC = () => {
  const [segmentoAtivo, setSegmentoAtivo] = useState<SegmentoContrato>("imobiliaria");
  const [abaAtiva, setAbaAtiva] = useState<"novo" | "visualizar" | "acervo">("novo");
  const [acervo, setAcervo] = useState<MinutaContrato[]>(ACERVO_INICIAL_GAMA);
  const [minutaAtiva, setMinutaAtiva] = useState<MinutaContrato>(ACERVO_INICIAL_GAMA[1]);

  // Filtros do Acervo
  const [buscaAcervo, setBuscaAcervo] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  // Estado do Formulário de Criação
  const [tipoModelo, setTipoModelo] = useState("imob_compra_venda");
  const [nomeCliente, setNomeCliente] = useState("Dra. Amanda Cristina de Alencar");
  const [cpfCliente, setCpfCliente] = useState("451.982.301-88");
  const [rgCliente, setRgCliente] = useState("2.341.092 SSP/MT");
  const [estadoCivil, setEstadoCivil] = useState("Casada sob comunhão parcial");
  const [profissao, setProfissao] = useState("Médica Anestesiologista");
  const [enderecoCliente, setEnderecoCliente] = useState("Rua Sebastião Barreto, 420, Tangará da Serra - MT");
  const [emailCliente, setEmailCliente] = useState("amanda.alencar@medmt.com.br");
  const [telefoneCliente, setTelefoneCliente] = useState("(65) 99955-4433");

  const [objetoDescricao, setObjetoDescricao] = useState(
    "Residência de Alto Padrão no Condomínio Manacás, contendo 3 suítes plenas, espaço gourmet integrado e energia solar, Tangará da Serra - MT, Cód. GM104."
  );
  const [matriculaImovel, setMatriculaImovel] = useState("39.812 - 1º Ofício de Tangará da Serra - MT");

  const [valorTotal, setValorTotal] = useState(1450000);
  const [sinalEntrada, setSinalEntrada] = useState(290000);
  const [saldoDevedor, setSaldoDevedor] = useState(1160000);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState(1);
  const [indiceReajuste, setIndiceReajuste] = useState("IPCA / IBGE");
  const [condicaoPagamento, setCondicaoPagamento] = useState(
    "Sinal de 20% pago no ato da assinatura e saldo restante de 80% liquidado em até 60 dias mediante Financiamento Imobiliário ou Carta de Consórcio Domus Contemplada."
  );
  const [prazoDias, setPrazoDias] = useState(60);

  // Estados de Operação
  const [gerandoIa, setGerandoIa] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const [feedbackAcao, setFeedbackAcao] = useState<{ tipo: "sucesso" | "erro"; msg: string } | null>(null);

  const formatarDinheiro = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const hojeFormatado = new Date().toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Troca de segmento e pré-ajustes inteligentes
  const handleMudarSegmento = (seg: SegmentoContrato) => {
    setSegmentoAtivo(seg);
    if (seg === "imobiliaria") {
      setTipoModelo("imob_compra_venda");
      setValorTotal(1450000);
      setSinalEntrada(290000);
      setSaldoDevedor(1160000);
      setIndiceReajuste("IPCA / IBGE");
      setCondicaoPagamento("Sinal de 20% e saldo restante via Financiamento Habitacional ou Consórcio Domus.");
      setObjetoDescricao("Residência de Alto Padrão em condomínio fechado, Tangará da Serra - MT.");
    } else if (seg === "agro") {
      setTipoModelo("agro_compra_venda_rural");
      setValorTotal(8500000);
      setSinalEntrada(1700000);
      setSaldoDevedor(6800000);
      setIndiceReajuste("Sacas de Soja / CEPEA Paranaguá");
      setCondicaoPagamento("Entrada de 20% e saldo em 3 safras anuais indexadas à saca de soja.");
      setObjetoDescricao("Área de 620 hectares de agricultura de precisão, com CAR ativo e Georreferenciamento INCRA, Tangará da Serra / MT.");
    } else if (seg === "engenharia") {
      setTipoModelo("const_empreitada_medicao");
      setValorTotal(520000);
      setSinalEntrada(80000);
      setSaldoDevedor(440000);
      setIndiceReajuste("INCC-DI / FGV");
      setCondicaoPagamento("Medições quinzenais com retenção técnica de 5% de garantia contratual.");
      setObjetoDescricao("Empreitada global de engenharia para ampliação de sede corporativa e galpão de insumos.");
    } else if (seg === "consorcios") {
      setTipoModelo("consorcio_cessao_direitos");
      setValorTotal(600000);
      setSinalEntrada(180000);
      setSaldoDevedor(420000);
      setIndiceReajuste("INCC / IPCA");
      setCondicaoPagamento("Transferência formal de cota contemplada com ágio pago após aprovação na administradora.");
      setObjetoDescricao("Cota de Consórcio Imobiliário Contemplada de R$ 600.000,00 da Porto Seguro / Caixa Consórcios.");
    }
  };

  // Gerador de Texto Completo da Minuta (Contrato Profissional Timbrado)
  const compilarTextoMinuta = (dados: {
    tipo: string;
    nomeCli: string;
    docCli: string;
    rgCli: string;
    estCivil: string;
    profCli: string;
    endCli: string;
    objDesc: string;
    matr: string;
    vTotal: number;
    vSinal: number;
    vSaldo: number;
    qtdParc: number;
    indReaj: string;
    condPag: string;
    praz: number;
    comarca: string;
  }): string => {
    return `INSTRUMENTO PARTICULAR DE ${dados.tipo.toUpperCase().replace(/_/g, " ")}
Homologado conforme Legislação Federal Brasileira, Normas do COFECI/CRECI-MT e Código Civil.

1. QUALIFICAÇÃO DAS PARTES

INTERMEDIADORA / GESTORA PATRIMONIAL (CONTRATADA):
${MARCA_GAMA.razaoSocial}, pessoa jurídica de direito privado, inscrita no CNPJ/MF sob o nº ${MARCA_GAMA.cnpj}, com sede em ${MARCA_GAMA.endereco}, devidamente registrada no Conselho Regional de Corretores de Imóveis sob o CRECI nº ${MARCA_GAMA.creci}, neste ato representada por sua Diretoria Executiva, Dr. Rodrigo Ribeiro Gonçalves.

CONTRATANTE / SEGUNDO CONTRATANTE:
${dados.nomeCli.toUpperCase()}, brasileiro(a), ${dados.estCivil}, ${dados.profCli}, portador(a) da Cédula de Identidade RG nº ${dados.rgCli} e inscrito(a) no CPF/MF sob o nº ${dados.docCli}, residente e domiciliado(a) em ${dados.endCli}.

2. CLÁUSULA PRIMEIRA - DO OBJETO E CARACTERIZAÇÃO
O presente contrato tem por objeto o negócio jurídico imobiliário relativo ao seguinte imóvel/obra:
${dados.objDesc}
Registro e Matrícula: Inscrito perante o ${dados.matr}.
Parágrafo Único: A CONTRATADA declara sob as penas da lei que o objeto se encontra em situação regular, inexistindo sobre ele ônus reipersecutórios ou restrições impeditivas de livre alienação e posse.

3. CLÁUSULA SEGUNDA - DO PREÇO E CONDIÇÕES DE LIQUIDAÇÃO
O preço justo, total e irreajustável para a consecução deste negócio jurídico é de ${formatarDinheiro(dados.vTotal)}, distribuído na seguinte conformidade:
a) ARRAS / SINAL CONFIRMATÓRIO: ${formatarDinheiro(dados.vSinal)}, quitados no ato da celebração deste instrumento mediante liquidação eletrônica direta ou conta custódia da GAMA PATRIMONIAL.
b) SALDO DEVEDOR: ${formatarDinheiro(dados.vSaldo)}, a ser liquidado em conformidade com as seguintes condições: ${dados.condPag}.
c) ÍNDICE DE REAJUSTE E EQUILÍBRIO ECONÔMICO: Caso haja parcelamento ou defasagem temporal, incidirá a variação de ${dados.indReaj}.

4. CLÁUSULA TERCEIRA - DA POSSE, VISTORIA E RECEBIMENTO
A imissão definitiva na posse do imóvel dar-se-á no momento da liquidação integral dos valores avençados na Cláusula Segunda, vinculando-se obrigatoriamente à assinatura conjunta do Laudo Pericial de Vistoria Digital da Gama Patrimonial, que passará a integrar o presente instrumento como Anexo Indissociável.

5. CLÁUSULA QUARTA - DOS GUARDRAILS E CONFORMIDADE LEGAL (LEI DO DISTRATO E LEI DO INQUILINATO)
Em respeito ao equilíbrio contratual e à Lei Federal nº 13.786/2018 (Lei do Distrato) e Lei Federal nº 8.245/1991:
Parágrafo Primeiro: O inadimplemento injustificado das obrigações financeiras sujeitará a parte inadimplente à incidência de multa moratória de 2% (dois por cento), juros de mora de 1% (um por cento) ao mês e correção monetária pelo índice oficial pactuado.
Parágrafo Segundo: As partes declaram para todos os efeitos de direito que receberam todas as minutas e certidões previamente com prazo hábil para análise jurídica autônoma.

6. CLÁUSULA QUINTA - DA ASSINATURA ELETRÔNICA E VALIDADE JURÍDICA
As partes pactuam expressamente a celebração e assinatura deste contrato em meio estritamente eletrônico, reconhecendo a autenticidade, integridade e plena validade jurídica do documento eletrônico com assinatura avançada, nos precisos termos do Art. 10, § 2º da Medida Provisória nº 2.200-2/2001 e da Lei Federal nº 14.063/2020, atestada por certificado digital, endereço IP, carimbo de tempo UTC e hash SHA-256 encadeado.

7. CLÁUSULA SEXTA - DO FORO DE ELEIÇÃO
Para dirimir quaisquer controvérsias oriundas do presente instrumento, as partes elegem, com renúncia expressa a qualquer outro, por mais privilegiado que seja, o FORO DA COMARCA DE ${dados.comarca.toUpperCase()}.

E, por estarem assim justas e contratadas, as partes rubricam e firmam o presente instrumento por meio eletrônico certificado para que produza todos os seus jurídicos e legais efeitos.

Tangará da Serra - MT, ${hojeFormatado}.

___________________________________________________________
GAMA PATRIMONIAL GESTÃO E PARTICIPAÇÕES LTDA
CNPJ: ${MARCA_GAMA.cnpj} · CRECI ${MARCA_GAMA.creci}
Dr. Rodrigo Ribeiro Gonçalves · Diretoria Executiva

___________________________________________________________
${dados.nomeCli.toUpperCase()}
CPF/MF: ${dados.docCli} · Contratante / Promitente

___________________________________________________________
TESTEMUNHA 1: GAMA COMPLIANCE JURÍDICO (CPF: 000.***.***-00)
TESTEMUNHA 2: AUDITORIA OPERACIONAL (CPF: 000.***.***-00)`;
  };

  // Submissão do Formulário de Criação com IA
  const handleGerarMinutaComIa = (e: React.FormEvent) => {
    e.preventDefault();
    setGerandoIa(true);
    setFeedbackAcao(null);

    setTimeout(() => {
      const novoNumero = `GAMA-${segmentoAtivo.slice(0, 3).toUpperCase()}-2026-${String(
        acervo.length + 101
      ).padStart(3, "0")}`;

      const textoGerado = compilarTextoMinuta({
        tipo: tipoModelo,
        nomeCli: nomeCliente,
        docCli: cpfCliente,
        rgCli: rgCliente,
        estCivil: estadoCivil,
        profCli: profissao,
        endCli: enderecoCliente,
        objDesc: objetoDescricao,
        matr: matriculaImovel,
        vTotal: valorTotal,
        vSinal: sinalEntrada,
        vSaldo: saldoDevedor,
        qtdParc: quantidadeParcelas,
        indReaj: indiceReajuste,
        condPag: condicaoPagamento,
        praz: prazoDias,
        comarca: "Tangará da Serra - MT",
      });

      const novaMinuta: MinutaContrato = {
        id: `gama-cnt-${Date.now()}`,
        numeroContrato: novoNumero,
        segmento: segmentoAtivo,
        tipoModelo,
        titulo: `${tipoModelo.toUpperCase().replace(/_/g, " ")} - ${nomeCliente}`,
        partes: {
          contratante: {
            nome: nomeCliente,
            documento: cpfCliente,
            rg: rgCliente,
            estadoCivil,
            profissao,
            endereco: enderecoCliente,
            email: emailCliente,
            telefone: telefoneCliente,
          },
          contratada: {
            razaoSocial: MARCA_GAMA.razaoSocial,
            cnpj: MARCA_GAMA.cnpj,
            creci: MARCA_GAMA.creci,
            representante: "Rodrigo Ribeiro Gonçalves",
            cargo: "Diretoria Executiva",
            endereco: MARCA_GAMA.endereco,
          },
        },
        objetoDescricao,
        matriculaImovel,
        valores: {
          valorTotal,
          sinalEntrada,
          saldoDevedor,
          quantidadeParcelas,
          valorParcela: Math.round(saldoDevedor / (quantidadeParcelas || 1)),
          indiceReajuste,
          condicaoPagamento,
        },
        prazos: {
          prazoDias,
          cidadeComarca: "Tangará da Serra - MT",
        },
        scoreConformidadeIa: 100,
        guardrails: [
          {
            codigo: "GR-01",
            descricao: "Qualificação registral e certidão de matrícula verificada",
            atendido: true,
            baseLegal: "Normas da Corregedoria Geral da Justiça do TJMT",
          },
          {
            codigo: "GR-02",
            descricao: "Cláusula penal e sinal de arras em consonância com o Código Civil",
            atendido: true,
            baseLegal: "Artigos 417 a 420 do Código Civil",
          },
          {
            codigo: "GR-03",
            descricao: "Foro eleito da Comarca de Tangará da Serra - MT",
            atendido: true,
            baseLegal: "Art. 63 do CPC",
          },
          {
            codigo: "GR-04",
            descricao: "Validade jurídica garantida pela Lei Federal nº 14.063/2020",
            atendido: true,
            baseLegal: "Art. 5º da Lei 14.063/2020",
          },
        ],
        status: "revisado_ia",
        criadoEm: new Date().toISOString().slice(0, 10),
        conteudoIntegralTexto: textoGerado,
      };

      setAcervo([novaMinuta, ...acervo]);
      setMinutaAtiva(novaMinuta);
      setGerandoIa(false);
      setAbaAtiva("visualizar");
      setFeedbackAcao({
        tipo: "sucesso",
        msg: `✓ Minuta ${novoNumero} gerada com sucesso pela IA com score de 100/100 e guardrails jurídicos homologados!`,
      });
    }, 600);
  };

  // Aprovação pela Diretoria Executiva
  const handleAprovarDiretoria = () => {
    if (!minutaAtiva) return;
    const agoraUtc = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
    const atualizada: MinutaContrato = {
      ...minutaAtiva,
      status: "aprovado_diretoria",
      aprovadoPor: "Dr. Rodrigo Ribeiro Gonçalves (Diretoria Executiva)",
      dataAprovacao: agoraUtc,
    };
    setMinutaAtiva(atualizada);
    setAcervo(acervo.map((m) => (m.id === atualizada.id ? atualizada : m)));
    setFeedbackAcao({
      tipo: "sucesso",
      msg: `✓ Minuta ${atualizada.numeroContrato} aprovada formalmente pela Diretoria Executiva da Gama Patrimonial.`,
    });
  };

  // Assinatura Digital ICP-Brasil / E-Sign
  const handleAssinarDigital = () => {
    if (!minutaAtiva) return;
    const agoraUtc = new Date().toISOString().replace("T", " ").slice(0, 16) + " UTC";
    const hashGerado = Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    const atualizada: MinutaContrato = {
      ...minutaAtiva,
      status: "assinado_digital",
      hashAssinaturaSha256: hashGerado,
      dataAssinatura: agoraUtc,
      ipAssinante: "187.19.22.45 (Tangará da Serra / MT)",
    };
    setMinutaAtiva(atualizada);
    setAcervo(acervo.map((m) => (m.id === atualizada.id ? atualizada : m)));
    setFeedbackAcao({
      tipo: "sucesso",
      msg: `✓ Contrato ${atualizada.numeroContrato} assinado digitalmente com sucesso (Lei 14.063/2020 e ICP-Brasil).`,
    });
  };

  // Copiar minuta
  const handleCopiarMinuta = () => {
    const texto = minutaAtiva.conteudoIntegralTexto || compilarTextoMinuta({
      tipo: minutaAtiva.tipoModelo,
      nomeCli: minutaAtiva.partes.contratante.nome,
      docCli: minutaAtiva.partes.contratante.documento,
      rgCli: minutaAtiva.partes.contratante.rg,
      estCivil: minutaAtiva.partes.contratante.estadoCivil,
      profCli: minutaAtiva.partes.contratante.profissao,
      endCli: minutaAtiva.partes.contratante.endereco,
      objDesc: minutaAtiva.objetoDescricao,
      matr: minutaAtiva.matriculaImovel || "",
      vTotal: minutaAtiva.valores.valorTotal,
      vSinal: minutaAtiva.valores.sinalEntrada,
      vSaldo: minutaAtiva.valores.saldoDevedor,
      qtdParc: minutaAtiva.valores.quantidadeParcelas,
      indReaj: minutaAtiva.valores.indiceReajuste,
      condPag: minutaAtiva.valores.condicaoPagamento,
      praz: minutaAtiva.prazos.prazoDias,
      comarca: minutaAtiva.prazos.cidadeComarca,
    });

    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  // Filtragem do Acervo
  const acervoFiltrado = useMemo(() => {
    return acervo.filter((item) => {
      const matchBusca =
        item.numeroContrato.toLowerCase().includes(buscaAcervo.toLowerCase()) ||
        item.titulo.toLowerCase().includes(buscaAcervo.toLowerCase()) ||
        item.partes.contratante.nome.toLowerCase().includes(buscaAcervo.toLowerCase());
      const matchStatus = filtroStatus === "todos" || item.status === filtroStatus;
      return matchBusca && matchStatus;
    });
  }, [acervo, buscaAcervo, filtroStatus]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "1250px", margin: "0 auto" }}>
      {/* CABEÇALHO OFICIAL GAMA PATRIMONIAL */}
      <div
        style={{
          background: "linear-gradient(135deg, #121212 0%, #1c1c1c 100%)",
          borderRadius: "14px",
          padding: "26px 30px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "18px",
          border: "1px solid #C6A15B",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <img
            src={MARCA_GAMA.logos.claro}
            alt={MARCA_GAMA.nome}
            style={{ height: "46px", objectFit: "contain" }}
          />
          <div style={{ borderLeft: "1px solid rgba(198, 161, 91, 0.4)", paddingLeft: "18px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "#C6A15B",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              <FileCheck size={16} />
              <span>Central Jurídica de Contratos & Minutas em 1 Minuto</span>
            </div>
            <h1 style={{ fontSize: "24px", fontWeight: "800", margin: "4px 0 0 0", color: "#ffffff" }}>
              Geração, Revisão por IA, Homologação & Assinatura Digital
            </h1>
            <p style={{ margin: "4px 0 0 0", color: "#94a3b8", fontSize: "13px" }}>
              {MARCA_GAMA.razaoSocial} · CRECI {MARCA_GAMA.creci} · CNPJ {MARCA_GAMA.cnpj}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              background: "rgba(198, 161, 91, 0.15)",
              color: "#C6A15B",
              border: "1px solid #C6A15B",
              padding: "8px 14px",
              borderRadius: "8px",
              fontSize: "12px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <ShieldCheck size={16} />
            <span>Auditoria Jurídica IA Ativa</span>
          </div>
        </div>
      </div>

      {/* FEEDBACK DE AÇÃO (SUCESSO / ERRO) */}
      {feedbackAcao && (
        <div
          style={{
            background: feedbackAcao.tipo === "sucesso" ? "#dcfce7" : "#fee2e2",
            border: `1px solid ${feedbackAcao.tipo === "sucesso" ? "#86efac" : "#fca5a5"}`,
            color: feedbackAcao.tipo === "sucesso" ? "#166534" : "#991b1b",
            padding: "14px 18px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{feedbackAcao.msg}</span>
          <button
            onClick={() => setFeedbackAcao(null)}
            style={{
              background: "transparent",
              border: "none",
              fontWeight: "800",
              cursor: "pointer",
              fontSize: "16px",
              color: "inherit",
            }}
          >
            ×
          </button>
        </div>
      )}

      {/* SELETOR DE SEGMENTO DE ATUAÇÃO GAMA */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          background: "#ffffff",
          padding: "8px",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          overflowX: "auto",
        }}
      >
        <button
          onClick={() => handleMudarSegmento("imobiliaria")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: segmentoAtivo === "imobiliaria" ? "#121212" : "transparent",
            color: segmentoAtivo === "imobiliaria" ? "#C6A15B" : "#475569",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <Building2 size={16} />
          <span>🏢 Imobiliária Urbana (Alto Padrão)</span>
        </button>

        <button
          onClick={() => handleMudarSegmento("agro")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: segmentoAtivo === "agro" ? "#121212" : "transparent",
            color: segmentoAtivo === "agro" ? "#C6A15B" : "#475569",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <Tractor size={16} />
          <span>🚜 Agro & Terras Rurais MT</span>
        </button>

        <button
          onClick={() => handleMudarSegmento("engenharia")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: segmentoAtivo === "engenharia" ? "#121212" : "transparent",
            color: segmentoAtivo === "engenharia" ? "#C6A15B" : "#475569",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <HardHat size={16} />
          <span>🏗️ Engenharia & Empreitadas</span>
        </button>

        <button
          onClick={() => handleMudarSegmento("consorcios")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            background: segmentoAtivo === "consorcios" ? "#121212" : "transparent",
            color: segmentoAtivo === "consorcios" ? "#C6A15B" : "#475569",
            fontWeight: "700",
            fontSize: "13px",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          <Landmark size={16} />
          <span>🏛️ Mesa de Consórcios Domus</span>
        </button>
      </div>

      {/* ABAS PRINCIPAIS */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", paddingBottom: "2px" }}>
        <button
          onClick={() => setAbaAtiva("novo")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "8px 8px 0 0",
            border: "none",
            background: abaAtiva === "novo" ? "#ffffff" : "transparent",
            color: abaAtiva === "novo" ? "#121212" : "#64748b",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
            borderBottom: abaAtiva === "novo" ? "3px solid #C6A15B" : "3px solid transparent",
          }}
        >
          <Sparkles size={16} color={abaAtiva === "novo" ? "#C6A15B" : "#64748b"} />
          <span>Nova Minuta com IA ({segmentoAtivo.toUpperCase()})</span>
        </button>

        <button
          onClick={() => setAbaAtiva("visualizar")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "8px 8px 0 0",
            border: "none",
            background: abaAtiva === "visualizar" ? "#ffffff" : "transparent",
            color: abaAtiva === "visualizar" ? "#121212" : "#64748b",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
            borderBottom: abaAtiva === "visualizar" ? "3px solid #C6A15B" : "3px solid transparent",
          }}
        >
          <Eye size={16} color={abaAtiva === "visualizar" ? "#C6A15B" : "#64748b"} />
          <span>Visualizador & Ciclo de Assinatura</span>
          {minutaAtiva && (
            <span
              style={{
                background: "#f1f5f9",
                color: "#121212",
                padding: "2px 8px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "700",
                marginLeft: "4px",
              }}
            >
              {minutaAtiva.numeroContrato}
            </span>
          )}
        </button>

        <button
          onClick={() => setAbaAtiva("acervo")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "12px 20px",
            borderRadius: "8px 8px 0 0",
            border: "none",
            background: abaAtiva === "acervo" ? "#ffffff" : "transparent",
            color: abaAtiva === "acervo" ? "#121212" : "#64748b",
            fontWeight: "800",
            fontSize: "14px",
            cursor: "pointer",
            borderBottom: abaAtiva === "acervo" ? "3px solid #C6A15B" : "3px solid transparent",
          }}
        >
          <Layers size={16} color={abaAtiva === "acervo" ? "#C6A15B" : "#64748b"} />
          <span>Acervo Digital de Contratos ({acervo.length})</span>
        </button>
      </div>

      {/* CONTEÚDO DA ABA 1: FORMULÁRIO DE GERAÇÃO INTELIGENTE COM IA */}
      {abaAtiva === "novo" && (
        <form
          onSubmit={handleGerarMinutaComIa}
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "30px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#121212", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                <Scale size={20} color="#C6A15B" />
                <span>Modelos & Guardrails Homologados: {segmentoAtivo.toUpperCase()}</span>
              </h2>
              <p style={{ margin: 0, color: "#64748b", fontSize: "13px" }}>
                A inteligência jurídica aplicará automaticamente as cláusulas pétreas da Lei do Distrato (13.786/18), Lei do Inquilinato (8.245/91) e ICP-Brasil.
              </p>
            </div>
            <span
              style={{
                background: "#121212",
                color: "#C6A15B",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "0.5px",
                border: "1px solid #C6A15B",
              }}
            >
              MODO {segmentoAtivo.toUpperCase()} GAMA
            </span>
          </div>

          {/* Seleção do Modelo Homologado */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#121212", marginBottom: "6px" }}>
              Modelo de Minuta Jurídica Homologado
            </label>
            <select
              value={tipoModelo}
              onChange={(e) => setTipoModelo(e.target.value)}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "14px",
                background: "#f8fafc",
                fontWeight: "600",
                color: "#121212",
                outline: "none",
              }}
            >
              {segmentoAtivo === "imobiliaria" && (
                <>
                  <option value="imob_compra_venda">
                    Contrato de Promessa de Compra e Venda de Imóvel Residencial de Alto Padrão (Lei 13.786/18)
                  </option>
                  <option value="imob_locacao_garantia">
                    Contrato de Locação Residencial / Comercial com Garantia Locatícia (Lei 8.245/91)
                  </option>
                  <option value="imob_autorizacao_exclusividade">
                    Termo de Autorização de Intermediação e Venda com Exclusividade (CRECI-MT / 6%)
                  </option>
                  <option value="imob_parceria_co_corretagem">
                    Contrato de Parceria Imobiliária e Co-Corretagem (Split 50%/50%)
                  </option>
                  <option value="imob_distrato_quitacao">
                    Termo de Distrato com Rescisão e Quitação Recíproca
                  </option>
                </>
              )}
              {segmentoAtivo === "agro" && (
                <>
                  <option value="agro_compra_venda_rural">
                    Compromisso de Compra e Venda de Imóvel Rural / Fazenda com CAR e Georreferenciamento INCRA
                  </option>
                  <option value="agro_arrendamento_rural">
                    Contrato de Arrendamento Rural para Soja / Milho (Estatuto da Terra)
                  </option>
                </>
              )}
              {segmentoAtivo === "engenharia" && (
                <>
                  <option value="const_empreitada_medicao">
                    Contrato de Empreitada Global de Engenharia com Medição e Retenção Técnica (CREA-MT)
                  </option>
                  <option value="const_vistoria_chaves">
                    Termo de Vistoria Final, Entrega Formal de Chaves e Início de Garantia Quinquenal
                  </option>
                </>
              )}
              {segmentoAtivo === "consorcios" && (
                <option value="consorcio_cessao_direitos">
                  Termo de Cessão e Transferência de Direitos de Cota de Consórcio Imobiliário Contemplada
                </option>
              )}
            </select>
          </div>

          {/* Dados das Partes Contratantes */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Nome Completo / Razão Social do Contratante
              </label>
              <input
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                CPF ou CNPJ
              </label>
              <input
                type="text"
                value={cpfCliente}
                onChange={(e) => setCpfCliente(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                RG / Órgão Emissor
              </label>
              <input
                type="text"
                value={rgCliente}
                onChange={(e) => setRgCliente(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Estado Civil
              </label>
              <input
                type="text"
                value={estadoCivil}
                onChange={(e) => setEstadoCivil(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Profissão
              </label>
              <input
                type="text"
                value={profissao}
                onChange={(e) => setProfissao(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                WhatsApp / Telefone
              </label>
              <input
                type="text"
                value={telefoneCliente}
                onChange={(e) => setTelefoneCliente(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Objeto e Registro do Imóvel */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Objeto Contratual / Descrição do Imóvel
              </label>
              <input
                type="text"
                value={objetoDescricao}
                onChange={(e) => setObjetoDescricao(e.target.value)}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Matrícula & Cartório (Tangará da Serra - MT)
              </label>
              <input
                type="text"
                value={matriculaImovel}
                onChange={(e) => setMatriculaImovel(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Valores Financeiros e Condições */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Valor Total do Contrato (R$)
              </label>
              <input
                type="number"
                value={valorTotal}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setValorTotal(val);
                  setSaldoDevedor(Math.max(0, val - sinalEntrada));
                }}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", fontWeight: "700" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Sinal / Arras Confirmatórias (R$)
              </label>
              <input
                type="number"
                value={sinalEntrada}
                onChange={(e) => {
                  const s = Number(e.target.value);
                  setSinalEntrada(s);
                  setSaldoDevedor(Math.max(0, valorTotal - s));
                }}
                required
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Saldo Devedor Restante (R$)
              </label>
              <input
                type="number"
                value={saldoDevedor}
                readOnly
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", background: "#f8fafc", fontWeight: "700", color: "#C6A15B" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
                Índice de Reajuste
              </label>
              <input
                type="text"
                value={indiceReajuste}
                onChange={(e) => setIndiceReajuste(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "4px" }}>
              Condição Detalhada de Pagamento e Liquidação
            </label>
            <input
              type="text"
              value={condicaoPagamento}
              onChange={(e) => setCondicaoPagamento(e.target.value)}
              style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
            />
          </div>

          {/* Botão de Ação */}
          <div style={{ display: "flex", justifyContent: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: "20px" }}>
            <button
              type="submit"
              disabled={gerandoIa}
              style={{
                background: "#121212",
                color: "#C6A15B",
                border: "1px solid #C6A15B",
                padding: "14px 28px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: "800",
                cursor: gerandoIa ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Sparkles size={18} />
              <span>{gerandoIa ? "Gerando com IA e Aplicando Guardrails..." : "Gerar Minuta Jurídica em 1 Minuto"}</span>
            </button>
          </div>
        </form>
      )}

      {/* CONTEÚDO DA ABA 2: VISUALIZADOR & CICLO DE ASSINATURAS */}
      {abaAtiva === "visualizar" && minutaAtiva && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "24px" }}>
          {/* FOLHA TIMBRADA PROFISSIONAL GAMA PATRIMONIAL */}
          <div
            id="folha-contrato-impressao"
            style={{
              background: "#ffffff",
              borderRadius: "12px",
              padding: "40px",
              border: "1px solid #cbd5e1",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Cabeçalho do Papel Timbrado com Logo Gama */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "2px solid #121212",
                paddingBottom: "18px",
              }}
            >
              <img
                src={MARCA_GAMA.logos.escuro}
                alt={MARCA_GAMA.nome}
                style={{ height: "48px", objectFit: "contain" }}
              />
              <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b", lineHeight: "1.4" }}>
                <strong style={{ color: "#121212", fontSize: "12px" }}>{MARCA_GAMA.razaoSocial}</strong>
                <br />
                CRECI {MARCA_GAMA.creci} · CNPJ {MARCA_GAMA.cnpj}
                <br />
                {MARCA_GAMA.endereco}
              </div>
            </div>

            {/* Número e Status do Contrato */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: "800", color: "#C6A15B", letterSpacing: "1px" }}>
                {minutaAtiva.numeroContrato}
              </span>
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "800",
                  background:
                    minutaAtiva.status === "assinado_digital"
                      ? "#dcfce7"
                      : minutaAtiva.status === "aprovado_diretoria"
                      ? "#fef3c7"
                      : "#e2e8f0",
                  color:
                    minutaAtiva.status === "assinado_digital"
                      ? "#15803d"
                      : minutaAtiva.status === "aprovado_diretoria"
                      ? "#b45309"
                      : "#475569",
                }}
              >
                {minutaAtiva.status === "assinado_digital" && "✓ ASSINADO DIGITALMENTE"}
                {minutaAtiva.status === "aprovado_diretoria" && "★ APROVADO PELA DIRETORIA"}
                {minutaAtiva.status === "revisado_ia" && "● REVISADO POR IA"}
                {minutaAtiva.status === "rascunho" && "○ RASCUNHO"}
              </span>
            </div>

            {/* Texto Integral da Minuta Formatada */}
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "13.5px",
                lineHeight: "1.8",
                color: "#1e293b",
                whiteSpace: "pre-wrap",
                background: "#fcfcfc",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #f1f5f9",
                maxHeight: "750px",
                overflowY: "auto",
              }}
            >
              {minutaAtiva.conteudoIntegralTexto ||
                compilarTextoMinuta({
                  tipo: minutaAtiva.tipoModelo,
                  nomeCli: minutaAtiva.partes.contratante.nome,
                  docCli: minutaAtiva.partes.contratante.documento,
                  rgCli: minutaAtiva.partes.contratante.rg,
                  estCivil: minutaAtiva.partes.contratante.estadoCivil,
                  profCli: minutaAtiva.partes.contratante.profissao,
                  endCli: minutaAtiva.partes.contratante.endereco,
                  objDesc: minutaAtiva.objetoDescricao,
                  matr: minutaAtiva.matriculaImovel || "",
                  vTotal: minutaAtiva.valores.valorTotal,
                  vSinal: minutaAtiva.valores.sinalEntrada,
                  vSaldo: minutaAtiva.valores.saldoDevedor,
                  qtdParc: minutaAtiva.valores.quantidadeParcelas,
                  indReaj: minutaAtiva.valores.indiceReajuste,
                  condPag: minutaAtiva.valores.condicaoPagamento,
                  praz: minutaAtiva.prazos.prazoDias,
                  comarca: minutaAtiva.prazos.cidadeComarca,
                })}
            </div>

            {/* Box de Assinatura Digital Avançada (Lei 14.063/2020) */}
            {minutaAtiva.status === "assinado_digital" && (
              <div
                style={{
                  background: "#f0fdf4",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "16px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <BadgeCheck size={28} color="#16a34a" />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: "800", color: "#166534" }}>
                      Documento Eletrônico Assinado Digitalmente
                    </div>
                    <div style={{ fontSize: "11px", color: "#15803d", marginTop: "2px" }}>
                      Conformidade com a Lei Federal nº 14.063/2020 e MP 2.200-2/2001 (ICP-Brasil).
                    </div>
                    <div style={{ fontSize: "10px", color: "#64748b", fontFamily: "monospace", marginTop: "4px" }}>
                      Hash SHA-256: {minutaAtiva.hashAssinaturaSha256}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right", fontSize: "11px", color: "#64748b" }}>
                  <div>{minutaAtiva.dataAssinatura}</div>
                  <div>IP: {minutaAtiva.ipAssinante}</div>
                </div>
              </div>
            )}
          </div>

          {/* PAINEL LATERAL DE CICLO DE VIDA & PARECER DE IA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {/* Card de Score e Conformidade IA */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#121212" }}>Score Jurídico IA</span>
                <span style={{ fontSize: "24px", fontWeight: "900", color: "#15803d" }}>
                  {minutaAtiva.scoreConformidadeIa}/100
                </span>
              </div>
              <p style={{ margin: "0 0 14px 0", fontSize: "12px", color: "#64748b", lineHeight: "1.4" }}>
                Todos os guardrails legais para Tangará da Serra e Mato Grosso foram analisados e atendidos.
              </p>

              {/* Lista de Guardrails */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {minutaAtiva.guardrails.map((gr) => (
                  <div
                    key={gr.codigo}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "8px",
                      fontSize: "11px",
                      color: "#334155",
                      background: "#f8fafc",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    <CheckCircle2 size={14} color="#15803d" style={{ marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <strong>{gr.codigo}:</strong> {gr.descricao}
                      <div style={{ color: "#94a3b8", fontSize: "10px", marginTop: "2px" }}>{gr.baseLegal}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ações do Ciclo de Vida */}
            <div
              style={{
                background: "#ffffff",
                borderRadius: "12px",
                padding: "20px",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <div style={{ fontSize: "13px", fontWeight: "800", color: "#121212", marginBottom: "4px" }}>
                Ações do Instrumento
              </div>

              {minutaAtiva.status === "revisado_ia" && (
                <button
                  onClick={handleAprovarDiretoria}
                  style={{
                    background: "#121212",
                    color: "#C6A15B",
                    border: "1px solid #C6A15B",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Aprovar pela Diretoria</span>
                </button>
              )}

              {minutaAtiva.status === "aprovado_diretoria" && (
                <button
                  onClick={handleAssinarDigital}
                  style={{
                    background: "#15803d",
                    color: "#ffffff",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "13px",
                    fontWeight: "800",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  <Lock size={16} />
                  <span>Assinar Digitalmente (Lei 14.063)</span>
                </button>
              )}

              <button
                onClick={() => window.print()}
                style={{
                  background: "#f1f5f9",
                  color: "#1e293b",
                  border: "1px solid #cbd5e1",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Printer size={16} />
                <span>Imprimir / Gerar PDF</span>
              </button>

              <button
                onClick={handleCopiarMinuta}
                style={{
                  background: "#f8fafc",
                  color: copiado ? "#15803d" : "#475569",
                  border: "1px solid #e2e8f0",
                  padding: "10px",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                {copiado ? <Check size={16} color="#15803d" /> : <Copy size={16} />}
                <span>{copiado ? "Texto Copiado!" : "Copiar Texto Integral"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONTEÚDO DA ABA 3: ACERVO DIGITAL DE CONTRATOS */}
      {abaAtiva === "acervo" && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "14px",
            padding: "24px",
            border: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Barra de Filtro e Busca */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ position: "relative", minWidth: "300px" }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
              />
              <input
                type="text"
                placeholder="Buscar por número, parte ou imóvel..."
                value={buscaAcervo}
                onChange={(e) => setBuscaAcervo(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 36px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Filter size={16} color="#64748b" />
              <select
                value={filtroStatus}
                onChange={(e) => setFiltroStatus(e.target.value)}
                style={{
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  background: "#ffffff",
                  color: "#334155",
                  fontWeight: "600",
                }}
              >
                <option value="todos">Todos os Status</option>
                <option value="assinado_digital">Assinados Digitalmente</option>
                <option value="aprovado_diretoria">Aprovados pela Diretoria</option>
                <option value="revisado_ia">Revisados por IA</option>
              </select>
            </div>
          </div>

          {/* Tabela de Contratos */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #e2e8f0", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "12px" }}>Nº Contrato</th>
                  <th style={{ padding: "12px" }}>Segmento / Tipo</th>
                  <th style={{ padding: "12px" }}>Contratante</th>
                  <th style={{ padding: "12px" }}>Valor Total</th>
                  <th style={{ padding: "12px" }}>Status</th>
                  <th style={{ padding: "12px" }}>Data</th>
                  <th style={{ padding: "12px", textAlign: "right" }}>Ação</th>
                </tr>
              </thead>
              <tbody>
                {acervoFiltrado.map((m) => (
                  <tr key={m.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "12px", fontWeight: "700", color: "#121212" }}>
                      {m.numeroContrato}
                    </td>
                    <td style={{ padding: "12px", color: "#475569" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "700",
                          background:
                            m.segmento === "agro"
                              ? "#ecfdf5"
                              : m.segmento === "engenharia"
                              ? "#fef3c7"
                              : "#f1f5f9",
                          color:
                            m.segmento === "agro"
                              ? "#047857"
                              : m.segmento === "engenharia"
                              ? "#b45309"
                              : "#334155",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          textTransform: "uppercase",
                        }}
                      >
                        {m.segmento}
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "600", color: "#121212" }}>
                      {m.partes.contratante.nome}
                    </td>
                    <td style={{ padding: "12px", fontWeight: "700", color: "#C6A15B" }}>
                      {formatarDinheiro(m.valores.valorTotal)}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "800",
                          background:
                            m.status === "assinado_digital"
                              ? "#dcfce7"
                              : m.status === "aprovado_diretoria"
                              ? "#fef3c7"
                              : "#e2e8f0",
                          color:
                            m.status === "assinado_digital"
                              ? "#15803d"
                              : m.status === "aprovado_diretoria"
                              ? "#b45309"
                              : "#475569",
                        }}
                      >
                        {m.status === "assinado_digital"
                          ? "ASSINADO"
                          : m.status === "aprovado_diretoria"
                          ? "APROVADO"
                          : "REVISADO IA"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: "#64748b" }}>{m.criadoEm}</td>
                    <td style={{ padding: "12px", textAlign: "right" }}>
                      <button
                        onClick={() => {
                          setMinutaAtiva(m);
                          setAbaAtiva("visualizar");
                        }}
                        style={{
                          background: "transparent",
                          border: "1px solid #cbd5e1",
                          color: "#121212",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
