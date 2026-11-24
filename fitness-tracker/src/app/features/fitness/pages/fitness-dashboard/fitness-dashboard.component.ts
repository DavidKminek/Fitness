import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FitnessService } from '../../services/fitness.service';
import { User } from '../../models/fitness.models';

@Component({
  selector: 'app-fitness-dashboard',
  imports: [FormsModule, RouterLink],
  templateUrl: './fitness-dashboard.component.html',
  styleUrl: './fitness-dashboard.component.scss'
})
export class FitnessDashboardComponent {
  private readonly fitnessService = inject(FitnessService);
  protected get pouzivatelia(): User[] {
    return this.fitnessService.dajZoznamPouzivatelov();
  }
  protected vybranyDatum = '2026-10-20';

  protected get naplanovaniPouzivatelia(): User[] {
    return this.fitnessService.dajNaplanovanychPouzivatelov(this.vybranyDatum);
  }
}
