import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { KorisnikService } from '../korisnik.service';
import { Disciplina } from '../models/disciplina';
import { Ekipa } from '../models/ekipa';
import { Korisnik } from '../models/korisnik';
import { Rekord } from '../models/rekord';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { SportService } from '../sport.service';

@Component({
  selector: 'app-organizator',
  templateUrl: './organizator.component.html',
  styleUrls: ['./organizator.component.css']
})
export class OrganizatorComponent implements OnInit {

  constructor(private korisnikServis: KorisnikService, private sportServis: SportService, private ruter: Router) { }

  ngOnInit(): void {
    // this.organizator=JSON.parse(localStorage.getItem('ulogovan'));

    this.korisnikServis.dohvatiZahteve().subscribe((zah: Korisnik[]) => {
      this.zahtevi = zah;
      if (this.zahtevi.length == 0) {
        this.porukaPrikaz = 'Nema novih zahteva za registraciju';
        this.prikaz = false;
      }
    });

    this.sportServis.dohvatiSveSportove().subscribe((spo: Sport[]) => {
      this.sportovi = spo;
      this.sportoviTakmicenje = spo;
    })

    this.korisnikServis.dohvatiDelegate().subscribe((del: Korisnik[]) => {
      this.delegati = del;
    })

    this.sportServis.dohvatiRekorde().subscribe((r: Rekord[]) => {
      this.rekordi = r;
    })

  }

  // organizator:Korisnik;
  zahtevi: Korisnik[];
  porukaPrikaz: string;
  prikaz = true;

  prihvati(z: Korisnik) {
    // alert('PRIHVATI '+z.ime+" "+z.prezime+" "+z.korisnickoIme+" "+z.zemlja+" "+z.email+" "+z.tip+" "+z.lozinka);
    this.korisnikServis.prihvatiZahtev(z.korisnickoIme, z.lozinka, z.ime, z.prezime, z.zemlja, z.email, z.tip).subscribe((zah: Korisnik[]) => {
      this.zahtevi = zah;
      if (this.zahtevi.length == 0) {
        this.porukaPrikaz = 'Nema vise novih zahteva za registraciju';
        this.prikaz = false;
      }
    });
  }

  odbij(z: Korisnik) {
    this.korisnikServis.odbijZahtev(z.korisnickoIme).subscribe((zah: Korisnik[]) => {
      this.zahtevi = zah;
      if (this.zahtevi.length == 0) {
        this.porukaPrikaz = 'Nema vise novih zahteva za registraciju';
        this.prikaz = false;
      }
    });
  }

  sport = '';
  disciplina = '';
  sportovi: Sport[];
  discipline: Disciplina[];
  poruka = '';
  klasa: string;

  dodaj() {
    if (this.sport == '') {
      this.poruka = 'Izaberite sport!';
      this.klasa = 'greska';
    }
    else {
      this.sportServis.dodajSportDisciplinu(this.sport, this.disciplina).subscribe((res) => {
        this.poruka = res['message'];
        this.klasa = res['klasa'];
      });
    }
  }

  dohvatiDiscipline() {
    if (this.sport != '') {
      this.sportServis.dohvatiDiscipline(this.sport).subscribe((dis: Disciplina[]) => {
        this.discipline = dis;
        this.ruter.navigate(['organizator']);
      });
    }
    else {
      this.discipline = null;
    }
  }

  //formiraj takmicenje
  sportTakmicenje = '';
  disciplinaTakmicenje = '';
  sportoviTakmicenje: Sport[];
  disciplineTakmicenje: Disciplina[];
  porukaTakmicenje = '';
  klasaTakmicenje: string;

  delegati: Korisnik[];

  polTakmicenje = 'Z';
  datumPocetka: Date;
  datumKraja: Date;
  lokacija: string;
  delegatTakmicenja = '';//njegov username!
  takmicari: Sportista[];
  ekipe: Ekipa[];
  takmicariTakmicenje: Array<string>;
  ekipeTakmicenje: Array<string>;

  izabraniSport: Disciplina;


