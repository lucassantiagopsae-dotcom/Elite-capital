const form = document.querySelector("#lead-form");
const cnpjRadios = document.querySelectorAll('input[name="cnpj-ativo"]');
const pointRadios = document.querySelectorAll('input[name="ponto-fisico"]');
const cnpjField = document.querySelector(".cnpj-field");
const cnpjInput = document.querySelector('input[name="cnpj"]');
const statusLabels = document.querySelectorAll("[data-status-label]");
const qualifiedResult = document.querySelector('[data-result="qualified"]');
const notProfileResult = document.querySelector('[data-result="not-profile"]');

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
    return "Segue para analise";
  }

  return "Aguardando respostas";
}

function updateStatus() {
  const hasCnpj = selectedValue("cnpj-ativo");
  const status = profileStatus();

  statusLabels.forEach((label) => {
    label.textContent = status;
  });

  const shouldShowCnpj = hasCnpj === "sim";
  cnpjField.hidden = !shouldShowCnpj;
  cnpjInput.required = shouldShowCnpj;

  if (!shouldShowCnpj) {
    cnpjInput.value = "";
  }
}

function hideResults() {
  qualifiedResult.hidden = true;
  notProfileResult.hidden = true;
}

cnpjRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    hideResults();
    updateStatus();
  });
});

pointRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    hideResults();
    updateStatus();
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isNotProfile = selectedValue("cnpj-ativo") === "nao" || selectedValue("ponto-fisico") === "nao";

  qualifiedResult.hidden = isNotProfile;
  notProfileResult.hidden = !isNotProfile;
});

updateStatus();
