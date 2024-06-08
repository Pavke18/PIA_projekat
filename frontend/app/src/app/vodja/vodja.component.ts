import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Disciplina } from '../models/disciplina';
import { Korisnik } from '../models/korisnik';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportService } from '../sport.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-vodja',
  templateUrl: './vodja.component.html',
  styleUrls: ['./vodja.component.css']
})
export class VodjaComponent implements OnInit {

  constructor(private sportServis: SportService, private korisnikServis: KorisnikService, private zemljaServis: ZemljaService, private ruter: Router) { }

  ngOnInit(): void {
    this.vodja = JSON.parse(localStorage.getItem('ulogovan'));

    this.sportServis.dohvatiDodateSportove().subscribe((spo: Sport[]) => {
      this.sportovi = spo;
    })

    this.zemljaServis.dohvatiZemlju(this.vodja.zemlja).subscribe((z: Zemlja) => {
      // this.vodjaZemlja=z;
      this.brSportista = z.brojSportista;
    })

    this.sportServis.dohvatiSveSportove().subscribe((s: Sport[]) => {
      this.spo = s;
    })
  }

  vodja: Korisnik;
  // vodjaZemlja:Zemlja;
  brSportista: number;

  //prijava pojedinca
  ime_prezime = '';
  pol = 'Z';
  sport = '';
  disciplina = '';
  sportovi: Sport[];
  discipline: Disciplina[];
  poruka = '';
  klasa: string;

  dohvatiDiscipline() {
    if (this.sport != '') {
      this.sportServis.dohvatiDodateDiscipline(this.sport).subscribe((dis: Disciplina[]) => {
        this.discipline = dis;
        // this.ruter.navigate(['vodja']);
      });
    }
    else {
      this.discipline = null;
    }
  }

  prijaviPojedinca() {
    if (this.ime_prezime == '' || this.sport == '' || (this.disciplina == '' && this.sport != 'kosarka' && this.sport != 'odbojka' && this.sport != 'vaterpolo')) {
      this.poruka = 'Niste uneli sve potrebne podatke';
      this.klasa = 'greska';
    }
    else {
      this.korisnikServis.ubaciSportistu(this.ime_prezime, this.vodja.zemlja, this.sport, this.disciplina, this.pol).subscribe((re) => {
        this.poruka = re['message'];
        this.klasa = re['klasa'];
        this.ime_prezime = '';
        this.sport = '';
        this.disciplina = '';
        if (this.poruka == 'Sportista je uspesno prijavljen' && re['azuriraj'] == 'da') {
          //uvecavam broj sportista te zemlje
          this.zemljaServis.azurirajBrojSportista(this.vodja.zemlja).subscribe();
          this.zemljaServis.dohvatiZemlju(this.vodja.zemlja).subscribe((z: Zemlja) => {
            this.brSportista = z.brojSportista;
          })
          this.ruter.navigate(['vodja']);
        }
      })
    }
  }

  //prijava ekipa
  sportEkipa = '';
  disciplinaEkipa = '';
  disciplineEkipa: Disciplina[];
  polEkipa = 'Z';
  igraci: Sportista[];
  igraciEkipa: Array<string>;
  porukaEkipa = '';
  klasaEkipa = '';

