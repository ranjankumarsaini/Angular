import { Component, OnInit,TemplateRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { BaseService } from './shared/base.service';
import { BaseApiClass } from './shared/api.base';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {Utils} from './error';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  baseApi: BaseApiClass;
  modalRef: BsModalRef;
  editDetailForm: FormGroup;
 // baseService: BaseService;
  columns: any[];
  myform: FormGroup;
  rowsData: Array<any>;
  rowsDataCopy: Array<any>;
  countries: string[] = ['USA', 'UK', 'Canada'];
 // default: string = 'UK';
 emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  mobnumPattern = "[+][0-9]{2}[-][0-9]{1,20}";//"^((\\+91-?)|0)?[0-9]{15}$";
  firstName='';
  phoneno='';
  emailid='';
  lastName='';
  id='';
  constructor(formBuilder:FormBuilder,private baseService: BaseService,private modalService: BsModalService){
  
    this.myform = formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
      phoneno:['',Validators.compose([Validators.required,Validators.pattern(this.mobnumPattern)])]
   ,
   gender:['male', Validators.required],
   email:['',Validators.compose([Validators.required,Validators.pattern(this.emailPattern)])]
   ,
   country: [null,Validators.required],
   dob:['',Validators.required]

    });

    this.editDetailForm=formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
      id:['',Validators.compose([Validators.required,Validators.pattern(this.mobnumPattern)])]
   

    });
    

  }
  
  loadDatilsGrid() {
    //'http://localhost:7010/'
    const url = 'http://localhost:8080/datatable';
    console.log('URL=====' + url);
    this.baseService.search(url, {}).subscribe((data) => {
      this.baseApi = <BaseApiClass>data;
  
      if (this.baseApi.serviceResponseCode =='200') {
      
      this.rowsData = this.baseApi.data;
      this.rowsDataCopy = this.rowsData;
      }
    });
  }
  
  openEditModal(row: any,detailsmodel: TemplateRef<any>) {
     console.log('Print Row Data::' + JSON.stringify(row));
     this.editDetailForm.patchValue(row);
    this.modalRef = this.modalService.show(detailsmodel);
    
  }
ngOnInit() {
  this.loadDatilsGrid();
}

  showError(formName: FormGroup, field: string) {
    return Utils.showError(formName, field);
  }

  getError(formName: FormGroup, field: string, labelName: string) {
    return Utils.getError(formName, field, labelName);
  }

  // saveForm(myform: any){
  //   if (Utils.validateForm(this.myform)) {
  //     console.log(myform);
  //   }
  //   this.firstName = myform.firstName;
  //   this.phoneno = myform.phoneno;

  //   console.log(this.firstName);
  //   console.log(this.phoneno);
  // }
  updateInfo(editDetailForm:any){
    if(Utils.validateForm(this.editDetailForm)){
      console.log(editDetailForm);
    }
    this.firstName=editDetailForm.firstName;
    this.lastName=editDetailForm.lastName;
    this.id=editDetailForm.id;
    console.log("First Name===>"+this.firstName+"  Last Name=====>"+this.lastName+"   Id =====>"+this.id);
  }

  
}
