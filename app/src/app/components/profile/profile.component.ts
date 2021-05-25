import { Component, OnInit } from '@angular/core';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uporabnik: Uporabnik = {
    _id: "",
    elektronskiNaslov: "",
    opis: "",
    ime: "",
    zgoscenaVrednost: "",
    nakljucnaVrednost: "",
    sprejetiOglasi: [],
    zavrnjeniOglasi: []
  }

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  public shraniSpremembe() {
    this.avtentikacijaStoritev.shraniSpremembe(this.uporabnik)
      .then(odgovor => {
        console.log("Uporabnik posodobljen")
      })
  }

  ngOnInit(): void {
    this.avtentikacijaStoritev.vrniTrenutnegaUporabnika()
      .then(uporabnik => {
        this.uporabnik = uporabnik
        console.log(uporabnik)
      })
  }

}
