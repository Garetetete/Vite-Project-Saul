import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive  } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']// ✅ ¡EN PLURAL y con array!
})
export class Navbar {}

