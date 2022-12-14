"use strict";
import { PetPerdido } from "../model/PetPerdido.js";

let arrayPetsPerdidos = [];

//NAVBAR
class MobileNavbar {
  constructor(mobileMenu, navList, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.navList = document.querySelector(navList);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.navList.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".nav-list",
  ".nav-list li"
);
mobileNavbar.init();

//EFEITO DE DIGITAÇÃO
const typedTextSpan = document.querySelector(".texto-escrito");
const cursorSpan = document.querySelector(".cursor");

const arrayTitulos = ["Family", "Friendly", "FIND"];
let arrayTitulosIndex = 0;
let indexCaracter = 0;

function escrever() {
  if (indexCaracter < arrayTitulos[arrayTitulosIndex].length) {
    if (!cursorSpan.classList.contains("escrevendo"))
      cursorSpan.classList.add("escrevendo");
    typedTextSpan.textContent +=
      arrayTitulos[arrayTitulosIndex].charAt(indexCaracter);
    indexCaracter++;
    setTimeout(escrever, 150);
  } else {
    cursorSpan.classList.remove("escrevendo");
    if (arrayTitulos[arrayTitulosIndex] != "FIND") {
      setTimeout(erase, 150);
    }
  }
}

function erase() {
  if (indexCaracter > 0) {
    if (!cursorSpan.classList.contains("escrevendo"))
      cursorSpan.classList.add("escrevendo");
    typedTextSpan.textContent = arrayTitulos[arrayTitulosIndex].substring(
      0,
      indexCaracter - 1
    );
    indexCaracter--;
    setTimeout(erase, 200);
  } else {
    cursorSpan.classList.remove("escrevendo");
    arrayTitulosIndex++;
    if (arrayTitulosIndex >= arrayTitulos.length) arrayTitulosIndex = 0;
    setTimeout(escrever, 150);
  }
}

escrever();

//MOPSTRAGEM DOS PETS PERDIDOS
const divCard = document.querySelector(".cards");

function listarPetsPerdidos() {
  for (let i = 0; i < arrayPetsPerdidos.length; i++) {
    const articleNovo = document.createElement("article");
    const paragrafoNovo = document.createElement("p");
    const botaoExcluir = document.createElement("button");

    articleNovo.id = `${arrayPetsPerdidos[i].id}`;
    articleNovo.classList.add("card");
    botaoExcluir.onclick = function () {
      removeItem(this);
    };

    articleNovo.appendChild(paragrafoNovo);
    articleNovo.appendChild(botaoExcluir);
    paragrafoNovo.innerHTML = `Nome do dono: ${arrayPetsPerdidos[i].nomeDono} <br> Nome do Pet: ${arrayPetsPerdidos[i].nomePet} <br> Raça do Pet: ${arrayPetsPerdidos[i].raca} <br> Ultima vez visto: ${arrayPetsPerdidos[i].ultimaVista} <br> Observação: ${arrayPetsPerdidos[i].observacao}`;

    divCard.appendChild(articleNovo);
  }
}

//FUNÇÃO PARA EXCLUIR UM PET PERDIDO
const imgCachorroFeliz = document.createElement("img");
imgCachorroFeliz.src = "./assets/img/nenhum_pet_perdido.svg";
function removeItem(r) {
  const card = r.parentNode;
  arrayPetsPerdidos.splice(arrayPetsPerdidos.indexOf(card.id), 1);
  divCard.innerHTML = "";
  listarPetsPerdidos();
  arrayPetsPerdidos.length == 0 ? divCard.appendChild(imgCachorroFeliz) : null;
}

//CADASTRAMENTO DE PETS PERDIDOS
const form = document.querySelector(".pet-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomeDono = document.querySelector("#nomeDono").value;
  const telefone = document.querySelector("#telefone").value;
  const nomePet = document.querySelector("#nomePet").value;
  const raca = document.querySelector("#raca").value;
  const ultimaVista = document.querySelector("#ultimaVista").value;
  const observacao = document.querySelector("#observacao").value;
  const cidade = document.querySelector("#cidade");
  const bairro = document.querySelector("#bairro");
  const rua = document.querySelector("#rua");
  const numeroCasa = document.querySelector("#numeroCasa");
  const novoDesaparecido = new PetPerdido(
    arrayPetsPerdidos.length,
    nomeDono,
    telefone,
    nomePet,
    raca,
    ultimaVista,
    observacao,
    bairro,
    cidade,
    rua,
    numeroCasa
  );
  divCard.innerHTML = "";
  arrayPetsPerdidos.push(novoDesaparecido);
  listarPetsPerdidos();
});

// ADICIONANDO EVENTO PARA O CAMPO CEP
const divFormOpcional = document.querySelector(".form-opcional");
const checkForm = document.querySelector("#form-opcional");
const cep = document.querySelector("#cep");
checkForm.addEventListener("click", () => {
  if (checkForm.checked) {
    divFormOpcional.style.display = "block";
  } else {
    divFormOpcional.style.display = "none";

    cep.value = "";
    bairro.value = "";
    cidade.value = "";
    rua.value = "";
    numeroCasa.value = "";
  }
});
cep.addEventListener("blur", () => {
  getCep();
});

function getCep() {
  const valorCep = cep.value.replace("-", "");
  try {
    const promise = fetch(`https://api.pagar.me/1/zipcodes/${valorCep}`, {
      method: "get",
    });

    promise.then((response) => {
      const jsonPromise = response.json();
      jsonPromise.then((data) => {
        cidade.value = `${data.city}`;
        bairro.value = `${data.neighborhood}`;
        rua.value = `${data.street}`;
      });
    });
  } catch (e) {
    console.error(e);
  }
}
