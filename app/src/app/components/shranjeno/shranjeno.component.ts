import { Component, OnInit } from '@angular/core';
import {Rastlina} from "../../classes/rastlina";
import {OglasiService} from "../../services/oglasi.service";
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import {Uporabnik} from "../../classes/uporabnik";

@Component({
  selector: 'app-shranjeno',
  templateUrl: './shranjeno.component.html',
  styleUrls: ['./shranjeno.component.css']
})
export class ShranjenoComponent implements OnInit {

  constructor(
    private oglasiService : OglasiService, private avtentikacijaService: AvtentikacijaService
  ) { }

  rastline: Rastlina[] = []
  uporabnik: Uporabnik
  ngOnInit(): void {
    this.avtentikacijaService.vrniTrenutnegaUporabnika().then((uporabnik)=> {
      this.uporabnik = uporabnik
      this.uporabnik.shranjeneRastline.forEach((rastlina)=> {
        this.oglasiService.pridobiRastlinoPoId(rastlina).then(rastlinca => this.rastline.push(rastlinca)).catch(err => console.log(err))
      })
    })
  }

}
