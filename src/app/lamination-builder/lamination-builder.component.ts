import { Component, OnInit } from '@angular/core';
import { RenderSettings, LaminationState } from '../builder-state';
import { take, scan } from 'rxjs/operators'
import { makeSvgRenderer } from '../lamination-renderer/svg-renderer';
import { saveAs } from 'file-saver'
import { pullbackObservable, parseLaminationDefinition } from '../example-laminations'
import * as examples from '../example-laminations';

@Component({
  selector: 'app-lamination-builder',
  templateUrl: './lamination-builder.component.html',
  styleUrls: ['./lamination-builder.component.css']
})
export class LaminationBuilderComponent implements OnInit {

  renderSettings: RenderSettings = this.initialRenderSettings()
  laminationState: LaminationState = this.laminationStateIdentity()
  laminationName = 'lamination'

  numPullbacks = 0

  constructor() { }

  laminationDefinition() {
    return parseLaminationDefinition(examples.never_close_quintary_def)
  }

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

    const addLaminationStates = (a: LaminationState, b: LaminationState): LaminationState => {
      return {
        lamination: [...a.lamination, ...b.lamination],
        criticalChords: b.criticalChords,
      }
    }

    pullbackObservable(this.laminationDefinition())
      .pipe(
        scan(addLaminationStates, this.laminationStateIdentity()),
        take(iterations)
      )
      .subscribe(state => {
        this.laminationState = state
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
