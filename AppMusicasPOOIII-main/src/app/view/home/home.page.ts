import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Musica from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/service/firebase.service';
import { MusicaService } from 'src/app/model/service/musica.service'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public lista_musicas : Musica[] = [];

  constructor(private firesabe : FirebaseService,
    private router : Router) {

      this.firesabe.read()
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
}