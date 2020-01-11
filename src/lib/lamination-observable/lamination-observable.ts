import { Observable, Subject } from 'rxjs'
import { makeBuilder, Laminations, Polygon } from 'laminations-lib'
import { LaminationData } from '../definitions'
import { RenderPolygons, RenderPolygon } from '../render-polygon'

export interface ObservableLamination {
  // Inner observable. Subscribe to this.
  lamination$: Observable<RenderPolygon[]>
  // Manually set then emit the provided lamination.
  set: (lamination: Polygon[]) => void
  // Request that the current content of the observable be emitted.
  emitCurrent: () => void
  // Pulls back, updates, then emits the lamination in the observable.
  pullBack: (count: number, cumulative?: boolean) => void
  // Maps forward, updates, then emits the lamination in the observable.
  mapForward: (count: number, cumulative?: boolean) => void
}

export const makeObservableLamination = ({leaves, branchSpecs, base}: LaminationData): ObservableLamination => {
  const branches = makeBuilder(base)(branchSpecs)
  const lamination$ = new Subject<RenderPolygon[]>()
  let lamination: RenderPolygon[] = leaves

  const set = (newLeaves: RenderPolygon[]) => {
    lamination = newLeaves
    lamination$.next(lamination)
  }

  const emitCurrent = () => {
    lamination$.next(lamination)
  }

  const pullBack = (count: number, cumulative = true) => {
    for (let i = 0; i < count; i++) {
      let newLeaves = Laminations.pullBack(RenderPolygons.raiseChild)(lamination, branches)
      if (cumulative) {
        newLeaves = [...lamination, ...newLeaves]
      }
      set(newLeaves.filter(Laminations.removeDuplicates()))
    }
  }

  const mapForward = (count: number, cumulative = false) => {
    for (let i = 0; i < count; i++) {
      let newLeaves: RenderPolygon[] = Laminations.mapForward(RenderPolygons.mapForward)(lamination)
      if (cumulative) {
        // It's particularly important that each 'old' leaf is before any of its potential duplicates,
        // 
        newLeaves = [...lamination, ...newLeaves]
      }
      set(newLeaves.filter(Laminations.removeDuplicates<RenderPolygon>()))
    }
  }

  return {lamination$, set, emitCurrent, pullBack, mapForward}
}
