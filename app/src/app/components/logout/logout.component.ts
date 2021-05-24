import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvtentikacijaService } from 'src/app/services/avtentikacija.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private avtentikacijaStoritev: AvtentikacijaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.avtentikacijaStoritev.odjava()
    window.location.href = 'login'
  }

}
