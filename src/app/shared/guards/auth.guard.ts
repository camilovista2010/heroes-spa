import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, CanLoad, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { MarvelService } from '@shared/services/marvel.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private marvelService: MarvelService,
    private router : Router
  ) {} 

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    const isEmpty = this.marvelService.getCharacterLocal().length === 0; 
    if (isEmpty) {
      this.router.navigate(['']);
      return false
    }
    return true;
  }

}