  dohvatiIgrace() {
    if (this.disciplinaEkipa != '') {
      this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportEkipa, this.disciplinaEkipa, this.polEkipa).subscribe((sp: Sportista[]) => {
        this.igraci = sp;
      });
    }
    // else{
    //   // this.igraci=null;
    // }
  }

  dohvatiDisciplineEkipa() {
    this.igraci = null;
    this.igraciEkipa = null;
    this.disciplinaEkipa = '';
    if (this.sportEkipa != '') {
      if (this.sportEkipa != 'kosarka' && this.sportEkipa != 'odbojka' && this.sportEkipa != 'vaterpolo') {
        this.sportServis.dohvatiDodateEkipneDiscipline(this.sportEkipa).subscribe((dis: Disciplina[]) => {
          this.disciplineEkipa = dis;
          // this.ruter.navigate(['vodja']);
        });
      }
      else {
        this.disciplineEkipa = null;
        this.disciplinaEkipa = '';
        this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportEkipa, this.disciplinaEkipa, this.polEkipa).subscribe((sp: Sportista[]) => {
          this.igraci = sp;
        });
      }
    }
    else {
      this.disciplineEkipa = null;
      this.disciplinaEkipa = '';
    }
  }

  klikRadio(v) {
    this.igraciEkipa = null;
    this.igraci = null;
    if (this.sportEkipa != '') {
      if (this.sportEkipa != 'kosarka' && this.sportEkipa != 'odbojka' && this.sportEkipa != 'vaterpolo' && this.disciplinaEkipa == '') {
        this.igraci = null;
      }
      else {
        this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportEkipa, this.disciplinaEkipa, v).subscribe((sp: Sportista[]) => {
          this.igraci = sp;
        });
      }
    }
  }

  izabranaDisciplina: Disciplina;

  prijaviEkipu() {
    // alert(this.sportEkipa + "-" + this.disciplinaEkipa + "-" + this.polEkipa + "-" + this.igraciEkipa);
    if ((this.sportEkipa == '') || (this.sportEkipa != 'kosarka' && this.sportEkipa != 'odbojka' && this.sportEkipa != 'vaterpolo' && this.disciplinaEkipa == '')) {
      this.porukaEkipa = 'Niste uneli sve potrebne podatke';
      this.klasaEkipa = 'greska';
    }
    else {
      this.sportServis.dohvatiIzabraniSport(this.sportEkipa, this.disciplinaEkipa).subscribe((d: Disciplina) => {
        this.izabranaDisciplina = d;
        if (this.igraciEkipa == null) {
          this.porukaEkipa = 'Niste dodali nijednog igraca u ekipi';
          this.klasaEkipa = 'greska';
        }
        else if (this.igraciEkipa.length < this.izabranaDisciplina.minIgraca || this.igraciEkipa.length > this.izabranaDisciplina.maxIgraca) {
          this.porukaEkipa = 'Minimalan broj igraca je ' + this.izabranaDisciplina.minIgraca + ',a maksimalan ' + this.izabranaDisciplina.maxIgraca;
          this.klasaEkipa = 'greska';
        } else {
          //ubacivanje ekipa u bazu
          this.korisnikServis.ubaciEkipu(this.vodja.zemlja, this.sportEkipa, this.disciplinaEkipa, this.polEkipa, this.igraciEkipa).subscribe((r) => {
            this.klasaEkipa = r['klasa'];
            this.porukaEkipa = r['message'];
          })
        }
      });
    }
  }

  sportPrikaz = '';
  disciplinaPrikaz = '';
  spo: Sport[];
  disc: Disciplina[];
  broj: number;
  sportisti: Sportista[];
  prikazi = false;
  porukaPrikaz = '';

  dohvatiSportisteIDiscipline() {
    this.disciplinaPrikaz = '';
    this.sportisti = undefined;
    this.porukaPrikaz='';
    this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportPrikaz, this.disciplinaPrikaz, '').subscribe((s: Sportista[]) => {
      this.broj = s.length;
    });
    this.sportServis.dohvatiDiscipline(this.sportPrikaz).subscribe((d: Disciplina[]) => {
      this.disc = d;
    });

    //prikazi sportiste za kosarku, odbojku i vaterpolo
    if (this.sportPrikaz == 'kosarka' || this.sportPrikaz == 'odbojka' || this.sportPrikaz == 'vaterpolo') {
      this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportPrikaz, '', '').subscribe((s: Sportista[]) => {
        this.sportisti = s;
        this.sportisti.sort((a, b) => (a.ime_prezime < b.ime_prezime ? -1 : 1));
        if (s.length == 0) {
          this.prikazi = false;
          this.porukaPrikaz = 'Nema registrovanih takmicara za sport ' + this.sportPrikaz;
        }
        else {
          this.prikazi = true;
          this.porukaPrikaz='';
        }
      });
    }
    else {
      this.sportisti = null;
      this.prikazi = false;
    }
  }

  dohvatiSportiste() {
    // this.sportisti = undefined;
    if (this.disciplinaPrikaz != '') {
      this.sportServis.dohvatiSportisteZaEkipu(this.vodja.zemlja, this.sportPrikaz, this.disciplinaPrikaz, '').subscribe((s: Sportista[]) => {
        this.sportisti = s;
        this.sportisti.sort((a, b) => (a.ime_prezime < b.ime_prezime ? -1 : 1));
        if (s.length == 0) {
          this.prikazi = false;
          this.porukaPrikaz = 'Nema registrovanih takmicara za sport ' + this.sportPrikaz +" "+this.disciplinaPrikaz;
        }
        else {
          this.prikazi = true;
          this.porukaPrikaz='';
        }
      });
    }
  }

  
}
