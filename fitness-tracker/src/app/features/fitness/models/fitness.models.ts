export interface WorkoutRecord {
  datumTreningu: Date | string;
  popisTreningu: string;
  typTreningu: string;
  klasifikacia: string;
  doplnky: string[];
}

export interface User {
  meno: string;
  datumNarodenia: Date | string;
  pohlavie: string;
  osobneCislo: string;
  partner?: string;
  fitnessKarta: WorkoutRecord[];
  zoznamPlanovanychTreningov: string[];
  telCislo: string;
}

export type Pouzivatel = User;
export type TreningovyZaznam = WorkoutRecord;