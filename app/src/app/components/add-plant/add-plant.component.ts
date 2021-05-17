import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OglasiService } from 'src/app/services/oglasi.service';

@Component({
  selector: 'app-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.css']
})
export class AddPlantComponent implements OnInit {

  file1: File

  rastlina = {
    ime: '',
    kategorija: '',
    podkategorija: '',
    svetloba: 0,
    vlaga: 0,
    opis: '',
    slika: null
  }

  constructor(
    private oglasiStoritev: OglasiService
  ) { }

  ngOnInit(): void {
    // document.getElementById("slikaRastline").onchange = this.dodajFile()
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

  public dodajRastlino(): void {
    let reader = new FileReader();
			reader.readAsDataURL(this.file1);
			reader.onloadend = (e) => {
        // console.log(reader.result)
        this.rastlina.slika = reader.result
        this.rastlina.ime = this.podatki.get("ime").value
        this.rastlina.kategorija = this.podatki.get("kategorija").value
        this.rastlina.svetloba = this.podatki.get("svetloba").value
        this.rastlina.vlaga = this.podatki.get("vlaga").value
        this.rastlina.opis = this.podatki.get("opis").value

        this.oglasiStoritev.ustvariRastlino(this.rastlina)
          .then(oglas => {
            console.log("Oglas uspesno dodan", oglas)
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
