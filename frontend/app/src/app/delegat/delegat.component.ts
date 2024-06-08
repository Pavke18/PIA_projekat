import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Korisnik } from '../models/korisnik';
import { Rezultati } from '../models/rezultati';
import { Takmicenje } from '../models/takmicenje';
import { TakmicenjeService } from '../takmicenje.service';

@Component({
  selector: 'app-delegat',
  templateUrl: './delegat.component.html',
  styleUrls: ['./delegat.component.css']
})
export class DelegatComponent implements OnInit {

  constructor(private takmicenjeServis: TakmicenjeService) { }

  ngOnInit(): void {
    this.delegat = JSON.parse(localStorage.getItem('ulogovan'));

    this.takmicenjeServis.dohvatiMojaTakmicenja(this.delegat.korisnickoIme).subscribe((tak: Takmicenje[]) => {
      this.takmicenja = tak;
      this.takmicenjaRe = tak;
    })
  }

  delegat: Korisnik;

  //UNOS RASPOREDA
  individualanSport: boolean;
  ekipniSport: boolean;
  algoritam: boolean;

  takmicenjeRaspored = '';
  takmicenja: Takmicenje[];
  izabranoTakmicenje: Takmicenje;
  sportTakmicenje = '';
  disciplinaTakmicenje = '';
  polTakmicenje = '';
  datumUtakmice: Date;
  vremeUtakmice: Time;
  trajanjeTak = '';
  porukaRaspored = '';
  klasaRaspored = '';

  godinaPocetkaTakmicenja: number;
  mesecPocetkaTakmicenja: number;
  danPocetkaTakmicenja: number;
  godinaKrajaTakmicenja: number;
  mesecKrajaTakmicenja: number;
  danKrajaTakmicenja: number;

  godinaPocetka: number;
  mesecPocetka: number;
  danPocetka: number;

  brojRundiRaspored: number[];
  rundaRaspored = '';

  takmicari: Array<string>;

  dohvatiPodatkeOTakmicenju() {
    this.trajanjeTak = '';
    this.rundaRaspored = '';
    this.porukaRaspored = '';
    this.datumUtakmice = undefined;
    this.vremeUtakmice = undefined;
    this.takmicari = undefined;
    let array = this.takmicenjeRaspored.split(",");
    this.sportTakmicenje = array[0];
    this.polTakmicenje = array[1];
    if (array.length > 2)
      this.disciplinaTakmicenje = array[2];
    else
      this.disciplinaTakmicenje = '';
    // alert(this.disciplinaTakmicenje);
    this.takmicenjeServis.dohvatiTakmicenje(this.sportTakmicenje, this.disciplinaTakmicenje, this.polTakmicenje).subscribe((tak: Takmicenje) => {
      this.izabranoTakmicenje = tak;
      let broj = this.izabranoTakmicenje.brRundi;
      this.brojRundiRaspored = [];
      for (let i = 0; broj > 0; i++, broj--) {
        this.brojRundiRaspored[i] = broj;
      }
      if (this.izabranoTakmicenje.tip == 'ekipno') {
        this.individualanSport = false;
        this.algoritam = true;
        this.ekipniSport = false;
      } else {
        this.algoritam = false;
        this.individualanSport = true;
        this.ekipniSport = false;
      }
      let datumKraja = this.izabranoTakmicenje.datumKraja.toString().split('-');
      let datumPocetka = this.izabranoTakmicenje.datumPocetka.toString().split('-');
      this.godinaPocetkaTakmicenja = parseInt(datumPocetka[0]);
      this.mesecPocetkaTakmicenja = parseInt(datumPocetka[1]);
      this.danPocetkaTakmicenja = parseInt(datumPocetka[2]);
      this.godinaKrajaTakmicenja = parseInt(datumKraja[0]);
      this.mesecKrajaTakmicenja = parseInt(datumKraja[1]);
      this.danKrajaTakmicenja = parseInt(datumKraja[2]);
      this.trajanjeTak = 'Izabrano takmicenje traje od ' + this.danPocetkaTakmicenja + '.' + this.mesecPocetkaTakmicenja + '.' + this.godinaPocetkaTakmicenja + '. do ' + this.danKrajaTakmicenja + '.' + this.mesecKrajaTakmicenja + '.' + this.godinaKrajaTakmicenja + '.';
    })
  }

