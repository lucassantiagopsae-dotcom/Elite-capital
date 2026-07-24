document.documentElement.classList.add("motion-ready");

const form = document.querySelector("#lead-form");
const cnpjRadios = document.querySelectorAll('input[name="cnpj-ativo"]');
const pointRadios = document.querySelectorAll('input[name="ponto-fisico"]');
const statusLabels = document.querySelectorAll("[data-status-label]");
const qualifiedResult = document.querySelector('[data-result="qualified"]');
const notProfileResult = document.querySelector('[data-result="not-profile"]');
const revealElements = document.querySelectorAll(".reveal");

const steps = Array.from(document.querySelectorAll("[data-step]"));
const progressFill = document.querySelector("[data-progress-fill]");
const stepCurrentLabel = document.querySelector("[data-step-current]");
const stepTotalLabel = document.querySelector("[data-step-total]");
const backButton = document.querySelector("[data-back]");
const nextButton = document.querySelector("[data-next]");
const submitButton = document.querySelector("[data-submit]");
const formNav = document.querySelector("[data-form-nav]");
const stepsWrapper = document.querySelector("[data-steps]");

let stepIndex = 0;

function setupRevealAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

/* ============================================================
   SCROLL SUAVIZADO
   A roda do mouse move um alvo; a posicao real persegue esse alvo quadro
   a quadro. Isso tira o "degrau" de cada clique da roda e faz as animacoes
   ligadas ao scroll acompanharem de forma continua.
   Fica fora do caminho no toque (a inercia nativa e melhor) e com
   movimento reduzido ligado.
   ============================================================ */
function setupSmoothScroll() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !hasFinePointer) {
    return;
  }

  // Com o motor ligado, o scroll-behavior nativo brigaria com o scrollTo
  // de cada quadro. As ancoras passam a ser animadas por este mesmo lerp.
  document.documentElement.classList.add("has-smooth-scroll");

  let target = window.scrollY;
  let position = target;
  let running = false;

  function maxScroll() {
    return Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  }

  function tick() {
    position += (target - position) * 0.14;

    if (Math.abs(target - position) < 0.4) {
      position = target;
      running = false;
    }

    window.scrollTo(0, position);

    if (running) {
      requestAnimationFrame(tick);
    }
  }

  function kick() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  function scrollTowards(value) {
    target = Math.max(0, Math.min(maxScroll(), value));
    kick();
  }

  window.addEventListener("wheel", (event) => {
    // Ctrl + roda e zoom do navegador, nao rolagem.
    if (event.ctrlKey) {
      return;
    }

    event.preventDefault();

    // deltaMode 1 = linhas, 2 = paginas. Normaliza tudo para pixels.
    const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    scrollTowards(target + event.deltaY * scale);
  }, { passive: false });

  // Rolagem que nao veio da roda (teclado, barra, foco em campo) vira a
  // nova referencia — senao o proximo giro da roda daria um salto.
  window.addEventListener("scroll", () => {
    if (!running) {
      target = window.scrollY;
      position = target;
    }
  }, { passive: true });

  window.addEventListener("resize", () => {
    target = window.scrollY;
    position = target;
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");

      if (!hash || hash.length < 2) {
        return;
      }

      const destination = document.querySelector(hash);

      if (!destination) {
        return;
      }

      event.preventDefault();
      scrollTowards(destination.getBoundingClientRect().top + window.scrollY);
      window.history.pushState(null, "", hash);
    });
  });
}

/* ============================================================
   CRITERIOS — cards reagem ao ponteiro (e ao scroll no toque)
   Cada card tem uma profundidade diferente, e a do meio e negativa: eles
   se deslocam em ritmos e direcoes distintas, o que reforca a leitura de
   containers soltos em vez de uma lista alinhada.
   ============================================================ */
function setupGateParallax() {
  const stack = document.querySelector(".gate-stack");

  if (!stack || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const items = Array.from(stack.querySelectorAll(".gate-item"));

  if (items.length === 0) {
    return;
  }

  const depths = [1, -0.62, 0.78];
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let running = false;
  let live = false;

  // So assume o controle depois que o usuario interage: assim a animacao
  // de entrada dos cards roda inteira antes.
  function goLive() {
    if (!live) {
      live = true;
      items.forEach((item) => item.classList.add("is-live"));
    }
  }

  function apply() {
    items.forEach((item, index) => {
      const depth = depths[index % depths.length];

      item.style.setProperty("--gx", `${(currentX * 16 * depth).toFixed(2)}px`);
      item.style.setProperty("--gy", `${(currentY * 9 * depth).toFixed(2)}px`);
      item.style.setProperty("--gr", `${(currentX * 1.4 * depth).toFixed(2)}deg`);
    });
  }

  function tick() {
    currentX += (targetX - currentX) * 0.09;
    currentY += (targetY - currentY) * 0.09;

    const settled = Math.abs(targetX - currentX) < 0.001 && Math.abs(targetY - currentY) < 0.001;

    if (settled) {
      currentX = targetX;
      currentY = targetY;
    }

    apply();
    running = !settled;

    if (running) {
      requestAnimationFrame(tick);
    }
  }

  function kick() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (hasFinePointer) {
    stack.addEventListener("pointermove", (event) => {
      const rect = stack.getBoundingClientRect();

      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      goLive();
      kick();
    });

    stack.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      kick();
    });

    return;
  }

  // Toque: sem ponteiro para seguir, quem move os cards e a passagem da
  // secao pela tela — o mesmo deslocamento, so que dirigido pelo scroll.
  window.addEventListener("scroll", () => {
    const rect = stack.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const center = rect.top + rect.height / 2;

    targetX = Math.max(-1, Math.min(1, 1 - (2 * center) / viewportHeight));
    targetY = 0;
    goLive();
    kick();
  }, { passive: true });
}

