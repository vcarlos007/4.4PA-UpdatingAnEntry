// editing-book.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './editing-book.component.html',
})
export class EditingBookComponent implements OnInit {
  bookId: string = '';
  updateForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updateForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      title: ['',Validators.required],
      author: ['',Validators.required],
      description: ['',Validators.required],
      published_year: ['',Validators.required],
      publisher: ['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params['id'];
      this.crudService.GetBook(this.bookId).subscribe(res => {
        this.updateForm.patchValue({
          isbn: res['isbn'],
          title: res['title'],
          author: res['author'],
          description: res['description'],
          published_year: res['published_year'],
          publisher: res['publisher']
        });
      });
    });
  }

  onUpdate(): void {
    if (this.updateForm.valid) {
      this.crudService.UpdateBook(this.bookId, this.updateForm.value).subscribe({
        next: (res) => {
          console.log('Book updated successfully:', res);
          this.router.navigateByUrl('/books-list');
        },
        error: (err) => {
          console.error('Error updating book:', err);
        }
      });
    } else {
      console.log('Form is invalid');
  
      }
    }
  }
