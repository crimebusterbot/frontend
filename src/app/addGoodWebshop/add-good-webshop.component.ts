import {Component, OnInit} from '@angular/core';
import {DataService} from '../_services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-good-webshop',
  templateUrl: './add-good-webshop.component.html',
  styleUrls: ['./add-good-webshop.component.scss']
})
export class AddGoodWebshopComponent implements OnInit {
  addForm: FormGroup;
  error: boolean;
  success: boolean;
  errorMessage: string;
  loading: boolean;
  result: any;
  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.addForm = this.formBuilder.group({
      url: ['', Validators.required],
      email: ['', Validators.email],
      vestigingsAdres: [''],
      postAdres: [''],
      telefoonNummer: [''],
      bedrijfsNaam: [''],
      kvkNummer: [''],
      btwNummer: [''],
      contactPersoon: [''],
      keurmerkNaam: [''],
      keurmerkLidSinds: [''],
      categorie: [''],
      naam: ['']
    })
  }

  addGoodWebshop() {
    this.error = false;
    this.success = false;
    this.errorMessage = '';
    this.result = null;
    this.loading = true;

    this.dataService.addGoodWebshop(this.addForm.value).subscribe(
      data => {
        this.loading = false;
        this.success = true;
        this.addForm.reset();
        this.result = data;
      },
      error => {
        this.loading = false;
        this.errorMessage = error.error.message;
        this.error = true;
      }
    );
  }
}
