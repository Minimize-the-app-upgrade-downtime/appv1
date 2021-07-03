import { Component , OnInit} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OfficeService } from '../service/office.service'

@Component({
  selector: 'app-addoffice',
  templateUrl: './addoffice.component.html',
  styleUrls: ['./addoffice.component.css']
})
export class AddofficeComponent {
  office = this.fb.group({
    officeCode: [null, Validators.required],
    officeName: [null, Validators.required],
    country:     [null, Validators.required],
    phonenumber:[null, Validators.compose([
      Validators.required, Validators.minLength(10), Validators.maxLength(10)])
    ],
    addressLine1: [null, Validators.required],
    addressLine2: null,
    street: null,
    city: [null, Validators.required],
    postalcode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ]
  });



  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private offiService: OfficeService,
    private router: Router,
    ) {}

    ngOnInit() {
      
    }

  onSubmit(): void {

    //console.log(this.office.value);
    this.offiService.addoffice(this.office.value).subscribe(
      (msg)=>{ 
        console.log(msg)
        this.router.navigateByUrl(`/view-office`);
      },
      (err)=>{ console.log(err)}
    )
    
  }
}
