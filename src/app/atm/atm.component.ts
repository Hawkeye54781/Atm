import { Account } from './atm.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { AtmService } from '../services/atm.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss']
})
export class AtmComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  accountDetails: Observable<Account> = this._atmService.getAccountDetails().pipe(map((account) => account));

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
      amount: [0, Validators.required],
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
