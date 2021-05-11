import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-ogrodje',
  templateUrl: './ogrodje.component.html',
  styleUrls: ['./ogrodje.component.css']
})
export class OgrodjeComponent implements OnInit {
  showNav: any
  showIcon: any
  route: string = ""

  constructor(private _location: Location, router: Router) {
    router.events.subscribe((val) => {
      this.showNav = _location.path() != '' && _location.path() != '/' && _location.path() != '/login' && _location.path() != '/register';
      this.showIcon = _location.path() != '/profile';
    });
  }
  ngOnInit(): void {
  }
  backClicked() {
    this._location.back()
  }

}
