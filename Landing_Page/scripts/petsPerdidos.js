"use strict";
import { PetPerdido} from "../model/PetPerdido.js";

const divCard = document.querySelector(".cards");

for (let i = 0; i < arrayPetsPeredidos.length; i++) {
  const articleNovo = document.createElement("article");
  articleNovo.classList.add("card");
  const paragrafoNovo = document.createElement("p");
  articleNovo.appendChild(paragrafoNovo);
  paragrafoNovo.innerHTML = `Nome do dono: ${arrayPetsPeredidos[i].nomeDono} <br> Nome do Pet: ${arrayPetsPeredidos[i].nomePet}`;

  divCard.appendChild(articleNovo);
}
