import {Inject, Injectable} from '@angular/core';
import {SHRAMBA_BRSKALNIKA} from "../classes/shramba";
import {RezultatAvtentikacije} from "../classes/rezultat-avtentikacije";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Uporabnik} from "../classes/uporabnik";

@Injectable({
  providedIn: 'root'
})
export class AvtentikacijaService {
  constructor(@Inject(SHRAMBA_BRSKALNIKA) private shramba: Storage, private http: HttpClient) { }
  private apiUrl = environment.apiUrl;

  private b64Utf8(niz: string): string {
    return decodeURIComponent(
      Array.prototype.map
        .call(
          atob(niz),
          (znak: string) => {
            return '%' + ('00' + znak.charCodeAt(0).toString(16)).slice(-2);
          }
        )
        .join('')
    );
  };

  public jePrijavljen(): boolean {
    const zeton: string = this.vrniZeton();
    if (zeton) {
      const koristnaVsebina = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      return koristnaVsebina.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public vrniTrenutnegaUporabnikaId(): any {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {_id} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      console.log("ID: ",_id);
      return _id
    }
    else return ""
  }
  public vrniTrenutnegaUporabnikaIme(): any {
    if (this.jePrijavljen()) {
      const zeton: string = this.vrniZeton();
      const {ime} = JSON.parse(this.b64Utf8(zeton.split('.')[1]));
      // console.log("ID: ",ime);
      return ime
    }
    else return ""
  }


  public vrniTrenutnegaUporabnika(): Promise<any> {
    if (this.jePrijavljen()) {
      // const token: string = this.vrniZeton();
      // console.log(token)
      // const {
      //   elektronskiNaslov,
      //   ime,
      //   opis,
      //   zgoscenaVrednost,
      //   nakljucnaVrednost,
      //   _id
      //   } = JSON.parse(atob(token.split('.')[1]));
      // return {
      //   elektronskiNaslov,
      //   ime,
      //   opis,
      //   zgoscenaVrednost,
      //   nakljucnaVrednost,
      //   _id } as Uporabnik;

      let id = this.vrniTrenutnegaUporabnikaId()

      const url: string = `${this.apiUrl}/uporabnik/${id}`;
      return this.http
        .get(url)
        .toPromise()
        .then(odgovor => odgovor as Uporabnik)
        .catch(AvtentikacijaService.obdelajNapako)
    }
    else{
      return null;
    }
  }

  public async prijava(data: any): Promise<any> {
    const url: string = `${this.apiUrl}/prijava`;
    console.log(data)
    return this.http
      .post<any>(url,data)
      .toPromise()
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["zeton"])
      });
  }

  public async registracijaUser(data: Uporabnik): Promise<any> {
    const url: string = `${this.apiUrl}/registracija`;
    // console.log(url);
    return this.http
      .post<any>(url, data)
      .toPromise()
      .then((rezultatAvtentikacije: RezultatAvtentikacije) => {
        this.shraniZeton(rezultatAvtentikacije["zeton"]);
      });
  }

  public async shraniSpremembe(data: any): Promise<any> {
    const url: string = `${this.apiUrl}/uporabnik/posodobi`;

    console.log(data)

    let podatki = {
      _id: data._id,
      ime: data.ime,
      elektronskiNaslov: data.elektronskiNaslov,
      opis: data.opis,
      slika: data.slika
    }

    return this.http
      .post(url, podatki)
      .toPromise()
      .then(odgovor => odgovor)
      .catch(AvtentikacijaService.obdelajNapako)
  }

  public vrniUporabnike(): Promise<any> {
    const url: string = `${this.apiUrl}/uporabnik/all`;

    return this.http
      .get(url)
      .toPromise()
      .then(odgovor => odgovor)
      .catch(AvtentikacijaService.obdelajNapako)
  }


  public odjava(): void {
    this.shramba.removeItem('prijavni-zeton');
  }

  public vrniZeton(): string {
    return <string>this.shramba.getItem('prijavni-zeton');
  }

  public shraniZeton(zeton: string): void {
    this.shramba.setItem('prijavni-zeton', zeton);

  }

  public pridobiKlepete(uporabnikId: string): Promise<any> {
    const url: string = `${this.apiUrl}/klepeti?uporabnikId=${uporabnikId}`
    return this.http
      .get(url)
      .toPromise()
      .then((klepeti) => {
        return klepeti;
      })
      .catch(AvtentikacijaService.obdelajNapako)
  }

  public posljiSporocilo(data: any): Promise<any> {
    const url: string = `${this.apiUrl}/sporocilo`
    return this.http
      .post(url, data)
      .toPromise()
      .then((odgovor) => {
        return odgovor;
      })
      .catch(AvtentikacijaService.obdelajNapako)
  }

  public ustvariKlepet(clani: any): Promise<any> {
    const url: string = `${this.apiUrl}/klepeti`
    return this.http
      .post(url, { "clani": clani })
      .toPromise()
      .then((odgovor) => {
        return odgovor;
      })
      .catch(AvtentikacijaService.obdelajNapako)
  }

  private static obdelajNapako(napaka: any): Promise<any> {
    console.error('Prišlo je do napake', napaka);
    return Promise.reject(napaka.message || napaka);
  }
}

