import { Component } from "@angular/core";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  challenges = [
    { title: "Bicycling", text: "Take a ride and earn ECOin" },
    {
      title: "Foodsharing Point",
      text: "Take a Picture of a Foodsharing Point in your near"
    },
    {
      title: "Challenge your Friends",
      text: "Challenge your friends and bet on Ecoins"
    }
  ];

  constructor() {}
}
