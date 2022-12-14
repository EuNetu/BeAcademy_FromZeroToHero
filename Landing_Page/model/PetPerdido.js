export class PetPerdido{
  constructor(id, nomeDono, telefone, nomePet, raca, ultimaVista, observacao, bairro, rua, numeroCasa) {
    this.id = id;
    this.nomeDono = nomeDono;
    this.telefone = telefone;
    this.nomePet = nomePet;
    this.raca = raca;
    this.ultimaVista = ultimaVista;
    this.observacao = observacao;
    if(bairro != ""){
      this.bairro = bairro;
      this.rua = rua;
      this.numeroCasa = numeroCasa;
    }else{
      this.bairro = 'Não Informado';
      this.rua = 'Não Informado';
      this.numeroCasa = 'Não Informado';
    }
  }
}