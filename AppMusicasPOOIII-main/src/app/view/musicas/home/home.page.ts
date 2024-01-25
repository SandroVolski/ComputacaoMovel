import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Musica from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { MusicaService } from 'src/app/model/service/musica.service'
import { AuthService } from 'src/app/model/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  public lista_musicas : Musica[] = [];
  @ViewChild('audioPlayer') audioPlayer: ElementRef;
  public isPlaying = false;
  public currentMusica: Musica;
  public user: any;
  
  constructor(private firesabe : FirebaseService,
    private router : Router, private musicaService: MusicaService, private authService: AuthService) {

      this.user = this.authService.getUserLogged()
      console.log(this.user);
      this.firesabe.read(this.user.uid)
      .subscribe(res => {
        this.lista_musicas = res.map(musica =>{
          return{
            id: musica.payload.doc.id,
            ... musica.payload.doc.data() as any
          }as Musica;
        })
      })
    }


  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(musica : Musica){
    this.router.navigateByUrl("/atualizar", {state : {musica:musica}});
  }

  reproduzirAudio(musica: Musica) {
    this.musicaService.playAudio(musica);
    this.isPlaying = true;
    this.currentMusica = musica;
  }
 
  togglePlay(musica: Musica) {
    if (this.isPlaying && this.currentMusica === musica) {
      this.isPlaying = false;
      this.musicaService.pauseAudio();
    } else {
      this.reproduzirAudio(musica);
    }
  }
  
  logout(){
    this.authService.signOut()
    .then((res) => {
      this.router.navigate(["signin"]);
    })
  }
}