import { Injectable } from '@angular/core';
import Musica from '../entities/Musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  public lista_musicas : Musica[] = [];

  constructor() {
  }

  cadastrar(Musica : Musica){
    this.lista_musicas.push(Musica);
  }

  obterTodos() : Musica[]{
    return this.lista_musicas;
  }

  obterPorIndice(indice : number) : Musica{
    return this.lista_musicas[indice];
  }

  editar(indice: number, Musica: Musica){
    this.lista_musicas[indice] = Musica;
  }

  excluir(indice: number){
    this.lista_musicas.splice(indice, 1);
  }


}