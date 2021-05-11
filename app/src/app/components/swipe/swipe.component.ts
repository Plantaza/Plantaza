import { Component, OnInit } from '@angular/core';
import {Oglas} from "../../classes/oglas";
import {OglasiService} from "../../services/oglasi.service";
import {Rastlina} from "../../classes/rastlina";

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css']
})
export class SwipeComponent implements OnInit {

  current :any
  oglasi : Oglas[]  = []
  constructor(private oglasiService:OglasiService) { }

  rastlina : any

  ngOnInit(): void {
    this.current =0
    this.oglasiService.pridobiOglase().then((oglasi : Oglas[]) => {
      this.oglasi = oglasi
      this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
        this.rastlina = rastlina
      })
    })


  }

  onAccept(){
    //add accept functionality
    this.current++
    if(this.current >= this.oglasi.length) this.current = 0
    this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
      this.rastlina = rastlina
    })
  }

  onDeny(){
    //add deny functionality
    this.current++
    if(this.current >= this.oglasi.length) this.current = 0
    this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
      this.rastlina = rastlina
    })
  }

  refresh(){
    this.current++
    if(this.current >= this.oglasi.length) this.current = 0
    this.oglasiService.pridobiRastlinoPoId(<string>this.oglasi[this.current].idRastline).then((rastlina)=> {
      this.rastlina = rastlina
    })
  }

}
