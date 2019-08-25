import { Component, ViewChild, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { GoddieComponent } from "../goddie/goddie.component";
import { isNullOrUndefined } from "util";
import pois from "./../../../poi.json";

declare var google: any;
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: any;

  ngOnInit() {
    if (!isNullOrUndefined(this.map)) {
      return;
    }
    var mapProp = {
      center: new google.maps.LatLng(52.494097, 13.446572),
      zoom: 15,
      mapTypeId: "roadmap"
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);

    for (let i = 1; i < pois.POI.length; i++) {
      console.log({
        lat: pois.POI[i].payload.latidude,
        lng: pois.POI[i].payload.longitude
      });
      var marker = new google.maps.Marker({
        position: {
          lat: pois.POI[i].payload.latidude,
          lng: pois.POI[i].payload.longitude
        },
        map: this.map,
        title: pois.POI[i].payload.name
      });
      marker.addListener("click", event => {
        this.openGoddie(pois.POI[i]);
      });
    }
  }

  constructor(private modal: ModalController) {}

  async openGoddie(goodie) {
    const modal = await this.modal.create({
      component: GoddieComponent,
      componentProps: { goodie }
    });
    modal.present();
  }
}
