import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminAuthGuard implements CanActivate
{
  constructor(private router: Router, private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
          {
            return this.authService.isAdminAuthenticated()
              .then(
                (authenticated: boolean) => {
                  if(authenticated)
                  {
                    return true;
                  }
                  else{
                    alert("Login as Admin first");
                    // console.log("inside else "+state.url);
                    this.router.navigate(['/login', state.url.split("/")[1]]);
                  }
                }
              );
          }
}
