export class PetPerdido {
  constructor(
    id,
    nomeDono,
    telefone,
    nomePet,
    raca,
    srcImagemPet,
    ultimaVista,
    observacao,
    cidade,
    bairro,
    rua,
    numeroCasa
  ) {
    this.id = id;
    this.nomeDono = nomeDono;
    this.telefone = telefone;
    this.nomePet = nomePet;
    this.raca = raca;
    this.srcImagemPet = srcImagemPet;
    this.ultimaVista = ultimaVista;
    this.observacao = observacao;
    if (cidade != "") {
      this.cidade = cidade;
      this.bairro = bairro;
      this.rua = rua;
      this.numeroCasa = ", n°"+numeroCasa;
    } else {
      this.cidade = "Não Informado";
      this.bairro = "Não Informado";
      this.rua = "Não Informado";
      this.numeroCasa = "";
    }
  }
}
