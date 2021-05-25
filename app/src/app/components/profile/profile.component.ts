import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';
import {OglasiService} from "../../services/oglasi.service";
import {Oglas} from "../../classes/oglas";

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

  oglasi: Oglas[] =[]
  file1: File
  rastline: any[] = []

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService,
    private oglasiStoritev: OglasiService
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
    this.rastline = []
    this.avtentikacijaStoritev.vrniTrenutnegaUporabnika()
      .then(uporabnik => {
        this.uporabnik = uporabnik
        console.log(uporabnik)
        this.oglasiStoritev.pridobiOglase().then(oglasi => {
          this.oglasi = oglasi.filter(oglas => oglas.idUporabnika == this.uporabnik._id)
          this.oglasi.forEach(oglas => this.oglasiStoritev.pridobiRastlinoPoId(oglas.idRastline).then(rastlina => {
            rastlina = rastlina as any
            rastlina.oglasId = oglas._id
            console.log(rastlina)
            this.rastline.push(rastlina)
          }))
        })
      })
  }

  odstraniOglas(id) {
    console.log(id)
    this.oglasiStoritev.odmakniOglas(id).then(oglas => {
      this.ngOnInit()
    })
  }
}
