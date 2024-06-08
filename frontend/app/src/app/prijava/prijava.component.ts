import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Korisnik } from 'src/app/models/korisnik';
import { KorisnikService } from '../korisnik.service';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css']
})
export class PrijavaComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private ruter: Router) { }

  ngOnInit(): void {
    localStorage.clear();//odjava iz sistema
  }

  korisnickoIme: string;
  lozinka: string;

  poruka:string;

  prijavaKorisnika() {
    if(this.korisnickoIme=="" || this.lozinka=="" || this.korisnickoIme==undefined || this.lozinka==undefined){
      this.poruka='Sva polja su obavezna!';
      return;
    }
    this.korisnikServis.prijavaService(this.korisnickoIme, this.lozinka).subscribe((kor: Korisnik) => {
      if (kor) {
        localStorage.setItem('ulogovan', JSON.stringify(kor)); //hvatam trenutno ulogovanog korisnikaa
        if (kor.tip == 'organizator') {
          this.ruter.navigate(['organizator']);
        }
        else if (kor.tip == 'delegat') {
          this.ruter.navigate(['delegat']);
        }
        else if (kor.tip == 'vodja') {
          this.ruter.navigate(['vodja']);
        }
        else {
          alert('Nepostojeci tip korisnika');
        }
      }
      else {
        this.poruka='Unesite ispravne podatke!';
        this.korisnickoIme='';
        this.lozinka='';
      }
    })
  }

}