/* ============================================================
   CABECALHO FLUTUANTE
   Enquanto o hero estiver na tela, quem navega e o header de dentro dele.
   Assim que o hero sai, a capsula fixa desce e assume — e volta a subir
   quando o usuario retorna ao topo.
   ============================================================ */
function setupFloatingHeader() {
  const floatingHeader = document.querySelector("[data-floating-header]");
  const hero = document.querySelector(".hero-section");

  if (!floatingHeader || !hero) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      floatingHeader.classList.toggle("is-visible", !entry.isIntersecting);
    },
    // A margem negativa no topo adia a troca ate o hero quase sumir,
    // evitando a capsula piscar sobre o proprio header do hero.
    { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
  );

  observer.observe(hero);
}

/* ============================================================
   SITUACOES REAIS — cards convergem para o centro conforme o scroll
   O progresso alvo vem da distancia entre o centro do palco e o centro
   da viewport. O valor aplicado persegue esse alvo com interpolacao,
   entao os cards parecem assentar em vez de acompanhar o scroll na trava.
   ============================================================ */
function setupFloatingStage() {
  const stage = document.querySelector("[data-floating]");

  if (!stage) {
    return;
  }

  const cards = Array.from(stage.querySelectorAll(".situation-card"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canFloat = !prefersReducedMotion && window.matchMedia("(min-width: 1024px)").matches;

  if (!canFloat) {
    stage.classList.add("no-float");

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-in"));
      return;
    }

    // Em coluna nao da para convergir: cada card entra ao aparecer, vindo
    // de um lado alternado, mantendo a mesma sensacao de assentar.
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );

    cards.forEach((card) => cardObserver.observe(card));
    return;
  }

  let current = 0;
  let target = 0;
  let running = false;

  function measure() {
    const rect = stage.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const distance = Math.abs(rect.top + rect.height / 2 - viewportHeight / 2);
    const range = viewportHeight * 0.65 + rect.height * 0.28;
    target = Math.max(0, Math.min(1, 1 - distance / range));
  }

  function apply() {
    const remaining = 1 - current;

    cards.forEach((card) => {
      const dx = Number(card.dataset.dx) || 0;
      const dy = Number(card.dataset.dy) || 0;
      const rot = Number(card.dataset.rot) || 0;

      card.style.transform =
        `translate3d(${(dx * remaining).toFixed(1)}px, ${(dy * remaining).toFixed(1)}px, 0)` +
        ` rotate(${(rot * remaining).toFixed(2)}deg)` +
        ` scale(${(0.84 + 0.16 * current).toFixed(3)})`;
      card.style.opacity = (0.05 + current * 0.95).toFixed(3);
    });
  }

  function tick() {
    current += (target - current) * 0.08;
    const settled = Math.abs(target - current) < 0.001;

    if (settled) {
      current = target;
    }

    apply();

    // Para o loop quando assenta: o navegador volta a ficar ocioso.
    running = !settled;

    if (running) {
      requestAnimationFrame(tick);
    }
  }

  function kick() {
    if (!running) {
      running = true;
      requestAnimationFrame(tick);
    }
  }

  window.addEventListener("scroll", () => {
    measure();
    kick();
  }, { passive: true });

  window.addEventListener("resize", () => {
    measure();
    kick();
  });

  measure();
  apply();
  kick();
}

function selectedValue(name) {
  const checked = document.querySelector(`input[name="${name}"]:checked`);
  return checked ? checked.value : "";
}

function profileStatus() {
  const hasCnpj = selectedValue("cnpj-ativo");
  const hasPoint = selectedValue("ponto-fisico");

  if (hasCnpj === "nao" || hasPoint === "nao") {
    return "Fora do perfil inicial";
  }

  if (hasCnpj === "sim" && hasPoint === "sim") {
    return "Segue para análise";
  }

  return "Aguardando respostas";
}

function updateStatus() {
  const status = profileStatus();

  statusLabels.forEach((label) => {
    label.textContent = status;
  });
}

