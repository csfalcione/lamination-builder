import { Component, OnInit } from '@angular/core';
import { RenderSettings, LaminationState } from '../../lib/builder-state';
import { map } from 'rxjs/operators'
import { makeSvgRenderer } from '../../lib/lamination-renderer/svg-renderer';
import { saveAs } from 'file-saver'
import { parseLaminationDefinition, LaminationData } from '../../lib/example-laminations'
import * as examples from '../../lib/example-laminations'
import { makeObservableLamination, ObservableLamination } from 'src/lib/lamination-observable/lamination-observable'


@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.initialRenderSettings()
  initialData: LaminationData = examples.rabbitLamination()

  laminationObservable: ObservableLamination
  laminationState: LaminationState = this.laminationStateIdentity()

  numPullbacks = 0

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.initLamination())
  }

  initLamination() {
    this.numPullbacks = 0
    this.laminationObservable = makeObservableLamination(this.initialData)
    this.laminationObservable.lamination$
      .pipe(
        map(lamination => ({
          lamination,
          criticalChords: this.initialData.branchSpecs.map(spec => spec.chord),
        }))
      )
      .subscribe(state => {
        this.laminationState = state
      })
    this.laminationObservable.emitCurrent()
  }

  setNumPullbacks(input: string) {
    const parsed = parseInt(input)
    if (isNaN(parsed)) {
      return
    }
    const diff = parsed - this.numPullbacks
    this.numPullbacks = parsed

    if (parsed == 0) {
      // Eliminate unnecessary computation, since we already have initial data.
      this.laminationObservable.set(this.initialData.leaves)
      return
    }
    if (parsed < 0 && diff > 0) {
      // Pulling back a forward-invariant lamination after mapping forward
      // will offset the pullback counter and confuse the user.
      this.laminationObservable.set(this.initialData.leaves)
      this.laminationObservable.mapForward(Math.abs(parsed))
      return
    }
    // At this point, numPullbacks is positive.
    if (diff < 0) {
      this.laminationObservable.mapForward(Math.abs(diff))
      return
    }
    this.laminationObservable.pullBack(diff)
  }

  uploadFile(eventTarget) {
    const file = eventTarget.files[0]
    const reader = new FileReader()

    const cleanUp = () => {
      eventTarget.value = ''
    }
    const successHandler = () => {
      try {
        const definition = JSON.parse(reader.result as string)
        this.initialData = parseLaminationDefinition(definition)
        this.initLamination()
      } catch (e) {
        alert(e)
      } finally {
        cleanUp()
      }
    }
    const errorHandler = () => {
      alert(`Error reading ${file.name}`)
      cleanUp()
    }
    reader.addEventListener('load', successHandler)
    reader.addEventListener('error', errorHandler)
    reader.readAsText(file)
  }

  saveTemplateFile() {
    saveAs(new Blob([examples.template]), 'Example Lamination.json', {
      type: 'application/json'
    })
  }

  saveSvg() {
    const renderer = makeSvgRenderer(this.renderSettings)
    const svgString = renderer.render(this.laminationState)
    const name = this.initialData.name
    saveAs(new Blob([svgString]), `${name} - pullback ${this.numPullbacks}.svg`, {
      type: 'image/svg+xml'
    })
  }

  laminationStateIdentity(): LaminationState {
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
