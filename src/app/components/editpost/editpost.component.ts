import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { DatabaseService } from 'src/app/services/db.service';

@Component({
  selector: 'app-editpost',
  templateUrl: './editpost.component.html',
  styleUrls: ['./editpost.component.scss']
})
export class EditpostComponent {
  postData!: Post;
  hide = true;
  selectedFiles: File[] = [];

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dbService: DatabaseService,
    private dialogRef: MatDialogRef<EditpostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Post
  ) {

    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      location: ['', Validators.required],
    });

    this.postData = data;
  }

  async editPost() {
    if (this.editForm.valid) {
      let post = this.postData;
      if(post.id) {
        post.title = this.editForm.value.title;
        post.description = this.editForm.value.description;
        post.location = this.editForm.value.location;

        this.dbService.updatePost(post.id, post);
        this.dialogRef.close();
        console.log('A poszt sikeresen módosítva.');
      }
    } else {
      console.error('Hiba történt.');
    }
  }
}
