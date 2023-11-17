import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-two';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }


  checkAdminUrl() {
    return this.router.url.includes('admin')
  }

  uploadProductNavigator() {
    // To check if url includes "admin"
    this.router.navigate(['/products/create/'])
  }

}
