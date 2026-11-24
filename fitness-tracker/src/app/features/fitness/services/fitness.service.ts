import { Injectable } from '@angular/core';

import { User, WorkoutRecord } from '../models/fitness.models';

@Injectable({ providedIn: 'root' })
export class FitnessService {
  private readonly pouzivatelia: User[] = [
    {
      meno: 'Jana Nováková',
      datumNarodenia: '1995-04-18',
      pohlavie: 'Žena',
      osobneCislo: 'FIT-001',
      partner: 'Všeobecná zdravotná poisťovňa',
      telCislo: '+421 901 234 567',
      fitnessKarta: [
        {
          datumTreningu: '2026-09-18',
          popisTreningu: 'Intervalový beh a strečing',
          typTreningu: 'Cardio',
          klasifikacia: 'Stredná',
          doplnky: ['Iontový nápoj']
        }
      ],
      zoznamPlanovanychTreningov: ['2026-10-20', '2026-10-21', '2026-10-22', '2026-10-23']
    },
    {
      meno: 'Martin Kováč',
      datumNarodenia: '1989-11-02',
      pohlavie: 'Muž',
      osobneCislo: 'FIT-002',
      partner: 'Dôvera',
      telCislo: '+421 902 345 678',
      fitnessKarta: [
        {
          datumTreningu: '2026-09-20',
          popisTreningu: 'Silový tréning hornej časti tela',
          typTreningu: 'Posilňovňa',
          klasifikacia: 'Vysoká',
          doplnky: ['Proteín', 'Kreatín']
        }
      ],
      zoznamPlanovanychTreningov: ['2026-10-20', '2026-10-22', '2026-10-21']
    }
  ];

  dajZoznamPouzivatelov(): User[] {
    return this.pouzivatelia;
  }

  najdiPouzivatela(osobneCislo: string): User | undefined {
    return this.pouzivatelia.find((pouzivatel) => pouzivatel.osobneCislo === osobneCislo);
  }

  pridajPouzivatela(pouzivatel: User): void {
    this.pouzivatelia.push(pouzivatel);
  }

  upravPouzivatela(osobneCislo: string, upravenyPouzivatel: User): boolean {
    const index = this.pouzivatelia.findIndex((pouzivatel) => pouzivatel.osobneCislo === osobneCislo);
    if (index < 0) return false;
    this.pouzivatelia[index] = upravenyPouzivatel;
    return true;
  }

  dajNaplanovanychPouzivatelov(datum: Date | string): User[] {
    const hladanyDatum = this.normalizujDatum(datum);

    return this.pouzivatelia.filter((pouzivatel) =>
      pouzivatel.zoznamPlanovanychTreningov.some(
        (planovanyTrening) => this.normalizujDatum(planovanyTrening) === hladanyDatum
      )
    );
  }

  dajFitnessKartu(userId: string): WorkoutRecord[] {
    return this.pouzivatelia.find((pouzivatel) => pouzivatel.osobneCislo === userId)?.fitnessKarta ?? [];
  }

  posliSpravuPreOverenieRezervacie(telCislo: string): string {
    return `Pripomienka tréningu bola odoslaná na číslo ${telCislo}.`;
  }

  private normalizujDatum(datum: Date | string): string {
    if (datum instanceof Date) {
      const rok = datum.getFullYear();
      const mesiac = String(datum.getMonth() + 1).padStart(2, '0');
      const den = String(datum.getDate()).padStart(2, '0');
      return `${rok}-${mesiac}-${den}`;
    }

    return datum.slice(0, 10);
  }
}
