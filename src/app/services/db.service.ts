import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, first, take } from 'rxjs';
import { Post } from '../models/post.model';

type PartialPost = Partial<Post>;

@Injectable({ providedIn: 'root' })
export class DatabaseService {

  constructor(
    private afDatabase: AngularFireDatabase,
  ) {}


  addNewPost(post: Post, images: FileList | null) {

    if (images && images.length > 0) {
      post.images = post.images.filter((url) => url !== null) as string[];
      this.savePost(post);
    } else {
      this.savePost(post);
    }
  }

  getPosts(): Observable<any[]> {
    return this.afDatabase.list('posts').valueChanges();
  }

  deletePost(postId: string) {
    if (!postId) {
      console.error('A rekordnak nincs egyedi azonosítója.');
      return;
    }

    const postsRef = this.afDatabase.list<Post>('posts', (ref) =>
      ref.orderByChild('id').equalTo(postId)
    );

    postsRef
      .snapshotChanges()
      .pipe(first())
      .subscribe((snapshotChanges) => {
        const key = snapshotChanges[0].key;
        console.log(snapshotChanges);

        if (key) {
          this.afDatabase
            .list('posts')
            .remove(key)
            .then(() => {
              console.log('Sikeresen törölve:', key);
            })
            .catch((error) => {
              console.error('Hiba történt a törlés során:', error);
            });
        } else {
          console.error('Nem található ilyen rekord az adatbázisban.');
        }
      });

    this.getPosts();
  }

  updatePost(postId: string, newData: PartialPost) {
    if (!postId) {
      console.error('A rekordnak nincs egyedi azonosítója.');
      return;
    }

    const postsRef = this.afDatabase.list<Post>('posts', (ref) =>
      ref.orderByChild('id').equalTo(postId)
    );

    postsRef
      .snapshotChanges()
      .pipe(first())
      .subscribe((snapshotChanges) => {
        const key = snapshotChanges[0].key;
        console.log(snapshotChanges);

        if (key) {
          this.afDatabase
            .list('posts')
            .update(key, newData)
            .then(() => {
              console.log('Sikeresen módosítva:', key);
            })
            .catch((error) => {
              console.error('Hiba történt a módosítás során:', error);
            });
        } else {
          console.error('Nem található ilyen rekord az adatbázisban.');
        }
      });

    this.getPosts();
  }


  private savePost(post: Post) {
    this.afDatabase
      .list('posts')
      .push(post)
      .then((item) => {
        console.log('Sikeresen hozzáadva:', item.key, post.id);
      })
      .catch((error) => {
        console.error('Hiba történt:', error);
      });
  }
}
