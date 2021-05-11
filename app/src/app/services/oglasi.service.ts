import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class OglasiService {

  constructor( private http: HttpClient) { }
  private apiUrl = environment.apiUrl;

  public pridobiRastlineKategorije(kategorija: string): Promise<any[]>{
    const url: string = `${this.apiUrl}/rastlina/kategorija/${kategorija}`
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }

  public pridobiRastlinoPoId(kategorija: string): Promise<any>{
    const url: string = `${this.apiUrl}/rastlina/id/${kategorija}`
    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor as any)
      .catch(OglasiService.obdelajNapako);
  }


  private static obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}
