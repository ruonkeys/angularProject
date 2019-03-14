export class BlogModel
{
  public id: number;
  public title: string;
  public content: string;
  public category: string;
  public editorName: string;
  public blogDate: string;

  constructor(id: number, title: string, content: string, category: string, editorName: string, blogDate: string)
  {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.editorName = editorName;
    this.blogDate = blogDate;
  }
}
