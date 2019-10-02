import { Component, OnInit } from '@angular/core';
import { RenderSettings, LaminationState } from '../builder-state';
import { take, scan } from 'rxjs/operators'
import { makeSvgRenderer } from '../lamination-renderer/svg-renderer';
import { saveAs } from 'file-saver'
import { pullbackObservable, parseLaminationDefinition, LaminationData } from '../example-laminations'
import * as examples from '../example-laminations';

@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.initialRenderSettings()
  laminationData: LaminationData = parseLaminationDefinition(examples.never_close_quintary_def)
  laminationState: LaminationState = this.laminationStateIdentity()

  numPullbacks = 0

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.generateLamination())
  }

  generateLamination() {
    const iterations = this.numPullbacks + 1

    const addLaminationStates = (a: LaminationState, b: LaminationState): LaminationState => {
      return {
        lamination: [...a.lamination, ...b.lamination],
        criticalChords: b.criticalChords,
      }
    }

    const data = this.laminationData
    pullbackObservable(data)
      .pipe(
        scan(addLaminationStates, this.laminationStateIdentity()),
        take(iterations)
      )
      .subscribe(state => {
        this.laminationState = state
      })
  }

  setNumPullbacks(input: string) {
    const parsed = parseInt(input)
    if (isNaN(parsed)) {
      return
    }
    this.numPullbacks = parsed
    this.generateLamination()
  }

  uploadFile(file: File) {
    const reader = new FileReader()
    reader.readAsText(file)
    reader.addEventListener('load', () => {
      try {
        const definition = JSON.parse(reader.result as string)
        this.laminationData = parseLaminationDefinition(definition)
        this.generateLamination()
      } catch (e) {
        alert(e)
      }
    })
    
  }

  saveTemplateFile() {
    saveAs(new Blob([examples.template]), 'Example Lamination.json', {
      type: 'application/json'
    })
  }

  saveSvg() {
    const renderer = makeSvgRenderer(this.renderSettings)
    const svgString = renderer.render(this.laminationState)
    const name = this.laminationData.name
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
