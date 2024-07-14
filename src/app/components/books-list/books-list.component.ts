import { Component, OnInit } from '@angular/core';
import { CrudService } from './../../service/crud.service';


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
})
export class BooksListComponent implements OnInit {

  Books:any = [];
 
  constructor(private crudService: CrudService) { }
 
  onDelete(id: any): any {
    this.crudService.DeleteBook(id)
    .subscribe(res => {
      console.log(res)
    })
    location.reload();
  }
  
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    });    
  }
}