  dohvatiDisciplineTakmicenje() {
    this.disciplinaTakmicenje = '';
    this.disciplineTakmicenje = null;
    this.takmicari = null;
    this.ekipe = null;
    this.ekipeTakmicenje = undefined;
    this.takmicariTakmicenje = undefined;
    this.delegatTakmicenja = '';
    this.porukaTakmicenje = '';
    if (this.sportTakmicenje != '') {
      if (this.sportTakmicenje != 'kosarka' && this.sportTakmicenje != 'odbojka' && this.sportTakmicenje != 'vaterpolo') { //dohvati discipline
        this.sportServis.dohvatiDiscipline(this.sportTakmicenje).subscribe((dis: Disciplina[]) => {
          this.disciplineTakmicenje = dis;
          // this.ruter.navigate(['organizator']);
        });
      }
      else {//dohvati ekipe koje su registrovane za ovaj sport
        this.sportServis.dohvatiEkipe(this.sportTakmicenje, '', this.polTakmicenje).subscribe((ek: Ekipa[]) => {
          this.ekipe = ek;
        })
      }
    }
    else {
      this.disciplineTakmicenje = null;
    }
  }

  dohvatiSportisteIliEkipe() {
    this.takmicari = null;
    this.ekipe = null;
    this.ekipeTakmicenje = undefined;
    this.takmicariTakmicenje = undefined;
    // this.ekipe=null;
    this.sportServis.dohvatiIzabraniSport(this.sportTakmicenje, this.disciplinaTakmicenje).subscribe((d: Disciplina) => {
      this.izabraniSport = d;
      if (this.izabraniSport != null) {
        if (this.izabraniSport.vrsta == 'ekipni') {
          // alert('ekipni sport');
          //dohvati ekipe
          this.sportServis.dohvatiEkipe(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje).subscribe((ek: Ekipa[]) => {
            this.ekipe = ek;
          })
        }
        else {
          //alert('individualni sport');
          //dohvati sportiste
          if (this.disciplinaTakmicenje != '') {
            this.sportServis.dohvatiSportisteDiscipline(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje).subscribe((s: Sportista[]) => {
              this.takmicari = s;
              this.takmicariTakmicenje = null;
              this.ruter.navigate(['organizator']);
            });
          }
        }
      }
      // else {
      //   // alert('gresla');
      // }
    });
  }

