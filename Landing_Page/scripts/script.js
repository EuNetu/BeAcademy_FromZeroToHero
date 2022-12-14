"use strict";
import { PetPerdido } from "../model/PetPerdido.js";

let arrayPetsPerdidos = [];

//Efeito da responsividade da NavBar
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

const arrayTitulos = ["Family", "Friendly", "Finder"];
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
    if (arrayTitulos[arrayTitulosIndex] != "Finder") {
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

//MOSTRAGEM DOS PETS PERDIDOS
const divCard = document.querySelector(".cards");

function listarPetsPerdidos() {
  for (let i = 0; i < arrayPetsPerdidos.length; i++) {
    const articleNovo = document.createElement("article");
    const paragrafoNovo = document.createElement("p");
    const botaoExcluir = document.createElement("button");
    const imgPet = document.createElement("img");
    const imgPetError = document.createElement("p");

    imgPet.src = arrayPetsPerdidos[i].srcImagemPet;
    imgPet.style.width = "60px";
    imgPet.style.height = "60px";
    imgPet.classList.add("imgPetPerdido");
    imgPetError.innerHTML = "Arquivo de Imagem Não Suportado";
    botaoExcluir.style.color = "orange";
    botaoExcluir.innerHTML = "APAGAR";
    articleNovo.id = `${arrayPetsPerdidos[i].id}`;
    articleNovo.classList.add("card");
    botaoExcluir.onclick = function () {
      removeItem(this);
    };
    console.log(imgPet.src);
    arrayPetsPerdidos[i].srcImagemPet == "Arquivo de Imagem Não Suportado"
      ? articleNovo.appendChild(imgPetError)
      : articleNovo.appendChild(imgPet);
    articleNovo.appendChild(paragrafoNovo);
    articleNovo.appendChild(botaoExcluir);
    paragrafoNovo.innerHTML = `Nome do dono: ${arrayPetsPerdidos[i].nomeDono} <br> Nome do Pet: ${arrayPetsPerdidos[i].nomePet} <br> Tipo - Raça: ${arrayPetsPerdidos[i].raca} <br> Ultima vez visto: ${arrayPetsPerdidos[i].ultimaVista} <br> Observação: ${arrayPetsPerdidos[i].observacao}<br> Cidade: ${arrayPetsPerdidos[i].cidade} <br> Bairro: ${arrayPetsPerdidos[i].bairro} <br> Rua: ${arrayPetsPerdidos[i].rua}${arrayPetsPerdidos[i].numeroCasa}`;

    divCard.appendChild(articleNovo);
  }
}

//CADASTRAMENTO DE PETS PERDIDOS
const form = document.querySelector(".pet-form");
let srcImagemPet;
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomeDono = document.querySelector("#nomeDono").value;
  const telefone = document.querySelector("#telefone").value;
  const nomePet = document.querySelector("#nomePet").value;
  const raca = document.querySelector("#raca").value;
  const ultimaVista = document.querySelector("#ultimaVista").value;
  const observacao = document.querySelector("#observacao").value;
  const cidade = document.querySelector("#cidade").value;
  const bairro = document.querySelector("#bairro").value;
  const rua = document.querySelector("#rua").value;
  const numeroCasa = document.querySelector("#numeroCasa").value;
  const novoDesaparecido = new PetPerdido(
    arrayPetsPerdidos.length,
    nomeDono,
    telefone,
    nomePet,
    raca,
    srcImagemPet,
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

//FUNÇÃO PARA EXCLUIR UM PET PERDIDO
const divAux = document.createElement("div");
const imgCachorroFeliz = document.createElement("img");
imgCachorroFeliz.src = "./assets/img/nenhum_pet_perdido.svg";
function removeItem(r) {
  const card = r.parentNode;
  arrayPetsPerdidos.splice(arrayPetsPerdidos.indexOf(card.id), 1);
  divCard.innerHTML = "";
  listarPetsPerdidos();
  if (arrayPetsPerdidos.length == 0) {
    divCard.appendChild(divAux);
    divCard.appendChild(imgCachorroFeliz);
  }
}

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
        if (data.city) {
          cidade.value = `${data.city}`;
          bairro.value = `${data.neighborhood}`;
          rua.value = `${data.street}`;
        }
      });
    });
  } catch (e) {
    console.error(e);
  }
}

//Pegar a imagem do PET

document.getElementById("imagemPet").onchange = function (evt) {
  let files = evt.target.files;
  console.log(files[0].type);
  if (files[0].type == "image/png" || files[0].type == "image/jpeg") {
    var fr = new FileReader();
    fr.onload = function () {
      console.log("pa");
      srcImagemPet = fr.result;
    };
    fr.readAsDataURL(files[0]);
  } else {
    console.log("paelse");
    srcImagemPet = "Arquivo de Imagem Não Suportado";
  }
};
