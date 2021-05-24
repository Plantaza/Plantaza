import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rastlina } from 'src/app/classes/rastlina';
import { Uporabnik } from 'src/app/classes/uporabnik';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-add-oglas',
  templateUrl: './add-oglas.component.html',
  styleUrls: ['./add-oglas.component.css']
})
export class AddOglasComponent implements OnInit {

  oglas = {
    ime: "",
    idRastline: "",
    idUporabnika: "",
    slika: ""
  }

  file1: File

  rastlina: Rastlina = {
    imeRastline: "-",
    kategorija: "-",
    potrebaPoSvetlobi: 0,
    procentOhranjanjaVlage: 0,
    opis: "-",
    _id: "-",
    slika: ""
  }

  uporabnik: Uporabnik
  opozorilo = {
    visible: false,
    text: ""
  }

  constructor(
    private oglasiStoritev: OglasiService,
    private avtentikacijaStoritev: AvtentikacijaService
  ) { }

  ngOnInit(): void {
    this.oglas.idUporabnika = this.avtentikacijaStoritev.vrniTrenutnegaUporabnikaId()
  }

  podatki = new FormGroup ({
    ime: new FormControl('', [
      Validators.required,
    ]),
    kategorija: new FormControl('', [
      Validators.required,
    ]),
    svetloba: new FormControl('', [
    ]),
    vlaga: new FormControl('', [
    ]),
    opis: new FormControl('', [
    ])
  })

  public dodajOglas(): void {

    this.preveriRastlino()

    /**
     *  preverimo podatke in po potrebi poakzemo obvestila
     */


    if (this.oglas.idUporabnika.length == 0) {
     this.opozorilo.visible = true
     this.opozorilo.text = "Ne dobim uporabnika. Prijavite se in poskusite ponovno"
     return
    } else if (this.oglas.idRastline.length == 0) {
      this.opozorilo.visible = true
      this.opozorilo.text = "Vnešena rastlina ni v bazi. Najprej dodaj novo rastlino in nato ponovno poskusi dodati oglas"
      return
    }


    let reader = new FileReader();
    reader.readAsDataURL(this.file1);
    reader.onloadend = (e) => {
      console.log(reader.result)

      this.oglas.slika = reader.result as string

      this.oglasiStoritev.objaviOglas(this.oglas)
      .then(() => {
        console.log("Oglas uspesno dodan")
      })
      .catch(error => {
        console.log("Napaka pri dodajanju oglasa", error)
      })
    }
  }

  public preveriRastlino() {
    console.log("Yeet")
    this.oglasiStoritev.pridobiRastlinoPoImenu(this.podatki.get("ime").value)
      .then(rastlina => {
        this.rastlina = rastlina[0]

        this.oglas.idRastline = rastlina[0]._id
        this.oglas.slika = rastlina[0].slika
        // this.oglas.idUporabnika =
      })
  }

  public dodajFile(e: Event) {
    this.file1 = (<HTMLInputElement>e.target).files[0]

    console.log(this.file1)
  }
}
