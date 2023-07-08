import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private serverURL = 'http://localhost:4000';

  adduser(userdata: any){
    // console.log(userdata)
    return this.http.post(`${this.serverURL}/crudadd`, userdata);
  }

  // getuserData(){
  //   return this.http.get(`${this.serverURL}/cruddata`);
  // }

  deleteUser(userId: any){
    console.log(userId);
    return this.http.delete(`${this.serverURL}/deleteuser/${userId}`)
  }

  updateUser(userdata: any){
    // console.log(userdata);
    return this.http.put(`${this.serverURL}/updateuser`, userdata)
  }

  getuserData(search: string, page: number, limit: number, sortBy: string, sortOrder: string){
    const params = {
      search: search,
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder
    };
    // console.log(params);
    return this.http.get(`${this.serverURL}/cruddata`, {params: params});
  }

}
