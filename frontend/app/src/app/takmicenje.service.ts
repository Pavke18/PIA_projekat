import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TakmicenjeService {

  uri = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  dohvatiMojaTakmicenja(delegat){
    const podaci={
      delegat:delegat
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiMojaTakmicenja`, podaci);
  }

  dohvatiTakmicenje(sport, disciplina,pol){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol
    }
    return this.http.post(`${this.uri}/takmicenje/dohvatiTakmicenje`, podaci);
  }

  dodajRasporedTakmicenjaIndividualniSport(sport, disciplina, pol, datum, vreme, takmicari, lokacija,runda){
    let datumString=datum.toString();
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol, 
      datum:datumString,
      vreme:vreme,
      takmicari:takmicari,
      lokacija:lokacija,
      runda:runda,
      unetiRezultati:false
    }
    return this.http.post(`${this.uri}/takmicenje/dodajRasporedTakmicenja`, podaci);
  }

  dodajRezultatTakmicenja(sport, disciplina, pol,runda,takmicariINjihoviRezultati){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol, 
      runda:runda,
      takmicari:takmicariINjihoviRezultati
      // unetiRezultati:false //to treba u bazi da promenim ako je sve u redu
    }
    // alert(podaci.sport+" "+podaci.disciplina+" "+podaci.pol+" "+podaci.runda+" "+podaci.takmicari);
    return this.http.post(`${this.uri}/takmicenje/dodajRezultatTakmicenja`, podaci);
  }

  dohvatiRezultateTakmicenja(sport, disciplina, pol, runda){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol, 
      runda:runda
    }

    return this.http.post(`${this.uri}/takmicenje/dohvatiRezultateTakmicenjaIndivid`, podaci);
  }

  osvojenaMedaljaIndivid(sportista,zemlja,vrstaMedalje, disciplina){
    const podaci={
      sportista:sportista,
      zemlja:zemlja,
      vrsta:vrstaMedalje, 
      disciplina:disciplina
    }

    // alert(podaci.sportista+" "+podaci.zemlja+" "+podaci.vrsta+podaci.disciplina);
    return this.http.post(`${this.uri}/takmicenje/osvojenaMedaljaIndivid`, podaci);
  }

}
