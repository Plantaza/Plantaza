import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { AvtentikacijaService } from './avtentikacija.service';
import { Oglas } from '../classes/oglas';
import { Rastlina } from '../classes/rastlina';
import {Uporabnik} from "../classes/uporabnik";


@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  constructor(
    private http: HttpClient,
    private avtentikacijaService: AvtentikacijaService
  ) { }
  private apiUrl = environment.apiUrl;

  public pridobiRastlineKategorije(kategorija: string): Promise<any[]>{
    const url: string = `${this.apiUrl}/rastlina/kategorija/${kategorija}`
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }

  public pridobiRastlinoPoId(id: string): Promise<any>{
    const url: string = `${this.apiUrl}/rastlina/id/${id}`
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }

  public pridobiRastlinoPoImenu(name: string): Promise<any>{
    const url: string = `${this.apiUrl}/rastlina/name/${name}`

    console.log(url)
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }

  public pridobiOglase(): Promise<any[]>{
    const url: string = `${this.apiUrl}/oglas/all`
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }

  public objaviOglas(oglas: any): Promise<any[]> {
    const url: string = `${this.apiUrl}/oglas`;

		const httpLastnosti = {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
			})
		};

		return this.http
			.post(url, oglas, httpLastnosti)
			.toPromise()
			.then(oglas => oglas as Oglas)
			.catch(OglasiService.obdelajNapako);
  }

  public ustvariRastlino(rastlina: any): Promise<any> {

    console.log("Objavljam novo rastlino", rastlina)

    const url: string = `${this.apiUrl}/rastlina`;

		const httpLastnosti = {
			headers: new HttpHeaders({
				'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
			})
		};

    return this.http
			.post(url, rastlina, httpLastnosti)
			.toPromise()
			.then(rastlina => rastlina as Rastlina)
			.catch(OglasiService.obdelajNapako);
  }

  public zavrniOglas(oglas: any): Promise<any> {

    const url: string = `${this.apiUrl}/oglas/zavrni`;

    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
      })
    };

    return this.http
      .post(url, oglas, httpLastnosti)
      .toPromise()
      .then(uporabnik => uporabnik as Uporabnik)
      .catch(OglasiService.obdelajNapako);
  }


  private static obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }

  public sprejmiOglas(oglas: any): Promise<any> {

    const url: string = `${this.apiUrl}/oglas/sprejmi`;

    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
      })
    };

    return this.http
      .post(url, oglas, httpLastnosti)
      .toPromise()
      .then(uporabnik => uporabnik as Uporabnik)
      .catch(OglasiService.obdelajNapako);
  }

  shraniRastlino(_id: any, uporabnikId: any) {
    const url: string = `${this.apiUrl}/rastlina/shrani`;

    const paket = {
      "_id": _id,
      "uporabnikId": uporabnikId
    }
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
      })
    };

    return this.http
      .post(url, paket, httpLastnosti)
      .toPromise()
      .then(uporabnik => uporabnik as Uporabnik)
      .catch(OglasiService.obdelajNapako);
  }
  odshraniRastlino(_id: any, uporabnikId: any) {
    const url: string = `${this.apiUrl}/rastlina/odshrani`;

    const paket = {
      "_id": _id,
      "uporabnikId": uporabnikId
    }
    const httpLastnosti = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.avtentikacijaService.vrniZeton()}`
      })
    };

    return this.http
      .post(url, paket, httpLastnosti)
      .toPromise()
      .then(uporabnik => uporabnik as Uporabnik)
      .catch(OglasiService.obdelajNapako);
  }
}
