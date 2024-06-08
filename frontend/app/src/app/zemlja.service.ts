import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ZemljaService {

  uri = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  dohvatiSveZemlje(){
    return this.http.get(`${this.uri}/zemlja/dohvatiSveZemlje`);
  }

  dohvatiSortirano(){
    return this.http.get(`${this.uri}/zemlja/dohvatiSveZemljeSortirano`);
  }

  azurirajBrojSportista(ime){
    const podaci={
      ime:ime
    }

    return this.http.post(`${this.uri}/zemlja/azurirajBrojSportista`, podaci);
  }

  dohvatiZemlju(ime){
    const podaci={
      ime:ime
    }

    return this.http.post(`${this.uri}/zemlja/dohvatiZemlju`, podaci);
  }
}
