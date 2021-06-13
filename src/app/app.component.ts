import { Component } from '@angular/core';
import { Vector2 } from "../model/Vector2";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'map-locations-widget';
  locations: Vector2[] = [
    new Vector2(0,0),
    new Vector2(0,10),
    new Vector2(20,10),
    new Vector2(130,115),
    new Vector2(45,10),
    new Vector2(-10,110),
    new Vector2(-145,110),
    new Vector2(-45,-110),
    new Vector2(145,-110),
  ];
}
