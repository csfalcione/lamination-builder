import { Component, OnInit } from '@angular/core';
import { NaryFraction, Chord, Polygon, BranchRegion, makeRegion, PullbackLamination } from 'laminations-lib'
import { RenderSettings, LaminationState } from '../builder-state';
import { from, Observable, Subject } from 'rxjs'
import { map, take } from 'rxjs/operators'
import { makeSvgRenderer } from '../lamination-renderer/svg-renderer';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.initialRenderSettings()
  laminationState: LaminationState = this.initialLaminationState()
  laminationName = 'lamination'

  numPullbacks = 4

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.generateLamination())
  }

  setNumPullbacks(input: string) {
    const parsed = parseInt(input)
    if (isNaN(parsed)) {
      return
    }
    this.numPullbacks = parsed
    this.generateLamination()
  }

  saveSvg() {
    const renderer = makeSvgRenderer(this.renderSettings)
    const svgString = renderer.render(this.laminationState)
    saveAs(new Blob([svgString]), `${this.laminationName}.svg`, {
      type: 'image/svg+xml'
    })
  }

  generateLamination() {
    const iterations = this.numPullbacks
    this.rabbitLamination_ternary()
      .pipe(
        take(iterations)
      )
      .subscribe(state => {
        this.laminationState = state
      })
  }

  rabbitLamination(): Observable<LaminationState> {
    const binary = NaryFraction.factory(2)

    const criticalChord = Chord.new(
      binary([], [0, 0, 1]), // 1/7
      binary([1], [0, 1, 0]) // 9/14
    )
    const criticalChords = [criticalChord]

    const firstRegion = (point: NaryFraction) => criticalChord.inInnerRegion(point) || point.equals(criticalChord.lower)
    const secondRegion = (point: NaryFraction) => !firstRegion(point)

    const branches: Array<BranchRegion> = [
      firstRegion,
      secondRegion,
    ].map(makeRegion)

    const startingTriangle = Polygon.new([
      binary([], [0, 0, 1]), // 1/7
      binary([], [0, 1, 0]), // 2/7
      binary([], [1, 0, 0]), // 4/7
    ])

    return from(PullbackLamination.iterates([startingTriangle], branches))
      .pipe(
        map(lamination => ({
          lamination,
          criticalChords,
        }))
      )
  }

  rabbitLamination_ternary(): Observable<LaminationState> {
    const ternary = NaryFraction.factory(3)

    const pointA = ternary([], [0, 0, 1])
    const pointB = ternary([1], [0, 1, 0])
    const pointC = ternary([2], [0, 1, 0])

    const criticalA = Chord.new(pointA, pointB)
    const criticalB = Chord.new(pointB, pointC)
    const criticalC = Chord.new(pointC, pointA)
    const criticalChords = [
      criticalA,
      criticalB,
      criticalC,
    ]

    const firstRegion = (p) => criticalA.inInnerRegion(p) || p.equals(pointA)
    const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointB)
    const thirdRegion = (p) => !firstRegion(p) && !secondRegion(p)

    const branches: Array<BranchRegion> = [
      firstRegion,
      secondRegion,
      thirdRegion,
    ].map(makeRegion)

    const startingTriangle = Polygon.new([
      ternary([], [0, 0, 1]),
      ternary([], [0, 1, 0]),
      ternary([], [1, 0, 0]),
    ])

    return from(PullbackLamination.iterates([startingTriangle], branches))
      .pipe(
        map(lamination => ({
          lamination,
          criticalChords,
        }))
      )
  }

  ternarySymmetricLamination(): Observable<LaminationState> {
    const ternary = NaryFraction.factory(3)
    const criticalA = Chord.new(
      ternary([], [0, 1]), // 1/8
      ternary([2], [1, 0]) // 19/24
    )
    const criticalB = Chord.new(
      ternary([0], [2, 1]), // 7/24
      ternary([], [1, 2]) // 5/8
    )
    const criticalChords = [criticalA, criticalB]

    const firstRegion = (point: NaryFraction) => criticalA.inOuterRegion(point) || point.equals(criticalA.lower)
    const secondRegion = (point: NaryFraction) => criticalB.inInnerRegion(point) || point.equals(criticalB.upper)
    const thirdRegion = (point: NaryFraction) => !(firstRegion(point) || secondRegion(point))

    const branches: Array<BranchRegion> = [
      firstRegion,
      secondRegion,
      thirdRegion
    ].map(makeRegion)

    const firstLeaves = [
      Chord.new(
        ternary([], [0, 1]), // 1/8
        ternary([], [2, 1]) // 7/8
      ),
      Chord.new(
        ternary([], [1, 0]), // 3/8
        ternary([], [1, 2]) // 5/8
      )
    ].map(Polygon.fromChord)

    return from(PullbackLamination.iterates(firstLeaves, branches))
      .pipe(
        map(lamination => ({
          lamination,
          criticalChords,
        }))
      )
  }

  initialLaminationState(): LaminationState {
    return {
      lamination: [],
      criticalChords: [],
    }
  }

  initialRenderSettings(): RenderSettings {
    return {
      renderHyperbolic: true,
      size: 600,
      polygonColor: '#CC0000',
      chordColor: '#000000',
      criticalChordColor: '#0000AA',
      backgroundColor: '#DBDBDB',
      circleColor: '#000000',
    }
  }

}
