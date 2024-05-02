import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { DatabaseService } from 'src/app/services/db.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-found-dog',
  templateUrl: './found-dog.component.html',
  styleUrls: ['./found-dog.component.scss'],
})
export class FoundDogComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isPhonePortrait = false;
  posts: Post[] = [];
  type = 'found';

  destroyed$ = new Subject<void>();

  user: any;

  constructor(
    private responsive: BreakpointObserver,
    private dbService: DatabaseService,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.isAdmin = false;

    this.responsive.observe(Breakpoints.HandsetPortrait).subscribe((result) => {
      this.isPhonePortrait = false;

      if (result.matches) {
        this.isPhonePortrait = true;
      }
    });

    this.afAuth.authState.subscribe((user) => {
      this.user = user;
      this.adminRole();
    });

    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onPostDeleted(post: Post) {
    for (let i = 0; i < this.posts.length; i++) {
      if (this.posts[i].id === post.id) {
        this.posts.splice(i, 1);
      }
    }
  }

  loadPosts() {
    this.dbService.getPosts().subscribe((data) => {
      this.posts = [];

      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'found') {
          this.posts.unshift(data[i]);
        }
      }
    });
  }

  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed', result);
    });
  }

  adminRole() {
    if (this.user && this.user.email === 'admin@admin.com') {
      this.isAdmin = true;
    }
  }
}
