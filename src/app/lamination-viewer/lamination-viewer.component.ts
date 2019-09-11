import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction } from 'laminations-lib';
import { RenderSettings, LaminationState } from '../builder-state';
import { makeCanvasRenderer } from '../lamination-renderer/canvas-renderer';

const displayPoint = (t: NaryFraction) => {
  const rational = t.toRational().join('/')
  const naryString = `${t.exactPart.join('')}_${t.repeatingPart.join('')}`
  return `${naryString} (${rational})`
}

const displayPolygon = (poly) => {
  return poly.points.map(displayPoint).join(', ')
}


@Component({
  selector: 'app-lamination-viewer',
  templateUrl: './lamination-viewer.component.html',
  styleUrls: ['./lamination-viewer.component.css']
})
export class LaminationViewerComponent implements OnInit {

  @Input() settings: RenderSettings

  @Input() laminationState: LaminationState

  @ViewChild('laminationCanvas') canvas: ElementRef

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')
    const renderer = makeCanvasRenderer(ctx, this.settings)
    renderer.render(this.laminationState)
  }

  prettyPrint(lamination: Polygon[]) {
    return lamination.map(displayPolygon).join("\n")
  }

}


