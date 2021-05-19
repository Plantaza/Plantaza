import { Component, OnInit } from '@angular/core';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  uporabnik: any

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    this.avtentikacijaStoritev.vrniTrenutnegaUporabnika()
      .then(uporabnik => {
        console.log(uporabnik)
      })
  }

}
