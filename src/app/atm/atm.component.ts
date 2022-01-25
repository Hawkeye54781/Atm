import { Account } from './atm.model';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AtmService } from '../services/atm.api.service';

@Component({
  selector: 'app-atm',
  templateUrl: './atm.component.html',
  styleUrls: ['./atm.component.scss']
})
export class AtmComponent implements OnInit {

  accountDetails: Observable<Account> = this._atmService.getAccountDetails().pipe(map((account) => account));

  constructor(private _atmService: AtmService) { }

  ngOnInit() {

  }

}
