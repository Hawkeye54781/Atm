import { Account, Atm, Note } from '../../app/atm/atm.model';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  share,
  Subject,
  takeUntil,
} from 'rxjs';
import store from 'store2';

enum NoteNames {
  FIVE = 5,
  TEN = 10,
  TWENTY = 20,
  FIFTY = 50,
}

@Injectable({
  providedIn: 'root',
})

//not actually a api service, but a service that handles the storage of the atm
export class AtmService implements OnDestroy {
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
        name: NoteNames.FIFTY,
        amount: 10,
      },
      {
        name: NoteNames.TWENTY,
        amount: 30,
      },
      {
        name: NoteNames.TEN,
        amount: 30,
      },
      {
        name: NoteNames.FIVE,
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

  private _notesDispensed = new BehaviorSubject<Array<number>>([]);
  private _destroy$ = new Subject<void>();

  constructor() {
    store.set('atm', this.atmDetails, true);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getAtmDetails(): Observable<Atm> {
    return this._atmDetails.pipe(
      map((atmDetails) => atmDetails),
      distinctUntilChanged(),
      share()
    );
  }

  resetAtmDetails(): void {
    store.set('atm', this.atmDetails, true);
    this._atmDetails.next(this.atmDetails);
  }

  setAccountDetails(account: Account): void {
    this._accountDetails.next(account);
  }

  getAccountDetails(): Observable<Account> {
    return this._accountDetails.pipe(map((account) => account));
  }

  setNotesDispensed(notes: Array<number>): void {
    this._notesDispensed.next(notes);
  }

  getNotesDispensed(): Observable<Array<number>> {
    return this._notesDispensed.pipe(map((notes) => notes));
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

    this._atmDetails.pipe(takeUntil(this._destroy$)).subscribe((atmDetails) => {
      let requestedAmount = amount;
      let notesDispensed = [];
      while (requestedAmount > 0) {
        switch (requestedAmount > 0) {
          case requestedAmount >= NoteNames.FIFTY && atmDetails.Notes[0].amount > 0:
            atmDetails.Notes[0].amount--;
            requestedAmount -= NoteNames.FIFTY;
            notesDispensed.push(NoteNames.FIFTY);
            break;
          case requestedAmount >= NoteNames.TWENTY && atmDetails.Notes[1].amount > 0:
            atmDetails.Notes[1].amount--;
            requestedAmount -= NoteNames.TWENTY;
            notesDispensed.push(NoteNames.TWENTY);
            break;
          case requestedAmount >= NoteNames.TEN && atmDetails.Notes[2].amount > 0:
            atmDetails.Notes[2].amount--;
            requestedAmount -= NoteNames.TEN;
            notesDispensed.push(NoteNames.TEN);
            break;
          case requestedAmount >= NoteNames.FIVE && atmDetails.Notes[3].amount > 0:
            atmDetails.Notes[3].amount--;
            requestedAmount -= NoteNames.FIVE;
            notesDispensed.push(NoteNames.FIVE);
            break;
        }
      }
      this._notesDispensed.next(notesDispensed);
      atmDetails.totalCash -= amount;
    });
  }
}
