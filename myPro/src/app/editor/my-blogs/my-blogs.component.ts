import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogModel } from 'src/app/models/blog.model';
import { AdminEditorService } from 'src/app/admin-editor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogDefaultMsgService } from './blogDefaultMsg.service';
import { SaveEditorNameService } from '../save-editor-name.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.css'],
  providers: [BlogDefaultMsgService]
})
export class MyBlogsComponent implements OnInit, OnDestroy {
  private subs1: Subscription;
  private subs2: Subscription;

  blogs: BlogModel[];
  shwDef: boolean;
  constructor(private adminEditorService: AdminEditorService,
              private router: Router,
              private route: ActivatedRoute,
              private bgDfMsgService: BlogDefaultMsgService,
              private svEdNmService: SaveEditorNameService) {
                this.shwDef = this.bgDfMsgService.showDefault;
               }

  ngOnInit() {
    this.blogs = this.adminEditorService.getBlogs();
    this.subs1 = this.adminEditorService.blogsChanged.subscribe(
      (blogs) => {
        this.blogs = blogs;
      }
    );
    // this.router.events.subscribe(
    //   (val) => {
    //     console.log("CHANGED ROUTE");
    //     console.log(val);
    //   }
    // );
    // console.log("list page");
    this.subs2 = this.bgDfMsgService.showDefaultChanged.subscribe(
      // fix for ExpressionChangedAfterItHasBeenCheckedError
      (val) => {
        setTimeout(()=>{ this.shwDef = val });
      }
    );
    this.svEdNmService.setStatusToFalse();
  }

  onDelete(id: number)
  {
    this.bgDfMsgService.showDefault = true;
    this.bgDfMsgService.fireObservable();
    this.adminEditorService.deleteBlog(id);
    this.router.navigate(['editor','my-blogs']);
  }

  ngOnDestroy()
  {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
  }
}
