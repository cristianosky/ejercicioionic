import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthfireService } from '../authfire.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLo: FormGroup

  successMessage: string;

  errormenssage: string;
  
  constructor(
    private fb: FormBuilder,
    private auth: AuthfireService,
    private http: Router
  ) { }
  get correo() {
    return this.formularioLo.get('correo');
  }
  ngOnInit() {
    this.formuariolog();
  }

  formuariolog(){
    this.formularioLo = this.fb.group({
      correo: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
      contrasena: ['',[Validators.required]]
    })
  }


  login(value){
    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Porfavor espere...',
    })
    Swal.showLoading();
    this.auth.login(value)
    .then(res=>{
      this.successMessage = 'Haz iniciado sesión satisfactoriamente'
      Swal.fire({
        icon: 'success',
        title: 'iniciando sesión',
        text: this.successMessage,
        confirmButtonText: 'Aceptar'
      })
        this.http.navigate(['/dashboard'])
    }, err => {

      this.errormenssage = err.message
      Swal.fire({
        icon: 'error',
        title: 'iniciando sesión',
        text: this.errormenssage,
        confirmButtonText: 'Aceptar'
      })
    })

  }

  loging(){
      this.auth.logingoogle()
      .then( resp => {
        console.log(resp);
      }).catch((error)=>{
        console.log(error);
      })
  }

  logingit(){
    this.auth.logingit()
    .then((resp)=>{
      console.log(resp);
    }).catch((error)=>{
      console.log(error);
    })
  }

}
