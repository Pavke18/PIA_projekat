import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DelegatComponent } from './delegat/delegat.component';
import { OrganizatorComponent } from './organizator/organizator.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { PromenaLozinkeComponent } from './promena-lozinke/promena-lozinke.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { VodjaComponent } from './vodja/vodja.component';

const routes: Routes = [
  {path:'', component:PocetnaComponent},
  {path:'prijava', component:PrijavaComponent},
  {path:'registracija', component:RegistracijaComponent},
  {path:'promena_lozinke', component:PromenaLozinkeComponent},
  {path:'organizator', component:OrganizatorComponent},
  {path:'delegat', component:DelegatComponent},
  {path:'vodja', component:VodjaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
