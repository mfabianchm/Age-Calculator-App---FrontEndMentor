import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'age-calculator';
  error_msg_day = '';
  error_msg_month = '';
  error_msg_year = '';
  birth_day: number | null;
  birth_month: number | null;
  birth_year: number | null;
  current_year = new Date().getFullYear();
  current_month = new Date().getMonth() + 1;
  current_day = new Date().getDate();
  days = 0;
  years = 0;
  months = 0;
  formHasErrors = false;
  dayHasErrors = false;
  monthHasErrors = false;
  yearHasErrors = false;

  constructor() {
    this.birth_day = null;
    this.birth_month = null;
    this.birth_year = null;
  }

  save() {
    this.checkDate(this.birth_day, this.birth_month, this.birth_year);
  }

  calculateAge(
    actualYear: number,
    actualMonth: number,
    actualDay: number,
    birth_day: any,
    birth_month: any,
    birth_year: any
  ) {
    let years = Math.abs(birth_year - actualYear);
    let months = Math.abs(birth_month - actualMonth);
    let day = Math.abs(birth_day - actualDay);
    this.days = day;
    this.years = years;
    this.months = months;
    this.dayHasErrors = false;
  }

  checkDate(
    birth_day: number | null,
    birth_month: number | null,
    birth_year: number | null
  ) {
    if (birth_day == null) {
      this.dayHasErrors = true;
      this.error_msg_day = 'This field is required';
    } else {
      if (birth_day < 1 || birth_day > 31) {
        this.dayHasErrors = true;
        this.error_msg_day = 'Must be a valid date';
        this.birth_day = null;
      } else {
        this.dayHasErrors = false;
      }
    }

    if (birth_month == null) {
      this.monthHasErrors = true;
      this.error_msg_month = 'This field is required';
    } else {
      if (birth_month < 1 || birth_month > 12) {
        this.monthHasErrors = true;
        this.error_msg_month = 'Must be a valid month';
        this.birth_month = null;
      } else {
        this.monthHasErrors = false;
      }
    }

    if (birth_year == null) {
      this.yearHasErrors = true;
      this.error_msg_year = 'This field is required';
    } else {
      if (birth_year > this.current_year) {
        this.yearHasErrors = true;
        this.error_msg_year = 'Must be in the past';
        this.birth_year = null;
      } else {
        this.yearHasErrors = false;
      }
    }

    if (!this.dayHasErrors && !this.monthHasErrors && !this.yearHasErrors) {
      this.calculateAge(
        this.current_year,
        this.current_month,
        this.current_day,
        this.birth_day,
        this.birth_month,
        this.birth_year
      );
    }
  }
}
