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

  getuserData(){
    return this.http.get(`${this.serverURL}/cruddata`);
}


}
