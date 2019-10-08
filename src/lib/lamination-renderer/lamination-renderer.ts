import { LaminationState } from '../definitions';

export interface LaminationRenderer<T> {
  render(laminationState: LaminationState): T
}