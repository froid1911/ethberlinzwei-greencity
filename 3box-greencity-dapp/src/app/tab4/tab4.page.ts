import { Component, OnInit, ViewChild } from "@angular/core";

declare var google: any;

@Component({
  selector: "app-tab4",
  templateUrl: "tab4.page.html",
  styleUrls: ["tab4.page.scss"]
})
export class Tab4Page implements OnInit {
  @ViewChild("gmap", { static: true }) gmapElement: any;
  map: any;

  constructor() {}

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(52.494097, 13.446572),
      zoom: 15,
      mapTypeId: "roadmap"
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }

  yes() {}

  no() {}
}
