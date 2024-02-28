import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicComponent } from './music/music.component';
import { IonicModule } from '@ionic/angular';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { LoadingMusicComponent } from './loading-music/loading-music.component';
import { EmptyScreenComponent } from './empty-screen/empty-screen.component';



@NgModule({
  declarations: [MusicComponent, SearchBarComponent, LoadingMusicComponent, EmptyScreenComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [MusicComponent, SearchBarComponent,LoadingMusicComponent, EmptyScreenComponent]
})
export class ComponentsModule { }