  unesiRasporedIndivid() {
    this.porukaRaspored = '';
    if (this.takmicenjeRaspored == '' || this.datumUtakmice == undefined || this.vremeUtakmice == undefined || this.rundaRaspored == '') {
      this.porukaRaspored = 'Unesite sve podatke!';
      this.klasaRaspored = 'greska';
    }
    else {
      let array = this.datumUtakmice.toString().split('-');
      this.godinaPocetka = parseInt(array[0]);
      this.mesecPocetka = parseInt(array[1]);
      this.danPocetka = parseInt(array[2]);
      //treba proveriti datum da li se poklapa sa datumom izabranog takmicenja 
      if (this.godinaPocetka >= this.godinaPocetkaTakmicenja && this.godinaPocetka <= this.godinaKrajaTakmicenja && this.mesecPocetka >= this.mesecPocetkaTakmicenja && this.mesecPocetka <= this.mesecKrajaTakmicenja && this.danPocetka >= this.danPocetkaTakmicenja && this.danPocetka <= this.danKrajaTakmicenja) {
        //u bazi treba videti da li na istoj lokaciji i u isto vreme vec neko ima rezervisan teren i da li je za izabrani sport vec unet raspored(ako jeste updejtovati vreme i datum!!!!)
        this.takmicenjeServis.dodajRasporedTakmicenjaIndividualniSport(this.izabranoTakmicenje.sport, this.izabranoTakmicenje.disciplina, this.izabranoTakmicenje.pol, this.datumUtakmice, this.vremeUtakmice, this.izabranoTakmicenje.takmicari, this.izabranoTakmicenje.lokacija, this.rundaRaspored).subscribe((res) => {
          this.porukaRaspored = res['message'];
          this.klasaRaspored = res['klasa'];
        });
      }
      else {
        this.porukaRaspored = 'Proverite unet datum!';
        this.klasaRaspored = 'greska';
      }
    }
  }

  unesiRasporedEkipno() {
    this.porukaRaspored = '';
    if (this.takmicenjeRaspored == '' || this.datumUtakmice == undefined || this.vremeUtakmice == undefined) {
      this.porukaRaspored = 'Unesite sve podatke!';
      this.klasaRaspored = 'greska';
    }
    else {
      let array = this.datumUtakmice.toString().split('-');
      this.godinaPocetka = parseInt(array[0]);
      this.mesecPocetka = parseInt(array[1]);
      this.danPocetka = parseInt(array[2]);
      if (this.godinaPocetka >= this.godinaPocetkaTakmicenja && this.godinaPocetka <= this.godinaKrajaTakmicenja && this.mesecPocetka >= this.mesecPocetkaTakmicenja && this.mesecPocetka <= this.mesecKrajaTakmicenja && this.danPocetka >= this.danPocetkaTakmicenja && this.danPocetka <= this.danKrajaTakmicenja) {
        //u bazi treba videti da li na istoj lokaciji i u isto vreme vec neko ima rezervisan teren

      }
      else {
        this.porukaRaspored = 'Proverite unet datum!';
        this.klasaRaspored = 'greska';
      }
    }
  }

  algoritamEkipniSportovi() {
    this.ekipniSport = true;
    this.algoritam = false;
    //treba onaj algoritam za rasporedjivanje da se radi u zavisnosti od broja prijavljenih ekipa
    //brRundi u bazi takmicenje je samo za grupnu fazu!!! N-1
    //4 prijavljene ekipe->polufinale
    //8 prijavljenih ekipa->cetvrtfinale
    //12 prijavljenih ekipa->grupna faza(svako sa svakim igra al se dele u 2 grupe)
    alert(this.izabranoTakmicenje.brRundi);
  }


  //UNOS REZULTATA
  takmicenjeRezultati = '';
  takmicenjaRe: Takmicenje[];
  rezultatiRunde: Array<string>;
  sportRezultat = '';
  disciplinaRezultat = '';
  polRezultat = '';
  izabranoTakmicenjeRezul: Takmicenje;

  rundaRezultat = '';
  brojRundi: number[];

  takmicariRez: Array<string>;

  nizRezultata = [];
  rezultatiSvi = [];

  porukaRezultat = '';
  klasaRezultat = '';

  igraci: boolean;
  ekipe: boolean;

  unesiRezultate: boolean; //treba da bude false kada unesem rezultate za poslednju rundu
  krajTakmicenja: boolean;

  brojTakmicaraRez: number;

