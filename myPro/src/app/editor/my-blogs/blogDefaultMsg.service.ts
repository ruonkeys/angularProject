import { Subject } from 'rxjs';


export class BlogDefaultMsgService
{
  showDefault: boolean = true;
  showDefaultChanged = new Subject<boolean>();

  fireObservable()
  {
    this.showDefaultChanged.next(this.showDefault);
  }
}
