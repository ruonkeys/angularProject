import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EditorModel } from '../../../models/editor.model';
import { SaveEditorService } from '../../../services/save-editor.service';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-editor',
  templateUrl: './create-editor.component.html',
  styleUrls: ['./create-editor.component.css']
})
export class CreateEditorComponent implements OnInit {
  @ViewChild('f') createForm: NgForm;
  editorsLst: EditorModel[];
  editor: EditorModel={
    id: null,
    email: '',
    name: '',
    password: '',
    enabled: false
  };

  constructor(private saveEditorService: SaveEditorService,
     private adminEditorService: AdminEditorService,
      private router: Router) { }

  ngOnInit() {
    this.editorsLst = this.adminEditorService.getEditors();
  }

  onSubmit()
  {
    let isEditorPresent: boolean = false;
    this.editor.id = ++this.adminEditorService.lastEditorId;
    this.editor.name = this.createForm.value.name;
    this.editor.email = this.createForm.value.email;
    this.editor.password = this.createForm.value.password;
    this.editor.enabled = true;

    for(let i=0; i<this.editorsLst.length; i++)
    {
      if(this.editor.name === this.editorsLst[i].name || this.editor.email === this.editorsLst[i].email)
      {
        isEditorPresent = true;
        break;
      }
    }

    if(isEditorPresent)
    {
      alert("Editor with this name or email already exists!");
    }
    else{
      this.saveEditorService.saveEditor(this.editor);
      this.createForm.reset();
      alert("New editor created successfully");
      this.router.navigate(['admin','editors','show-editors']);
    }
  }
}
