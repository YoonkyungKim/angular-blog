import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogPosts: Array<BlogPost>;
  page: number = 1;
  tag: string = null;
  category: string = null;
  querySub:any;
  
  constructor(private data: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params['tag']){
        this.tag = params['tag'];
        this.category = null;
      } else {
        this.tag = null;
      }

      if (params['category']){
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }
      
      this.getPage(+params['page'] || 1);
    });
   
  }

  //Get all of the blog posts using the values of num, this.tag and this.category.
  //If the length of the data coming back > 0, set this.blogPosts with the data and this.page with num
  getPage(num){    
    this.querySub = this.data.getPosts(num, this.tag, this.category).subscribe(data => {if (data?.length) {
      this.blogPosts = data; 
      this.page = num;}
    });
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
