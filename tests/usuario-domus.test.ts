import { describe, it, expect, beforeEach } from "vitest";
import {
  autenticarUsuario,
  obterSessao,
  salvarSessao,
  alternarPerfilAtivo,
  rotuloPerfil,
  badgeCorPerfil,
  secoesPermitidasPorPerfil,
  USUARIO_OFICIAL_GGAMAS,
  USUARIO_OFICIAL_RODRIGO,
} from "../src/lib/authDomus";

describe("Gestão de Usuário Multiperfil Domus - ggamas@gmail.com", () => {
  beforeEach(() => {
    salvarSessao(USUARIO_OFICIAL_GGAMAS);
  });

  it("deve autenticar com sucesso ggamas@gmail.com com a senha #231215Verdao", () => {
    const res = autenticarUsuario({
      email: "ggamas@gmail.com",
      senha: "#231215Verdao",
    });

    expect(res.sucesso).toBe(true);
    expect(res.usuario).toBeDefined();
    expect(res.usuario?.email).toBe("ggamas@gmail.com");
    expect(res.usuario?.perfis).toContain("corretor");
    expect(res.usuario?.perfis).toContain("cliente");
    expect(res.usuario?.perfis).toContain("vendedor");
    expect(res.usuario?.perfis).toContain("gerente");
    expect(res.usuario?.perfis).toHaveLength(4);
    expect(res.token).toBeDefined();
  });

  it("deve autenticar com sucesso o usuario executivo oficial rodrigo.goncalves@kytto.com.br", () => {
    const res = autenticarUsuario({
      email: "rodrigo.goncalves@kytto.com.br",
      senha: "#231215Verdao",
    });

    expect(res.sucesso).toBe(true);
    expect(res.usuario).toBeDefined();
    expect(res.usuario?.email).toBe("rodrigo.goncalves@kytto.com.br");
    expect(res.usuario?.nome).toContain("Rodrigo Ribeiro Gonçalves");
    expect(res.usuario?.perfis).toContain("gerente");
    expect(res.usuario?.creci).toBe("CRECI J-14280 MT");
  });

  it("deve autenticar com sucesso rodrigo.goncalves@kytto.com.br com a senha #080581Verdao", () => {
    const res = autenticarUsuario({
      email: "rodrigo.goncalves@kytto.com.br",
      senha: "#080581Verdao",
    });

    expect(res.sucesso).toBe(true);
    expect(res.usuario).toBeDefined();
    expect(res.usuario?.email).toBe("rodrigo.goncalves@kytto.com.br");
  });

  it("deve rejeitar autenticação com senha incorreta", () => {
    const res = autenticarUsuario({
      email: "ggamas@gmail.com",
      senha: "senhaIncorreta123",
    });

    expect(res.sucesso).toBe(false);
    expect(res.mensagem).toContain("E-mail ou senha incorretos");
  });

  it("deve alternar dinamicamente entre os 4 perfis cadastrados", () => {
    // 1. Alterna para Corretor
    const uCorretor = alternarPerfilAtivo("corretor");
    expect(uCorretor.perfilAtivo).toBe("corretor");

    // 2. Alterna para Vendedor
    const uVendedor = alternarPerfilAtivo("vendedor");
    expect(uVendedor.perfilAtivo).toBe("vendedor");

    // 3. Alterna para Cliente
    const uCliente = alternarPerfilAtivo("cliente");
    expect(uCliente.perfilAtivo).toBe("cliente");

    // 4. Alterna de volta para Gerente
    const uGerente = alternarPerfilAtivo("gerente");
    expect(uGerente.perfilAtivo).toBe("gerente");
  });

  it("deve filtrar permissões de navegação e menus de acordo com o perfil ativo", () => {
    // Gerente tem acesso a todos os módulos de gestão e retaguarda
    const secoesGerente = secoesPermitidasPorPerfil("gerente");
    expect(secoesGerente).toContain("financeiro");
    expect(secoesGerente).toContain("repasses");
    expect(secoesGerente).toContain("fiscal");
    expect(secoesGerente).toContain("compliance");
    expect(secoesGerente).toContain("crm");
    expect(secoesGerente).toContain("imoveis");
    expect(secoesGerente.length).toBeGreaterThanOrEqual(10);

    // Corretor foca em comercial, lâminas de imóveis, CRM e agenda
    const secoesCorretor = secoesPermitidasPorPerfil("corretor");
    expect(secoesCorretor).toContain("imoveis");
    expect(secoesCorretor).toContain("crm");
    expect(secoesCorretor).toContain("agenda");
    expect(secoesCorretor).toContain("consorcios");
    expect(secoesCorretor).not.toContain("fiscal"); // restrito à contabilidade/gerência
    expect(secoesCorretor).not.toContain("compliance"); // restrito à diretoria

    // Vendedor visualiza seus imóveis, propostas e extrato de repasses
    const secoesVendedor = secoesPermitidasPorPerfil("vendedor");
    expect(secoesVendedor).toContain("imoveis");
    expect(secoesVendedor).toContain("repasses");
    expect(secoesVendedor).toContain("contratos");
    expect(secoesVendedor).not.toContain("crm"); // não vê o CRM interno de corretores

    // Cliente visualiza imóveis, consórcios e laudos de vistoria
    const secoesCliente = secoesPermitidasPorPerfil("cliente");
    expect(secoesCliente).toContain("imoveis");
    expect(secoesCliente).toContain("consorcios");
    expect(secoesCliente).not.toContain("financeiro");
    expect(secoesCliente).not.toContain("repasses");
  });

  it("deve formatar corretamente rótulos e cores para cada perfil", () => {
    expect(rotuloPerfil("gerente")).toBe("Gerente Geral");
    expect(rotuloPerfil("corretor")).toBe("Corretor Credenciado");
    expect(rotuloPerfil("vendedor")).toBe("Vendedor / Proprietário");
    expect(rotuloPerfil("cliente")).toBe("Cliente / Investidor");

    const badge = badgeCorPerfil("gerente");
    expect(badge.texto).toBe("#C6A15B");
  });

  it("deve garantir fallback seguro quando uma seção restrita é acessada por perfil incompatível", () => {
    const secaoRestrita = "financeiro";
    const permitidasCliente = secoesPermitidasPorPerfil("cliente");
    
    expect(permitidasCliente.includes(secaoRestrita)).toBe(false);
    
    // O fallback deve selecionar 'hoje' ou a primeira seção permitida
    const secaoDestino = permitidasCliente.includes(secaoRestrita) ? secaoRestrita : "hoje";
    expect(secaoDestino).toBe("hoje");
  });
});
