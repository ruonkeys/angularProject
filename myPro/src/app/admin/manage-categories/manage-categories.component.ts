import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { CategoryModel } from 'src/app/models/category.model';
import { WelcomeMsgService } from '../welcome-msg-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-categories',
  templateUrl: './manage-categories.component.html',
  styleUrls: ['./manage-categories.component.css']
})
export class ManageCategoriesComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  categories: CategoryModel[];
  isAddClicked = false;
  // isInpDisabled = true;
  editId = -1;

  constructor(private adminEditorService: AdminEditorService, private wlcmMsgService: WelcomeMsgService) { }

  ngOnInit() {
    this.wlcmMsgService.setToFalse();
    this.categories = this.adminEditorService.getCategories();
    this.subscription = this.adminEditorService.categoriesChanged.subscribe(
      (catgs) => {
        this.categories = catgs;
      }
    );
  }

  onAddMore()
  {
    this.isAddClicked = true;
  }

  onCancel()
  {
    this.isAddClicked = false;
  }

  onSave(catInput: HTMLInputElement)
  {
    let isCatPresent: boolean = false;
    for(let ct of this.categories)
    {
      if(catInput.value === ct.name)
      {
        isCatPresent =  true;
        break;
      }
    }
    if(isCatPresent)
    {
      alert("This category already exists!");
    }
    else{
      const newCat = new CategoryModel(++this.adminEditorService.lastCategoryId, catInput.value);
      this.adminEditorService.updateCategories(newCat);
      this.isAddClicked = false;
    }
  }

  onDelete(id: number)
  {
    this.adminEditorService.deleteCategory(id);
  }

  onChange(inpRef: HTMLInputElement, id: number)
  {
    if(this.editId !== id)
    {
      this.editId = id;
    }
    else{
      let isCatPresent: boolean = false;
      for(let ct of this.categories)
      {
        if(inpRef.value === ct.name && ct.id !== id)
        {
          isCatPresent =  true;
          break;
        }
      }
      if(isCatPresent)
      {
        alert("This category already exists!");
        // document.getElementById("updateBtn")
      }
      else{
        this.adminEditorService.changeCategory(id, inpRef.value);
        this.editId = -1;
      }
    }

    // console.log("Value");
    // console.log(inpRef.value);
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }
}
