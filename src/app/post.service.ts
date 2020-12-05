//set const var perPage at the top of the file and set it to 6
const perPage:number = 6;

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogPost } from './BlogPost';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts():Observable<BlogPost[]>{
    return this.http.get<BlogPost[]>(`https://web422-posts.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  newPost(data: BlogPost): Observable<any>{
    return this.http.post<any>(`https://web422-posts.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any>{
    return this.http.put<any>(`https://web422-posts.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any>{
    return this.http.delete<any>(`https://web422-posts.herokuapp.com/api/posts/${id}`);
  }

  getPosts(page, tag, category):Observable<BlogPost[]>{
    //if the "tag" parameter is not null / undefined, then add &tag=tag to the path.
    if (tag){
      return this.http.get<BlogPost[]>(`https://web422-posts.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&tag=${tag}`);
    //if the "category" parameter is not null /undefined, then add &category=category to the path
    } else if (category) {
      return this.http.get<BlogPost[]>(`https://web422-posts.herokuapp.com/api/posts?page=${page}&perPage=${perPage}&category=${category}`);
    } else {
      return this.http.get<BlogPost[]>(`https://web422-posts.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`);
    }
  }

  getPostbyId(id):Observable<BlogPost>{
    return this.http.get<BlogPost>(`https://web422-posts.herokuapp.com/api/posts/${id}`);
  }

  //return an array of "Categories" in the format: {cat: string, num: number} using the path /api/categories
  getCategories(): Observable<any>{
    return this.http.get<string[]>(`https://web422-posts.herokuapp.com/api/categories`);
  }

  //return an array of "Tags" (represented as strings) using the path /api/tags.
  getTags(): Observable<string[]>{
    return this.http.get<string[]>(`https://web422-posts.herokuapp.com/api/tags`);
  }
}
