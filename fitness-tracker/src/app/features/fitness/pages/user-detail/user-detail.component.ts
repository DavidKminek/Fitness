import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { FitnessService } from '../../services/fitness.service';

@Component({
  selector: 'app-user-detail',
  imports: [RouterLink],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly fitnessService = inject(FitnessService);
  private readonly routeParams = toSignal(this.route.paramMap);
  protected readonly pouzivatel = computed(() =>
    this.fitnessService.najdiPouzivatela(this.routeParams()?.get('id') ?? '')
  );
}
