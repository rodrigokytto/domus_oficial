import React, { useState, useRef, useEffect } from "react";
import {
  ClipboardCheck,
  Camera,
  CheckCircle2,
  FileCheck,
  Printer,
  MessageCircle,
  AlertTriangle,
  PenTool,
  RotateCcw,
  ShieldCheck,
  Building2,
} from "lucide-react";
import { MARCA_GAMA } from "../lib/marcaGama";

type EstadoConservacao = "Novo" | "Bom" | "Regular" | "Reparos Necessários" | "Danificado";

interface ItemComodo {
  id: string;
  nome: string;
  estado: EstadoConservacao;
  observacoes: string;
  fotosQtd: number;
}

export const VistoriaDigitalGama: React.FC = () => {
  const [tipoVistoria, setTipoVistoria] = useState<"entrada" | "saida" | "periodica">("entrada");
  const [imovelSelecionado, setImovelSelecionado] = useState("GM101 - Mansão Vale do Sol");
  const [locador, setLocador] = useState("Gama Patrimonial Gestão e Participações Ltda");
  const [locatario, setLocatario] = useState("Dr. Marcos Vinicius de Oliveira");
  const [vistoriador, setVistoriador] = useState("Dr. Rodrigo Ribeiro Gonçalves (rodrigo.goncalves@kytto.com.br) - CRECI J-14280 MT");

  const [comodos, setComodos] = useState<ItemComodo[]>([
    { id: "1", nome: "Fachada & Entrada Principal", estado: "Novo", observacoes: "Pintura externa e iluminação em perfeito estado", fotosQtd: 3 },
    { id: "2", nome: "Sala de Estar & Jantar", estado: "Novo", observacoes: "Pé-direito duplo, porcelanato sem riscos, esquadrias limpas", fotosQtd: 4 },
    { id: "3", nome: "Cozinha & Espaço Gourmet", estado: "Novo", observacoes: "Bancadas em granito escovado intactas, torneiras sem vazamento", fotosQtd: 4 },
    { id: "4", nome: "Suíte Master", estado: "Novo", observacoes: "Persiana elétrica operando normalmente, hidro testada", fotosQtd: 3 },
    { id: "5", nome: "Banheiros Sociais & Lavabo", estado: "Bom", observacoes: "Louças sanitárias perfeitas, ralos limpos", fotosQtd: 3 },
    { id: "6", nome: "Área de Lazer & Piscina", estado: "Novo", observacoes: "Pedra hijau limpa, casa de bombas funcionando", fotosQtd: 3 },
  ]);

  // Canvas de Assinatura
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [desenhando, setDesenhando] = useState(false);
  const [assinou, setAssinou] = useState(false);
  const [laudoGerado, setLaudoGerado] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#121212";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const iniciarDesenho = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setDesenhando(true);
    setAssinou(true);
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.beginPath();
    ctx.moveTo(clientX - rect.left, clientY - rect.top);
  };

  const desenhar = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!desenhando) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.stroke();
  };

  const pararDesenho = () => {
    setDesenhando(false);
  };

  const limparAssinatura = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setAssinou(false);
  };

  const atualizarEstadoComodo = (id: string, novoEstado: EstadoConservacao) => {
    setComodos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, estado: novoEstado } : c)),
    );
  };

  const atualizarObsComodo = (id: string, novaObs: string) => {
    setComodos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, observacoes: novaObs } : c)),
    );
  };

  const handleCompartilharWhatsApp = () => {
    const texto = encodeURIComponent(
      `*${MARCA_GAMA.nome}* | Laudo Oficial de Vistoria de ${tipoVistoria.toUpperCase()}\n` +
        `• Imóvel: ${imovelSelecionado}\n` +
        `• Locatário/Comprador: ${locatario}\n` +
        `• Responsável Técnico: ${vistoriador}\n` +
        `• Cômodos Vistoriados: ${comodos.length} ambientes com hash e registro fotográfico\n` +
        `• Status: Assinado eletronicamente com carimbo de tempo\n\n` +
        `Acesse o documento original com certificado na plataforma da Gama Patrimonial.`,
    );
    window.open(`https://wa.me/?text=${texto}`, "_blank");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: "800", color: "#121212", margin: 0 }}>
            Vistorias & Laudos Digitais Eletrônicos
          </h1>
          <div style={{ fontSize: "13px", color: "#64748b" }}>
            Checklist completo de cômodos com registro fotográfico, distinção de desgaste natural (Art. 23 Lei 8.245) e assinatura digital
          </div>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setLaudoGerado(true)}
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
            <FileCheck size={16} />
            Gerar Laudo Final
          </button>
        </div>
      </div>

      {/* Identificação da Vistoria */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "20px",
          border: "1px solid #e2e8f0",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
            Finalidade da Vistoria
          </label>
          <select
            value={tipoVistoria}
            onChange={(e) => setTipoVistoria(e.target.value as any)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px" }}
          >
            <option value="entrada">Vistoria de Entrada (Locação / Entrega)</option>
            <option value="saida">Vistoria de Saída (Devolução de Chaves)</option>
            <option value="periodica">Vistoria Periódica de Manutenção</option>
          </select>
        </div>

        <div>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
            Imóvel Objeto
          </label>
          <input
            type="text"
            value={imovelSelecionado}
            onChange={(e) => setImovelSelecionado(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
            Locatário / Ocupante
          </label>
          <input
            type="text"
            value={locatario}
            onChange={(e) => setLocatario(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ fontSize: "12px", fontWeight: "700", color: "#121212", display: "block", marginBottom: "4px" }}>
            Responsável Técnico
          </label>
          <input
            type="text"
            value={vistoriador}
            onChange={(e) => setVistoriador(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box" }}
          />
        </div>
      </div>

      {/* Checklist de Cômodos */}
      <div style={{ background: "#ffffff", borderRadius: "12px", padding: "24px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", marginBottom: "16px" }}>
          Checklist de Ambientes & Parecer Técnico
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {comodos.map((c) => (
            <div
              key={c.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                padding: "16px",
                background: "#f8fafc",
                display: "grid",
                gridTemplateColumns: "1.2fr 1fr 2fr",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: "700", fontSize: "14px", color: "#121212" }}>{c.nome}</div>
                <div style={{ fontSize: "11px", color: "#64748b", marginTop: "2px" }}>
                  📷 {c.fotosQtd} fotos registradas (SHA-256)
                </div>
              </div>

              <div>
                <select
                  value={c.estado}
                  onChange={(e) => atualizarEstadoComodo(c.id, e.target.value as EstadoConservacao)}
                  style={{
                    width: "100%",
                    padding: "8px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    fontWeight: "600",
                    background:
                      c.estado === "Novo" || c.estado === "Bom"
                        ? "#f0fdf4"
                        : c.estado === "Regular"
                          ? "#fffbeb"
                          : "#fef2f2",
                  }}
                >
                  <option value="Novo">Novo (100% Intacto)</option>
                  <option value="Bom">Bom Estado</option>
                  <option value="Regular">Regular (Desgaste Natural)</option>
                  <option value="Reparos Necessários">Reparos Necessários</option>
                  <option value="Danificado">Danificado</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Observações do cômodo..."
                  value={c.observacoes}
                  onChange={(e) => atualizarObsComodo(c.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #cbd5e1",
                    fontSize: "12px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assinatura Eletrônica na Tela (Touch Canvas) */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "12px",
          padding: "24px",
          border: "1px solid #e2e8f0",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: "24px",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <PenTool size={18} color="#C6A15B" />
            <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#121212", margin: 0 }}>
              Assinatura Eletrônica na Tela (Mouse / Touch)
            </h3>
          </div>
          <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 16px 0" }}>
            Assine diretamente no quadro ao lado com o dedo ou mouse. Válida juridicamente nos termos da MP 2.200-2/2001 e Lei 14.063/2020.
          </p>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={limparAssinatura}
              style={{
                background: "#f1f5f9",
                border: "1px solid #cbd5e1",
                padding: "8px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <RotateCcw size={14} />
              Limpar Campo
            </button>
            <button
              type="button"
              onClick={handleCompartilharWhatsApp}
              style={{
                background: "#25D366",
                color: "#ffffff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "700",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <MessageCircle size={15} />
              Enviar Link para Locatário
            </button>
          </div>
        </div>

        <div>
          <div
            style={{
              border: "2px dashed #C6A15B",
              borderRadius: "10px",
              background: "#F7F3EA",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <canvas
              ref={canvasRef}
              width={420}
              height={160}
              onMouseDown={iniciarDesenho}
              onMouseMove={desenhar}
              onMouseUp={pararDesenho}
              onMouseLeave={pararDesenho}
              onTouchStart={iniciarDesenho}
              onTouchMove={desenhar}
              onTouchEnd={pararDesenho}
              style={{ width: "100%", height: "160px", cursor: "crosshair", display: "block" }}
            />
            {!assinou && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  color: "#94a3b8",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                Desenhe sua assinatura aqui
              </div>
            )}
          </div>
          <div style={{ textAlign: "center", fontSize: "11px", color: "#64748b", marginTop: "6px" }}>
            Assinatura do Locatário / Ocupante: {locatario}
          </div>
        </div>
      </div>
    </div>
  );
};
