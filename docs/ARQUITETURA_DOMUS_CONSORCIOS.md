# Arquitetura e Engenharia de Negócio — Domus Consórcios

Este documento estabelece as diretrizes de produto, arquitetura de software e formulações financeiras para a plataforma **Domus Consórcios & Soluções Financeiras**, acessível publicamente em `https://domus.kytto.com.br` e gerida internamente pela equipe comercial e administrativa em `https://domus.kytto.com.br/plataforma/site`.

---

## 1. Contexto de Negócio e Reposicionamento da Marca

O ambiente anterior refletia a estrutura genérica de um portal imobiliário focado em intermediação de compra, venda e locação de imóveis físicos com dados da região de Tangará da Serra/MT. Com a definição estratégica de que a **Domus atuará focada na venda de consórcios e soluções financeiras correlatas**, o sistema deve ser direcionado para o mercado de planejamento financeiro, aquisição programada de bens e alavancagem patrimonial sem juros.

O consórcio no Brasil, regido pela Lei nº 11.795/2008 e fiscalizado pelo Banco Central do Brasil, destaca-se como o instrumento financeiro mais eficiente para clientes que buscam construir patrimônio ou renovar ativos sem pagar os juros compostos cobrados pelo sistema financeiro tradicional. A plataforma Domus posiciona-se como uma assessoria consultiva de alta tecnologia, oferecendo transparência matemática, escolha de grupos com alta liquidez de contemplação e atendimento humanizado e automatizado via WhatsApp.

---

## 2. Segmentos Operacionais

A Domus atua em cinco verticais principais de consórcios, cobrindo todo o ciclo de vida patrimonial de pessoas físicas e jurídicas:

| Segmento | Faixas Típicas de Crédito | Prazos Operacionais | Destinações Comuns | Administradoras de Referência |
| :--- | :--- | :--- | :--- | :--- |
| **Consórcio Imobiliário** | R$ 150.000 a R$ 2.500.000 | 120 a 240 meses | Compra de imóveis residenciais, comerciais, terrenos, construção e quitação de financiamento bancário | Caixa Consórcios, Porto Seguro, Rodobens, Itaú, Santander, Embracon |
| **Consórcio de Automóveis e Utilitários** | R$ 40.000 a R$ 350.000 | 36 a 100 meses | Carros zero km, seminovos multimarca, vans e veículos comerciais leves | Porto Seguro, Rodobens, Embracon, Magalu, Santander |
| **Pesados, Caminhões e Máquinas Agrícolas** | R$ 250.000 a R$ 2.000.000 | 60 a 120 meses | Tratores, colheitadeiras, implementos agrícolas, carretas e frotas de transporte de grãos | Rodobens, Randon, New Holland, John Deere, Scania, Caixa |
| **Consórcio de Serviços e Sustentabilidade** | R$ 15.000 a R$ 100.000 | 24 a 48 meses | Sistemas de energia solar fotovoltaica, reformas, cirurgias e procedimentos de saúde, viagens e intercâmbio | Porto Seguro, Embracon, Magalu |
| **Cartas Contempladas** | R$ 80.000 a R$ 1.500.000 | Saldo restante a pagar | Utilização imediata do crédito mediante pagamento de ágio à vista | Mercado secundário auditado com transferência oficial |

---

## 3. Motores de Cálculo Financeiro

### 3.1. Formulação da Parcela do Consórcio

Diferente do financiamento que utiliza amortização com juros sobre saldo devedor (Tabela SAC ou PRICE), o consórcio opera com rateio puro do Fundo Comum acrescido de Taxa de Administração e Fundo de Reserva diluídos linearmente:

$$\text{Parcela Integral} = \text{Crédito} \times \left( \frac{100\% + \text{Tx. Adm.} + \text{Fundo Reserva}}{n} \right) + \text{Seguro}$$

Em planos com modalidade de **parcela reduzida**, o consorciado paga um percentual menor (geralmente 70% ou 50% do valor da parcela cheia) até a contemplação. Após ser contemplado por sorteio ou lance, a diferença acumulada é diluída nas parcelas restantes ou deduzida do crédito liberado.

