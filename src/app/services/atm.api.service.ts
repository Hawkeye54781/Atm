import { Atm } from './../atm/atm.model';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  share,
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
        balance: 1000,
        overDraft: 200,
      },
      {
        id: '987654321',
        pin: '4321',
        balance: 1000,
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
}
