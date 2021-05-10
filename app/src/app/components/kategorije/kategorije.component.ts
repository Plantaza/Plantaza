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

  public napolniKategorije(): void {
    for (var i = 1; i <= 21; i++) {

      console.log("../../assets/images/kategorije/roze" + i + ".svg")
      this.kategorije.push(
        {
          slika: "../../assets/images/kategorije/roze" + i + ".svg",
          ime: "Kategorija" + i
        }
      )
    }
  }
}
