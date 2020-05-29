import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var mapboxgl: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {

  @Input() coords: string;
  @ViewChild('postMap') postMap: ElementRef;

  constructor() { }

  ngOnInit() {}

  ngAfterViewInit(){
    if(this.coords){
      const position = this.coords.split(', ');
      const lat = Number(position[0]);
      const lng = Number(position[1]);
      mapboxgl.accessToken = 'pk.eyJ1IjoiZnJhbmxvcGV6ZnJlZWxhbmNlIiwiYSI6ImNrYW9vOXg3MzI0a2wyenMwaG83dnd1NWgifQ.xr3xoC-nfg6ZGadcfs9tgw';
      const map = new mapboxgl.Map({
        container: this.postMap.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [ lng, lat ],
        zoom: 15
      });
  
      new mapboxgl.Marker()
        .setLngLat([ lng, lat ])
        .addTo( map );
    }
  }

}
