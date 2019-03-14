import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { CategoryModel } from 'src/app/models/category.model';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveEditorNameService } from '../save-editor-name.service';
import { BlogModel } from 'src/app/models/blog.model';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  @ViewChild('f') createBlogForm: NgForm;
  catgLst: CategoryModel[];
  editorName: string;
  constructor(private adminEditorService: AdminEditorService,
     private route: ActivatedRoute,
      private svEdNmService: SaveEditorNameService,
    private router: Router) { }

  ngOnInit() {
    this.catgLst = this.adminEditorService.getCategories();
    this.editorName = this.svEdNmService.getEditorName();
    // console.log("in create blog page    "+this.editorName);
    this.svEdNmService.setStatusToFalse();
  }

  onSubmit()
  {
    const blog = new BlogModel(++this.adminEditorService.lastBlogId,
                                this.createBlogForm.value.title,
                                this.createBlogForm.value.content,
                                this.createBlogForm.value.category,
                                this.editorName,
                                this.createBlogForm.value.blogDate);
    this.adminEditorService.updateBlogs(blog);
    this.createBlogForm.reset();
    alert("New blog created successfully!");
    this.router.navigate(['editor','my-blogs']);
  }
}
