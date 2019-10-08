import { Observable, Subject } from 'rxjs'
import { makeBuilder, Lamination, Polygon } from 'laminations-lib'
import { LaminationData } from '../definitions'

export interface ObservableLamination {
  // Inner observable. Subscribe to this.
  lamination$: Observable<Polygon[]>
  // Manually set then emit the provided lamination.
  set: (lamination: Polygon[]) => void
  // Request that the current content of the observable be emitted.
  emitCurrent: () => void
  // Pulls back, updates, then emits the lamination in the observable.
  pullBack: (count: number) => void
  // Maps forward, updates, then emits the lamination in the observable.
  mapForward: (count: number) => void
}

export const makeObservableLamination = ({leaves, branchSpecs, base}: LaminationData, cumulativePullbacks = true): ObservableLamination => {
  const branches = makeBuilder(base)(branchSpecs)
  const lamination$ = new Subject<Polygon[]>()
  let lamination = leaves

  const set = (newLeaves: Polygon[]) => {
    lamination = newLeaves
    lamination$.next(lamination)
  }

  const emitCurrent = () => {
    lamination$.next(lamination)
  }

  const pullBack = (count: number) => {
    for (let i = 0; i < count; i++) {
      let newLeaves = Lamination.pullBack(lamination, branches)
      if (cumulativePullbacks) {
        newLeaves = [...lamination, ...newLeaves]
      }
      set(newLeaves.filter(Lamination.removeDuplicates()))
    }
  }

  const mapForward = (count: number) => {
    for (let i = 0; i < count; i++) {
      const newLeaves = Lamination.mapForward(lamination)
      set(newLeaves)
    }
  }

  return {lamination$, set, emitCurrent, pullBack, mapForward}
}
