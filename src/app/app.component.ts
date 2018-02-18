import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showingAllChecks = false;

  toggleAllChecks() {
    this.showingAllChecks = !this.showingAllChecks;
  }
}
