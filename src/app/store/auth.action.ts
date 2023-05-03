import { Action } from '@ngrx/store';
import { LoginState } from '../core/models/user.model';

export enum CourseActionType {
  ADD_ITEM = '[COURSE] Add Course',
}
export class AddItemAction implements Action {
  readonly type = CourseActionType.ADD_ITEM;
  //add an optional payload
  // constructor(public payload: CourseItem) {}
}
export type CourseAction = AddItemAction;
