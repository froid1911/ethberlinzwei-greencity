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
    { title: "Bicycling", text: "Take a ride and earn ECOin", icon: "bicycle" },
    {
      title: "Foodsharing Point",
      text:
        "Notify your neighbour whats avaialable at your next Foodsharing Point (Comming Soon)",
      icon: "camera",
      disabled: true
    },
    {
      title: "Challenge your Friends",
      text: "Challenge your friends and bet on Ecoins (Comming Soon)",
      icon: "people",
      disabled: true
    }
  ];

  constructor(private modal: ModalController) {}

  async openChallenge(challenge) {
    if (challenge.disabled) {
      console.log("Not avaialble");
      return;
    }
    const modal = await this.modal.create({
      component: ChallengeComponent,
      componentProps: { challenge }
    });

    modal.present();
  }
}
