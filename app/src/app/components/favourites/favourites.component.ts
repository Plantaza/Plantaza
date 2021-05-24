import { Component, OnInit } from '@angular/core';
import { Oglas } from 'src/app/classes/oglas';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  constructor(
    private oglasiStoritev: OglasiService
  ) { }

  oglasi: Oglas[]

  ngOnInit(): void {
    this.oglasiStoritev.pridobiOglase()
      .then(odgovor => {
        this.oglasi = odgovor
      })
  }
}
