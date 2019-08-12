import { Component, OnInit } from '@angular/core';
import {NaryFraction, Chord, Polygon, BranchRegion, makeRegion, PullbackLamination} from 'laminations-lib'

@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  lamination: Array<Polygon> = []
  criticalChords: Array<Chord> = []

  numPullbacks = '4'

  constructor() { }

  ngOnInit() {
  }

  generateLamination() {
    const iterations = parseInt(this.numPullbacks) + 1
    const pullbackGenerator = this.rabbitLamination()
    for (let i = 0; i < iterations; i++) {
      const leaves = pullbackGenerator.next().value
      this.lamination = leaves
    }
  }

  rabbitLamination() {
    const binary = NaryFraction.factory(2)

    const criticalChord = Chord.new(
      binary([], [0, 0, 1]), // 1/7
      binary([1], [0, 1, 0]) // 9/14
    )
    this.criticalChords = [criticalChord]
    
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

    return PullbackLamination.iterates([startingTriangle], branches)
  }

  ternarySymmetricLamination() {
    const ternary = NaryFraction.factory(3)
    const criticalA = Chord.new(
      ternary([], [0, 1]), // 1/8
      ternary([2], [1, 0]) // 19/24
    )
    const criticalB = Chord.new(
      ternary([0], [2, 1]), // 7/24
      ternary([], [1, 2]) // 5/8
    )
    this.criticalChords = [criticalA, criticalB]

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

    return PullbackLamination.iterates(firstLeaves, branches)
  }

}
