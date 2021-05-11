import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OglasiService} from "../../services/oglasi.service";
import {Rastlina} from "../../classes/rastlina";

@Component({
  selector: 'app-podrobnosti-rastline',
  templateUrl: './podrobnosti-rastline.component.html',
  styleUrls: ['./podrobnosti-rastline.component.css']
})
export class PodrobnostiRastlineComponent implements OnInit {

  constructor( private route: ActivatedRoute, private oglasiService: OglasiService) { }

  podrobnostId : any
  rastlina: any

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.podrobnostId = params['rastlina'];
      this.oglasiService.pridobiRastlinoPoId(this.podrobnostId).then((rastlina) => {
        this.rastlina = rastlina as Rastlina
      })
    });
  }

}
