import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private viewportScroller: ViewportScroller) { }

  scrollToFooter(): void {
    this.viewportScroller.scrollToAnchor('footer-section');
  }

  ngOnInit(): void {
  }

}
