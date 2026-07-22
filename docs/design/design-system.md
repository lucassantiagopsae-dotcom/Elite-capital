# Elite Capital - Design System

Este documento e a fonte oficial de direcao visual para o site, landing pages, formularios, criativos, dashboards e qualquer interface do projeto Elite Capital.

Antes de criar ou alterar qualquer experiencia visual, consulte este arquivo.

## Principio da marca

A Elite Capital deve parecer confiavel, direta e financeira, mas sem ficar fria ou bancaria demais.

O visual deve comunicar:

1. Credito empresarial com responsabilidade.
2. Agilidade sem promessa irresponsavel.
3. Proximidade com pequenos negocios reais.
4. Operacao seria, mensuravel e preparada para dados.

## Paleta oficial

| Cor | Hex | Token | Uso |
| --- | --- | --- | --- |
| Azul marinho escuro | `#031D45` | `--color-navy` | Fundo principal, hero, secoes escuras, base da marca |
| Ciano vibrante | `#05C7F5` | `--color-cyan` | CTA principal, links importantes, foco, destaques e acentos |
| Branco | `#FFFFFF` | `--color-white` | Texto sobre fundo escuro, superficies limpas e contraste |
| Azul claro gelo | `#EAF7FE` | `--color-ice` | Backgrounds claros, secoes leves, faixas de respiro |
| Preto profundo | `#000815` | `--color-deep` | Fundos escuros mais intensos, overlays, rodape e contraste maximo |
| Cinza placeholder | `#D9D9D9` | `--color-placeholder` | Placeholders, imagens temporarias, esqueletos e estados neutros |

### Cores-chave

1. `#031D45` deve ser a base dominante.
2. `#05C7F5` deve ser o acento principal e cor de acao.
3. `#FFFFFF` deve sustentar leitura e contraste.

## Tokens recomendados

```css
:root {
  --color-navy: #031D45;
  --color-cyan: #05C7F5;
  --color-white: #FFFFFF;
  --color-ice: #EAF7FE;
  --color-deep: #000815;
  --color-placeholder: #D9D9D9;

  --color-background: var(--color-white);
  --color-background-dark: var(--color-navy);
  --color-background-soft: var(--color-ice);
  --color-text: #07172E;
  --color-text-muted: #5F6B7A;
  --color-text-inverse: var(--color-white);
  --color-border: rgba(3, 29, 69, 0.14);
  --color-action: var(--color-cyan);
  --color-action-hover: #04B4DD;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 999px;

  --shadow-soft: 0 18px 45px rgba(0, 8, 21, 0.14);
}
```

## Logos oficiais

Os logos oficiais ficam em:

```text
assets/brand/logos/elite-capital-logo-color.png
assets/brand/logos/elite-capital-logo-white.png
```

### Logo normal

Use `elite-capital-logo-color.png` em:

1. Fundos brancos.
2. Fundos azul gelo `#EAF7FE`.
3. Areas claras do site.
4. Documentos e materiais onde o fundo seja claro.

### Logo branco

Use `elite-capital-logo-white.png` em:

1. Hero escuro.
2. Fundos `#031D45`.
3. Fundos `#000815`.
4. Overlays escuros.
5. Rodape escuro.

### Regras de uso do logo

1. Nao distorcer.
2. Nao trocar as cores manualmente.
3. Nao aplicar sombra pesada.
4. Nao colocar o logo normal sobre fundo escuro.
5. Nao colocar o logo branco sobre fundo claro.
6. Preservar respiro visual ao redor do logo.
7. Em interfaces web, preferir largura entre `140px` e `220px` no topo da pagina.

## Tipografia

Preferencia para interfaces digitais:

1. `Inter`
2. `Sora`
3. `Montserrat`
4. `Arial`, apenas como fallback seguro

### Direcao

Use tipografia limpa, forte e facil de ler. A comunicacao precisa falar com dono de pequeno negocio, nao com publico tecnico.

### Escala sugerida

