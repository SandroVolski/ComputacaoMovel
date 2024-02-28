import { Injectable } from '@angular/core';
import Musica from '../entities/Musica';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  public lista_musicas : Musica[] = [];
  private audio: HTMLAudioElement = new Audio();

  constructor(private firebaseService: FirebaseService) {
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

  playAudio(musica: Musica) {
    this.firebaseService.getAudioURL(musica.downloadMusica).subscribe(url => {
      this.audio.src = url;
      this.audio.play();
    });
  }

  pauseAudio() {
    this.audio.pause();
  }

}