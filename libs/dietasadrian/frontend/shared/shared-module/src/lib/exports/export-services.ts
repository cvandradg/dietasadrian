import { Handler } from '@classes/Handler';
import { HelperService } from '@helperFunctionsService';
import { AuthService } from '@shared-modules/services/auth/auth-service.service';
import { ErrorHandlerService } from '@shared-modules/services/error-handler/error-handler.service';

export const SERVICES = [
  HelperService,
  AuthService,
  ErrorHandlerService,
  Handler,
];