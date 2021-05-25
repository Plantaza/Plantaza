import { Component, OnInit } from '@angular/core';
import {Oglas} from "../../classes/oglas";
import {OglasiService} from "../../services/oglasi.service";
import {Rastlina} from "../../classes/rastlina";
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {

  current :any
  oglasi : Oglas[]  = []
  constructor(
    private oglasiService:OglasiService,
    private avtentikacijaService: AvtentikacijaService,
    private usmerjevalnik: Router
  ) { }
  oglas: Oglas


  rastlina : any
  // rastlina = {
  //   _id: "fjdsk57438957",
  //   imeRastline: "Regrat",
  //   kategorija: "Praprotnice",
  //   opis: "Lorem ipsum dolor sunt"
  // }

  ngOnInit(): void {
    this.current = 0
    this.oglasiService.pridobiOglase().then((oglasi : Oglas[]) => {
      this.oglasi = oglasi
      this.oglas = this.oglasi[this.current]
      console.log(this.oglasi)
      //izlušči sprejete in zavrnjene
      this.avtentikacijaService.vrniTrenutnegaUporabnika().then((uporabnik) => {
        console.log(uporabnik.sprejetiOglasi)
        this.oglasi = this.oglasi.filter(oglas => !uporabnik.sprejetiOglasi.includes(oglas._id) && !uporabnik.zavrnjeniOglasi.includes(oglas._id))

        if(this.oglasi.length == 0){
          this.rastlina = null
          this.oglas = null
          console.log("ni več")
        }
        else{
          this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina) => {
            this.rastlina = rastlina
            this.oglas = this.oglasi[this.current]
          })
        }
      })
    })
  }

  public ustvariKlepet(){
    // mas uporabnik._id za onega od kerga je objava in
    // prijavljenUporabnik._id za tebe
    this.avtentikacijaService.ustvariKlepet([this.avtentikacijaService.vrniTrenutnegaUporabnikaId(), this.oglasi[this.current].idUporabnika])
      .then((odgovor) => {
        if (odgovor.status == "Klepet je bil ustvarjen.") {
          // on succes kličeš tole
          this.avtentikacijaService.posljiSporocilo({
            "klepetId": odgovor.klepetId,
            "telo": "[SISTEMSKO SPOROČILO] Uporabnik "+this.avtentikacijaService.vrniTrenutnegaUporabnikaIme()+" želi zamenjati " + this.rastlina.imeRastline + " z vami!",
            "posiljatelj": this.avtentikacijaService.vrniTrenutnegaUporabnikaId()
          }).then(r => this.usmerjevalnik.navigate(['klepet'], {queryParams:{"klepetId": odgovor.klepetId}}))


        }
      })
  }

  onAccept(){
    //add accept functionality
    this.oglasiService.sprejmiOglas({
      "idOglas": this.oglasi[this.current]._id,
      "idUporabnik": this.avtentikacijaService.vrniTrenutnegaUporabnikaId( )
    }).then(r => {
      this.ustvariKlepet()
      this.current++
      if (this.current >= this.oglasi.length) this.ngOnInit()
      else {
        this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina) => {
          this.rastlina = rastlina
          this.oglas = this.oglasi[this.current]
        })
      }
    })

  }


  onDeny(){
    //add deny functionality
    this.oglasiService.zavrniOglas({
      "idOglas": this.oglasi[this.current]._id,
      "idUporabnik": this.avtentikacijaService.vrniTrenutnegaUporabnikaId( )
    }).then(r => {
      this.current++
      if(this.current >= this.oglasi.length) this.ngOnInit()
      else {
        this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
          this.rastlina = rastlina
          this.oglas = this.oglasi[this.current]
        })
      }

    })

  }

  refresh(){
    this.current++
    if(this.current >= this.oglasi.length) this.current = 0
    this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
      this.rastlina = rastlina
      this.oglas = this.oglasi[this.current]
    })
  }

}
