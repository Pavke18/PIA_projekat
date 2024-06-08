import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disciplina } from '../models/disciplina';
import { Sport } from '../models/sport';
import { Sportista } from '../models/sportista';
import { Zemlja } from '../models/zemlja';
import { SportService } from '../sport.service';
import { ZemljaService } from '../zemlja.service';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.css']
})
export class PocetnaComponent implements OnInit {

  constructor(private zemljaServis: ZemljaService, private ruter: Router, private sportServis: SportService) { }

  ngOnInit(): void {
    localStorage.clear();//odjava iz sistema
    this.zemljaServis.dohvatiSveZemlje().subscribe((zem: Zemlja[]) => {
      this.zemlje = zem;
    });

    this.zemljaServis.dohvatiSortirano().subscribe((zem: Zemlja[]) => {
      this.zemljeRang = zem;
      for (let i = 0; i < this.zemljeRang.length; i++) {
        this.zemljeRang[i].rang = i + 1;
      }
    });

    this.sportServis.dohvatiSveSportove().subscribe((spo: Sport[]) => {
      this.sportovi = spo;
    })

    this.sportServis.dohvatiSveDiscipline().subscribe((dis: Disciplina[]) => {
      this.discipline = dis;
    })
  }

  zemlje: Zemlja[];
  sportovi: Sport[];
  discipline: Disciplina[];

  prvi = 0;
  poslednji = 10;

  prethodna() {
    if (this.prvi - 10 >= 0) {
      this.poslednji -= 10;
      this.prvi -= 10;
    }
  }

  sledeca() {
    if (this.poslednji + 10 <= this.zemlje.length) {
      this.poslednji += 10;
      this.prvi += 10;
    }
  }

  prviMedalje = 0;
  poslednjiMedalje = 10;

  zemljeRang: Zemlja[];

  prethodnaM() {
    if (this.prviMedalje - 10 >= 0) {
      this.poslednjiMedalje -= 10;
      this.prviMedalje -= 10;
    }
  }

  sledecaM() {
    if (this.poslednjiMedalje + 10 <= this.zemlje.length) {
      this.poslednjiMedalje += 10;
      this.prviMedalje += 10;
    }
  }

  ime_prezime = '';
  zemlja = '';
  sport = '';
  disciplina = '';
  pol = '';
  medalja = false;

  sportisti: Sportista[];
  prikaz = false;
  porukaPrikaz: string;

  prviSportista: number;
  poslednjiSportista: number;
  paginacijaPrikaz = '';
  paginacijaPrikazNumber: number;

  pretraga() {
    this.paginacijaPrikazNumber = parseInt(this.paginacijaPrikaz);
    this.poslednjiSportista = this.paginacijaPrikazNumber;
    this.prviSportista = 0;
    //  alert('paginacija='+this.paginacijaPrikaz+" prvi="+this.prviSportista+" poslednji="+this.poslednjiSportista);
    this.sportServis.dohvatiSportiste(this.ime_prezime, this.zemlja, this.sport, this.disciplina, this.pol, this.medalja).subscribe((podaci: Sportista[]) => {
      this.sportisti = podaci;
      this.prikaz = true;
      this.porukaPrikaz = '';
      if (this.sportisti.length == 0) {
        this.porukaPrikaz = 'Nije pronadjen nijedan sportista za zadate parametre!';
        this.prikaz = false;
      }
    });
  }


  prethodnaS() {
    if (this.prviSportista - this.paginacijaPrikazNumber >= 0) {
      this.poslednjiSportista = this.poslednjiSportista - this.paginacijaPrikazNumber;
      this.prviSportista = this.prviSportista - this.paginacijaPrikazNumber;
    }
    // alert('paginacija='+this.paginacijaPrikaz+" prvi="+this.prviSportista+" poslednji="+this.poslednjiSportista);
  }

  sledecaS() {
    if (this.prviSportista + this.paginacijaPrikazNumber <= this.sportisti.length) {
      this.poslednjiSportista = this.poslednjiSportista + this.paginacijaPrikazNumber;
      this.prviSportista = this.prviSportista + this.paginacijaPrikazNumber;
    }
    // alert('paginacija='+this.paginacijaPrikaz+" prvi="+this.prviSportista+" poslednji="+this.poslednjiSportista);
  }

}