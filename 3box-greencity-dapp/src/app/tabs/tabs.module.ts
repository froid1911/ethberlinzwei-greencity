import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TabsPageRoutingModule } from "./tabs.router.module";

import { TabsPage } from "./tabs.page";
import { WelcomeComponent } from "../welcome/welcome.component";
import { GoddieComponent } from "../goddie/goddie.component";
import { ChallengeComponent } from "../challenge/challenge.component";

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
  declarations: [TabsPage, WelcomeComponent],
  entryComponents: [WelcomeComponent, GoddieComponent, ChallengeComponent]
})
export class TabsPageModule {}
