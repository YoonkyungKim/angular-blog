import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {
  posts: Array<BlogPost>;
  sub: any;

  constructor(private data: PostService) { }

  ngOnInit(): void {
    this.sub = this.data.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0, 3));
  }

}
