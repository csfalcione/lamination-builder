import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Polygon, NaryFraction, Chord } from 'laminations-lib';
import { makeCanvasRenderer } from '../../lib/lamination-renderer/canvas-renderer';
import { RenderSettings, LaminationState } from 'src/lib/definitions';
import { List } from 'immutable';
import { Subscription, from, asyncScheduler } from 'rxjs';
import { mergeAll, toArray, tap, finalize } from 'rxjs/operators';

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
  showIntersectionLoader = false
  private intersectionSubscription: Subscription = null

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d')
    const renderer = makeCanvasRenderer(ctx, this.settings)
    renderer.render(this.laminationState)
    this.checkForIntersections()
  }

  checkForIntersections() {
    if (this.intersectionSubscription != null) {
      this.intersectionSubscription.unsubscribe()
      this.intersectionSubscription = null
      this.intersections = []
    }

    if (this.laminationState.lamination.length > 250) {
      this.showIntersectionLoader = true
    }

    this.intersectionSubscription = from(this.findIntersections(), asyncScheduler)
      .pipe(
        mergeAll(),
        toArray(),
        tap(intersections => {
          this.intersections = intersections
        }),
        finalize(() => {
          this.intersectionSubscription.unsubscribe()
          this.intersectionSubscription = null
          this.showIntersectionLoader = false
        })
      )
      .subscribe()
  }

  *findIntersections(chunkSize = 25000): IterableIterator<Intersection[]> {
    // TODO: we can do better than O(n^2).
    const lamination = List(this.laminationState.lamination)

    const chords = lamination
      .flatMap(poly => poly.toChords())
      .concat(this.laminationState.criticalChords)

    let loopCounter = 0
    let chunk = []

    for (let i = 0; i < chords.size - 1; i++) {
      for (let j = i + 1; j < chords.size; j++) {
        loopCounter++

        const chordA = chords.get(i)
        const chordB = chords.get(j)
        if (chordA.intersects(chordB)) {
          chunk.push([chordA, chordB])
        }

        if (loopCounter >= chunkSize) {
          yield chunk
          chunk = []
          loopCounter = 0
        }
      }
    }

    yield chunk
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

