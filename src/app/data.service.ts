import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor() { }
  private dataSource = new Subject<any>();
  dataType$ = this.dataSource.asObservable();
  private fetchProducts = new Subject<any>();
  products$ = this.fetchProducts.asObservable();


  sendData(data: any) {
    this.dataSource.next(data);
  }

  initiateFetch(data: any){
    this.fetchProducts.next(data)
  }


}
