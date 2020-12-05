import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {

  blogPost: BlogPost;
  tags: string;
  private sub: any;
  private dataSub: any;
  private updateSub: any;
  private deleteSub: any;

  constructor(private data: PostService, private router: Router, private route: ActivatedRoute) { }
  // let id = this.route.snapshot.params['id'];
  ngOnInit(): void {  
      this.sub = this.route.params.subscribe(params=>{
        this.dataSub = this.data.getPostbyId(params['id']).subscribe(data => {
          this.blogPost = data;
          this.tags = this.blogPost.tags.toString();
        });      
      });
  }

  ngOnDestroy(){
    if(this.sub) this.sub.unsubscribe();
  }

  formSubmit(){
    //set the value of blogPost.tags to the value of the tags property
    this.blogPost.tags = this.tags.split(",").map(tag=>tag.trim());
    this.updateSub = this.data.updatePostById(this.blogPost._id, this.blogPost).subscribe(()=>{
      this.router.navigate(['/admin']); //no slash?
    }); //when this method has completed..?
  }

  deletePost(){
    this.deleteSub = this.data.deletePostById(this.blogPost._id).subscribe(()=>{
      this.router.navigate(['/admin']); //no slash?
    }); //when this method has completed..?

  }

}
