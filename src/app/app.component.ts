import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { EmployeeService } from './services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        width: '5%',
      },
      name: {
        title: 'Name',
        type: 'text',
        width: '15%',
      },
      contractTypeName: {
        title: 'Contract Type',
        type: 'text',
        width: '15%',
      },
      roleId: {
        title: 'Role ID',
        type: 'text',
        width: '5%',
      },
      roleName: {
        title: 'Role Name',
        type: 'text',
        width: '15%',
      },
      roleDescription: {
        title: 'Role Description',
        type: 'text',
        width: '10%',
        valuePrepareFunction: (cell, row) => {
          if (!row || !row.roleDescription) {
            return 'no entry'
          }
        },
      },
      hourlySalary: {
        title: 'Hourly Salary',
        type: 'text',
        width: '10%',
      },
      monthlySalary: {
        title: 'Monthly Salary',
        type: 'text',
        width: '10%',
      },
      annualSalary: {
        title: 'Annual Salary',
        type: 'text',
        width: '10%',
      }
    }
  };
  title = 'MasGlobalApplicationAngular';
  source: LocalDataSource = new LocalDataSource();
  defaultUrl: string = environment.apiUrl;
  doSomething: boolean = false;
  constructor(
    private fb: FormBuilder,
    private _EmployeeService: EmployeeService,
    private toastr: ToastrService
  ) { }

  employeesForm = this.fb.group({
    id: [null],
    url: [this.defaultUrl, Validators.required]
  })

  ngOnInit(): void {
  }

  onSubmit() {
    this.doSomething = true;
    // console.log(this.employeesForm)
    if (this.employeesForm.value.id != null) {
      this._EmployeeService.getEmployee(+this.employeesForm.value.id, this.employeesForm.value.url)
        .subscribe(
          data => {
            this.source.load([data]);
            this.doSomething = false;
            this.showSuccess('Found: ' + data.name);
          }, failed => {
            this.source.load([]);
            // console.log('Error', failed.message)
            this.doSomething = false;
            this.showFailed(failed.message);

          })
    } else {
      this._EmployeeService.getEmployees(this.employeesForm.value.url)
        .subscribe(
          data => {
            this.source.load(data);
            this.doSomething = false;
            this.showSuccess('Total found: ' + data.length);

          }, failed => {
            this.source.load([]);
            // console.log('Error', failed.message)
            this.doSomething = false;
            this.showFailed(failed.message);
          })
    }

  }
  clearForm() {
    this.employeesForm.controls['id'].reset()
  }
  fillUrl() {
    {
      this.employeesForm.controls['url'].setValue(this.defaultUrl)
    }
  }
  isNumber() {
    if (this.employeesForm.value.id != null)
      return true
    else return false;
  }

  showSuccess(message: string) {
    this.toastr.success('Success!', message);
  }

  showFailed(message: string) {
    this.toastr.error('Failed!', message);
  }
}
