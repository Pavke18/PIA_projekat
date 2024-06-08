import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-promena-lozinke',
  templateUrl: './promena-lozinke.component.html',
  styleUrls: ['./promena-lozinke.component.css']
})
export class PromenaLozinkeComponent implements OnInit {

  constructor(private ruter: Router, private korisnikServis: KorisnikService) { }

  ngOnInit(): void {
  }

  korisnickoIme: string;
  lozinka: string;
  nova: string;

  poruka: string;

  nazad() {
    this.ruter.navigate(['prijava']);
  }

  potvrdi() {
    if (this.korisnickoIme == '' || this.lozinka == '' || this.nova == '' || this.korisnickoIme == undefined || this.lozinka == undefined || this.nova == undefined) {
      this.poruka = 'Sva polja su obavezna!';
      return;
    }

    // var regexp = new RegExp('^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*]){2,}).{8,12}$');
    var regexp=new RegExp('(?!.*(.)\\1\\1)(?=(.*[A-Z]){1,})(?=(.*[a-z]){3,})(?=(.*[0-9]){2,})(?=(.*[!@#$%&]){2,})^[A-Za-z].{7,11}$');
    var test = regexp.test(this.nova);
    //  alert(test + "");
    if (test == true) {
      this.korisnikServis.promenaLozinke(this.korisnickoIme, this.lozinka, this.nova).subscribe(rez => {
        if (rez['message'] == "lozinka promenjena")
          this.ruter.navigate(['prijava']);
        else {
          this.poruka = rez['message'];
          if (this.poruka == 'Unesite ispravne podatke!') {
            this.korisnickoIme = '';
            this.lozinka = '';
            this.nova = '';
          }
          if (this.poruka == 'Nova lozinka ne sme biti ista kao stara') {
            this.nova = '';
          }
        }
      });
    }
    else {
      this.poruka = 'Unesite lozinku u ispravnom formatu';
      this.nova = '';
    }
  }
}
