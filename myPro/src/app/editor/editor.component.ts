import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { SaveEditorNameService } from './save-editor-name.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
  providers: [SaveEditorNameService]
})
export class EditorComponent implements OnInit, OnDestroy {
  showWelcomeMsg: boolean = true;
  private subscription: Subscription;

  constructor(private authService: AuthService,
      private route: ActivatedRoute,
      private svEdNmService: SaveEditorNameService,
      private router: Router) {
    const editorName = this.route.snapshot.queryParams['editorName'];
    this.svEdNmService.saveEditorName(editorName);
  }

  ngOnInit() {
    const currentUrl = this.router.url;
    if(currentUrl[7] !== '/')
    {
      this.svEdNmService.setStatusToTrue();
    }
    this.subscription = this.svEdNmService.welcomeMsgStatusChanged.subscribe(
      (status) => {
        setTimeout(()=>{this.showWelcomeMsg = status;});
      }
    );
  }

  onEditorLogout()
  {
    this.authService.logOutEditor();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
