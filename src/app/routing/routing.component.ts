import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit {
  newcomponent = "Entered in new component created";
  constructor() { }

  ngOnInit() {
  }

}
