import { LaminationState } from './builder-state';
import { Observable, from } from 'rxjs';
import { NaryFraction, Chord, BranchRegion, makeRegion, Polygon, PullbackLamination } from 'laminations-lib';
import { map } from 'rxjs/operators';

const binary = NaryFraction.factory(2)
const ternary = NaryFraction.factory(3)

const makeFinalBranch = (branches: BranchRegion[]): BranchRegion => {
  return makeRegion((p) => !branches.some(branch => branch.isInBranch(p)))
}

const fillOutBranches = (d: number, branches: BranchRegion[]): BranchRegion[] => {
  if (branches.length >= d) {
    return branches
  }
  return [...branches, makeFinalBranch(branches)]
}


export const rabbitLamination = (): Observable<LaminationState> => {
  const criticalChord = Chord.new(
    binary([], [0, 0, 1]), // 1/7
    binary([1], [0, 1, 0]) // 9/14
  )
  const criticalChords = [criticalChord]

  const firstRegion = (point: NaryFraction) => criticalChord.inInnerRegion(point) || point.equals(criticalChord.lower)

  const branches: Array<BranchRegion> = fillOutBranches(
      2,
      [firstRegion,].map(makeRegion)
  )

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

export const rabbitLamination_ternary = (): Observable<LaminationState> => {
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

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

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

export const ternarySymmetricLamination = (): Observable<LaminationState> => {
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

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

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

export const criticalTriangleGap_ternary = (): Observable<LaminationState> => {
  const pointA = ternary([], [0, 0, 2])
  const pointB = ternary([1], [0, 2, 0])
  const pointC = ternary([2], [0, 2, 0])

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

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

  const initialChords = [
    Chord.new(ternary([], [0, 1, 1]), ternary([], [0, 2, 0])),
    Chord.new(ternary([], [0, 0, 2]), ternary([], [1, 0, 1])),
    Chord.new(ternary([], [1, 1, 0]), ternary([], [2, 0, 0])),
  ].map(Polygon.fromChord)

  return from(PullbackLamination.iterates(initialChords, branches))
    .pipe(
      map(lamination => ({
        lamination,
        criticalChords,
      }))
    )
}

export const criticalTriangleGapIRT_ternary = (): Observable<LaminationState> => {
  const pointA = ternary([], [0, 0, 2])
  const pointB = ternary([], [1, 0, 1])
  const pointC = ternary([2], [0, 1, 1])
  const pointD = ternary([2], [0, 2, 0])

  const criticalA = Chord.new(pointA, pointD)
  const criticalB = Chord.new(pointB, pointC)
  const criticalChords = [
    criticalA,
    criticalB,
  ]

  const firstRegion = (p) => criticalA.inOuterRegion(p) || p.equals(pointD)
  const secondRegion = (p) => criticalB.inInnerRegion(p) || p.equals(pointC)

  const branches: Array<BranchRegion> = fillOutBranches(3, [
    firstRegion,
    secondRegion,
  ].map(makeRegion))

  const initialChords = [
    Polygon.new([
      pointA,
      pointB,
      ternary([], [2, 0, 1])
    ]),

    Polygon.new([
      ternary([], [0, 1, 1]),
      ternary([], [0, 2, 0]),
      ternary([], [0, 1, 2])
    ]),

    Polygon.new([
      ternary([], [1, 1, 0]),
      ternary([], [2, 0, 0]),
      ternary([], [1, 2, 0])
    ])
  ]

  return from(PullbackLamination.iterates(initialChords, branches))
    .pipe(
      map(lamination => ({
        lamination,
        criticalChords,
      }))
    )
}
