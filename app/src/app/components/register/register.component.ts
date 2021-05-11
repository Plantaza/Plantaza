import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import {Router} from "@angular/router";
import {RxwebValidators} from "@rxweb/reactive-form-validators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private avtentikacijaService:AvtentikacijaService, private router: Router) { }

  uporabnikData = new FormGroup({
    ime: new FormControl(''),
    elektronskiNaslov : new FormControl(''),
    geslo : new FormControl(''),
    geslo2 : new FormControl('', RxwebValidators.compare({fieldName: 'geslo'}))
  });

  ngOnInit(): void {
  }
  onClickSubmit(){
    // console.log(this.uporabnikData.value)
    if(this.uporabnikData.value.ime == '' || this.uporabnikData.value.elektronskiNaslov == '' || this.uporabnikData.value.geslo == '' || this.uporabnikData.value.geslo2 == '' ){
      alert("Izpolnite vsa polja")
      return
    }
    else if(!this.uporabnikData.valid){
      alert("Gesli se morata ujemati")
      return
    }
    else {
      this.uporabnikData.removeControl('geslo2')
      this.avtentikacijaService.registracijaUser(this.uporabnikData.value).then((result)=> {
        this.router.navigate(["/swipe"]);

      }).catch(err => {
        alert("Format elektronske pošte je napačen")
        console.error(err);
      })
    }
  }
}