| Papel | Desktop | Mobile | Peso | Uso |
| --- | --- | --- | --- | --- |
| Display | 56px-68px | 36px-44px | 700 | Hero principal |
| H1 | 44px-56px | 34px-40px | 700 | Titulos principais |
| H2 | 32px-40px | 28px-34px | 700 | Secoes |
| H3 | 22px-28px | 20px-24px | 600 | Cards e blocos |
| Body | 16px-18px | 16px | 400 | Texto de leitura |
| Small | 13px-14px | 13px | 500 | Labels, avisos e metadados |

## Interface e componentes

### Botoes

CTA principal:

1. Fundo `#05C7F5`.
2. Texto `#000815` ou `#031D45`.
3. Peso `700`.
4. Raio `999px`.
5. Hover `#04B4DD`.

CTA secundario em fundo escuro:

1. Fundo transparente.
2. Texto `#FFFFFF`.
3. Borda `rgba(255, 255, 255, 0.32)`.
4. Hover com fundo `rgba(255, 255, 255, 0.08)`.

CTA secundario em fundo claro:

1. Fundo `#FFFFFF`.
2. Texto `#031D45`.
3. Borda `rgba(3, 29, 69, 0.14)`.

### Cards

Cards devem ser objetivos e escaneaveis.

1. Raio preferencial: `12px`.
2. Borda leve: `rgba(3, 29, 69, 0.12)`.
3. Em fundo claro, usar branco ou gelo.
4. Em fundo escuro, usar `rgba(255, 255, 255, 0.06)`.
5. Evitar cards decorativos demais.

### Formularios

Formulario e parte central da conversao.

1. Labels claros e diretos.
2. Campos com altura confortavel, entre `48px` e `56px`.
3. Borda visivel em `rgba(3, 29, 69, 0.18)`.
4. Foco com ciano `#05C7F5`.
5. Mensagens de erro objetivas.
6. Nada de formulario com cara generica ou escondido demais.

### Secoes escuras

Use o azul marinho como base nobre do projeto.

Boas combinacoes:

1. Fundo `#031D45` com texto branco.
2. Fundo `#000815` com detalhes em ciano.
3. Gradiente sutil entre `#000815` e `#031D45`.

Evite gradientes excessivos ou decoracao sem funcao.

## Layout da landing

A landing deve priorizar conversao para microcredito empresarial.

Ordem recomendada:

1. Hero com logo branco, promessa direta e CTA para analise.
2. Bloco de qualificacao: para quem e.
3. Situacoes reais do dia a dia do negocio.
4. Como funciona.
5. Prova social ou sinais de confianca.
6. Formulario.
7. Rodape com informacoes essenciais.

## Linguagem visual

Use:

1. Fundos escuros para autoridade.
2. Ciano para acao e energia.
3. Branco para clareza.
4. Gelo para respiro entre secoes.
5. Fotos reais do cliente, negocio ou atendimento quando existirem.

Evite:

1. Aparencia de banco tradicional demais.
2. Promessa visual de dinheiro facil.
3. Imagens genericas de IA quando parecerem falsas.
4. Paleta bege, roxa ou azul generica fora da marca.
5. Cards grandes demais sem informacao util.

## Regras para criacao com IA

Quando uma IA criar tela, site, componente, copy visual ou criativo para este projeto:

1. Ler este design system antes de criar.
2. Usar `#031D45`, `#05C7F5` e `#FFFFFF` como base.
3. Usar o logo correto conforme o fundo.
4. Consultar `docs/content/landing-page-copy.md` para mensagens da landing.
5. Consultar `docs/project/project-plan.md` para entender ICP, oferta, filtros e estrategia.
6. Consultar `cloud.md` para qualquer tracking, CRM, API, webhook ou automacao.
7. Nao inventar nova paleta sem atualizar este arquivo.

## Checklist de aprovacao visual

Antes de finalizar qualquer pagina ou interface:

1. A paleta oficial foi respeitada.
2. O logo correto foi usado.
3. O CTA principal esta em ciano.
4. A leitura funciona em desktop e mobile.
5. O formulario parece confiavel e simples.
6. A pagina filtra para CNPJ, ponto fisico e venda recorrente.
7. O visual transmite credito responsavel, nao promessa facil.
8. O arquivo ou componente novo esta em uma pasta coerente.
