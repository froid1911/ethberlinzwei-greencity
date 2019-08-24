import { Component } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GoddieComponent } from "../goddie/goddie.component";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  cards = [
    { title: "Factory Berlin", text: "Discount 10%" },
    { title: "Schwimmbad at Goerli", text: "Go swim for free" }
  ];

  constructor(private modal: ModalController) {}

  async openGoddie(card) {
    const modal = await this.modal.create({
      component: GoddieComponent,
      componentProps: { card }
    });
    modal.present();
  }
}
