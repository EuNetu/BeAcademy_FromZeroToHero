"use strict";
import { PetPerdido} from "../model/PetPerdido.js";
const teste = require('../model/PetPerdido');

const form = document.getElementById("some-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nomeDono = document.querySelector("#nomeDono").value;
  const telefone = document.querySelector("#telefone").value;
  const nomePet = document.querySelector("#nomePet").value;
  const ultimaVista = document.querySelector("#ultimaVista").value;
  const observacao = document.querySelector("#observacao").value;
  const novoDesaparecido = new PetPerdido(
    nomeDono,
    telefone,
    nomePet,
    ultimaVista,
    observacao
  );
  console.log(arrayPetsPeredidos);
});
