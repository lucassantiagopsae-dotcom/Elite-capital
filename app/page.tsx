"use client";

import {
  ArrowDownRight,
  ArrowRight,
  BadgeCheck,
  Building2,
  Check,
  ClipboardCheck,
  ExternalLink,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

type ResultState = "idle" | "qualified" | "not-profile";

const situations = [
  "Pagar fornecedor e manter a loja girando",
  "Resolver um imprevisto no caixa",
  "Consertar equipamento importante",
  "Aproveitar uma oportunidade de compra",
  "Reforcar o capital de giro",
];

const revenueRanges = [
  "Ate R$ 5 mil",
  "De R$ 5 mil a R$ 10 mil",
  "De R$ 10 mil a R$ 20 mil",
  "De R$ 20 mil a R$ 50 mil",
  "Acima de R$ 50 mil",
];

export default function Home() {
  const [hasCnpj, setHasCnpj] = useState("");
  const [hasPhysicalPoint, setHasPhysicalPoint] = useState("");
  const [result, setResult] = useState<ResultState>("idle");

  const routeLabel = useMemo(() => {
    if (hasCnpj === "nao") return "Fora do perfil inicial";
    if (hasPhysicalPoint === "nao") return "Fora do perfil inicial";
    if (hasCnpj === "sim" && hasPhysicalPoint === "sim") {
      return "Segue para analise";
    }
    return "Aguardando respostas";
  }, [hasCnpj, hasPhysicalPoint]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isNotProfile = hasCnpj === "nao" || hasPhysicalPoint === "nao";
    setResult(isNotProfile ? "not-profile" : "qualified");
  }

  return (
    <main>
      <section className="hero-section" id="topo">
        <div className="noise" aria-hidden="true" />
        <header className="site-header">
          <a className="brand-mark" href="#topo" aria-label="Elite Capital">
            <Image
              src="/brand/elite-capital-logo-white.png"
              alt="Elite Capital Solucoes Financeiras"
              width={1000}
              height={715}
              priority
            />
          </a>
          <nav className="header-nav" aria-label="Navegacao principal">
            <a href="#perfil">Perfil</a>
            <a href="#como-funciona">Como funciona</a>
            <a href="#cadastro">Cadastro</a>
          </nav>
          <a className="header-cta" href="#cadastro">
            Analise
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </header>

        <div className="hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles aria-hidden="true" size={16} />
              Microcredito empresarial em Sao Paulo
            </span>
            <h1>Credito para empresas que vendem todos os dias</h1>
            <p className="hero-subtitle">
              Microcredito empresarial com pagamento diario para comercios e
              servicos que precisam resolver uma necessidade rapida sem parar a
              operacao.
            </p>
            <p className="hero-support">
              Atendimento para negocios com CNPJ ativo, ponto fisico aberto ao
              publico e entrada de caixa recorrente. Cadastro sujeito a analise.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#cadastro">
                Quero uma analise
                <ArrowRight aria-hidden="true" size={18} />
              </a>
              <a className="secondary-button" href="#perfil">
                Ver se faz sentido
                <ArrowDownRight aria-hidden="true" size={18} />
              </a>
            </div>
          </div>

          <div className="hero-instrument" aria-label="Resumo visual da analise">
            <div className="instrument-topline">
              <span>Fluxo de avaliacao</span>
              <strong>{routeLabel}</strong>
            </div>
            <div className="cash-arc" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className="instrument-window">
              <div className="window-row active">
                <Building2 size={18} aria-hidden="true" />
                <span>CNPJ ativo</span>
                <b>obrigatorio</b>
              </div>
              <div className="window-row">
                <MapPin size={18} aria-hidden="true" />
                <span>Ponto fisico</span>
                <b>visitavel</b>
              </div>
              <div className="window-row">
                <WalletCards size={18} aria-hidden="true" />
                <span>Vendas recorrentes</span>
                <b>caixa diario</b>
              </div>
            </div>
            <div className="hero-stamp">
              <span>Cadastro</span>
              <strong>menos de 2 minutos</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="qualification-section" id="perfil">
        <div className="section-kicker">Capital para o seu negocio nao parar</div>
        <div className="qualification-layout">
          <div className="qualification-copy">
            <h2>O credito entra onde a operacao aperta.</h2>
            <p>
              A Elite Capital atende empresas em atividade que precisam de
              credito para manter o caixa girando e a operacao funcionando.
            </p>
          </div>
          <div className="gate-stack" aria-label="Criterios iniciais">
            <div className="gate-item">
              <span>01</span>
              <strong>Comercio ou servico com CNPJ ativo</strong>
            </div>
            <div className="gate-item offset">
              <span>02</span>
              <strong>Negocio com ponto fisico aberto ao publico</strong>
            </div>
            <div className="gate-item">
              <span>03</span>
              <strong>Entrada de caixa diaria ou recorrente</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="situations-section">
        <div className="situation-head">
          <span className="eyebrow dark">
            <BadgeCheck aria-hidden="true" size={16} />
            Situacoes reais
          </span>
          <h2>Credito com parcelas diarias que cabem no seu bolso</h2>
          <p>
            Para resolver imprevistos, manter o seu negocio funcionando e
            aproveitar oportunidades sem desmontar o caixa da semana.
          </p>
        </div>

        <div className="daily-map" aria-label="Situacoes de uso do credito">
          <div className="map-core">
            <span>Dia a dia</span>
            <strong>capital de giro</strong>
          </div>
          {situations.map((situation, index) => (
            <div className={`map-line line-${index + 1}`} key={situation}>
              <span>0{index + 1}</span>
              {situation}
            </div>
          ))}
        </div>
      </section>

      <section className="process-section" id="como-funciona">
        <div className="process-label">
          <ClipboardCheck aria-hidden="true" size={22} />
          Como funciona
        </div>
        <div className="process-copy">
          <h2>Cadastro simples. Analise responsavel.</h2>
          <p>
            O caminho e curto para o cliente, mas filtrado o suficiente para a
            equipe avaliar se a Elite Capital e uma boa opcao neste momento.
          </p>
        </div>
        <div className="process-rail">
          <article>
            <span>1</span>
            <h3>Voce responde algumas perguntas sobre a empresa</h3>
          </article>
          <article>
            <span>2</span>
            <h3>Nossa equipe avalia se o perfil esta dentro dos criterios</h3>
          </article>
          <article>
            <span>3</span>
            <h3>Se fizer sentido, entramos em contato para seguir a analise</h3>
          </article>
        </div>
      </section>

      <section className="trust-section">
        <div className="trust-marquee" aria-hidden="true">
          <span>criterio</span>
          <span>agilidade</span>
          <span>analise</span>
          <span>CNPJ</span>
          <span>caixa diario</span>
        </div>
        <div className="trust-grid">
          <div className="trust-statement">
            <ShieldCheck aria-hidden="true" size={30} />
            <h2>Nao e promessa facil. E uma porta de entrada responsavel.</h2>
          </div>
          <div className="trust-proof">
            <p>
              O cadastro filtra os sinais que importam antes de consumir tempo
              do atendimento: CNPJ, operacao fisica, recorrencia de vendas,
              regiao e faturamento aproximado.
            </p>
            <ul>
              <li>
                <Check aria-hidden="true" size={18} />
                Cadastro sujeito a analise
              </li>
              <li>
                <Check aria-hidden="true" size={18} />
                Foco em negocios ativos
              </li>
              <li>
                <Check aria-hidden="true" size={18} />
                Atendimento pelo WhatsApp informado
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="form-section" id="cadastro">
        <div className="form-shell">
          <div className="form-aside">
            <Image
              src="/brand/elite-capital-logo-color.png"
              alt="Elite Capital Solucoes Financeiras"
              width={1000}
              height={715}
            />
            <span className="section-kicker">Cadastro</span>
            <h2>Responda o cadastro abaixo.</h2>
            <p>
              Leva menos de 2 minutos. Preencha com atencao para nossa equipe
              avaliar corretamente seu cadastro.
            </p>
            <div className="decision-panel">
              <span>Status do perfil</span>
              <strong>{routeLabel}</strong>
              <small>
                CNPJ ativo e ponto fisico sao filtros obrigatorios nesta etapa.
              </small>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Nome
              <input name="nome" placeholder="Digite seu nome" required />
            </label>

            <label>
              WhatsApp
              <input
                name="whatsapp"
                inputMode="tel"
                placeholder="Digite seu WhatsApp com DDD"
                required
              />
            </label>

            <fieldset>
              <legend>Sua empresa possui CNPJ ativo?</legend>
              <label className="radio-line">
                <input
                  type="radio"
                  name="cnpj-ativo"
                  value="sim"
                  checked={hasCnpj === "sim"}
                  onChange={(event) => setHasCnpj(event.target.value)}
                  required
                />
                Sim
              </label>
              <label className="radio-line">
                <input
                  type="radio"
                  name="cnpj-ativo"
                  value="nao"
                  checked={hasCnpj === "nao"}
                  onChange={(event) => setHasCnpj(event.target.value)}
                />
                Nao
              </label>
            </fieldset>

            {hasCnpj === "sim" && (
              <label>
                CNPJ
                <input name="cnpj" placeholder="Digite o CNPJ" required />
              </label>
            )}

            <fieldset>
              <legend>O negocio tem ponto fisico aberto ao publico?</legend>
              <label className="radio-line">
                <input
                  type="radio"
                  name="ponto-fisico"
                  value="sim"
                  checked={hasPhysicalPoint === "sim"}
                  onChange={(event) => setHasPhysicalPoint(event.target.value)}
                  required
                />
                Sim
              </label>
              <label className="radio-line">
                <input
                  type="radio"
                  name="ponto-fisico"
                  value="nao"
                  checked={hasPhysicalPoint === "nao"}
                  onChange={(event) => setHasPhysicalPoint(event.target.value)}
                />
                Nao
              </label>
            </fieldset>

            <label>
              Em que regiao a empresa esta localizada?
              <input
                name="regiao"
                placeholder="Cidade e bairro"
                required
              />
            </label>

            <label>
              Seu negocio tem vendas diarias ou recorrentes?
              <select name="vendas" required defaultValue="">
                <option value="" disabled>
                  Selecione uma opcao
                </option>
                <option>Sim, vendo todos os dias</option>
                <option>Sim, vendo quase todos os dias</option>
                <option>Tenho vendas recorrentes, mas nao diarias</option>
                <option>Nao tenho vendas recorrentes</option>
              </select>
            </label>

            <label>
              Qual o faturamento mensal aproximado?
              <select name="faturamento" required defaultValue="">
                <option value="" disabled>
                  Selecione uma faixa
                </option>
                {revenueRanges.map((range) => (
                  <option key={range}>{range}</option>
                ))}
              </select>
            </label>

            <button className="submit-button" type="submit">
              Enviar cadastro para analise
              <Send aria-hidden="true" size={18} />
            </button>

            {result === "qualified" && (
              <div className="result-box qualified" role="status">
                <h3>Tudo certo! Recebemos suas respostas.</h3>
                <p>
                  Nossa equipe vai analisar seu cadastro e entrar em contato
                  pelo WhatsApp informado.
                </p>
              </div>
            )}

            {result === "not-profile" && (
              <div className="result-box not-profile" role="status">
                <h3>Agradecemos seu interesse!</h3>
                <p>
                  Com base nas suas respostas, esta pode nao ser a melhor opcao
                  para voce neste momento.
                </p>
                <a
                  href="https://www.instagram.com/elitecapitalx/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Acompanhar no Instagram
                  <ExternalLink aria-hidden="true" size={18} />
                </a>
              </div>
            )}
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <Image
          src="/brand/elite-capital-logo-white.png"
          alt="Elite Capital Solucoes Financeiras"
          width={1000}
          height={715}
        />
        <p>
          Microcredito empresarial com analise responsavel para negocios em
          atividade.
        </p>
        <a href="#cadastro">Quero uma analise</a>
      </footer>
    </main>
  );
}
