"use strict";
import arrayCachorrosPeredidos from "../json/db_pets_perdidos.json" assert { type: "json" };

const divCard = document.querySelector(".cards");

for (let i = 0; i < arrayCachorrosPeredidos.length; i++) {
  const articleNovo = document.createElement("article");
  articleNovo.classList.add("card");
  const paragrafoNovo = document.createElement("p");
  articleNovo.appendChild(paragrafoNovo);
  paragrafoNovo.innerHTML = `Nome do dono: ${arrayCachorrosPeredidos[i].nomeDono} <br> Nome do Pet: ${arrayCachorrosPeredidos[i].nomePet}`;

  divCard.appendChild(articleNovo);
}
