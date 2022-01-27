import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { Account, Atm } from '../atm/atm.model';
import { AtmService } from '../services/atm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _destroy$ = new Subject<void>();

  form: FormGroup = new FormGroup({
    accountNumber: new FormControl(''),
    pin: new FormControl(''),
  });
  submitted = false;

  atmDetails = this._atmService.getAtmDetails().pipe(map((atm) => atm));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _atmService: AtmService
  ) {}

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      accountNumber: ['', Validators.required],
      pin: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.atmDetails.pipe(takeUntil(this._destroy$)).subscribe((atm) => {
      const account = atm.accounts.find(
        (acc) => acc.id === this.f['accountNumber'].value
      );
      if (account) {
        if (account.pin === this.f['pin'].value) {
          this._atmService.setAccountDetails(account);
          this.router.navigate(['/atm']);
        } else {
          this.form.reset();
        }
      } else {
        this.form.reset();
      }
    });
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
