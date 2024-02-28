import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class HomePage implements OnInit{
  
  public lista_musicas : Musica[] = [];
  @ViewChild('audioPlayer') audioPlayer: ElementRef;
  public isPlaying = false;
  public currentMusica: Musica;
  public user: any;
  isLoading: boolean = false;
  
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

    ngOnInit(){
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 3000)
    }


  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(musica: Musica) {
    this.router.navigateByUrl("/atualizar", { state: { musica: musica } });
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

  filtrarMusicas(query: string) {
    if (query) {
      this.lista_musicas = this.lista_musicas.filter(musica =>
        musica.nome.toLowerCase().includes(query) || musica.banda.toLowerCase().includes(query)
      );
    } else {
      // Se o campo de busca estiver vazio, exibir todas as músicas novamente
      this.firesabe.read(this.user.uid)
        .subscribe(res => {
          this.lista_musicas = res.map(musica => ({
            id: musica.payload.doc.id,
            ...musica.payload.doc.data() as any
          } as Musica));
        });
    }
  }
}