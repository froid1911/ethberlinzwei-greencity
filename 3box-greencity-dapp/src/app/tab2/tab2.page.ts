import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ChallengeComponent } from "../challenge/challenge.component";

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"]
})
export class Tab2Page {
  challenges = [
    { title: "Bicycling", text: "Take a ride and earn ECOin", icon: 'bicycle' },
    {
      title: "Foodsharing Point",
      text: "Take a Picture of a Foodsharing Point in your near",
      icon: 'camera'
    },
    {
      title: "Challenge your Friends",
      text: "Challenge your friends and bet on Ecoins",
      icon: 'people'
    }
  ];

  constructor(private modal: ModalController) {}

  async openChallenge(challenge) {
    const modal = await this.modal.create({
      component: ChallengeComponent,
      componentProps: { challenge }
    });

    modal.present();
  }
}