### 3.2. Comparativo Financeiro: Consórcio versus Financiamento Bancário

Um dos principais fatores de conversão comercial da plataforma é o comparador de custo total. Em um financiamento habitacional tradicional de R$ 500.000,00 amortizado em 360 meses a uma taxa média de 11,5% ao ano (TR), o tomador paga ao banco mais de R$ 1.350.000,00 ao longo do contrato, sendo quase R$ 850.000,00 apenas em juros bancários.

No consórcio imobiliário correspondente de R$ 500.000,00 com taxa de administração de 18% diluída em 180 ou 200 meses, o custo total é de aproximadamente R$ 600.000,00 a R$ 610.000,00 (somando fundo de reserva e seguros). A economia real para o cliente ultrapassa R$ 740.000,00, gerando um argumento irrefutável de inteligência financeira.

### 3.3. Mecânica Estratégica de Lances

A plataforma incorpora um simulador de probabilidades e tipos de lances para acelerar a contemplação da cota:

* **Lance Livre:** O cliente oferta um percentual do valor do crédito com recursos próprios. O maior percentual ofertado na assembleia mensal é contemplado.
* **Lance Embutido:** Permite utilizar até 30% do valor da própria carta de crédito como lance. Caso seja contemplado, o valor ofertado é deduzido do crédito recebido, permitindo a contemplação sem necessidade de desembolso imediato em dinheiro.
* **Uso do Saldo de FGTS:** No consórcio imobiliário, os recursos da conta vinculada do FGTS podem ser utilizados para ofertar lance ou abater o saldo devedor após a contemplação, conforme regras do Conselho Curador do FGTS.
* **Lance Fidelidade e Sorteio:** Participação com chances iguais em todas as assembleias mensais com base na extração oficial da Loteria Federal.

---

## 4. Arquitetura da Plataforma e Telas Chave

### 4.1. Portal Público (`https://domus.kytto.com.br`)

O portal público foi projetado para educar o visitante, desmistificar o consórcio e convertê-lo em lead qualificado:

1. **Hero Section com Simulador Integrado:** Seleção intuitiva da categoria de bem (Imóvel, Carro, Agro, Serviços), controle deslizante de valor desejado e exibição instantânea do valor da parcela estimada (integral e reduzida).
2. **Comparador Interativo de Economia:** Gráfico comparativo entre o desembolso no consórcio versus financiamento bancário, destacando a economia em reais e o tempo de amortização.
3. **Vitrine de Cartas Contempladas:** Catálogo atualizado de cotas prontas para transferência com crédito disponível imediatamente para quem tem pressa.
4. **Calculadora de Lance Embutido:** Ferramenta que orienta o cliente a entender como retirar a carta mais rápido sem dispor de capital inicial elevado.
5. **Canal de Atendimento Consultivo:** Botão de WhatsApp direcionando diretamente para a equipe com o resumo da simulação pré-carregado.

### 4.2. Painel Administrativo (`https://domus.kytto.com.br/plataforma/site`)

O painel interno oferece controle completo sobre a operação comercial e os dados do site:

1. **Gestão de Parâmetros e Administradoras:** Configuração de taxas médias de administração, percentuais de fundo de reserva, prazos máximos e administradoras parceiras exibidas no simulador.
2. **Catálogo de Cotas e Cartas Contempladas:** Cadastro, ativação, reserva e baixa de cartas contempladas disponíveis para venda direta.
3. **Esteira Comercial de Propostas de Consórcio:** Funil Kanban adaptado às etapas reais de consórcio: Simulação Realizada → Perfil Financeiro Analisado → Escolha do Grupo/Prazo → Proposta Formalizada na Administradora → Cota Ativa em Pagamento → Acompanhamento de Assembleia / Lance → Contemplação e Liberação do Bem.
4. **Métricas de Performance:** Volume total de crédito comercializado, ticket médio por categoria, taxa de conversão do simulador e comissões provisionadas.
