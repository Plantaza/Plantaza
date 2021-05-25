import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OglasiService} from "../../services/oglasi.service";
import {Rastlina} from "../../classes/rastlina";
import {AvtentikacijaService} from "../../services/avtentikacija.service";

@Component({
  selector: 'app-podrobnosti-rastline',
  templateUrl: './podrobnosti-rastline.component.html',
  styleUrls: ['./podrobnosti-rastline.component.css']
})
export class PodrobnostiRastlineComponent implements OnInit {

  constructor( private route: ActivatedRoute, private oglasiService: OglasiService, private avtentikacijaService: AvtentikacijaService) { }

  podrobnostId : any
  rastlina: any
  jeshranjena = false

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.podrobnostId = params['rastlina'];
      this.oglasiService.pridobiRastlinoPoId(this.podrobnostId).then((rastlina) => {
        this.rastlina = rastlina as Rastlina
        this.shranjena()
      })
    });
  }

  shrani() {
    this.oglasiService.shraniRastlino(this.rastlina._id, this.avtentikacijaService.vrniTrenutnegaUporabnikaId()).then(() => {
      var x = document.getElementById("snackbar");
      // Add the "show" class to DIV
      x.className = "show";
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      this.shranjena()
    }).catch((err) => {
      console.log(err)
      var x = document.getElementById("snackbar");
      // Add the "show" class to DIV
      x.innerText = "Napaka pri shranjevanju"
      x.className = "show";
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      x.innerText = "Rastlina je shranjena med priljubljene!"
    })
  }

  odshrani (){
    this.oglasiService.odshraniRastlino(this.rastlina._id, this.avtentikacijaService.vrniTrenutnegaUporabnikaId()).then(() => {
      var x = document.getElementById("unsnackbar");
      // Add the "show" class to DIV
      x.className = "show";
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      this.shranjena()
    }).catch((err) => {
      console.log(err)
      var x = document.getElementById("unsnackbar");
      // Add the "show" class to DIV
      x.innerText = "Napaka pri odshranjevanju"
      x.className = "show";
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
      x.innerText = "Rastlina je odstranjena od priljubljenih!"
    })
  }


  shranjena() {
    this.avtentikacijaService.vrniTrenutnegaUporabnika().then((uporabnik)=> {
      this.jeshranjena = uporabnik.shranjeneRastline.includes(this.rastlina._id);
    })
  }
}

