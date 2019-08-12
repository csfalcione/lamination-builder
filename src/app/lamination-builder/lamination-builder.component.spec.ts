import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminationBuilderComponent } from './lamination-builder.component';

describe('LaminationBuilderComponent', () => {
  let component: LaminationBuilderComponent;
  let fixture: ComponentFixture<LaminationBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminationBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