function hideResults() {
  qualifiedResult.hidden = true;
  notProfileResult.hidden = true;
}

/* ============================================================
   CADASTRO EM ETAPAS
   Uma pergunta por tela. A etapa do CNPJ so entra no caminho quando a
   resposta anterior foi "sim", entao o formulario nunca cresce ou encolhe
   no meio do preenchimento — ele apenas troca de pergunta.
   ============================================================ */

// Uma etapa pode declarar data-step-when="campo=valor" e so participa do
// fluxo quando a condicao bate. O total exibido acompanha isso.
function stepApplies(step) {
  const condition = step.dataset.stepWhen;

  if (!condition) {
    return true;
  }

  const [name, expected] = condition.split("=");
  return selectedValue(name) === expected;
}

function activeSteps() {
  return steps.filter(stepApplies);
}

function stepFields(step) {
  return Array.from(step.querySelectorAll("input"));
}

function stepError(step, message) {
  const target = step.querySelector("[data-step-error]");

  if (target) {
    target.textContent = message;
  }
}

// Validacao por etapa: so cobra o que esta na tela naquele momento.
function validateStep(step) {
  const radios = stepFields(step).filter((field) => field.type === "radio");

  if (radios.length > 0) {
    const answered = radios.some((radio) => radio.checked);
    stepError(step, answered ? "" : "Escolha uma opção para continuar.");
    return answered;
  }

  const texts = stepFields(step);
  const empty = texts.find((field) => field.value.trim() === "");

  if (empty) {
    stepError(step, "Preencha para continuar.");
    empty.focus();
    return false;
  }

  stepError(step, "");
  return true;
}

function renderStep({ focus = false } = {}) {
  const visible = activeSteps();
  stepIndex = Math.max(0, Math.min(stepIndex, visible.length - 1));

  const current = visible[stepIndex];
  const isLast = stepIndex === visible.length - 1;

  steps.forEach((step) => step.classList.toggle("is-active", step === current));
  stepsWrapper.style.height = `${current.scrollHeight}px`;

  const progress = ((stepIndex + 1) / visible.length) * 100;
  progressFill.style.width = `${progress}%`;
  stepCurrentLabel.textContent = String(stepIndex + 1);
  stepTotalLabel.textContent = String(visible.length);

  backButton.hidden = stepIndex === 0;
  nextButton.hidden = isLast;
  submitButton.hidden = !isLast;

  if (focus) {
    const firstText = stepFields(current).find((field) => field.type !== "radio");

    if (firstText) {
      firstText.focus();
    }
  }
}

function goNext() {
  const visible = activeSteps();
  const current = visible[stepIndex];

  if (!validateStep(current)) {
    return;
  }

  if (stepIndex < visible.length - 1) {
    stepIndex += 1;
    renderStep({ focus: true });
  }
}

function goBack() {
  if (stepIndex > 0) {
    stepIndex -= 1;
    renderStep();
  }
}

nextButton.addEventListener("click", goNext);
backButton.addEventListener("click", goBack);

// Enter avanca em vez de enviar: so a ultima etapa dispara o submit.
form.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" || event.target.tagName !== "INPUT") {
    return;
  }

  const visible = activeSteps();

  if (stepIndex < visible.length - 1) {
    event.preventDefault();
    goNext();
  }
});

// Etapas de escolha unica avancam sozinhas, como num fluxo de quiz.
steps.forEach((step) => {
  step.addEventListener("change", (event) => {
    hideResults();
    updateStatus();
    stepError(step, "");

    if (!step.hasAttribute("data-autoadvance") || event.target.type !== "radio") {
      return;
    }

    const visible = activeSteps();

    if (stepIndex < visible.length - 1) {
      window.setTimeout(() => {
        stepIndex += 1;
        renderStep({ focus: true });
      }, 260);
    } else {
      renderStep();
    }
  });
});

cnpjRadios.forEach((radio) => {
  radio.addEventListener("change", updateStatus);
});

pointRadios.forEach((radio) => {
  radio.addEventListener("change", updateStatus);
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const visible = activeSteps();

  if (!validateStep(visible[stepIndex])) {
    return;
  }

  const isNotProfile = selectedValue("cnpj-ativo") === "nao" || selectedValue("ponto-fisico") === "nao";

  qualifiedResult.hidden = isNotProfile;
  notProfileResult.hidden = !isNotProfile;

  formNav.hidden = true;
  progressFill.style.width = "100%";
});

// A altura da etapa depende de quanto o texto quebra, entao recalcula
// quando a largura muda ou quando as fontes terminam de carregar.
window.addEventListener("resize", () => renderStep());
window.addEventListener("load", () => renderStep());

updateStatus();
renderStep();
setupRevealAnimations();
setupFloatingStage();
setupFloatingHeader();
setupGateParallax();
setupSmoothScroll();
