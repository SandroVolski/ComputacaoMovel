import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  orders: any[] = [];

  isLoading: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isLoading = true;
    setTimeout(()=>{
      this.orders = [
        {
          name: "Ársegos Pizzaria",
          city:"Guarapuava, Paraná",
          price: "79.90",
          data: "Fevereiro, 03 de 2024",
          delivered: true,
          requests:[
            '1x Pizza Grande | Marguerita e Calabresa',
            '1x Coca-Cola 2L'
          ]
        },

        {
          name: "Italiano",
          city:"Irati, Paraná",
          price: "98.49",
          data: "Janeiro, 12 de 2024",
          delivered: false,
          requests:[
            '1x Porção Arroz Grande',
            '1x Porção Farofa Média',
            '1x Porção Fritas Grande',
            '1x Porção Salada Mista',
            '1x Alcatra na Chapa',
            '1x Refrigerante 2L'
          ]
        },

        {
          name: "Camilo",
          city:"Irati, Paraná",
          price: "105.99",
          data: "Janeiro, 04 de 2024",
          delivered: true,
          requests:[
            '1x Porção Arroz Grande',
            '1x Porção Pirão de Tilápia',
            '1x Porção Fritas Grande',
            '1x Porção Anéis de Cebola',
            '1x Porção Salada Mista',
            '1x Alcatra na Chapa',
            '1x Cerveja Original 1L',
            '1x Refrigerante 2L'
          ]
        }
      ],
      this.isLoading = false;
    }, 2000)
  } 
}
