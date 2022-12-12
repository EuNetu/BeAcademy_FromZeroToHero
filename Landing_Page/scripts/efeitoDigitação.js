"use strict";

const typedTextSpan = document.querySelector(".texto-escrito");
const cursorSpan = document.querySelector(".cursor");

const arrayTitulos = ["Family", "Friendly", "FIND"];
let arrayTitulosIndex = 0;
let indexCaracter = 0;

function escrever() {
  if (indexCaracter < arrayTitulos[arrayTitulosIndex].length) {
    if(!cursorSpan.classList.contains("escrevendo")) cursorSpan.classList.add("escrevendo");
    typedTextSpan.textContent += arrayTitulos[arrayTitulosIndex].charAt(indexCaracter);
    indexCaracter++;
    setTimeout(escrever, 200);
  }
  else {
    cursorSpan.classList.remove("escrevendo");
    if(arrayTitulos[arrayTitulosIndex] != "FIND"){
      setTimeout(erase, 200);
    }
  }
}

function erase() {
  if (indexCaracter > 0) {
    if(!cursorSpan.classList.contains("escrevendo")) cursorSpan.classList.add("escrevendo");
    typedTextSpan.textContent = arrayTitulos[arrayTitulosIndex].substring(0, indexCaracter-1);
    indexCaracter--;
    setTimeout(erase, 200);
  } 
  else {
    cursorSpan.classList.remove("escrevendo");
    arrayTitulosIndex++;
    if(arrayTitulosIndex>=arrayTitulos.length) arrayTitulosIndex=0;
    setTimeout(escrever, 200);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  setTimeout(escrever, 200);
});