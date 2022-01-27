import { Account, Atm } from '../atm/atm.model';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  share,
  Subject,
} from 'rxjs';
import store from 'store2';

@Injectable({
  providedIn: 'root',
})

//not actually a api service, but a service that handles the storage of the atm
export class AtmService {
  private atmDetails: Atm = {
    totalCash: 1500,
    accounts: [
      {
        id: '123456789',
        pin: '1234',
        balance: 800,
        overDraft: 200,
      },
      {
        id: '987654321',
        pin: '4321',
        balance: 1230,
        overDraft: 150,
      },
    ],
    Notes: [
      {
        name: '10',
        amount: 30,
      },
      {
        name: '20',
        amount: 30,
      },
      {
        name: '50',
        amount: 10,
      },
      {
        name: '5',
        amount: 20,
      },
    ],
  };
  private _atmDetails = new BehaviorSubject<Atm>(this.atmDetails);
  private _accountDetails = new BehaviorSubject<Account>({
    id: '',
    pin: '',
    balance: 0,
    overDraft: 0,
  });

  constructor() {
    store.set('atm', this.atmDetails);
  }

  getAtmDetails(): Observable<Atm> {
    return this._atmDetails.pipe(
      map((atmDetails) => atmDetails),
      distinctUntilChanged(),
      share()
    );
  }

  resetAtmDetails(): void {
    store.set('atm', this.atmDetails);
    this._atmDetails.next(this.atmDetails);
  }

  setAccountDetails(account: Account): void {
    this._accountDetails.next(account);
  }

  getAccountDetails(): Observable<Account> {
    return this._accountDetails.pipe(map((account) => account));
  }

  withdraw(amount: number): void {
    const account = this._accountDetails.getValue();
    if (account.balance >= amount) {
      this.atmNotesToDispense(amount);
      account.balance -= amount;
      this._accountDetails.next(account);
    } else {
      alert('Insufficient funds');
    }
  }

  private atmNotesToDispense(amount: number): void {
    this._atmDetails.subscribe((atmDetails) => {
    switch (amount) {
      case 50:
        atmDetails.Notes[2].amount--;
        break;
      case 20:
        atmDetails.Notes[1].amount--;
        break;
      case 10:
        atmDetails.Notes[0].amount--;
        break;
      case 5:
        atmDetails.Notes[3].amount--;
    }
      atmDetails.totalCash -= amount;
      console.log(atmDetails.totalCash , 'total cash', atmDetails.Notes, 'notes');
    });
  }
}
