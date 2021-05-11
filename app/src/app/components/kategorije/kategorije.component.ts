import { Component, OnInit } from '@angular/core';
import { Kategorija } from '../../classes/kategorija';

@Component({
  selector: 'app-kategorije',
  templateUrl: './kategorije.component.html',
  styleUrls: ['./kategorije.component.css']
})
export class KategorijeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.napolniKategorije()
  }

  kategorije: Kategorija[] = []

  strKategorije = ["Aloje", "Alpske rastline", "Drevesa", "Dvoletnice", "Enoletnice", "Grmičevje", "Kaktusi", "Orhideje", "Plezalke", "Praproti", "Sobne rastline", "Sukulenti", "Trajnice", "Trave", "Vodne rastline", "Vresje", "Čebulnice"]
  public napolniKategorije(): void {
    for (var i = 0; i < this.strKategorije.length; i++) {


      this.kategorije.push(
        {
          slika: "../../assets/images/kategorije/" + this.strKategorije[i] + ".svg",
          ime: this.strKategorije[i]
        }
      )
    }
  }
}
