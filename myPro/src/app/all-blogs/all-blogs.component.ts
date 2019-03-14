import { Component, OnInit } from '@angular/core';
import { AdminEditorService } from '../admin-editor.service';
import { BlogModel } from '../models/blog.model';
import { EditorModel } from '../models/editor.model';
import { CategoryModel } from '../models/category.model';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css']
})
export class AllBlogsComponent implements OnInit {
  blogLst: BlogModel[];
  editorsLst: EditorModel[];
  catsLst: CategoryModel[];
  constructor(private adminEditorService: AdminEditorService) { }

  ngOnInit() {
    this.blogLst = this.adminEditorService.getBlogs();
  }

  onBlogClick()
  {
    console.log("blog clicked");
  }

}
