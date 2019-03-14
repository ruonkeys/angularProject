import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { EditorModel } from 'src/app/models/editor.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-editors',
  templateUrl: './show-editors.component.html',
  styleUrls: ['./show-editors.component.css']
})
export class ShowEditorsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  editorsList: EditorModel[];
  constructor(private adminEditorService: AdminEditorService) { }

  ngOnInit() {
    this.editorsList = this.adminEditorService.getEditors();
    this.subscription = this.adminEditorService.editorsChanged.subscribe(
      (editors: EditorModel[]) => {
        this.editorsList = editors;
      }
    );
  }

  changeStatus(index: number)
  {
    this.adminEditorService.updateEnabledStatus(!this.editorsList[index].enabled, index);
  }

  deleteEditor(id: number)
  {
    this.adminEditorService.deleteEditor(id);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
