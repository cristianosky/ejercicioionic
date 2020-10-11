import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthfireService } from '../authfire.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.page.html',
  styleUrls: ['./resetpass.page.scss'],
})
export class ResetpassPage implements OnInit {
  formularioReset: FormGroup
  constructor(
    private fb: FormBuilder,
    private auth: AuthfireService,
    private http: Router
  ) { }

  get correo() {
    return this.formularioReset.get('correo');
  }
  
  ngOnInit() {
    this.reset();
  }

  reset(){
    this.formularioReset = this.fb.group({
      correo: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]]
    })
  }

  enviar(formularioReset){
    
    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Porfavor espere...',
    })
    Swal.showLoading();

    if(formularioReset.invalid){}
    this.auth.resertpass(formularioReset.value)
    .then( resp =>{
      Swal.fire({
        icon: 'success',
        title: 'Restablecimiento de contraseña',
        text: 'Correo enviado',
        confirmButtonText: 'Aceptar'
      })
        this.http.navigate(['/login'])
    }).catch(error =>{
      Swal.fire({
        icon: 'error',
        title: 'Restablecimiento de contraseña',
        text: 'Correo no valido',
        confirmButtonText: 'Aceptar'
      })
    }

    )
  }

}
