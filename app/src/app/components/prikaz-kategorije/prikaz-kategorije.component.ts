import {Component, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-prikaz-kategorije',
  templateUrl: './prikaz-kategorije.component.html',
  styleUrls: ['./prikaz-kategorije.component.css']
})
export class PrikazKategorijeComponent implements OnInit {

  constructor(  private route: ActivatedRoute,) {
  }
  vseRastline = [];
  kategorija: string = "";

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.kategorija = params['kategorija'];

    });


    // getPlantsByCategory(this.kategorija)
  }

}
