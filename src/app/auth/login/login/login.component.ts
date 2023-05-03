import { Component, OnInit, Optional, Self } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap'
import { DataService } from 'src/app/data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoggedIn = false;
  currentUser = this.authenticationService.currentUser();
  openCardModal = false;
  createFormModalReference: any;
  submitted = false;

	closeResult = '';

constructor(  @Self()
@Optional()
public ngControl: NgControl, private formBuilder: FormBuilder, private modalService: NgbModal, private authenticationService: AuthenticationService, private dataService: DataService, private toastr: ToastrService){}

private initializeLoginForm() {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
}

checkIsLogin(){
   JSON.stringify(this.currentUser) === '{}' ? this.isLoggedIn = false : this.isLoggedIn = true;
}

ngOnInit() {
  // this.resetLoginStatus();
  this.initializeLoginForm();
  this.checkIsLogin()
}

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

get f() {
  return this.loginForm.controls;
}
onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) {
    return;
  }

  this.authenticationService
  .login(this.loginForm.value).subscribe(
    (data) => {
      if(data.token){
        this.initializeLoginForm()
        data.token ? this.isLoggedIn = true : this.isLoggedIn = false
        this.createFormModalReference.close();
      this.dataService.sendData(true)
      this.toastr.success('Login successful.', '', {closeButton: true});
      }
      this.submitted = false;
    })


}
 logout = async ()  =>{
 await this.authenticationService.logout()
 this.isLoggedIn = false;
 this.dataService.sendData(false)
 this.toastr.success('You have been logged out.', '', {closeButton: true});
}

}
