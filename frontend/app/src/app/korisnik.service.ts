import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KorisnikService {

  uri = 'http://localhost:4000'

  constructor(private http:HttpClient) { }

  prijavaService(korisnickoIme, lozinka){
    const podaci={
      korisnickoIme:korisnickoIme,
      lozinka:lozinka
    }

    return this.http.post(`${this.uri}/korisnik/prijavaKor`, podaci);
  }

  promenaLozinke(korisnickoIme, lozinka, nova){
    const podaci={
      korisnickoIme:korisnickoIme,
      lozinka:lozinka,
      nova:nova
    }

    return this.http.post(`${this.uri}/korisnik/promenaLozinke`, podaci);
  }

  registracija(korisnickoIme, lozinka, ime, prezime, zemlja, email, tip){
    const podaci={
      korisnickoIme:korisnickoIme,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      zemlja:zemlja,
      email:email,
      tip:tip
    }

    return this.http.post(`${this.uri}/korisnik/registracija`, podaci);
  }

  dohvatiZahteve(){
    return this.http.get(`${this.uri}/korisnik/dohvatiZahteve`);
  }

  prihvatiZahtev(korisnickoIme, lozinka, ime, prezime, zemlja, email, tip){
    const podaci={
      korisnickoIme:korisnickoIme,
      lozinka:lozinka,
      ime:ime,
      prezime:prezime,
      zemlja:zemlja,
      email:email,
      tip:tip
    }

    // alert('SERVIS '+ime+" "+prezime+" "+korisnickoIme+" "+zemlja+" "+email+" "+tip+" "+lozinka);

    return this.http.post(`${this.uri}/korisnik/prihvatiZahtev`, podaci);
  }

  odbijZahtev(korisnickoIme){
    const podaci={
      korisnickoIme:korisnickoIme
    }

    return this.http.post(`${this.uri}/korisnik/odbijZahtev`, podaci);
  }

  dohvatiDelegate(){
    return this.http.get(`${this.uri}/korisnik/dohvatiDelegate`);
  }

  ubaciSportistu(ime_prezime, zemlja, sport, disciplina, pol){
    const podaci={
      ime_prezime:ime_prezime,
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      medalja:false
    }

    return this.http.post(`${this.uri}/korisnik/ubaciSportistu`, podaci);
  }

  ubaciEkipu(zemlja, sport, disciplina, pol, igraci){
    const podaci={
      zemlja:zemlja,
      sport:sport,
      disciplina:disciplina,
      pol:pol,
      igraci:igraci
    }

    return this.http.post(`${this.uri}/korisnik/ubaciEkipu`, podaci);
  }
}
