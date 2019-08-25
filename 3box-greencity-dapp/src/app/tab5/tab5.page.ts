import { Component, OnInit, ViewChild } from "@angular/core";
import { BoxService } from "../box.service";

declare var google: any;

@Component({
  selector: "app-tab5",
  templateUrl: "tab5.page.html",
  styleUrls: ["tab5.page.scss"]
})
export class Tab5Page implements OnInit {
  profile = {};

  constructor(private box: BoxService) {}

  ngOnInit() {
    this.getProfile();
  }

  async getProfile() {
    this.profile = await this.box.getProfile();
  }
}
