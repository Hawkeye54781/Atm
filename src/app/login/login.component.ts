import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  Form,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Account } from '../atm/atm.model';
import { AtmService } from '../services/atm.api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    accountNumber: new FormControl(''),
    pin: new FormControl(''),
  });
  submitted = false;



  constructor(private formBuilder: FormBuilder, private router: Router, private _atmService: AtmService) {}

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

    this.router.navigate(['/atm']);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
