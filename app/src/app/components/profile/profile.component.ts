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
    nakljucnaVrednost: "",
    sprejetiOglasi: [],
    zavrnjeniOglasi: [],
    slika: null,
    shranjeneRastline: []
  }

  file1: File

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  public shraniSpremembe() {

    let reader = new FileReader();
    reader.readAsDataURL(this.file1);
    reader.onloadend = (e) => {

      this.uporabnik.slika = reader.result as string

      this.avtentikacijaStoritev.shraniSpremembe(this.uporabnik)
        .then(odgovor => {
          console.log("Uporabnik posodobljen")
        })
      }
  }

  public dodajFile(e: Event) {
    this.file1 = (<HTMLInputElement>e.target).files[0]

    console.log(this.file1)
  }

  ngOnInit(): void {
    this.avtentikacijaStoritev.vrniTrenutnegaUporabnika()
      .then(uporabnik => {
        this.uporabnik = uporabnik
        console.log(uporabnik)
      })
  }

}
