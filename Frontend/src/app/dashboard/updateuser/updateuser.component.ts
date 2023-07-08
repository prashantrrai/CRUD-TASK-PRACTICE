import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  userArray: any[] = []

  constructor(private _userservice : UserService){}

  ngOnInit(){
    this.getUserdata()
  }

  getUserdata(){
    this._userservice.onlygetuserData().subscribe({
      next: (response: any) => {
        // console.log(response.data[0])
        this.userArray = response.data
      },
      error: (error: any) => {
        console.log(error)
        alert(error)
      }
    })
  }
}
