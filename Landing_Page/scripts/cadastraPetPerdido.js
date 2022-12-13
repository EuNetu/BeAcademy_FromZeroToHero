"use strict";
import PetPerdido from '../model/PetPerdido.js'

function cadastrarDesaparecido() {
  const nomeDono = document.querySelector("#nomeDono");
  const telefone = document.querySelector("#telefone");
  const nomePet = document.querySelector("#nomePet");
  const ultimaVista = document.querySelector("#ultimaVista");
  const observacao = document.querySelector("#observacao");
  const novoDesaparecido = new PetPerdido(nomePet, telefone, nomePet, ultimaVista, observacao);
  console.log(novoDesaparecido)
}
