import { EditorModel } from './models/editor.model';
import { Subject } from 'rxjs';
import { CategoryModel } from './models/category.model';
import { BlogModel } from './models/blog.model';

export class AdminEditorService
{
  private admins = [
    {email: "admin@admin.com", password: "admin"}
  ];

  private editors = [
    {id: 1, name: "editor", email: "editor@editor.com", password: "editor", enabled: true},
    {id: 2, name: "editor2", email: "editor2@editor.com", password: "editor2", enabled: false}
  ];

  private categories = [
    {id: 1, name: 'technology'},
    {id: 2, name: 'fiction'}
  ];

  private blogs: BlogModel[] = [
    {id: 1, title: "test title", content: "test content", category: "technology", editorName: "editor", blogDate: "2019-03-07"},
    {id: 2, title: "test title2", content: "test content2", category: "technology", editorName: "editor", blogDate: "2019-03-08"}
  ];

  lastBlogId = 2;
  lastCategoryId = 2;
  lastEditorId = 2;

  editorsChanged = new Subject<EditorModel[]>();
  categoriesChanged = new Subject<CategoryModel[]>();
  blogsChanged = new Subject<BlogModel[]>();

  getAdmins()
  {
    return this.admins;
  }
  getEditors()
  {
    return this.editors;
  }
  getCategories()
  {
    return this.categories;
  }
  getBlogs()
  {
    return this.blogs;
  }
  getBlogById(id: number)
  {
    for(let blog of this.blogs)
    {
      if(blog.id === id)
      {
        return blog;
      }
    }
  }
  updateEditors(editor: EditorModel)
  {
    this.editors.push(editor);
    // console.log(this.editors);
  }
  updateEnabledStatus(status: boolean, index: number)
  {
    this.editors[index].enabled = status;
    this.editorsChanged.next(this.editors);
  }
  deleteEditor(id: number)
  {
    this.editors = this.editors.filter(el=>el.id!=id);
    this.editorsChanged.next(this.editors);
  }
  updateCategories(category: CategoryModel)
  {
    this.categories.push(category);
    this.categoriesChanged.next(this.categories);
  }
  deleteCategory(id: number)
  {
    // this code deletes the obj having id
    this.categories = this.categories.filter(el=>el.id!==id);
    this.categoriesChanged.next(this.categories);
  }
  changeCategory(id: number, updatedCat: string)
  {
    for(let el of this.categories)
    {
      if(el.id === id)
      {
        el.name = updatedCat;
      }
    }
    this.categoriesChanged.next(this.categories);
  }
  updateBlogs(blog: BlogModel)
  {
    this.blogs.push(blog);
  }
  deleteBlog(id: number)
  {
    this.blogs = this.blogs.filter(el=>el.id!==id);
    this.blogsChanged.next(this.blogs);
  }
}
