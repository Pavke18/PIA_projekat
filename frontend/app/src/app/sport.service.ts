import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  uri = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  dohvatiSveSportove() {
    return this.http.get(`${this.uri}/sport/dohvatiSveSportove`);
  }

  dohvatiDodateSportove(){
    return this.http.get(`${this.uri}/sport/dohvatiDodateSportove`);
  }

  dohvatiSveDiscipline() {
    return this.http.get(`${this.uri}/sport/dohvatiSveDiscipline`);
  }

  dohvatiDiscipline(sport){
    const podaci={
      sport:sport
    }

    return this.http.post(`${this.uri}/sport/dohvatiDiscipline`, podaci);
  }

  dohvatiDodateDiscipline(sport){
    const podaci={
      sport:sport
    }

    return this.http.post(`${this.uri}/sport/dohvatiDodateDiscipline`, podaci);
  }

  dohvatiDodateEkipneDiscipline(sport){
    const podaci={
      sport:sport
    }

    return this.http.post(`${this.uri}/sport/dohvatiDodateEkipneDiscipline`, podaci);
  }


  dohvatiSportiste(ime_prezime, zemlja, sport, disciplina, pol, medalja) {
    const podaci = {
      ime_prezime: ime_prezime,
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
      medalja: medalja
    }

    // alert(ime_prezime+" "+zemlja+" "+sport+" "+disciplina+" "+pol+" "+medalja);

    return this.http.post(`${this.uri}/sport/dohvatiSportiste`, podaci);
  }

  dohvatiSportisteZaEkipu(zemlja, sport, disciplina, pol) {
    const podaci = {
      zemlja: zemlja,
      sport: sport,
      disciplina: disciplina,
      pol: pol,
    }

    return this.http.post(`${this.uri}/sport/dohvatiSportisteZaEkipu`, podaci);
  }

  dodajSportDisciplinu(sport, disciplina) {
    const podaci = {
      sport: sport,
      disciplina: disciplina
    }

    return this.http.post(`${this.uri}/sport/dodajSportDisciplinu`, podaci);
  }

  dohvatiSportisteDiscipline(sport,disciplina, pol){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol
    }

    return this.http.post(`${this.uri}/sport/dohvatiSportisteDiscipline`,podaci);
  }

  dohvatiIzabraniSport(sport, disciplina){
    const podaci={
      sport:sport,
      disciplina:disciplina
    }

    return this.http.post(`${this.uri}/sport/dohvatiIzabraniSport`, podaci);
  }

  dohvatiSportisteDrzave(zemlja){
    const podaci={
     zemlja:zemlja
    }

    return this.http.post(`${this.uri}/sport/dohvatiSportisteDrzave`, podaci);
  }

  dohvatiEkipe(sport, disciplina,pol){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol
    }

    return this.http.post(`${this.uri}/sport/dohvatiEkipe`, podaci);
  }

  dodajTakmicenje(sport, disciplina,pol,datumPocetka,datumKraja,lokacija,delegat, tip,takmicari, brRundi){
    const podaci={
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      datumPocetka:datumPocetka,
      datumKraja:datumKraja,
      lokacija:lokacija,
      delegat:delegat,
      tip:tip,
      takmicari:takmicari,
      brRundi:brRundi
    }

    return this.http.post(`${this.uri}/sport/dodajTakmicenje`, podaci);
  }

  dohvatiRekorde(){
    return this.http.get(`${this.uri}/sport/dohvatiRekorde`);
  }

}
