import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Musica from 'src/app/model/entities/Musica';
import { MusicaService } from 'src/app/model/service/musica.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss'],
})
export class MusicComponent{

  @Input() musica: Musica;
  @Input() index: number;
  @Input() isPlaying: boolean;
  @Input() currentMusica: Musica;

  @Output() edit = new EventEmitter<Musica>();
  @Output() play = new EventEmitter<Musica>();
  @Output() toggle = new EventEmitter<Musica>();

  editar() {
    this.edit.emit(this.musica);
  }

  reproduzirAudio() {
    this.play.emit(this.musica);
  }

  togglePlay() {
    this.toggle.emit(this.musica);
  }
}
