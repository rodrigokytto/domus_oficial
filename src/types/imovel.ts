export type FinalidadeImovel = "venda" | "aluguel" | "ambos";
export type TipoImovel = "casa" | "apartamento" | "cobertura" | "fazenda" | "terreno" | "comercial";

export interface Imovel {
  id: string;
  codigo: string;
  titulo: string;
  slug: string;
  tipo: TipoImovel;
  finalidade: FinalidadeImovel;
  subtitulo?: string;
  precoVenda?: number;
  precoAluguel?: number;
  condominio?: number;
  iptu?: number;
  areaConstruida: number; // m² ou hectares para fazenda
  areaTerreno?: number;
  quartos: number;
  suites: number;
  banheiros: number;
  vagas: number;
  endereco: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep?: string;
  descricao: string;
  diferenciais: string[];
  fotos: string[];
  corretor: {
    nome: string;
    telefone: string;
    creci?: string;
    avatar?: string;
  };
  destaque?: boolean;
  status: "disponivel" | "reservado" | "vendido" | "alugado";
  criadoEm: string;
}

export interface FiltrosImoveis {
  finalidade?: string;
  tipo?: string;
  bairro?: string;
  cidade?: string;
  precoMin?: number;
  precoMax?: number;
  quartosMin?: number;
  vagasMin?: number;
  termoBusca?: string;
}
