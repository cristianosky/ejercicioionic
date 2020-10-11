import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthfireService } from '../authfire.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  nombre: string='Nombre no encontrado';

  correo: string;

  proveedor: string;
  
  constructor(
    private auth: AuthfireService,
    private http: Router
  ) { }

  ngOnInit() {
    this.detallesuser();
  }
  

  detallesuser(){
    this.auth.traerserdatos().subscribe(resp => {
      if(resp){
        this.nombre = resp.displayName;
        this.correo = resp.email;
        this.proveedor = resp.photoURL;
      }
    })
  }

  logout(){
    this.auth.logoutUser()
    .then(resp => {
      this.nombre = '1';
      this.correo = '1';
      this.http.navigate(['/login']);
    })
    .catch(error=>{
      console.log(error);
    })
  }
}
