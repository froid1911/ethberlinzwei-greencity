import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";

@Component({
  selector: "app-goddie",
  templateUrl: "./goddie.component.html",
  styleUrls: ["./goddie.component.scss"]
})
export class GoddieComponent implements OnInit {
  goodie: any;

  constructor(params: NavParams) {
    this.goodie = params.get("goodie");
  }

  ngOnInit() {}

  spend() {
    // Burn Tokens
  }
}
