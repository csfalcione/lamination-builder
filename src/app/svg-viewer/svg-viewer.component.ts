import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-svg-viewer',
  templateUrl: './svg-viewer.component.html',
  styleUrls: ['./svg-viewer.component.css']
})
export class SvgViewerComponent {

  constructor(private sanitizer: DomSanitizer) {}

  private safeSvg: SafeHtml

  @Input('svg')

  // @ts-ignore
  get svg(): SafeHtml {
    return this.safeSvg
  }

  // @ts-ignore
  set svg(value: string) {
    this.safeSvg = this.sanitizer.bypassSecurityTrustHtml(value)
  }

}
