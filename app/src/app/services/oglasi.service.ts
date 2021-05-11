import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import { AvtentikacijaService } from './avtentikacija.service';
import { Oglas } from '../classes/oglas';


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


  private static obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
