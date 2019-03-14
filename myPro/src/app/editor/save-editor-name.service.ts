import { Subject } from 'rxjs';

export class SaveEditorNameService
{
  private editorName: string;
  showWelcomeMsg: boolean = false;
  welcomeMsgStatusChanged = new Subject<boolean>();

  saveEditorName(editorName: string)
  {
    this.editorName = editorName;
  }

  getEditorName()
  {
    return this.editorName;
  }
  // this code decides whether to show the welcome msg in editor or not
  setStatusToTrue()
  {
    this.showWelcomeMsg = true;
    this.welcomeMsgStatusChanged.next(this.showWelcomeMsg);
  }

  setStatusToFalse()
  {
    this.showWelcomeMsg = false;
    this.welcomeMsgStatusChanged.next(this.showWelcomeMsg);
  }
}