  dohvatiTakmicare() {
    this.ekipe = false;
    this.igraci = false;
    this.unesiRezultate = false;
    this.krajTakmicenja = false;
    this.takmicariRez = undefined;
    this.rezultatiRunde = undefined;
    this.nizRezultata = [];
    this.porukaRezultat = '';
    this.rundaRezultat = '';
    this.pobedniciTakmicenja = false;
    let array = this.takmicenjeRezultati.split(",");
    this.sportRezultat = array[0];
    this.polRezultat = array[1];
    this.disciplinaRezultat = array[2];
    if (array.length > 2)
      this.disciplinaRezultat = array[2];
    else
      this.disciplinaRezultat = '';
    this.takmicenjeServis.dohvatiTakmicenje(this.sportRezultat, this.disciplinaRezultat, this.polRezultat).subscribe((tak: Takmicenje) => {
      this.izabranoTakmicenjeRezul = tak;
      this.unesiRezultate = true;
      if (this.izabranoTakmicenjeRezul.tip == 'ekipno' || this.izabranoTakmicenjeRezul.sport == 'tenis') {
        // alert('ekipno ili tenis');
        this.ekipe = true;
      }
      else {
        let broj = this.izabranoTakmicenjeRezul.brRundi;
        this.brojRundi = [];
        for (let i = 0; broj > 0; i++, broj--) {
          this.brojRundi[i] = broj;
        }
        this.igraci = true;
        this.takmicariRez = this.izabranoTakmicenjeRezul.takmicari.toString().split(',');
        this.brojTakmicaraRez = this.takmicariRez.length;
        // alert(this.brojTakmicaraRez);
      }
    })
  }

  formatRezultata = '';

  unesiRezultateTakmicenja() {
    //proveri da li je unet raspored za to takmicenje 
    var regex;
    this.porukaRezultat = '';
    this.formatRezultata = '';

    if (this.takmicenjeRezultati == '' || this.rundaRezultat == '' || this.nizRezultata.length == 0) {
      this.porukaRezultat = 'Unesite sve podatke';
      this.klasaRezultat = 'greska';
    }
    else {
      for (let i = 0; i < this.takmicariRez.length; i++) {
        if (this.nizRezultata[i] == undefined || this.nizRezultata[i] == '') {
          this.porukaRezultat = 'Unesite rezultate za svakog takmicara';
          this.klasaRezultat = 'greska';
          break;
        }
      }
      if (this.porukaRezultat != 'Unesite rezultate za svakog takmicara') {
        // alert('sve okej');
        if (this.izabranoTakmicenjeRezul.disciplina == '100m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '200m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '400m trcanje' || this.izabranoTakmicenjeRezul.sport == 'plivanje') {
          regex = new RegExp('^[0-9][0-9],[0-9][0-9]$');
          this.formatRezultata = 'Format rezultata je SS,TT';
        }
        if (this.izabranoTakmicenjeRezul.disciplina == '800m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '5000m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '10000m trcanje') {
          regex = new RegExp('^[0-9][0-9]:[0-9][0-9],[0-9][0-9]$');
          this.formatRezultata = 'Format rezultata je MM:SS,TT';
        }
        if (this.izabranoTakmicenjeRezul.disciplina == 'maraton' || this.izabranoTakmicenjeRezul.disciplina == '20km brzo hodanje' || this.izabranoTakmicenjeRezul.disciplina == '50km brzo hodanje' || this.izabranoTakmicenjeRezul.sport == 'biciklizam') {
          regex = new RegExp('^[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$');
          this.formatRezultata = 'Format rezultata je HH:MM:SS';
        }
        if (this.izabranoTakmicenjeRezul.disciplina == 'skok u vis' || this.izabranoTakmicenjeRezul.disciplina == 'skok u dalj' || this.izabranoTakmicenjeRezul.disciplina == 'troskok' || this.izabranoTakmicenjeRezul.disciplina == 'skok s motkom') {
          regex = new RegExp('^[0-9],[0-9][0-9]$');
          this.formatRezultata = 'Format rezultata je M,CM';
        }
        if (this.izabranoTakmicenjeRezul.disciplina == 'bacanje kugle' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje diska' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje kladiva' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje koplja') {
          regex = new RegExp('^[0-9][0-9],[0-9][0-9]$');
          this.formatRezultata = 'Format rezultata je MM,CM';
        }
        if (this.izabranoTakmicenjeRezul.sport == 'kosarka' || this.izabranoTakmicenjeRezul.sport == 'vaterpolo') {
          regex = new RegExp('^[0-9]+:[0-9]+$');
          this.formatRezultata = 'Format rezultata je brPoena TIM1:brPoena TIM2';
        }
        if (this.izabranoTakmicenjeRezul.sport == 'tenis') {
          regex = new RegExp('^(2:1)|(2:0)|(0:2)|(1:2)$');
          this.formatRezultata = 'Format rezultata je brSetova TIM1:brSetova TIM2, pobednik mora imati 2 dobijena seta';
        }
        if (this.izabranoTakmicenjeRezul.sport == 'odbojka') {
          regex = new RegExp('^(3:0)|(3:1)|(3:2)|(0:3)|(1:3)|(2:3)$');
          this.formatRezultata = 'Format rezultata je brSetova TIM1:brSetova TIM2, pobednik mora imati 3 dobijena seta';
        }
        if (this.izabranoTakmicenjeRezul.sport == 'streljastvo') {
          regex = new RegExp('[0-9]+');//nesto nece da radi sa \d
          this.formatRezultata = 'Format rezultata je broj pogodjenih krugova';
        }
        for (let i = 0; i < this.takmicariRez.length; i++) {
          if (!regex.test(this.nizRezultata[i])) {
            // alert(regex.test(this.nizRezultata[i]));
            this.porukaRezultat = 'Neispravan format rezultata! ' + this.formatRezultata;
            this.klasaRezultat = 'greska';
            break;
          }
        }

        if (this.porukaRezultat == '') {
          //sve je u redu sa unetim podacima; treba u bazi prvo da proverim da li je unet raspored za izabrano takmicenje i da li su uneti rezultati prethodnih rundi i ako jeste  da unesem rezultate u bazi
          // alert('Sve je lepo uneseno...Proveri bazu');
          this.rezultatiRunde = [];
          for (let i = 0; i < this.takmicariRez.length; i++) {
            this.rezultatiRunde[i] = this.takmicariRez[i] + "-" + this.nizRezultata[i];
          }

          this.takmicenjeServis.dodajRezultatTakmicenja(this.sportRezultat, this.disciplinaRezultat, this.polRezultat, this.rundaRezultat, this.rezultatiRunde).subscribe((res) => {
            this.porukaRezultat = res['message'];
            this.klasaRezultat = res['klasa'];
            if (this.porukaRezultat == 'Rezultati za ' + this.brojRundi.length + '. rundu su uspesno uneti') {
              this.unesiRezultate = false;
              this.krajTakmicenja = true;
            }
          });
        }
      }
    }
  }

