import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction, Chord } from 'laminations-lib';
import { makeCanvasRenderer } from '../../lib/lamination-renderer/canvas-renderer';
import { RenderSettings, LaminationState } from 'src/lib/definitions';
import { List } from 'immutable';

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

  checkingForIntersections: boolean = false

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')
    const renderer = makeCanvasRenderer(ctx, this.settings)
    renderer.render(this.laminationState)
    this.checkForIntersections()
  }

  checkForIntersections() {
    if (this.laminationState.lamination.length > 250) {
      this.checkingForIntersections = true
    }
    setTimeout(() => {
      this.intersections = [...this.findIntersections()]
      this.checkingForIntersections = false
    })
  }

  *findIntersections(): IterableIterator<Intersection> {
    // TODO: we can do better than O(n^2).
    const lamination = List(this.laminationState.lamination)

    const chords = lamination
      .flatMap(poly => poly.toChords())
      .concat(this.laminationState.criticalChords)

    for (let i = 0; i < chords.size - 1; i++) {
      for (let j = i + 1; j < chords.size; j++) {
        const chordA = chords.get(i)
        const chordB = chords.get(j)
        if (chordA.intersects(chordB)) {
          yield [chordA, chordB]
        }
      }
    }
  }

  prettyPrintLamination(lamination: Polygon[]) {
    return lamination
      .sort((a, b) => NaryFraction.compare(a.points.first(), b.points.first()))
      .map(poly => `${poly}`)
      .join("\n")
  }

  prettyPrintIntersections(intersections: Intersection[]) {
    return intersections
      .map(([chordA, chordB]) => `${chordA} -- ${chordB}`)
      .join("\n")
  }

}

