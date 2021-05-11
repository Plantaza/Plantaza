import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {Location} from "@angular/common";
import {AvtentikacijaService} from "../../services/avtentikacija.service";

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {
  showNav = true
  showIcon: any
  route: string = ""

  constructor(private _location: Location, router: Router, private avtentikacijaService: AvtentikacijaService) {
    router.events.subscribe((val) => {
      this.showNav = this.avtentikacijaService.jePrijavljen()
      this.showIcon = _location.path() != '/profile';
    });
  }
  ngOnInit(): void {
  }
  backClicked() {
    this._location.back()
  }

}
