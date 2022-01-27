import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs';
import { AtmService } from '../services/atm.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private _atmService: AtmService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isLoggedIn = false;
    this._atmService.getLoggedIn().pipe(take(1)).subscribe((loggedIn) => {
      console.log('loggedIn', loggedIn);
      isLoggedIn = loggedIn;
    });
    return isLoggedIn;
  }
}
