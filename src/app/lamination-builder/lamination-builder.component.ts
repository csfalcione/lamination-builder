import { Component, OnInit } from '@angular/core';
import { RenderSettings, LaminationState } from '../builder-state';
import { take, scan } from 'rxjs/operators'
import { makeSvgRenderer } from '../lamination-renderer/svg-renderer';
import { saveAs } from 'file-saver'
import * as examples from '../example-laminations';

@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.initialRenderSettings()
  laminationState: LaminationState = this.initialLaminationState()
  laminationName = 'lamination'

  numPullbacks = 3

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
    const iterations = this.numPullbacks + 1
    examples.pullbackObservable(examples.irq_thin_quaternary())
      .pipe(
        scan((state, newState): LaminationState => {
          return {
            lamination: [...state.lamination, ...newState.lamination],
            criticalChords: newState.criticalChords,
          }
        }, this.initialLaminationState()),
        take(iterations)
      )
      .subscribe(state => {
        this.laminationState = state
      })
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
