import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FitnessService } from '../../services/fitness.service';
import { User } from '../../models/fitness.models';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fitnessService = inject(FitnessService);
  protected readonly idPovodnehoPouzivatela = this.route.snapshot.paramMap.get('id');
  protected readonly uprava = this.idPovodnehoPouzivatela !== null;
  protected chyba = '';
  protected pouzivatel: User = this.vytvorModel();
  protected readonly nadpis = this.uprava ? 'Upraviť používateľa' : 'Pridať používateľa';

  constructor() {
    const existujuci = this.idPovodnehoPouzivatela
      ? this.fitnessService.najdiPouzivatela(this.idPovodnehoPouzivatela)
      : undefined;
    if (existujuci) this.pouzivatel = { ...existujuci };
  }

  protected uloz(): void {
    const user = this.pouzivatel;
    if (!user.meno.trim() || !user.osobneCislo.trim() || !user.telCislo.trim()) {
      this.chyba = 'Vyplň meno, osobné číslo a telefón.';
      return;
    }
    const duplicita = this.fitnessService.najdiPouzivatela(user.osobneCislo);
    if (!this.uprava && duplicita) {
      this.chyba = 'Používateľ s týmto osobným číslom už existuje.';
      return;
    }
    if (this.uprava) {
      if (!this.fitnessService.upravPouzivatela(this.idPovodnehoPouzivatela!, user)) {
        this.chyba = 'Používateľa sa nepodarilo nájsť.';
        return;
      }
    } else {
      this.fitnessService.pridajPouzivatela(user);
    }
    void this.router.navigate(['/pouzivatel', user.osobneCislo]);
  }

  private vytvorModel(): User {
    return {
      meno: '', datumNarodenia: '', pohlavie: '', osobneCislo: '', telCislo: '',
      partner: '', fitnessKarta: [], zoznamPlanovanychTreningov: []
    };
  }
}
