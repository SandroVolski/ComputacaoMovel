import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();

  buscar(event: any) {
    const termoBusca = event.target.value.trim().toLowerCase();
    this.searchChange.emit(termoBusca);
  }
}
