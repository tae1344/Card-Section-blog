import Repository from '@data/Repository';
import AxiosClient from '../../http/AxiosClient';
import { singleton } from 'tsyringe';
import Post from '../../entity/post/Post';

@singleton()
export default class PostRepository implements Repository<PostRepository> {
  private readonly axiosClient: AxiosClient;

  public getAllPost(): Promise<Post> {
    return this.axiosClient.get('/api/posts', {}, Post);
  }

  public getPost() {
    // return this.axiosClient.get('/api/posts')
  }

  public create(post: Post): Promise<null> {
    return this.axiosClient.post('/api/posts/create', post, null);
  }
}
