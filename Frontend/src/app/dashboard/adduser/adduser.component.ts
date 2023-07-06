import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  userArray: any[] = [];
  userForm!: FormGroup;


  constructor(private _user: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getuserData();
  }

  addUser(){
    if (this.userForm.invalid) {
      return;
    }

    const userData = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      password: this.userForm.get('password')?.value
    };

    // console.log(userData)

    this._user.adduser(userData).subscribe({
      next: (response: any) => {
        // console.log(response)
        alert("User Added Successfully");
        this.getuserData()
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getuserData(){
    this._user.getuserData().subscribe({
      next: (response: any) => {
        // console.log(response)
        this.userArray = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
