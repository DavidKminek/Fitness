import { Routes } from '@angular/router';
import { FitnessDashboardComponent } from './features/fitness/pages/fitness-dashboard/fitness-dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { UserDetailComponent } from './features/fitness/pages/user-detail/user-detail.component';
import { UserFormComponent } from './features/fitness/pages/user-form/user-form.component';

export const routes: Routes = [
	{ path: '', component: FitnessDashboardComponent, title: 'Fitness Tracker' },
	{ path: 'pouzivatel/novy', component: UserFormComponent, title: 'Nový používateľ' },
	{ path: 'pouzivatel/:id/upravit', component: UserFormComponent, title: 'Upraviť používateľa' },
	{ path: 'pouzivatel/:id', component: UserDetailComponent, title: 'Detail používateľa' },
	{ path: '**', component: NotFoundComponent, title: 'Stránka sa nenašla' }
];
