import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './login/auth.service';
import { AdminEditorService } from './admin-editor.service';
import { EditorComponent } from './editor/editor.component';
import { AdminAuthGuard } from './admin/admin-auth-guard.service';
import { EditAuthGuard } from './editor/edit-auth-guard.service';
import { ManageEditorsComponent } from './admin/manage-editors/manage-editors.component';
import { CreateEditorComponent } from './admin/manage-editors/create-editor/create-editor.component';
import { ShowEditorsComponent } from './admin/manage-editors/show-editors/show-editors.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { SaveEditorService } from './services/save-editor.service';
import { CreateBlogComponent } from './editor/create-blog/create-blog.component';
import { MyBlogsComponent } from './editor/my-blogs/my-blogs.component';
import { MyBlogDetailComponent } from './editor/my-blogs/my-blog-detail/my-blog-detail.component';
// import { SaveEditorNameService } from './editor/save-editor-name.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    AllBlogsComponent,
    EditorComponent,
    ManageEditorsComponent,
    CreateEditorComponent,
    ShowEditorsComponent,
    ManageCategoriesComponent,
    CreateBlogComponent,
    MyBlogsComponent,
    MyBlogDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthService, AdminEditorService, AdminAuthGuard, EditAuthGuard, SaveEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
