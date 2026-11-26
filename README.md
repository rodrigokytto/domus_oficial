# Domus Consórcios & Soluções Financeiras

Plataforma inteligente para **venda, simulação, esteira comercial e gestão de consórcios** (imobiliário, automotivo, pesados/agronegócio, serviços e cartas contempladas).

* **Domínio de Produção:** [https://domus.kytto.com.br](https://domus.kytto.com.br)
* **Plataforma / Painel da Equipe:** [https://domus.kytto.com.br/plataforma/site](https://domus.kytto.com.br/plataforma/site)
* **Repositório Oficial:** [rodrigokytto/domus_oficial](https://github.com/rodrigokytto/domus_oficial)

---

## 1. Visão Geral do Negócio

A **Domus** opera como corretora e assessoria especializada na comercialização de consórcios e cartas de crédito, oferecendo uma alternativa inteligente e econômica ao financiamento bancário tradicional.

### Segmentos de Consórcio Atendidos:
1. **Consórcio Imobiliário:**
   * Aquisição de imóveis residenciais e comerciais (casas, apartamentos, terrenos).
   * Construção, reforma e ampliação.
   * Quitação de financiamento imobiliário caro (eliminação de juros bancários futuros).
   * Prazos de até 240 meses com uso do FGTS para lance ou amortização.

2. **Consórcio de Automóveis e Veículos Leves:**
   * Carros novos e seminovos de qualquer marca ou modelo.
   * Prazos flexíveis de 36 a 100 meses.
   * Parcela reduzida até a contemplação.

3. **Consórcio de Pesados, Máquinas e Implementos Agrícolas:**
   * Caminhões, frotas, carretas, tratores, colheitadeiras e implementos agrícolas.
   * Foco no polo do agronegócio de Mato Grosso (Tangará da Serra e região).
   * Planos com parcelas semestrais ou anuais alinhadas à safra.

4. **Consórcio de Serviços:**
   * Instalação de energia solar fotovoltaica.
   * Projetos de engenharia, arquitetura e reforma.
   * Cirurgias plásticas, tratamentos estéticos e de saúde.
   * Viagens, festas de casamento e intercâmbios.

5. **Cartas Contempladas:**
   * Aquisição de cotas já contempladas com liberação imediata do crédito para compra do bem.
   * Pagamento de entrada (ágio) + assunção das parcelas vincendas.

6. **Consórcio como Alavancagem e Investimento:**
   * Construção de patrimônio programado.
   * Venda da cota contemplada no mercado secundário com lucro.
   * Rentabilização via locação do imóvel adquirido.

---

## 2. Diferenciais Tecnológicos da Plataforma

* **Simulador Multissegmento Dinâmico:** Cálculo instantâneo de parcelas cheias, parcelas reduzidas (meia-parcela ou 70%) e prazos personalizados.
* **Comparador Consórcio × Financiamento Bancário:** Demonstração visual do Custo Efetivo Total (CET), comparando a taxa de administração diluída do consórcio contra os juros compostos (Tabela SAC / PRICE) dos bancos, destacando a economia em reais.
* **Calculadora de Lances Inteligente:**
  * Lance Livre (recursos próprios).
  * Lance Embutido (utilização de até 30% da própria carta de crédito para pagar o lance).
  * Lance com FGTS (para consórcio imobiliário).
  * Histórico de lances médios dos grupos das administradoras.
* **Esteira Comercial Integrada:** Gestão de leads, propostas enviadas, acompanhamento de assembleias mensais e pós-venda.
* **Atendimento WhatsApp Monitorado:** Roteamento de leads simulados diretamente para a equipe de consultores com mensagem pré-estruturada e prontuário comercial.
* **Multi-Administradoras Homologadas:** Suporte a regras e tabelas das principais administradoras autorizadas pelo Banco Central (Porto Seguro, Caixa Consórcios, Rodobens, Embracon, Santander, Itaú, BB Consórcios, Magalu, Yamaha).

---

## 3. Estrutura do Repositório

```text
├── docs/                   # Documentação de arquitetura, negócio e relatórios
├── src/
│   ├── types/              # Tipos TypeScript para planos, cotas, lances e administradoras
│   ├── lib/                # Motores de cálculo financeiro (simulador, comparador, lances)
│   ├── components/         # Componentes React (Simulador, Comparador, Vitrine de Cartas)
│   ├── plataforma/         # Painel administrativo (/plataforma/site, esteira e métricas)
│   └── site/               # Portal público institucional e captação de leads
├── tests/                  # Testes unitários do motor de cálculos financeiros
├── package.json
└── tsconfig.json
```

---

## 4. Conformidade Regulatória

Operações em estrita conformidade com a **Lei nº 11.795/2008** (Sistema de Consórcios), regulamentação do **Banco Central do Brasil (BACEN)** e proteção integral à **LGPD (Lei nº 13.709/2018)** na coleta e qualificação de propostas financeiras.
