import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-add-oglas',
  templateUrl: './add-oglas.component.html',
  styleUrls: ['./add-oglas.component.css']
})
export class AddOglasComponent implements OnInit {

  oglas = {
    idRastline: "",
    idUporabnika: "",
    slika: ""
  }

  constructor(
    private oglasiStoritev: OglasiService
  ) { }

  ngOnInit(): void {
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

  }

}
