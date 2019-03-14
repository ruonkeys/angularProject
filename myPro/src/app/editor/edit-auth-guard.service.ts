import { AuthService } from '../login/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EditAuthGuard implements CanActivate
{
  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
              {
                return this.authService.isEditorAuthenticated()
                  .then(
                    (authenticated: boolean) => {
                      if(authenticated)
                      {
                        return true;
                      }
                      else{
                        alert("Login as Editor first");
                        this.router.navigate(['/login', state.url.split("/")[1]]);
                      }
                    }
                  );
              }
}
