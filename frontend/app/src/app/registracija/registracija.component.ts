import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css']
})
export class RegistracijaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    localStorage.clear();//odjava iz sistema
  }

  korisnickoIme: string;
  lozinka: string;
  potvrdaLozinke: string;
  ime: string;
  prezime: string;
  zemlja: string;
  email: string;
  tip: string;

  poruka: string;
  klasa: string;

  registracija() {
    if (this.korisnickoIme == "" || this.lozinka == "" || this.potvrdaLozinke == '' || this.ime == '' || this.prezime == '' || this.zemlja == '' || this.email == '' || this.tip == ''
      || this.korisnickoIme == undefined || this.lozinka == undefined || this.potvrdaLozinke == undefined || this.ime == undefined || this.prezime == undefined || this.zemlja == undefined || this.email == undefined || this.tip == undefined) {
      this.klasa = 'greska';
      this.poruka = 'Sva polja su obavezna!';
      return;
    }
    var regexp=new RegExp('(?!.*(.)\\1\\1)(?=(.*[A-Z]){1,})(?=(.*[a-z]){3,})(?=(.*[0-9]){2,})(?=(.*[!@#$%&]){2,})^[A-Za-z].{7,11}$');
    // var regexp = new RegExp('^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*]){2,}).{8,12}$');
    var  test = regexp.test(this.lozinka);
    if (test == true) {
      if (this.lozinka == this.potvrdaLozinke) {
        this.korisnikServis.registracija(this.korisnickoIme, this.lozinka, this.ime, this.prezime, this.zemlja, this.email, this.tip).subscribe((res => {
         // alert(res['message']);
          if (res['message'] == 'zahtev je dodat') {
            this.klasa = 'uspeh';
            this.poruka = 'Vas zahtev je unet. Molimo Vas sacekajte da ga organizator prihvati. Hvala!';
            // this.ruter.navigate(['']);
          }
          else {
            this.klasa = 'greska';
            this.poruka = res['message'];
          }
          this.korisnickoIme = '';
          this.lozinka = '';
          this.potvrdaLozinke = '';
          this.ime = '';
          this.prezime = '';
          this.zemlja = '';
          this.email = '';
          this.tip = '';
        }))
      }
      else {
        this.potvrdaLozinke = '';
        this.klasa = 'greska';
        this.poruka = 'Potvrdite unetu lozinku!';
      }
    }
    else{
      this.klasa='greska';
      this.poruka='Unesite lozinku u ispravnom formatu';
      this.lozinka='';
      this.potvrdaLozinke='';
    }
  }
}
