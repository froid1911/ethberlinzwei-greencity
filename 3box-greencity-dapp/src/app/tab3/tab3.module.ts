import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab3Page } from "./tab3.page";
import { AgmCoreModule } from "@agm/core";
import { ChartsModule } from "ng2-charts";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAzXT3w21lVFijawEkfd9mG4za9gTNV-yQ"
    }),
    ChartsModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: Tab3Page }])
  ],
  declarations: [Tab3Page]
})
export class Tab3PageModule {}
