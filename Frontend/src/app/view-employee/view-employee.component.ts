import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../service/employee.service'

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent implements OnInit {

  employee:any;
  constructor(
         private es : EmployeeService,
        private route: ActivatedRoute,
        private router: Router,
  ) { }

  ngOnInit(): void {
    this.es.view().subscribe(
      data=>{
        console.log(data)
        this.employee = data;
        this.employee = this.employee.data
      }, 
      err => {console.log(err)}
    )
  }

}
