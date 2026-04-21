import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadService } from '../lead.service.ts';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './lead-form.html',
  styleUrls: ['./lead-form.css']
})
export class LeadForm implements OnInit {

  form!: FormGroup;
  companies: any[] = [];

  leadId!: number;
  isEditMode = false;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private leadService: LeadService,
    private router: Router
  ) {}

  ngOnInit(): void {

  this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    companyId: [null, Validators.required],
    status: ['NEW', Validators.required],
    score: ['']
  });

  this.leadId = this.route.snapshot.params['id'];

  // LOAD COMPANIES FIRST
  this.leadService.getCompanies().subscribe(res => {

    this.companies = res?.data?.content || [];
    console.log("Companies Loaded", this.companies);

    // AFTER COMPANIES ==> LOAD EDIT DATA
    if (this.leadId) {

      this.isEditMode = true;

      this.leadService.getLeadById(this.leadId).subscribe(res => {
        console.log("Lead Data", res);

        this.form.patchValue({
          name: res.name,
          email: res.email,
          phone: res.phone,
          companyId: +res.companyId, 
          status: res.status,
          score: res.score
        });
      });

    }

  });

}

  // SUBMIT
  onSubmit() {
  const payload = this.form.value;
  payload.companyId = Number(payload.companyId);

  if (this.isEditMode) {

    this.leadService.updateLead(this.leadId, payload).subscribe({
      next: () => {
        this.snackBar.open('Lead updated successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Update failed', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });

  } else {

    this.leadService.createLead(payload).subscribe({
      next: () => {
        this.snackBar.open('Lead created successfully 🎉', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      },
      error: () => {
        this.snackBar.open('Creation failed ❌', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });

  }
}
}
