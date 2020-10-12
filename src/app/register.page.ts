import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthfireService } from '../authfire.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { passwordValidation } from '../password-validation.directive';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  formularioRe: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  agregarfoto:boolean = false

  constructor( 
    private fb: FormBuilder,
    private auth: AuthfireService,
    private http: Router
    ) { }

    get nombre() {
      return this.formularioRe.get('nombre');
    }
    get correo() {
      return this.formularioRe.get('correo');
    }
    get password() {
      return this.formularioRe.get('contrasena');
    }
    get ccontrasena() {
      return this.formularioRe.get('ccontrasena');
    }

  ngOnInit() {
    this.formuarioR();
  }

  passiguales( group: FormGroup ){
    let pass1 = group.get('contrasena').value;
    let pass2 = group.get('ccontrasena').value;

    return pass1 === pass2 ? null : { notSame: true }   
  }

  checarSiSonIguales( ):  boolean  {
    return  this.formularioRe.hasError('notSame')  &&
      this.formularioRe.get('contrasena').dirty &&
      this.formularioRe.get('ccontrasena').dirty;
  }

  agregarfo(){
    this.agregarfoto = !this.agregarfoto;
  }

  formuarioR(){
    this.formularioRe = this.fb.group({
      nombre: ['', [Validators.minLength(5), Validators.required]],
      correo: ['',[Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z]+\\.[a-z]{2,4}$')]],
      contrasena: ['', [Validators.required, Validators.minLength(8), passwordValidation()]],
      ccontrasena: ['', [Validators.required]],
      foto: [''],
    },{validator: this.passiguales}) 
  }

  Registar(formularior){
    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Porfavor espere...',
    })
    Swal.showLoading();

    if( formularior.invalid){
      Swal.fire({
        icon: 'error',
        title: 'Registarse',
        text: 'Formulario invalido',
        confirmButtonText: 'Aceptar'
      })
      return
    }
    this.auth.registrar(formularior.value)
    .then(res=>{
      this.successMessage = "Tu cuenta ha sido creada. Por favor Iniciar sesión.";
      Swal.fire({
        icon: 'success',
        title: 'Registarse',
        text: this.successMessage,
        confirmButtonText: 'Aceptar'
      })
        this.http.navigate(['/login'])
    }, err =>{
      this.errorMessage = err.message;
      Swal.fire({
        icon: 'error',
        title: 'Registarse',
        text: this.errorMessage,
      })
    })

  }
}
