import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-edityarn",
  templateUrl: "./edityarn.page.html",
  styleUrls: ["./edityarn.page.scss"],
})
export class EdityarnPage implements OnInit {
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      console.log(params);
    });
  }
}
