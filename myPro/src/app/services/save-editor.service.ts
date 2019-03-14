import { Injectable } from '@angular/core';
import { AdminEditorService } from '../admin-editor.service';
import { EditorModel } from '../models/editor.model';

@Injectable()
export class SaveEditorService
{
  constructor(private adminEditorService: AdminEditorService){}

  saveEditor(editor: EditorModel)
  {
    this.adminEditorService.updateEditors(editor);
  }
}
