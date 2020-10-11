import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthfireService {

  constructor(
    private Auth: AngularFireAuth,
    private http: Router
    ) { }

  registrar(value){
    const nname = value.nombre
    return new Promise<any>((resolve, rejects) => {
      this.Auth.createUserWithEmailAndPassword(value.correo, value.contrasena)
      .then((user) =>{
        user.user.updateProfile({
          displayName: nname
        })
      }).then(
        res => resolve(res),
        err => rejects(err)
      )
    })
  }

  login( value){
    return new Promise<any>((resolve, rejects) => {
      this.Auth.signInWithEmailAndPassword(value.correo, value.contrasena)
      .then(
        res => resolve(res),
        err => rejects(err))
  })
  }


  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.Auth.currentUser) {
        this.Auth.signOut()
          .then(() => {
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }


  resertpass(value){
    return new Promise((resolve, reject) => {
    this.Auth.sendPasswordResetEmail(value.correo)
    .then( ()=>{
      console.log('se envio');
      resolve();
    }).catch((error)=>{
      reject();
    })
  })
  }


  traerserdatos(){
    return this.Auth.user
  }

  logingoogle(){
    return new Promise ((resolve, reject) => {
      this.Auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then( (resp)=>{
        
        this.http.navigate(['/dashboard'])
        
        resolve();
      }).catch( (error) =>{
        reject();
      })
    })
  }


  logingit(){
    return new Promise ((resolve, reject) => {
      this.Auth.signInWithPopup(new auth.GithubAuthProvider())
      .then((resp)=>{
        
        this.http.navigate(['/dashboard'])

        resolve();
      }).catch((error)=>{
        
        reject();
      })
    })
  }

}
