import { Component, OnInit } from '@angular/core';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';

@Component({
  selector: 'app-seznam-klepetov',
  templateUrl: './seznam-klepetov.component.html',
  styleUrls: ['./seznam-klepetov.component.css']
})
export class SeznamKlepetovComponent implements OnInit {

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

    uporabniki: Uporabnik[]


  ngOnInit(): void {
    this.avtentikacijaStoritev.vrniUporabnike()
      .then(odgovor => {
        this.uporabniki = odgovor
      })
  }

}
