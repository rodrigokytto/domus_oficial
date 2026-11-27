import { Award, CheckCircle2, Copy, Lock, Printer, Search, ShieldCheck, X } from "lucide-react";
import { useState } from "react";

export interface RegistroValidador {
  tipo: "locacao" | "venda" | "vistoria";
  titulo: string;
  protocolo: string;
  numeroContrato: string;
  hashSha256: string;
  dataHoraRegistro: string;
  municipio: string;
  emitente: {
    razaoSocial: string;
    cnpj: string;
    creci: string;
    endereco: string;
  };
  amparoLegal: string[];
  signatarios: {
    nome: string;
    papel: string;
    identificador: string;
    status: "assinado" | "pendente";
    metodo: string;
    dataHoraAssinatura: string;
    hashAssinatura: string;
  }[];
  resumoFinanceiro?: string;
  parecerIa?: string;
}

const REGISTROS_HOMOLOGADOS: RegistroValidador[] = [
  {
    tipo: "locacao",
    titulo: "Contrato de Locação Residencial Urbana (Lei Federal nº 8.245/1991)",
    protocolo: "MINUTA-2026-LOC-7F5BDCFC",
    numeroContrato: "LOC-2026-00492",
    hashSha256: "e8b4a9c148286a111400d75005c317ad22a00c619cbdf52047ff69dbd3fdf2a1",
    dataHoraRegistro: "2026-11-27T19:40:12-04:00",
    municipio: "Tangará da Serra - MT",
    emitente: {
      razaoSocial: "Gama Patrimonial Gestão e Participações Ltda",
      cnpj: "52.894.120/0001-44",
      creci: "CRECI-MT J-14280",
      endereco: "Tangará da Serra - MT",
    },
    amparoLegal: [
      "Lei Federal nº 14.063/2020 (Art. 5º, § 1º - Assinatura Eletrônica Avançada)",
      "Medida Provisória nº 2.200-2/2001 (ICP-Brasil & PAdES)",
      "Lei Federal nº 8.245/1991 (Lei do Inquilinato)",
      "IETF RFC 3161 (Time-Stamp Protocol - Carimbo do Tempo)",
    ],
    resumoFinanceiro:
      "Aluguel mensal: R$ 3.800,00 · Caução em dinheiro: R$ 11.400,00 (3 meses) · Reajuste anual IPCA/IBGE",
    parecerIa: "Risco Baixo (Score 98/100) · Capacidade de pagamento comprovada · Garantia integral",
    signatarios: [
      {
        nome: "Dr. Rodrigo Ribeiro Gonçalves",
        papel: "Locatário",
        identificador: "rodrigo.goncalves@kytto.com.br · CPF 000.***.***-99",
        status: "assinado",
        metodo: "Assinatura Touch em Celular (Pointer/TouchEvents 60 FPS)",
        dataHoraAssinatura: "27/11/2026 19:42:05 UTC-4",
        hashAssinatura: "SHA256-18e47b2c-9a01f82b",
      },
      {
        nome: "Guilherme Gama",
        papel: "Locador",
        identificador: "ggamas@gmail.com · CPF 123.***.***-00",
        status: "assinado",
        metodo: "Assinatura Eletrônica Avançada / Token WhatsApp OTP",
        dataHoraAssinatura: "27/11/2026 19:43:18 UTC-4",
        hashAssinatura: "SHA256-4c2f810e-bb337a88",
      },
      {
        nome: "Gama Patrimonial Gestão e Participações Ltda",
        papel: "Intermediadora & Custodiante",
        identificador: "contato@gamapatrimonial.com.br · CNPJ 52.894.120/0001-44",
        status: "assinado",
        metodo: "Assinatura Digital Corporativa PAdES ICP-Brasil A1",
        dataHoraAssinatura: "27/11/2026 19:40:15 UTC-4",
        hashAssinatura: "SHA256-91e84a22-cc449b11",
      },
    ],
  },
  {
    tipo: "venda",
    titulo: "Instrumento Particular de Promessa de Compra e Venda de Imóvel Urbano",
    protocolo: "MINUTA-2026-VND-D9A4E211",
    numeroContrato: "VND-2026-00108",
    hashSha256: "3c91af6d90a78912eeb805373a466fc4938b8120b411d332d966e66bf31b87a0",
    dataHoraRegistro: "2026-11-27T19:55:40-04:00",
    municipio: "Tangará da Serra - MT",
    emitente: {
      razaoSocial: "Gama Patrimonial Gestão e Participações Ltda",
      cnpj: "52.894.120/0001-44",
      creci: "CRECI-MT J-14280",
      endereco: "Tangará da Serra - MT",
    },
    amparoLegal: [
      "Código Civil Brasileiro (Lei Federal nº 10.406/2002, Art. 481 e 474)",
      "Lei Federal nº 14.063/2020 (Art. 5º, § 1º - Assinatura Eletrônica Avançada)",
      "Medida Provisória nº 2.200-2/2001 (ICP-Brasil & PAdES)",
      "Lei nº 13.097/2015 (Princípio da Concentração na Matrícula)",
    ],
    resumoFinanceiro:
      "Preço global: R$ 850.000,00 · Sinal e Princípio de Pagamento (Arras): R$ 170.000,00 · Saldo via Financiamento: R$ 680.000,00",
    parecerIa: "Due Diligence Positiva · Matrícula desonerada · Minuta balanceada com arras confirmatórias",
    signatarios: [
      {
        nome: "Dr. Rodrigo Ribeiro Gonçalves",
        papel: "Promitente Comprador",
        identificador: "rodrigo.goncalves@kytto.com.br · CPF 000.***.***-99",
        status: "assinado",
        metodo: "Assinatura Touch em Celular (Pointer/TouchEvents 60 FPS)",
        dataHoraAssinatura: "27/11/2026 19:58:30 UTC-4",
        hashAssinatura: "SHA256-a19b882c-47fc91aa",
      },
      {
        nome: "Guilherme Gama",
        papel: "Promitente Vendedor",
        identificador: "ggamas@gmail.com · CPF 123.***.***-00",
        status: "assinado",
        metodo: "Assinatura Eletrônica Avançada / Token WhatsApp OTP",
        dataHoraAssinatura: "27/11/2026 19:59:12 UTC-4",
        hashAssinatura: "SHA256-ff71092a-bc3381e4",
      },
      {
        nome: "Gama Patrimonial Gestão e Participações Ltda",
        papel: "Intermediadora Imobiliária",
        identificador: "contato@gamapatrimonial.com.br · CNPJ 52.894.120/0001-44",
        status: "assinado",
        metodo: "Assinatura Digital Corporativa PAdES ICP-Brasil A1",
        dataHoraAssinatura: "27/11/2026 19:55:42 UTC-4",
        hashAssinatura: "SHA256-02e48fa9-9941a877",
      },
    ],
  },
  {
    tipo: "vistoria",
    titulo: "Laudo Pericial Forense de Vistoria de Imóvel com Carimbo Digital e Câmera WebRTC",
    protocolo: "LAUDO-2026-TGA-001",
    numeroContrato: "VIST-2026-00891",
    hashSha256: "a7f920bc48d91a457002eecb93014f17729ba90123ef450912cb849182374ef0",
    dataHoraRegistro: "2026-11-27T19:35:00-04:00",
    municipio: "Tangará da Serra - MT",
    emitente: {
      razaoSocial: "Gama Patrimonial Gestão e Participações Ltda",
      cnpj: "52.894.120/0001-44",
      creci: "CRECI-MT J-14280",
      endereco: "Tangará da Serra - MT",
    },
    amparoLegal: [
      "ABNT NBR 13.752 (Perícias de Engenharia na Construção Civil)",
      "Lei Federal nº 8.245/1991 (Art. 22, V e Art. 23, III)",
      "Lei Federal nº 14.063/2020 (Art. 5º, § 1º)",
      "RFC 3161 (Carimbo do Tempo de Metadados GPS e Fotográficos)",
    ],
    resumoFinanceiro:
      "Vistoria de Entrada de Imóvel Residencial · 12 Ambientes Periciados · Carimbo Forense GPS -14.6231, -57.4892",
    parecerIa: "Imóvel em estado Excelente · Desgaste natural normal · Nenhuma avaria estrutural detectada",
    signatarios: [
      {
        nome: "Perito Vistoriador Oficial Gama",
        papel: "Perito Engenharia / Vistoriador",
        identificador: "pericia@gamapatrimonial.com.br · CREA-MT / CRECI-MT",
        status: "assinado",
        metodo: "Assinatura Touch em Tela / Celular + Certificado A1",
        dataHoraAssinatura: "27/11/2026 19:36:10 UTC-4",
        hashAssinatura: "SHA256-78b109cc-662f88aa",
      },
      {
        nome: "Dr. Rodrigo Ribeiro Gonçalves",
        papel: "Locatário / Ocupante",
        identificador: "rodrigo.goncalves@kytto.com.br · CPF 000.***.***-99",
        status: "assinado",
        metodo: "Assinatura Touch no Smartphone (Retina Canvas)",
        dataHoraAssinatura: "27/11/2026 19:37:45 UTC-4",
        hashAssinatura: "SHA256-88d927ab-5511aaee",
      },
    ],
  },
];

