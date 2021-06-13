import { Component, Input, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Vector2 } from "../../model/Vector2";

@Component({
  selector: 'app-map-locations',
  templateUrl: './map-locations.component.html',
  styleUrls: ['./map-locations.component.css']
})
export class MapLocationsComponent implements OnInit, OnDestroy {
  private FRAME_MS = 20;
  private SCALING_MODIFIER = 0.001;

  @Input()
  locations: Vector2[];
  @Input()
  height: number = 480;
  @Input()
  width: number = 480;

  @ViewChild('canvasRef') canvasRef: ElementRef;

  private _context: CanvasRenderingContext2D;
  private _timer: number = null;

  private _canvasControls = {
    offset: null,
    scale: null,
    aspectRatio: null,
    shouldDraw: false
  };
  private _mouseState = {
    isDown: false,
    pinned: null,
    original: null,
  }
  constructor() {
  }

  ngOnInit() {
    this._context = this.canvasRef.nativeElement.getContext("2d");
    this._canvasControls.offset = new Vector2(this.width / 2, this.height / 2);
    this._canvasControls.scale = new Vector2(1,1);
  }

  startDrawing() {
    this._canvasControls.shouldDraw = true;
    window.requestAnimationFrame(() => this.draw());
  }
  stopDrawing() {
    this._canvasControls.shouldDraw = false;
  }

  draw() {
    // reset fill styles:
    this._context.fillStyle = ""
    this._context.strokeStyle = ""
    this._context.clearRect(0,0, this.width, this.height);


    // 1. Setup a grid background

    // 1.1. First background is kinda meh block of colour
    this._context.fillStyle = "rgb(230,217,171)";
    this._context.fillRect(0,0, this.width, this.height);

    // 1.2 parameters that define how real coordinates are mapped to on-canvas coordinates
    const offset: Vector2 = this._canvasControls.offset
    const scale: Vector2 = this._canvasControls.scale
    const transform = mapLocation => mapLocation.add(offset).times(scale);

    const canvasLocations = this.locations.map(transform);

    const circleDrawer = vec2 => {
      this._context.beginPath()
      this._context.arc(vec2.x, vec2.y, 4, 0, 2 * Math.PI)
      this._context.closePath()
      this._context.fill()
      this._context.stroke()

    }

    this._context.fillStyle = "rgb(184,118,42)"; // correct
    this._context.strokeStyle = "rgb(83,0,0)";
    canvasLocations.forEach(circleDrawer)
    if (this._canvasControls.shouldDraw) {
      window.requestAnimationFrame(() => this.draw());
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this._timer);
  }

  trackMouse(typeOfEvent: string, $event: MouseEvent) {
    switch (typeOfEvent) {
      case 'mousemove':
        if (this._mouseState.isDown) {
          this._canvasControls.offset = this._mouseState.original.subtract(
            this._mouseState.pinned.subtract(new Vector2($event.offsetX, $event.offsetY)).divide(this._canvasControls.scale)
          )
        }
        break;
      case 'mousedown':
        this._mouseState.isDown = true;
        this._mouseState.pinned = new Vector2($event.offsetX, $event.offsetY);
        this._mouseState.original = this._canvasControls.offset.copy()
        break;
      case 'mouseup':
        this._mouseState.isDown = false;
        break;
      case 'mouseleave':
        this._mouseState.isDown = false;
        break;
      case 'mousewheel':
        const wheelEvent = $event as WheelEvent;
        $event.preventDefault()

        const oldOffset = this._canvasControls.offset.copy();
        const oldScale = this._canvasControls.scale.copy();
        const oldCanvasLocation = new Vector2($event.offsetX, $event.offsetY);

        this._canvasControls.scale = this._canvasControls.scale.timesNum(1 + wheelEvent.deltaY * this.SCALING_MODIFIER);

        const newScale = new Vector2(this._canvasControls.scale.x, this._canvasControls.scale.y)

        console.log("OLD OFFSET,SCALE,CANVAS_LOCATION: ", oldOffset, oldScale, oldCanvasLocation)

        console.log("NEW SCALE: ", this._canvasControls.scale);

        // We find the mapLocation corresponding to the point we are scrolling from
        const mapLocation =
          oldCanvasLocation
          .divide(oldScale)
          .subtract(oldOffset);

        console.log("MAP LOCATION: ", mapLocation)
        // Then we find where this point would move to with the old offset and new scale
        const newCanvasLocation =
          mapLocation
            .add(oldOffset)
            .times(this._canvasControls.scale);

        console.log("NEW WOULD BE CANVAS LOCATION: ", newCanvasLocation)
        // Then we calculate the change in position for this point and update the new offset with the negative of this change
        // This way the point will remain in the same place on the canvas
        this._canvasControls.offset = this._canvasControls.offset.subtract(newCanvasLocation.subtract(oldCanvasLocation).divide(newScale));
        console.log("NEW CANVAS OFFSET: ", this._canvasControls.offset)
        break;
    }
    // window.canvasControls = this._canvasControls;
  }

}

// const ctx = document.querySelector("canvas").getContext("2d");
