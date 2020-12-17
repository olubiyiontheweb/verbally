import { Injectable } from '@angular/core';
import { AuthServicesService } from './auth-services.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ServiceAuthGuardService implements CanActivate {

  constructor(private authServicesService: AuthServicesService,
    private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    const isLogin = this.authServicesService.isAuthenticated();
    if (isLogin == false) {
      this.route.navigate(['tabs/front']);
    }
    return isLogin;
  }
}
