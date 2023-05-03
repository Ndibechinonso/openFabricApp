import { Component, OnInit } from '@angular/core';
// import { products } from '../product';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { ProductMdodel } from '../core/models/user.model';
import { DataService } from '../data.service';
import { AuthenticationService } from '../auth.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any
  loading = false;
  isLoggedIn = false;
  currentUser = this.authenticationService.currentUser();

constructor(private productService: UserService, private dataService: DataService, private authenticationService : AuthenticationService){
  this.dataService.dataType$.subscribe((data) => this.isLoggedIn = data)
  this.dataService.products$.subscribe(data => {
    this.getProducts()
  })
}
  getProducts(): void{
    this.loading = true;
    this.productService.getAllProducts().subscribe((res)=> {this.products = res.products;
    this.loading = false}
    )
  }
  checkIsLogin(){
    JSON.stringify(this.currentUser) === '{}' ? this.isLoggedIn = false : this.isLoggedIn = true;
  }
  ngOnInit(): void {
    this.getProducts()
    this.checkIsLogin()
  }

}
