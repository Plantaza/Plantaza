import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AvtentikacijaService} from "../../services/avtentikacija.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private avtentikacijaService:AvtentikacijaService, private router: Router) { }


  uporabnikData = new FormGroup({
    elektronskiNaslov : new FormControl(''),
    geslo : new FormControl('')
  });

  ngOnInit(): void {
  }

  onClickSubmit(){
    // console.log(this.uporabnikData.value)
    this.avtentikacijaService.prijava(this.uporabnikData.value).then((result)=> {
      window.location.href = 'swipe'

    }).catch(err => {
      alert("User with this email/password combination does not exist.")
      console.error(err);
    })
  }

}
