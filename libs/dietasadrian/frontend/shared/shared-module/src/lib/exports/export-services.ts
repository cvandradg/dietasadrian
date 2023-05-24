import { HelperService } from "@helperFunctionsService";
import { AuthService } from "@shared-modules/services/auth/auth-service.service";
import { HelperErrorHandlerService } from "@shared-modules/services/helperErrorHandler.service";


export const SERVICES = [HelperService, HelperErrorHandlerService, AuthService];
