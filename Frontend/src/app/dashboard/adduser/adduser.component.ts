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
  userId: any;
  userdata: any;
  isEditMode: boolean = false;
  search: string = "";
  page: number = 1;
  limit: number = 5 ;
  sortBy: string = 'name';
  sortOrder: string = 'asc';
  count: any;
  paginatedDrivers: any[] = [];
  totalPages: number = 0;


  constructor(
    private _user: UserService, 
    private fb: FormBuilder,
    // private toastr: ToastrService
    ) {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required, Validators.minLength(10)],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getuserData();
  }

  addUser(){

    const userData = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      phone: this.userForm.get('phone')?.value,
      password: this.userForm.get('password')?.value
    };

    // console.log(userData)
    if (this.userForm.valid){
      this._user.adduser(userData).subscribe({
        next: (response: any) => {
          console.log(response)
          // this.toastr.success(response.message)
          alert(response.message)
          this.getuserData()
          this.userForm.reset()
        },
        error: (error) => {
          console.log(error);
          // this.toastr.error(error.error)
          alert(error.error)
        }
      })
    }else{
      // this.toastr.info("Enter Proper Details")
      alert("All Fields are Required")
    }

  }

  // -----------------------------GET USER DATA---------------------------------//
  // getuserData(){
  //   this._user.getuserData().subscribe({
  //     next: (response: any) => {
  //       // console.log(response)
  //       this.userArray = response.data;
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   })
  // }


  // -----------------------------DELETE USER-------------------------------------//
  deleteUser(userId: any){
    this.userId = userId
    console.log(userId);
    let confirmation = confirm("Are you sure you want to delete?");

    if(confirmation){
      this._user.deleteUser(this.userId).subscribe({
        next: (response: any) => {
          console.log(response);
          this.getuserData()
          this.userForm.reset()
        },
        error: (error: any) => {
          console.log(error);
        }
      }) 
    } 
  }

  // ----------------------UPADTE USER------------------------------//
  editbtnclick(user: any){
    console.log(user);
    this.userdata = user;
    this.isEditMode = true;

    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password
    });
  }

  upadteUser(){
    const updatedUser = { ...this.userdata, ...this.userForm.value }; 
    this._user.updateUser(updatedUser).subscribe({
      next: (response: any) => {
        console.log(response);
        this.userForm.reset()
        this.isEditMode = false;
        this.getuserData()
        alert(response.message)
      },
      error: (error: any)=> {
        console.log(error);
        alert(error)
        
      }
    })
  }

  onsubmit(){
    if(this.isEditMode){
      this.upadteUser()
    }
    else{
      this.addUser()
    }
  }

  // ---------------------------GET USER DATA WITH SEARCH PAGINATION SORT------------------------------//
  getuserData(){
    this._user.getuserData(this.search,  this.page, this.limit, this.sortBy, this.sortOrder).subscribe({
      
      next: (response: any) => {
        console.log(response)
        this.userArray = response.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  onPageSizeChange(event: any){
    this.limit = +event.target.value;
    console.log(this.limit);
    
    this.page = 1
    this.updatePaginatedDrivers();
    this.getuserData()
  }
  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.page = pageNumber;
      this.updatePaginatedDrivers();
      this.getuserData();
    }
  }
  updatePaginatedDrivers() {
    const startIndex = (this.page - 1) * this.limit;
    const endIndex = startIndex + this.limit;
    this.paginatedDrivers = this.userArray.slice(startIndex, endIndex);
  }

}
