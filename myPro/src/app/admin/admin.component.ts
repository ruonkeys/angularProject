import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { WelcomeMsgService } from './welcome-msg-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [WelcomeMsgService]
})
export class AdminComponent implements OnInit, OnDestroy
{
  shwWelcomeMsg: boolean = true;
  private subscription: Subscription;
  constructor(private authService: AuthService, private wlcmMsgService: WelcomeMsgService, private router: Router){}
  ngOnInit()
  {
    const currentUrl = this.router.url;
    if(currentUrl[6] !== '/')
    {
      this.wlcmMsgService.setToTrue();
    }
    this.subscription = this.wlcmMsgService.welcomeMsgStatusChanged.subscribe(
      (status) => {
        setTimeout(()=>{this.shwWelcomeMsg = status;});
      }
    );
  }
  onAdminLogout()
  {
    this.authService.logOutAdmin();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
