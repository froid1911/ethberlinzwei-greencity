import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { EthereumService } from "../ethereum.service";

@Component({
  selector: "app-goddie",
  templateUrl: "./goddie.component.html",
  styleUrls: ["./goddie.component.scss"]
})
export class GoddieComponent implements OnInit {
  goodie: any;

  constructor(params: NavParams, private contract: EthereumService) {
    this.goodie = params.get("goodie");
  }

  ngOnInit() {}

  spend() {
    this.contract.burn(this.goodie.payload.price);
  }
}
