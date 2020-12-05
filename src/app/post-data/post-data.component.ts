import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  sub: any;
  querySub: any;
  commentName: string;
  commentText: string;
  commentSub: any;

  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params =>{
      //TODO: Get post by Id params['id'] and store the result in this.post
      console.log(params['id']);
      
      this.sub = this.data.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        this.post.views++;
        this.data.updatePostById(this.post._id, this.post).subscribe();
      });
    })
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
    if(this.sub) this.sub.unsubscribe();
  }

  submitComment(){
    this.post.comments.push({
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    });

    this.commentSub = this.data.updatePostById(this.post._id, this.post).subscribe(()=>{
      this.commentName = "";
      this.commentText = "";
    });
  }

}
