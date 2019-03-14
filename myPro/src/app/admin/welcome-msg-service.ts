import { Subject } from 'rxjs';

export class WelcomeMsgService
{
  welcomeMsg: boolean = false;
  welcomeMsgStatusChanged = new Subject<boolean>();
  
  setToTrue()
  {
    this.welcomeMsg = true;
    this.welcomeMsgStatusChanged.next(this.welcomeMsg);
  }

  setToFalse()
  {
    this.welcomeMsg = false;
    this.welcomeMsgStatusChanged.next(this.welcomeMsg);
  }
}
