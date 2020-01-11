import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators'
import { makeSvgRenderer } from '../../lib/lamination-renderer/svg-renderer';
import * as examples from '../../lib/example-laminations'
import { makeObservableLamination, ObservableLamination } from 'src/lib/lamination-observable/lamination-observable'
import { FilesService } from '../files.service';
import { parseLamination } from 'src/lib/lamination-parser';
import { RenderSettings, LaminationData, LaminationState } from 'src/lib/definitions';


@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.defaultRenderSettings()
  initialData: LaminationData

  lamination$: ObservableLamination
  laminationState: LaminationState = this.laminationStateIdentity()

  numPullbacks = 0
  cumulative = true

  constructor(private files: FilesService) { }

  ngOnInit() {
    const initialDefinition = examples.rabbitLamination
    parseLamination(initialDefinition, this.defaultRenderSettings())
    .then(data => {
      this.initialData = data
      this.initLamination()  
    })
    .catch(err => alert(err))

    setTimeout(() => this.initLamination())
  }

  initLamination() {
    this.numPullbacks = 0
    this.lamination$ = makeObservableLamination(this.initialData)
    this.lamination$.lamination$
      .pipe(
        map(lamination => ({
          lamination,
          criticalChords: this.initialData.branchSpecs.map(spec => spec.chord),
        }))
      )
      .subscribe(state => {
        this.laminationState = state
      })
    this.lamination$.emitCurrent()
  }

  refresh() {
    const prevPullbacks = this.numPullbacks
    this.updateNumPullbacks(0)
    this.updateNumPullbacks(prevPullbacks)
  }

  setNumPullbacks(input: string) {
    const parsed = parseInt(input)
    if (isNaN(parsed)) {
      return
    }
    this.updateNumPullbacks(parsed)
  }

  updateNumPullbacks(newNum: number) {
    const diff = newNum - this.numPullbacks
    this.numPullbacks = newNum

    if (newNum == 0) {
      // Eliminate unnecessary computation, since we already have initial data.
      this.lamination$.set(this.initialData.leaves)
      return
    }

    if (newNum < 0) {
      if (diff > 0) {
        // Pulling back a forward-invariant lamination after mapping forward
        // will offset the pullback counter and confuse the user.
        this.lamination$.set(this.initialData.leaves)
        this.lamination$.mapForward(Math.abs(newNum), this.cumulative)
        return
      }
      this.lamination$.mapForward(Math.abs(diff), this.cumulative && newNum < 0)
      return
    }
    if (newNum > 0 && diff < 0) {
      this.lamination$.set(this.initialData.leaves)
      this.lamination$.pullBack(Math.abs(newNum), this.cumulative)
      return
    }

    this.lamination$.pullBack(diff, this.cumulative)
  }

  pullBack() {
    this.updateNumPullbacks(this.numPullbacks + 1)
  }

  mapForward() {
    this.updateNumPullbacks(this.numPullbacks - 1)
  }

  uploadFile(eventTarget) {
    const file = eventTarget.files[0]

    this.files.readTextFile(file)
    .then(jsonString => {
      const userInput = JSON.parse(jsonString)
      return parseLamination(userInput, this.renderSettings)
    })
    .then(data => {
      this.initialData = data
      this.renderSettings = data.renderSettings
      this.initLamination()
      setTimeout(() => {
        // For edge case when the size in the new lamination is different.
        this.refresh() 
      })
    })
    .catch(err => alert(err))
    .finally(() => {
      eventTarget.value = ''
    })
  }

  saveTemplateFile() {
    this.files.saveTextFile(
      'Example Lamination.json',
      examples.template,
      'application/json'
    )
  }

  saveSvg() {
    const renderer = makeSvgRenderer(this.renderSettings)
    const svgString = renderer.render(this.laminationState)
    const name = this.initialData.name
    this.files.saveTextFile(
      `${name} - pullback ${this.numPullbacks}.svg`,
      svgString,
      'image/svg+xml'
    )
  }

  laminationStateIdentity(): LaminationState {
    return {
      lamination: [],
      criticalChords: [],
    }
  }

  defaultRenderSettings(): RenderSettings {
    return {
      size: 600,
      renderHyperbolic: true,
      backgroundColor: 'none',
      polygons: {
        fillColor: '#CC0000',
        strokeColor: 'black',
        strokeWidth: 2,
      },
      criticalChords: {
        fillColor: 'rbga(0,0,0,0)',
        strokeColor: '#0000AA',
        strokeWidth: 3,
      },
      circle: {
        fillColor: '#DBDBDB',
        strokeColor: 'black',
        strokeWidth: 2,
      },
    }
  }

}
