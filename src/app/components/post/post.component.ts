import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatabaseService } from 'src/app/services/db.service';
import { Post } from 'src/app/models/post.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { EditpostComponent } from '../editpost/editpost.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post = {
    id: '',
    title: '',
    description: '',
    date: '',
    location: '',
    type: '',
    userId: '',
    images: [],
  };

  @Output() deletePost: EventEmitter<Post>;

  images!: string[];

  isPhonePortrait = false;

  user: any;

  constructor(
    private responsive: BreakpointObserver,
    private databaseService: DatabaseService,
    private afAuth: AngularFireAuth,
    private dialog: MatDialog,
  ) {
    this.deletePost = new EventEmitter<Post>();
  }

  ngOnInit() {

    this.responsive.observe(Breakpoints.HandsetPortrait)
      .subscribe(result => {
        this.isPhonePortrait = false;
        if (result.matches) {
          this.isPhonePortrait = true;
        }
    });

    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });

    this.images = this.post.images;
  }

  onDeletePost(post: Post) {
    if(!post.id) {
      return;
    }
    this.databaseService.deletePost(post.id);

    this.deletePost.emit(post);
  }

  onEditPost(post: Post) {
    if(!post.id) {
      return;
    }
    this.dialog.open(EditpostComponent, {
      data: post
    });
  }
}
