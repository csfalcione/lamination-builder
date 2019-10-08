import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction } from 'laminations-lib';
import { makeCanvasRenderer } from '../../lib/lamination-renderer/canvas-renderer';
import { RenderSettings, LaminationState } from 'src/lib/definitions';


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
    return lamination
      .sort((a, b) => NaryFraction.compare(a.points[0], b.points[0]))
      .map(poly => `${poly}`).join("\n")
  }

}