  formirajTakmicenje() {
    // alert(this.sportTakmicenje + "-" + this.disciplinaTakmicenje + "-" + this.polTakmicenje + "-" + this.datumPocetka + "-" + this.datumKraja + "-" + this.lokacija + "-" + this.delegatTakmicenja + '-' + this.takmicariTakmicenje + '-' + this.ekipeTakmicenje);
    if (this.sportTakmicenje == '' || this.polTakmicenje == '' || this.datumPocetka == undefined || this.datumKraja == undefined || this.lokacija == '' || this.delegatTakmicenja == '') {
      this.porukaTakmicenje = 'Niste uneli sve potrebne podatke';
      this.klasaTakmicenje = 'greska';
    }
    else if (this.sportTakmicenje != 'kosarka' && this.sportTakmicenje != 'odbojka' && this.sportTakmicenje != 'vaterpolo' && this.disciplinaTakmicenje == '') {
      this.porukaTakmicenje = 'Izaberite disciplinu';
      this.klasaTakmicenje = 'greska';
    } else if ((this.datumPocetka.toString().split('-')[0] != this.datumKraja.toString().split('-')[0]) || (parseInt(this.datumPocetka.toString().split('-')[1]) > parseInt(this.datumKraja.toString().split('-')[1])) || (parseInt(this.datumPocetka.toString().split('-')[2]) > parseInt(this.datumKraja.toString().split('-')[2]))) {
      this.porukaTakmicenje = 'Proverite datume';
      this.klasaTakmicenje = 'greska';
    }
    else {
      this.sportServis.dohvatiIzabraniSport(this.sportTakmicenje, this.disciplinaTakmicenje).subscribe((d: Disciplina) => {
        this.izabraniSport = d;
        if (this.izabraniSport != null) {
          if (this.izabraniSport.vrsta == 'ekipni') {
            if (this.sportTakmicenje == 'tenis' && this.ekipeTakmicenje.length != 4 && this.ekipeTakmicenje.length != 8 && this.ekipeTakmicenje.length != 16) {
              this.porukaTakmicenje = 'Za tenis morate prijaviti 4,8 ili 16 ekipa';
              this.klasaTakmicenje = 'greska';
            }
            //za kosarku, odbojku i vaterpolo treba imati prijavljene najmanje 4 ekipe(polufinale) ili 8(cetvrtfinale) ili 12(ima grupnu fazu)
            else if(this.ekipeTakmicenje.length!=4 && this.ekipeTakmicenje.length!=8 && this.ekipeTakmicenje.length!=12){
              this.porukaTakmicenje = 'Za ekipne sportove morate prijaviti 4,8 ili 12 ekipa';
              this.klasaTakmicenje = 'greska';
            }
            else {
              //za ekipne sportove unosim samo koliko ima rundi u grupnoj fazi takmicenja a to je N-1
              // alert(this.ekipeTakmicenje.length);
              this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'ekipno', this.ekipeTakmicenje,this.ekipeTakmicenje.length-1).subscribe((res) => {
                this.porukaTakmicenje = res['message'];
                this.klasaTakmicenje = res['klasa'];
              })
            }
          }
          else {
            // alert('individualni sport');
            if (this.takmicariTakmicenje == undefined || this.takmicariTakmicenje.length > 8) {
              this.porukaTakmicenje = 'Minimalan broj takmicara je 1,a maksimalan 8';
              this.klasaTakmicenje = 'greska';
            }
            else if (this.sportTakmicenje == 'tenis' && this.takmicariTakmicenje.length != 4 && this.takmicariTakmicenje.length != 8 && this.takmicariTakmicenje.length != 16) {
              this.porukaTakmicenje = 'Za tenis morate prijaviti 4,8 ili 16 takmicara';
              this.klasaTakmicenje = 'greska';
            }
            else {
              //jedna runda
              if(this.disciplinaTakmicenje=='100m trcanje' || this.disciplinaTakmicenje=='200m trcanje' || this.disciplinaTakmicenje=='400m trcanje' || this.disciplinaTakmicenje=='800m trcanje' || this.disciplinaTakmicenje=='5000m trcanje' || this.disciplinaTakmicenje=='10000m trcanje' || this.disciplinaTakmicenje=='maraton' || this.disciplinaTakmicenje=='20km brzo hodanje' || this.disciplinaTakmicenje=='50km brzo hodanje' || this.disciplinaTakmicenje=='drumska trka 225km' || this.disciplinaTakmicenje=='100m leptir' || this.disciplinaTakmicenje=='200m slobodno'){
                this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'individ.', this.takmicariTakmicenje,1).subscribe((res) => {
                  this.porukaTakmicenje = res['message'];
                  this.klasaTakmicenje = res['klasa'];
                })
              }
              //tri runde
              if(this.disciplinaTakmicenje=='skok u vis' || this.disciplinaTakmicenje=='skok u dalj' || this.disciplinaTakmicenje=='troskok' || this.disciplinaTakmicenje=='skok s motkom' || this.disciplinaTakmicenje=='bacanje kugle' || this.disciplinaTakmicenje=='bacanje diska' || this.disciplinaTakmicenje=='bacanje kladiva' || this.disciplinaTakmicenje=='bacanje koplja'){
                this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'individ.', this.takmicariTakmicenje,3).subscribe((res) => {
                  this.porukaTakmicenje = res['message'];
                  this.klasaTakmicenje = res['klasa'];
                })
              }
              //6 rundi
              if(this.sportTakmicenje=='streljastvo'){
                this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'individ.', this.takmicariTakmicenje,6).subscribe((res) => {
                  this.porukaTakmicenje = res['message'];
                  this.klasaTakmicenje = res['klasa'];
                })
              }
              //tenis singl nemamo unapred poznat broj rundi zavisi od broja takmicara
              if(this.sportTakmicenje=='tenis'){
                this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'individ.', this.ekipeTakmicenje,0).subscribe((res) => {
                  this.porukaTakmicenje = res['message'];
                  this.klasaTakmicenje = res['klasa'];
                })
              }
              // this.sportServis.dodajTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje, this.datumPocetka, this.datumKraja, this.lokacija, this.delegatTakmicenja, 'individ.', this.takmicariTakmicenje).subscribe((res) => {
              //   this.porukaTakmicenje = res['message'];
              //   this.klasaTakmicenje = res['klasa'];
              // })
            }
          }
        }
        else {
          // alert('gresla');
        }
      });
    }
  }

  //rekordi
  rekordi: Rekord[];

}
