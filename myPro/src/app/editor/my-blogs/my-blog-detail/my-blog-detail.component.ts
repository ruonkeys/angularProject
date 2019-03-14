import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { BlogModel } from 'src/app/models/blog.model';
import { CategoryModel } from 'src/app/models/category.model';
import { NgForm } from '@angular/forms';
import { BlogDefaultMsgService } from '../blogDefaultMsg.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-blog-detail',
  templateUrl: './my-blog-detail.component.html',
  styleUrls: ['./my-blog-detail.component.css']
})
export class MyBlogDetailComponent implements OnInit, OnDestroy {
  @ViewChild('f') myForm: NgForm;
  blogId: number;
  blog: BlogModel;
  catgs: CategoryModel[];
  blogsLst: BlogModel[];
  private subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminEditorService: AdminEditorService,
              private bgDfMsgService: BlogDefaultMsgService) {
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.blogId = Number(params['id']);
        this.blog = this.adminEditorService.getBlogById(this.blogId);
        this.catgs = this.adminEditorService.getCategories();
        this.blogsLst = this.adminEditorService.getBlogs();
        this.bgDfMsgService.showDefault = false;
        this.bgDfMsgService.fireObservable();
        // console.log("detail page");
      }
    );
  }

  onSubmit()
  {
    for(let bl of this.blogsLst)
    {
      if(bl.id === this.blogId)
      {
        bl.title = this.myForm.value.title;
        bl.content = this.myForm.value.content;
        bl.category = this.myForm.value.category;
        bl.blogDate = this.myForm.value.blogDate;
        break;
      }
    }
    this.adminEditorService.blogsChanged.next(this.blogsLst);
    this.router.navigate(['../'], {relativeTo: this.route});
    this.bgDfMsgService.showDefault = true;
    this.bgDfMsgService.fireObservable();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
