import { Component, OnInit } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { AuthenticationService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent implements OnInit {
  checkForm!: FormGroup;
  openCardModal = false;
  createFormModalReference: any;
	closeResult = '';
  submitted = false
  isLoggedIn = false
  currentUser = this.authenticationService.currentUser();
  // values: any = []
constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private productService: UserService, private authenticationService : AuthenticationService,  private toastr: ToastrService, private dataService: DataService){ }

open(content: any) {
  this.createFormModalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
  this.createFormModalReference.result.then(
    (result: any) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


getGeneratedFormOptions() {
  // this.createFormModalReference.close();
  this.openCardModal = !this.openCardModal;
}

private initializeProductForm() {
this.checkForm = this.formBuilder.group({
  name: ["", [Validators.required]],
  description: this.formBuilder.array([]),
  price: ["", [Validators.required]],
  img_link: ["", [Validators.required]],
  weight: ["", [Validators.required]],
  vendor: ["", [Validators.required]],
})
}
ngOnInit(): void {
  this.initializeProductForm()

}
get f() {
  return this.checkForm.controls;
}

onSubmit(): void{
  this.submitted = true;
  if (this.checkForm.invalid) {
    return;
  }

  // this.checkForm.value.description = JSON.parse(JSON.stringify(this.values))
  this.productService.addProduct(this.checkForm.value).subscribe((data)=> {
    if(data.success === true){
      this.toastr.success(data.message, '', {closeButton: true});
      this.initializeProductForm()
      this.createFormModalReference.close()
      this.dataService.initiateFetch("fetchData")
    }

  }
  )
  this.submitted = false;
}
newDescription(): FormGroup {
    return this.formBuilder.group({
      value: ''
    })
  }
 descriptions() : FormArray {
    return this.checkForm.get("description") as FormArray
  }
  addDescription() {
    this.descriptions().push(this.newDescription());
  }

  removeDescription(i:number) {
    this.descriptions().removeAt(i);
  }
}
