import { Account } from './atm.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AtmService } from '../../shared/services/atm.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { divisableByFive } from '../../shared/validators/divisable/divisable.validator';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss']
})
export class AtmComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  accountDetails: Observable<Account> = this._atmService.getAccountDetails().pipe(map((account) => account));
  notesDispensed: Observable<Array<number>> = this._atmService.getNotesDispensed().pipe(map((notes) => notes));

  form: FormGroup = new FormGroup({
    amount: new FormControl(0),
  });
  submitted = false;

  constructor(private _atmService: AtmService, private formBuilder: FormBuilder) { }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      amount: [0, [Validators.required, divisableByFive]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  withdraw(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    this._atmService.withdraw(this.form.value.amount);
  }
}
