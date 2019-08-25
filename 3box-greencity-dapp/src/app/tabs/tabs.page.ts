import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { WelcomeComponent } from "../welcome/welcome.component";
import { BoxService } from "../box.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"]
})
export class TabsPage implements OnInit {
  constructor(private modal: ModalController, private boxService: BoxService) {}

  ngOnInit(): void {
    this.checkModal();
  }

  async checkModal() {
    if (!this.boxService.isLoggedIn()) {
      const modal = await this.modal.create({ component: WelcomeComponent });
      modal.present();
    }
  }
}
