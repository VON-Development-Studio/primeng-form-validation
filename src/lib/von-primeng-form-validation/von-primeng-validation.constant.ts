import { ValidationMessagesLocalizationModel, ValidationMessagesModel } from './von-primeng-validation.model';

const VALIDATION_MESSAGES_EN: ValidationMessagesLocalizationModel = {
  requiredMessage: 'The field \'${name}\' is required',
  equalToMessage: 'The field \'${name}\' is not equal'
};

const VALIDATION_MESSAGES_ES: ValidationMessagesLocalizationModel = {
  requiredMessage: 'El campo \'${name}\' es requerido',
  equalToMessage: 'El campo \'${name}\' no es igual'
};

export const VALIDATION_MESSAGES: ValidationMessagesModel = {
  ngModelRequired: 'You need to add [(ngModel)] into the element',
  EN: VALIDATION_MESSAGES_EN,
  ES: VALIDATION_MESSAGES_ES
};
