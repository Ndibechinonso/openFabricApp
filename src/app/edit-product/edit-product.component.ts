import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import {FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  private onDestroy$ = new Subject();
  editProductForm: FormGroup | any
  @Input() product:any = []
  descriptions!: FormArray;
  // editForm!: FormGroup;
  // product = []
  editMode = false;
  createFormModalReference: any;
  editProductDescriptionFormArray: FormArray | undefined;
constructor(private dataService: DataService, private formBuilder: FormBuilder, private modalService: NgbModal, private productService : UserService, private toastr: ToastrService){}

ngOnChanges(changes: SimpleChanges) {
  this.product = changes['product'].currentValue
}
ngOnInit(): void {

}

openEditFormModal(content: any){
  this.prepareEditProductDetails()
  this.createFormModalReference = this.modalService.open(content, {centered: true});
}

onSubmit(){
  const filteredDescription = this.editProductDescriptionFormArray?.value.filter((des: any) => des.value.trim().length > 0)

  this.productService.editProductDescription(this.product._id, filteredDescription).subscribe((data)=> { this.toastr.success(data.message, '', {closeButton: true});
  this.createFormModalReference.close()

  this.dataService.initiateFetch("fetchData")
}
  )
}

prepareEditProductDetails() {
  this.editProductForm = this.formBuilder.group({
    id: this.product._id,
    name: [this.product.name],
    price: [this.product.price],
    img_link: [this.product.img_link],
    weight: [this.product.weight],
    vendor: this.product.vendor,
    editProductDescriptionFormArray: this.formBuilder.array([]),
  })
  this.editProductDescriptionFormArray = this.editProductForm.get('editProductDescriptionFormArray') as FormArray
  this.prepareDescriptionFormArrayValue()
}

prepareDescriptionFormArrayValue() {
  this.product.description.forEach((desc: { value: string }) => {
    this.editProductDescriptionFormArray?.push(this.createEditDescriptionFormArray(desc.value))
  })
}

  createEditDescriptionFormArray(description?: string): FormGroup {
    if (description) {
      return this.formBuilder.group({
        value: [description],
      });
    } else {
      return this.formBuilder.group({
        value: [null],
      });
    }
  }

  addDescription() {
    this.editProductDescriptionFormArray?.push(this.createEditDescriptionFormArray());
  }

  removeDescription(i:number) {
    this.editProductDescriptionFormArray?.removeAt(i);
  }

}
