export default class Post {
  public title: string = '';
  public message: string = '';
  public creator: string = '';
  public tags: string[] = [];
  public selectedFile: string = '';
  public likeCount:
    | {
        type: string;
        default: number;
      }
    | undefined;
  public createAt:
    | {
        type: string;
        default: Date;
      }
    | undefined;
}
