import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';
import { UserService } from '../user.service';
import { DataService } from '../data.service';
import { AuthenticationService } from '../auth.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, AfterContentChecked {
product: Product | undefined;
products = []
routeParams: any;
productIdFromRoute: any;
isLoggedIn = false;
currentUser = this.authenticationService.currentUser();

constructor(private route: ActivatedRoute, private productService: UserService, private dataService: DataService, private authenticationService: AuthenticationService) {

  this.dataService.dataType$.subscribe(data => {
    this.isLoggedIn = data;
  })
 }

// checkIsLogin(){
//   return JSON.stringify(this.currentUser) !== '{}'
// }
checkIsLogin(){
  JSON.stringify(this.currentUser) === '{}' ? this.isLoggedIn = false : this.isLoggedIn = true;
}
  ngOnInit() {
    this.getProducts();
    this.routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = this.routeParams.get('productId');
    this.checkIsLogin()
  }
  ngAfterContentChecked(){
  }
  ngDoCheck(){
    if(this.products.length > 0){
      this.product = this.products.find((product: any) => product._id == this.productIdFromRoute);
    }
  }
  getProducts(): void{
    this.productService.getAllProducts().subscribe((res)=> {this.products = res.products}
    )
  }
  // editDetails(){
  //   this.dataService.sendData(this.product?.description)
  // }
}
