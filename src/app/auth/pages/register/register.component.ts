import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder,
              private router:Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(){
    console.log(this.miFormulario.value);

    const {name, email, password} = this.miFormulario.value;
    this.authService.register(name, email, password)
    .subscribe(resp =>{
      if(resp === true){
        this.router.navigateByUrl('/dashboard');
      }else{
        
        Swal.fire('error', resp, 'error')
      }
    })
   
    //this.router.navigateByUrl('/dashboard')
  }

}