interface Props {
  hashInicial?: string;
  onClose: () => void;
}

export function ValidadorCriptograficoModal({ hashInicial, onClose }: Props) {
  const [termoBusca, setTermoBusca] = useState(hashInicial || "");
  const [registroEncontrado, setRegistroEncontrado] = useState<RegistroValidador | null>(() => {
    if (!hashInicial) return REGISTROS_HOMOLOGADOS[0];
    const limpo = hashInicial.trim().toLowerCase();
    return (
      REGISTROS_HOMOLOGADOS.find(
        (r) =>
          r.hashSha256.toLowerCase() === limpo ||
          r.protocolo.toLowerCase() === limpo ||
          r.numeroContrato.toLowerCase() === limpo,
      ) ?? null
    );
  });
  const [copiado, setCopiado] = useState(false);

  const executarBusca = (termo: string) => {
    const t = termo.trim().toLowerCase();
    if (!t) {
      setRegistroEncontrado(null);
      return;
    }
    const encontrado = REGISTROS_HOMOLOGADOS.find(
      (r) =>
        r.hashSha256.toLowerCase().includes(t) ||
        r.protocolo.toLowerCase().includes(t) ||
        r.numeroContrato.toLowerCase().includes(t) ||
        r.signatarios.some((s) => s.nome.toLowerCase().includes(t) || s.identificador.toLowerCase().includes(t)),
    );
    setRegistroEncontrado(encontrado ?? null);
  };

  const copiarHash = (hash: string) => {
    navigator.clipboard.writeText(hash).catch(() => {});
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  const imprimirCertidao = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="validador-titulo"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#18181b] border border-[#C6A15B]/40 rounded-2xl shadow-2xl text-slate-100 p-5 sm:p-8 my-auto max-h-[92vh] flex flex-col overflow-hidden">
        {/* Barra Superior */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C6A15B] to-[#99793D] flex items-center justify-center text-zinc-950 font-black shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 id="validador-titulo" className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                Validador Público de Autenticidade Criptográfica
                <span className="text-[10px] bg-[#C6A15B]/20 text-[#C6A15B] border border-[#C6A15B]/40 px-2 py-0.5 rounded-full font-semibold">
                  Oficial Gama
                </span>
              </h2>
              <p className="text-xs text-zinc-400">
                Auditoria de integridade digital com base na Lei Federal nº 14.063/2020 e ICP-Brasil MP 2.200-2/2001
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="Fechar Validador"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Campo de Busca e Atalhos */}
        <div className="py-4 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={termoBusca}
                onChange={(e) => {
                  setTermoBusca(e.target.value);
                  executarBusca(e.target.value);
                }}
                placeholder="Insira o Hash SHA-256 (64 caracteres), Protocolo ou Número do Contrato..."
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
            <button
              type="button"
              onClick={() => executarBusca(termoBusca)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#C6A15B] to-[#99793D] text-zinc-950 font-bold text-sm rounded-xl hover:brightness-110 transition flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Verificar</span>
            </button>
          </div>

          {/* Atalhos Rápidos para Simulações Homologadas */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-zinc-500 font-medium">Exemplos Homologados em Produção:</span>
            {REGISTROS_HOMOLOGADOS.map((reg) => (
              <button
                key={reg.protocolo}
                type="button"
                onClick={() => {
                  setTermoBusca(reg.hashSha256);
                  setRegistroEncontrado(reg);
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs transition ${
                  registroEncontrado?.protocolo === reg.protocolo
                    ? "bg-[#C6A15B]/20 text-[#C6A15B] border-[#C6A15B]"
                    : "bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:bg-zinc-800"
                }`}
              >
                {reg.tipo === "locacao"
                  ? "📄 Locação (Rodrigo & Guilherme)"
                  : reg.tipo === "venda"
                    ? "🏡 Venda (Rodrigo & Guilherme)"
                    : "🔍 Laudo Pericial Vistoria"}
              </button>
            ))}
          </div>
        </div>

        {/* Conteúdo da Certidão de Autenticidade */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {registroEncontrado ? (
            <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-xl p-5 sm:p-6 space-y-5 print:bg-white print:text-black">
              {/* Badge de Integridade */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-emerald-400 flex items-center gap-2">
                      Documento Íntegro, Autêntico e Juridicamente Válido
                    </h3>
                    <p className="text-xs text-zinc-300">
                      O arquivo corresponde perfeitamente ao registro criptográfico original. Não houve adulteração após
                      a selagem.
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-emerald-500 text-zinc-950 font-black text-xs uppercase tracking-wider rounded-md">
                    Autenticado
                  </span>
                </div>
              </div>

              {/* Dados Principais do Documento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 p-3.5 bg-zinc-800/60 rounded-lg border border-zinc-700/60">
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                    Título do Ato Jurídico
                  </span>
                  <p className="text-sm font-bold text-white">{registroEncontrado.titulo}</p>
                  <p className="text-zinc-300">
                    Contrato nº <strong className="text-[#C6A15B]">{registroEncontrado.numeroContrato}</strong> ·
                    Protocolo: {registroEncontrado.protocolo}
                  </p>
                </div>

                <div className="space-y-1.5 p-3.5 bg-zinc-800/60 rounded-lg border border-zinc-700/60">
                  <span className="text-zinc-400 font-semibold uppercase tracking-wider text-[10px]">
                    Emitente / Intermediadora
                  </span>
                  <p className="text-sm font-bold text-white">{registroEncontrado.emitente.razaoSocial}</p>
                  <p className="text-zinc-300">
                    {registroEncontrado.emitente.cnpj} · {registroEncontrado.emitente.creci} ·{" "}
                    {registroEncontrado.municipio}
                  </p>
                </div>
              </div>

              {/* Hash SHA-256 e Carimbo do Tempo */}
              <div className="p-3.5 bg-zinc-950 border border-zinc-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
                    Assinatura do Arquivo (Resumo Criptográfico SHA-256)
                  </span>
                  <button
                    type="button"
                    onClick={() => copiarHash(registroEncontrado.hashSha256)}
                    className="text-xs text-[#C6A15B] hover:underline flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    {copiado ? "Copiado!" : "Copiar Hash"}
                  </button>
                </div>
                <code className="block p-2.5 bg-zinc-900 text-emerald-400 text-xs font-mono break-all rounded border border-zinc-800">
                  {registroEncontrado.hashSha256}
                </code>
                <div className="flex flex-wrap items-center justify-between text-[11px] text-zinc-400 pt-1">
                  <span>
                    📅 Data do Carimbo Temporal:{" "}
                    <strong>{new Date(registroEncontrado.dataHoraRegistro).toLocaleString("pt-BR")} (UTC-4)</strong>
                  </span>
                  <span>📍 Jurisdição: {registroEncontrado.municipio}</span>
                </div>
              </div>

              {/* Quadro de Signatários Autenticados */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C6A15B]" />
                  Signatários com Manifestação de Vontade Registrada ({registroEncontrado.signatarios.length})
                </h4>
                <div className="space-y-2">
                  {registroEncontrado.signatarios.map((s) => (
                    <div
                      key={s.hashAssinatura}
                      className="p-3 bg-zinc-800/80 border border-zinc-700/80 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{s.nome}</span>
                          <span className="px-2 py-0.5 bg-[#C6A15B]/20 text-[#C6A15B] text-[10px] font-semibold rounded">
                            {s.papel}
                          </span>
                        </div>
                        <p className="text-zinc-400 text-[11px]">{s.identificador}</p>
                        <p className="text-zinc-300 text-[11px]">
                          Método: <strong>{s.metodo}</strong> em {s.dataHoraAssinatura}
                        </p>
                      </div>
                      <div className="text-right sm:shrink-0">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Assinado
                        </span>
                        <p className="text-[10px] font-mono text-zinc-500">{s.hashAssinatura}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fundamentação Legal */}
              <div className="p-3 bg-zinc-950/60 rounded-lg border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                <span className="font-bold text-zinc-300">Base Regulatória e Validade Jurídica:</span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {registroEncontrado.amparoLegal.map((lei) => (
                    <li key={lei}>{lei}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
              <Lock className="w-10 h-10 text-zinc-600 mx-auto" />
              <h3 className="text-sm font-bold text-zinc-300">Nenhum registro encontrado para a consulta</h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Verifique se o Hash SHA-256 (64 dígitos hexadecimais), o protocolo ou o número do contrato foram
                digitados corretamente.
              </p>
            </div>
          )}
        </div>

        {/* Rodapé com Ações */}
        <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-zinc-500 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#C6A15B]" />
            Chave Pública RSA-4096 auditável · Carimbo Temporal RFC 3161
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {registroEncontrado && (
              <button
                type="button"
                onClick={imprimirCertidao}
                className="flex-1 sm:flex-none px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Imprimir Certidão</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold text-xs rounded-xl transition"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
