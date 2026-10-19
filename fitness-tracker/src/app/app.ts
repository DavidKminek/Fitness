import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FitnessService } from './fitness.service';
import { User, WorkoutRecord } from './models';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly fitnessService = inject(FitnessService);

  protected readonly title = signal('PulseTrack');
  protected readonly pouzivatelia = this.fitnessService.dajZoznamPouzivatelov();
  protected vybranyDatum = '2026-09-24';
  protected vybranyPouzivatel: User = this.pouzivatelia[0];
  protected oznam = '';

  protected get naplanovaniPouzivatelia(): User[] {
    return this.fitnessService.dajNaplanovanychPouzivatelov(this.vybranyDatum);
  }

  protected get treningyVybranehoPouzivatela(): WorkoutRecord[] {
    return this.fitnessService.dajFitnessKartu(this.vybranyPouzivatel.osobneCislo);
  }

  protected vyberPouzivatela(pouzivatel: User): void {
    this.vybranyPouzivatel = pouzivatel;
    this.oznam = '';
  }

  protected posliPripomienku(): void {
    this.oznam = this.fitnessService.posliSpravuPreOverenieRezervacie(
      this.vybranyPouzivatel.telCislo
    );
  }

  protected formatujDatum(datum: Date | string, sRokom = false): string {
    const hodnota = datum instanceof Date ? datum : new Date(`${datum}T12:00:00`);
    return new Intl.DateTimeFormat('sk-SK', {
      day: 'numeric',
      month: 'short',
      ...(sRokom ? { year: 'numeric' } : {})
    }).format(hodnota);
  }

  protected ikonaTreningu(typ: string): string {
    if (typ === 'Cardio') return '↗';
    if (typ === 'Posilňovňa') return '＋';
    return '✦';
  }
}
