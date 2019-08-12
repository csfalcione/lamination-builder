import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminationViewerComponent } from './lamination-viewer.component';

describe('LaminationViewerComponent', () => {
  let component: LaminationViewerComponent;
  let fixture: ComponentFixture<LaminationViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminationViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminationViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
