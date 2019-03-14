import { Component, OnInit } from '@angular/core';
import { WelcomeMsgService } from '../welcome-msg-service';

@Component({
  selector: 'app-manage-editors',
  templateUrl: './manage-editors.component.html',
  styleUrls: ['./manage-editors.component.css']
})
export class ManageEditorsComponent implements OnInit {

  constructor(private wlcmMsgService: WelcomeMsgService) { }

  ngOnInit() {
    this.wlcmMsgService.setToFalse();
  }

}
