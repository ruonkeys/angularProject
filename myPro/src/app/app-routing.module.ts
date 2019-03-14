import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBlogsComponent } from './all-blogs/all-blogs.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { EditorComponent } from './editor/editor.component';
import { AdminAuthGuard } from './admin/admin-auth-guard.service';
import { EditAuthGuard } from './editor/edit-auth-guard.service';
import { ManageEditorsComponent } from './admin/manage-editors/manage-editors.component';
import { CreateEditorComponent } from './admin/manage-editors/create-editor/create-editor.component';
import { ShowEditorsComponent } from './admin/manage-editors/show-editors/show-editors.component';
import { ManageCategoriesComponent } from './admin/manage-categories/manage-categories.component';
import { CreateBlogComponent } from './editor/create-blog/create-blog.component';
import { MyBlogsComponent } from './editor/my-blogs/my-blogs.component';
import { MyBlogDetailComponent } from './editor/my-blogs/my-blog-detail/my-blog-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/allblogs', pathMatch: 'full'},
  {path: 'allblogs', component: AllBlogsComponent},
  {path: 'login/admin', component: LoginComponent},
  {path: 'login/editor', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AdminAuthGuard], children: [
    {path: 'editors', component: ManageEditorsComponent, children: [
      {path: 'create-editor', component: CreateEditorComponent},
      {path: 'show-editors', component: ShowEditorsComponent}
    ]},
    {path: 'categories', component: ManageCategoriesComponent}
  ]},
  {path: 'editor', component: EditorComponent, canActivate: [EditAuthGuard], children: [
    {path: 'create-blog', component: CreateBlogComponent},
    {path: 'my-blogs', component: MyBlogsComponent, children: [
      {path: ':id', component: MyBlogDetailComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{}
