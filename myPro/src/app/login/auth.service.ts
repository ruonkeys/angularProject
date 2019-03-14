import { Injectable } from '@angular/core';
import { AdminEditorService } from '../admin-editor.service';
import { Logger } from './logger.model';
import { Router } from '@angular/router';
import { EditorModel } from '../models/editor.model';

@Injectable()
export class AuthService
{
  private admins: Logger[];
  private editors: EditorModel[];
  isAdminLoggedIn: boolean = false;
  isEditorLoggedIn: boolean = false;
  editorMatchedFlag: boolean = false;

  constructor(private adminEditorService: AdminEditorService, private router: Router)
  {
    this.admins = this.adminEditorService.getAdmins();
    this.editors = this.adminEditorService.getEditors();
  }

  loginAdmin(logger: Logger)
  {
    if(logger.email === this.admins[0].email && logger.password === this.admins[0].password)
    {
      this.isAdminLoggedIn = true;
      this.logOutEditor();
      this.router.navigate(['/admin']);
    }
    else{
      alert("Invalid credentials");
    }
  }

  loginEditor(logger: Logger)
  {
    let edName: string;
    let editorEnabledStatus: boolean;
    for(let i = 0; i<this.editors.length; i++)
    {
      if(logger.email === this.editors[i].email && logger.password === this.editors[i].password)
      {
        this.editorMatchedFlag = true;
        edName = this.editors[i].name;
        editorEnabledStatus = this.editors[i].enabled;
        break;
      }
    }
    // if(logger.email === this.editors[0].email && logger.password === this.editors[0].password)
    // {
    //   this.isEditorLoggedIn = true;
    //   this.router.navigate(['/editor'], {queryParams: {editorName: this.editors[0].name}});
    // }
    if(this.editorMatchedFlag)
    {
      if(editorEnabledStatus)
      {
        this.isEditorLoggedIn = true;
        this.logOutAdmin();
        this.router.navigate(['/editor'], {queryParams: {editorName: edName}});
      }
      else{
        alert("You are disabled by editor");
      }
    }
    else{
      alert("Invalid credentials");
    }
  }

  logOutAdmin()
  {
    this.isAdminLoggedIn = false;
  }

  logOutEditor()
  {
    this.editorMatchedFlag = false;
    this.isEditorLoggedIn = false;
  }

  isAdminAuthenticated()
  {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isAdminLoggedIn);
        }, 200);
      }
    );
    return promise;
  }

  isEditorAuthenticated()
  {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isEditorLoggedIn);
        }, 200);
      }
    );
    return promise;
  }
}
