import { Component, OnInit } from '@angular/core';
import { OfficeService } from '../service/office.service'
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-view-office',
  templateUrl: './view-office.component.html',
  styleUrls: ['./view-office.component.css']
})
export class ViewOfficeComponent implements OnInit {

  office : any;

  constructor(
        private os : OfficeService,
        private route: ActivatedRoute,
        private router: Router,
  ) { }

  ngOnInit(): void {

    this.os.view().subscribe(
      (data)=>{
        
        this.office =  data
        console.log(this.office.data)
        this.office = this.office.data;
      },
      (err)=>{ console.log(err)})


  }



}

