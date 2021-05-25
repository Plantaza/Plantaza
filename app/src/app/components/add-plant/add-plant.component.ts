import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OglasiService } from 'src/app/services/oglasi.service';
import {Router} from "@angular/router";

interface Kategorija {
  value: number;
  viewValue: string;
}
@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  file1: File

  foo = 1

  rastlina = {
    ime: '',
    kategorija: '',
    svetloba: 0,
    vlaga: 0,
    opis: '',
    slika: null
  }

  // strKategorije = ["Aloje", "Alpske rastline", "Drevesa", "Dvoletnice", "Enoletnice", "Grmičevje", "Kaktusi", "Orhideje", "Plezalke", "Praproti", "Sobne rastline", "Sukulenti", "Trajnice", "Trave", "Vodne rastline", "Vresje", "Čebulnice"]

  kategorije: Kategorija[] = [
    {value: 0, viewValue: 'Aloje'},
    {value: 1, viewValue: 'Alpske rastline'},
    {value: 3, viewValue: 'Drevesa'},
    {value: 4, viewValue: 'Dvoletnice'},
    {value: 5, viewValue: 'Enoletnice'},
    {value: 6, viewValue: 'Grmičevje'},
    {value: 7, viewValue: 'Kaktusi'},
    {value: 8, viewValue: 'Orhideje'},
    {value: 9, viewValue: 'Plezalke'},
    {value: 10, viewValue: 'Praproti'},
    {value: 11, viewValue: 'Sobne rastline'},
    {value: 12, viewValue: 'Sukulenti'},
    {value: 13, viewValue: 'Trajnice'},
    {value: 14, viewValue: 'Trave'},
    {value: 15, viewValue: 'Vodne rastline'},
    {value: 16, viewValue: 'Vresje'},
    {value: 17, viewValue: 'Čebulnice'}
  ];

  constructor(
    private oglasiStoritev: OglasiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // document.getElementById("slikaRastline").onchange = this.dodajFile()
  }

  podatki = new FormGroup ({
    ime: new FormControl('', [
      Validators.required,
    ]),
    kategorija: new FormControl('Kategorija', [
      Validators.required,
    ]),
    svetloba: new FormControl('', [
    ]),
    vlaga: new FormControl('', [
    ]),
    opis: new FormControl('', [
    ])
  })

  public dodajRastlino(): void {

    let reader = new FileReader();
			reader.readAsDataURL(this.file1);
			reader.onloadend = (e) => {
        console.log(reader.result)
        this.rastlina.slika = reader.result
        this.rastlina.ime = this.podatki.get("ime").value
        this.rastlina.kategorija = this.podatki.get("kategorija").value
        this.rastlina.svetloba = this.podatki.get("svetloba").value
        this.rastlina.vlaga = this.podatki.get("vlaga").value
        this.rastlina.opis = this.podatki.get("opis").value

        this.oglasiStoritev.ustvariRastlino(this.rastlina)
          .then(oglas => {
            console.log("Oglas uspesno dodan", oglas)
            this.router.navigate(["/kategorije"])
          })
          .catch(napaka => {
            console.log("Napaka pri dodajanju oglasa", napaka)
          })
      }
  }

  public dodajFile(e: Event) {
    this.file1 = (<HTMLInputElement>e.target).files[0]

    console.log(this.file1)
  }

  handleFileInput(files: FileList) {
		// this.file1 = files.target.files[0];
	}
}