  naKraju: Rezultati; //pokupi sve rezultate za izabrano takmicenje
  naKrajuTakmicari: Array<string>;
  pobednici: Array<string>;
  pobedniciTakmicenja = false;

  kraj() {//treba da zatvori takmicenje i inkrementira medalje
    this.porukaRezultat = 'USPESNO ZAVRSENO TAKMICENJE!!!';
    this.klasaRezultat = 'OK';
    this.naKrajuTakmicari = [];
    this.pobednici = [];
    this.pobedniciTakmicenja = false;
    //BAZA da proveri ko je osvojio medalju
    if (this.izabranoTakmicenjeRezul.tip != 'ekipno' && this.izabranoTakmicenjeRezul.sport != 'tenis') {

      //najbolji rezultat je max
      if (this.izabranoTakmicenjeRezul.sport == 'streljastvo' || this.izabranoTakmicenjeRezul.disciplina == 'skok u vis' || this.izabranoTakmicenjeRezul.disciplina == 'skok u dalj' || this.izabranoTakmicenjeRezul.disciplina == 'troskok' || this.izabranoTakmicenjeRezul.disciplina == 'skok s motkom' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje kugle' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje diska' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje kladiva' || this.izabranoTakmicenjeRezul.disciplina == 'bacanje koplja') {
        for (let i = 1; i <= this.brojRundi.length; i++) {
          this.takmicenjeServis.dohvatiRezultateTakmicenja(this.sportRezultat, this.disciplinaRezultat, this.polRezultat, i).subscribe((rez: Rezultati) => {
            this.naKraju = rez;
            for (let j = 0; j < this.naKraju.takmicari.length; j++) {
              let array = this.naKraju.takmicari[j].split('-');
              let ime = array[0];
              // let zemlja=array[1];
              let rezultat = array[2];
              // alert(ime+" "+zemlja+" "+rezultat);
              if (i == 1) {
                this.naKrajuTakmicari[j] = this.naKraju.takmicari[j];
              }
              else {
                if (this.naKrajuTakmicari[j].split('-')[2] < rezultat) { //uzima samo najbolji rezultat
                  // alert(this.naKrajuTakmicari[j].split('-')[2] +'je manje od'+rezultat+'za '+ime);
                  this.naKrajuTakmicari[j] = this.naKraju.takmicari[j];
                }
              }
              if (i == this.brojRundi.length && j == this.naKraju.takmicari.length - 1) {
                //na kraju ih sortiraj po plasmanu
                this.naKrajuTakmicari.sort((a, b) => (a.split('-')[2] > b.split('-')[2] ? -1 : 1));
                alert(this.naKrajuTakmicari);
                //treba za prve tri zemlje da inkrementiramo broj medalja i za te sportiset da postavim flag medalja na true
                for (let m = 0; m < 3; m++) {
                  let sportista = this.naKrajuTakmicari[m].split('-')[0];
                  let zemlja = this.naKrajuTakmicari[m].split('-')[1];
                  let vrsta = (m == 0 ? 'zlatna' : (m == 1) ? 'srebrna' : 'bronzana');
                  this.takmicenjeServis.osvojenaMedaljaIndivid(sportista, zemlja, vrsta, this.disciplinaRezultat).subscribe(() => {
                    this.pobednici[m] = this.naKrajuTakmicari[m];
                  });
                }
                this.pobedniciTakmicenja = true;
                // alert(this.pobedniciTakmicenja);
                this.krajTakmicenja = false;
                // alert(this.naKrajuTakmicari);
              }
            }
          });
        }
      }

      //najbolji rezultat je min
      else {
        for (let i = 1; i <= this.brojRundi.length; i++) {
          this.takmicenjeServis.dohvatiRezultateTakmicenja(this.sportRezultat, this.disciplinaRezultat, this.polRezultat, i).subscribe((rez: Rezultati) => {
            this.naKraju = rez;
            for (let j = 0; j < this.naKraju.takmicari.length; j++) {
              let array = this.naKraju.takmicari[j].split('-');
              let ime = array[0];
              let zemlja = array[1];
              let rezultat = array[2];

              if (this.izabranoTakmicenjeRezul.disciplina == '800m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '5000m trcanje' || this.izabranoTakmicenjeRezul.disciplina == '10000m trcanje' || this.izabranoTakmicenjeRezul.disciplina == 'maraton' || this.izabranoTakmicenjeRezul.disciplina == '20km brzo hodanje' || this.izabranoTakmicenjeRezul.disciplina == '50km brzo hodanje' || this.izabranoTakmicenjeRezul.sport == 'biciklizam') {
                rezultat = '';
                let rez = array[2];
                let r = rez.split(":");
                for (let k = 0; k < r.length; k++) {
                  rezultat += r[k];
                  if (k != r.length - 1)
                    rezultat += ",";
                }
                // alert('CC:MM,SS->CC,MM,SS');
              }
              // alert(ime + " " + zemlja + " " + rezultat);
              if (i == 1) {
                this.naKrajuTakmicari[j] = this.naKraju.takmicari[j];
              }
              else {
                if (this.naKrajuTakmicari[j].split('-')[2] > rezultat) { //uzima samo najbolji rezultat
                  this.naKrajuTakmicari[j] = this.naKraju.takmicari[j];
                }
              }
              // alert(this.naKrajuTakmicari[j]);
              if (i == this.brojRundi.length && j == this.naKraju.takmicari.length - 1) {
                //na kraju ih sortiraj po plasmanu
                this.naKrajuTakmicari.sort((a, b) => (a.split('-')[2] < b.split('-')[2] ? -1 : 1));
                // alert(this.naKrajuTakmicari);
                //treba za prve tri zemlje da inkrementiramo broj medalja i za te sportiset da postavim flag medalja na true
                for (let m = 0; m < 3; m++) {
                  let sportista = this.naKrajuTakmicari[m].split('-')[0];
                  let zemlja = this.naKrajuTakmicari[m].split('-')[1];
                  let vrsta = (m == 0 ? 'zlatna' : (m == 1) ? 'srebrna' : 'bronzana');
                  this.takmicenjeServis.osvojenaMedaljaIndivid(sportista, zemlja, vrsta, this.disciplinaRezultat).subscribe(() => {
                    this.pobednici[m] = this.naKrajuTakmicari[m];
                  });
                }
                this.pobedniciTakmicenja = true;
                // alert(this.pobedniciTakmicenja);
                this.krajTakmicenja = false;
                // alert(this.naKrajuTakmicari);
              }
            }
          });
        }
      }
    }
    else {
      //za ekipne sportove i za tenis
    }
  }
}
