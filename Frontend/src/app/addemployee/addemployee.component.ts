import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { OfficeService } from '../service/office.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddemployeeComponent {
  employee = this.fb.group({
    employeeNumber: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    officeCode: [null, Validators.required],
    job: [null,Validators.required]
  });

  
  oc: any;
  

  constructor(
    private fb: FormBuilder,
    private emp: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private os: OfficeService
      
    ) {}

  onSubmit(): void {
    //console.log(this.employee.value)
    this.emp.addEmployee(this.employee.value).subscribe(
      (msg)=>{
        console.log(msg)
        this.router.navigateByUrl(`/view-employee`);
      },
      (err)=>{ console.log(err)}
    )
  }


  ngOnInit(): void {
    this.os.view().subscribe(
      data=>{
        console.log(data)
        this.oc = data
        this.oc = this.oc.data
      }, 
      err => {console.log(err)}
    )
  }
  
}
