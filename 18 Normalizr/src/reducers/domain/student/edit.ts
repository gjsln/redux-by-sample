import { actionsEnums } from "../../../common/actionsEnums";
import objectAssign = require("object-assign");
import { StudentEntity } from "../../../model/student";
import { StudentErrors } from "../../../model/studentErrors";
import { IStudentFieldValueChangedCompletedPayload } from "../../../pages/student-detail/actions/studentFieldValueChangedCompleted";

class EditState  {
  editingStudent: StudentEntity;
  editingStudentErrors: StudentErrors;

  public constructor() {
    this.editingStudent = new StudentEntity();
    this.editingStudentErrors = new StudentErrors();
  }
}

export const edit =  (state : EditState = new EditState(), action) => {
  switch (action.type) {
    case actionsEnums.STUDENT_GET_STUDENT_REQUEST_COMPLETED:
      return handleGetStudent(state, action.payload);
    case actionsEnums.STUDENT_FIELD_VALUE_CHANGED_COMPLETED:
      return handleFieldValueChanged(state, action.payload);
    case actionsEnums.INITIALIZE_STUDENT:
      return handleInitializeStudent(state);
  }
  return state;
};

const handleGetStudent = (state: EditState, payload: StudentEntity[]) => {
  const newState = objectAssign({}, state, {editingStudent: payload});
  return newState;
};

const handleFieldValueChanged = (state: EditState, payload: IStudentFieldValueChangedCompletedPayload) => {
  const newStudent = objectAssign({}, state.editingStudent, {[payload.fieldName]: payload.value});
  const newStudentErrors = objectAssign({}, state.editingStudentErrors, {[payload.fieldName]: payload.fieldValidationResult});
  return objectAssign({}, state, {editingStudent: newStudent, editingStudentErrors: newStudentErrors});
};

const handleInitializeStudent = (state: EditState) => {
  return {
    ...state,
    editingStudent: new StudentEntity(),
    editingStudentErrors: new StudentErrors()
  }
}
