import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  @ViewChild('file_input') myInput: ElementRef<HTMLElement>
  uporabnik: Uporabnik = {
    _id: "",
    elektronskiNaslov: "",
    opis: "",
    ime: "",
    zgoscenaVrednost: "",
    nakljucnaVrednost: ""
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

  public fileUpload() {
    this.myInput.nativeElement.click()
  }

  ngOnInit(): void {
    this.avtentikacijaStoritev.vrniTrenutnegaUporabnika()
      .then(uporabnik => {
        this.uporabnik = uporabnik
        console.log(uporabnik)
      })
  }

}
