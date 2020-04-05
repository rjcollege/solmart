import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from  "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  submitted = false;
  
  constructor(private formBuilder : FormBuilder,private httpClient:HttpClient) { }

  email:string;
  password:string;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      this.httpClient.post("http://solmart.co.in/cms/api/login.php",
      {
        'email':this.email,
        'password':this.password
      })
      .subscribe(
      data  => {
       if(data['status']=='1'){
        alert("Successful");
       }
       else{
         alert("Oopse");
       } 
      },
      error  => {
      
      console.log("Error", error);
      
      }
      
      );
}

}
