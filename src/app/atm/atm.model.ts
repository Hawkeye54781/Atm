export interface Atm {
  totalCash: number;
  accounts: Array<Account>;
  Notes: Array<Note>;
}

export interface Note {
  name: number;
  amount: number;
}

export interface Account {
  id: string;
  pin: string;
  balance: number;
  overDraft: number;
}
