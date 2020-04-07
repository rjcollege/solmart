import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl,Validators,FormBuilder} from '@angular/forms';
import { HttpClient } from  "@angular/common/http";
import { DialogComponent } from '@syncfusion/ej2-angular-popups'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  submitted = false;

  @ViewChild('confirmDialog')
  public confirmDialog: DialogComponent;
  public confirmHeader: string = 'Delete Multiple Items';
  public confirmCloseIcon: Boolean = true;
  public confirmWidth: string = '400px';
  public animationSettings: Object = { effect: 'None' };
  public target: string = '.control-section';

  public confirmDlgBtnClick(){
      this.confirmDialog.hide();
  }

  public confirmDlgButtons: Object[] = [{ click: this.confirmDlgBtnClick.bind(this), buttonModel: { content: 'Yes',     isPrimary: true } }, { click: this.confirmDlgBtnClick.bind(this), buttonModel: { content: 'No' } }];

  // While clicking confirm button, open the confirm Dialog
  public confirmBtnClick(){
      this.confirmDialog.show();
  }
  
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
