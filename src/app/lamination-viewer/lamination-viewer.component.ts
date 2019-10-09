import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction, Chord } from 'laminations-lib';
import { makeCanvasRenderer } from '../../lib/lamination-renderer/canvas-renderer';
import { RenderSettings, LaminationState } from 'src/lib/definitions';

type Intersection = [Chord, Chord]

@Component({
  selector: 'app-lamination-viewer',
  templateUrl: './lamination-viewer.component.html',
  styleUrls: ['./lamination-viewer.component.css']
})
export class LaminationViewerComponent implements OnInit {

  @Input() settings: RenderSettings

  @Input() laminationState: LaminationState

  @ViewChild('laminationCanvas') canvas: ElementRef

  intersections: Intersection[] = []

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')
    const renderer = makeCanvasRenderer(ctx, this.settings)
    renderer.render(this.laminationState)
    this.intersections = [...this.checkForIntersections()]
  }

  *checkForIntersections(): IterableIterator<Intersection> {
    // TODO: we can do better than O(n^2).
    const lamination = this.laminationState.lamination

    const chords = lamination
    .map(poly => poly.toChords())
    .reduce((acc, curr) => acc.concat(curr), [])
    .concat(this.laminationState.criticalChords)

    for (let i = 0; i < chords.length - 1; i++) {
      for (let j = i + 1; j < chords.length; j++) {
        if (chords[i].intersects(chords[j])) {
          yield [chords[i], chords[j]]
        }
      }
    }
  }

  prettyPrintLamination(lamination: Polygon[]) {
    return lamination
      .sort((a, b) => NaryFraction.compare(a.points[0], b.points[0]))
      .map(poly => `${poly}`)
      .join("\n")
  }

  prettyPrintIntersections(intersections: Intersection[]) {
    return intersections
    .map(([chordA, chordB]) => `${chordA} -- ${chordB}`)
    .join("\n")
  }

}

