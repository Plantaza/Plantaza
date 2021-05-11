import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {OglasiService} from "../../services/oglasi.service";
import {Rastlina} from "../../classes/rastlina";

@Component({
  selector: 'app-prikaz-kategorije',
  templateUrl: './prikaz-kategorije.component.html',
  styleUrls: ['./prikaz-kategorije.component.css']
})
export class PrikazKategorijeComponent implements OnInit {

  constructor(  private route: ActivatedRoute, private oglasiService: OglasiService) {
  }
  vseRastline : Rastlina[] = [];
  kategorija: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.kategorija = params['kategorija'];
      this.oglasiService.pridobiRastlineKategorije(this.kategorija).then((oglasi) => {
        this.vseRastline = oglasi
      })
    });


  }

  showRastlina(_id: string) {

  }
}
