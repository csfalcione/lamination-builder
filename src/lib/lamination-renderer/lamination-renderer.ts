import { LaminationState } from '../builder-state';

export interface LaminationRenderer<T> {
  render(laminationState: LaminationState): T
}