import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AvtentikacijaService} from "../../services/avtentikacija.service";

@Component({
  selector: 'app-klepet',
  templateUrl: './klepet.component.html',
  styleUrls: ['./klepet.component.css']
})
export class KlepetComponent implements OnInit {

  constructor(
    private dataService: AvtentikacijaService,
    private route: ActivatedRoute
  ) { }

  public klepeti
  public izbraniKlepet
  public clani
  public message = ""

  ngOnInit(): void {
    console.log("Klepet has been opened.")
    this.posodobiPodatke()
  }

  private posodobiPodatke(callback?: any): void {
    let component = this
    this.dataService.pridobiKlepete(this.dataService.vrniTrenutnegaUporabnikaId()).then(function(klepeti) {
      component.klepeti = klepeti
      if (callback) {
        callback()
      }
      component.route.queryParams.subscribe((params) => {
        console.log(params)
        if ('klepetId' in params) {
          component.izberiKlepet(params.klepetId)
        }
      })
    })
  }

  public izberiKlepet(id: string): void {
    for (var klepet of this.klepeti) {
      if (klepet._id == id) {
        this.izbraniKlepet = klepet
      }
    }

    this.clani = {}
    for (var clan of this.izbraniKlepet.clani) {
      this.clani[clan._id] = clan.ime
    }

  }

  public imeClana(id: string): string {
    let clan = this.clani[id];
    return clan
  }

  public formatirajDatum(datum: string): string {
    return datum.substr(0, 10) + " " + datum.substr(11, 8)
  }

  public barvaSporocila(id: string): string {
    if (this.dataService.vrniTrenutnegaUporabnikaId() == id) {
      return "#FFFFFF"
    } else {
      return "#a3b87a"
    }
  }

  public barvaKlepeta(id: string): string {
    if (this.izbraniKlepet && this.izbraniKlepet._id == id) {
      return "#addaf4"
    } else {
      return "#dbf5ae"
    }
  }

  public send() {
    let component = this
    component.dataService.posljiSporocilo({
      "klepetId": component.izbraniKlepet._id,
      "telo": component.message,
      "posiljatelj": component.dataService.vrniTrenutnegaUporabnikaId()
    }).then((odgovor) => {
      if (odgovor.status == "Success") {
        component.message = ""
        component.posodobiPodatke(() => {
          component.izberiKlepet(component.izbraniKlepet._id)
          //console.log("stevilo", component.izbraniKlepet.sporocila.length)
        })
      }
    })
  }
}
