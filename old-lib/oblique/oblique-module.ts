import {DateDirective} from './formatters/date-directive';
import {NumberFormatDirective} from './formatters/number-format-directive';
import {exceptionHandlerDecorator} from './infrastructure/exception-handler-decorator';
import {httpDecorator} from './infrastructure/http-decorator';
import {HttpInterceptor} from './infrastructure/http-interceptor';
import {logDecorator, LogDecorator} from './infrastructure/log-decorator';
import {LoadingServiceProvider} from './status/loading-service-provider';
import {DelayedChangeDirective} from './ui/delayed-change-directive';
import {DropdownClosableDirective} from './ui/dropdown-closable-directive';
import {EnterDirective} from './ui/enter-directive';
import {GiveMeFocusDirective} from './ui/give-me-focus-directive';
import {MultiselectConfig} from './ui/multiselect/multiselect-config';
import {NavigableDirective} from './ui/navigable-directive';
import {UibTypeaheadDirective} from './ui/typeahead-directive';
import {NavigatorService} from './navigator/navigator-service';
import {NotificationServiceProvider} from './ui/notifications/notification-service-provider';
import {DatePickerPopupDirective} from './ui/date-picker/date-picker-popup-directive';
import {UibTypeaheadPopupDirective} from './ui/typeahead-popup-directive';
import {SchemaValidateDirective} from './validation/schema/schema-validate-directive';
import {SchemaValidationConfig} from './validation/schema/schema-validation-config';
import {SchemaValidationDirective} from './validation/schema/schema-validation-directive';
import {SchemaValidatorService} from './validation/schema/schema-validator-service';
import {UnsavedChangesService} from './validation/unsaved-changes-service';
import {UnsavedChangesDirective} from './validation/unsaved-changes-directive';

import {DatePickerComponent} from './ui/date-picker/date-picker-component';
import {FormControlComponent} from './validation/form-control/form-control-component';
import {MultiselectComponent} from './ui/multiselect/multiselect-component';
import {NavigatorComponent} from './navigator/navigator-component';
import {NotificationsComponent} from './ui/notifications/notifications-component';
import {TopControlComponent} from './ui/top-control/top-control-component';

// Make sure that required templates for oblique-reactive will be loaded (and bundled):
import '../oblique-reactive-templates';

// Export module's name so that it can be imported in the app-module of the business application:
export const ObliqueModule = 'oblique-reactive';

angular.module(ObliqueModule, ['oblique-reactive.app-templates'])
	.directive('date', () => new DateDirective())
	.directive('numberFormat', ($filter:ng.IFilterService, $parse:ng.IParseService) => new NumberFormatDirective($filter, $parse))
	.decorator('$exceptionHandler', exceptionHandlerDecorator)
	.decorator('$http', httpDecorator)
	.service('HttpInterceptor', HttpInterceptor)
	.decorator('$log', logDecorator)
	.provider('loadingService', () => new LoadingServiceProvider())
	.directive('uibDatepickerPopup', (dateFilter, uibDateParser, uibDatepickerPopupConfig) => new DatePickerPopupDirective(
		dateFilter,
		uibDateParser,
		uibDatepickerPopupConfig
	))
	.provider('notificationService', () => new NotificationServiceProvider())
	.directive('delayedChange', () => new DelayedChangeDirective())
	.directive('dropdownClosable', ($timeout:ng.ITimeoutService) => new DropdownClosableDirective($timeout))
	.directive('enter', () => new EnterDirective())
	.directive('giveMeFocus', () => new GiveMeFocusDirective())
	.directive('navigable', ($timeout:ng.ITimeoutService) => new NavigableDirective($timeout))
	.directive('uibTypeahead', () => new UibTypeaheadDirective())
	.directive('uibTypeaheadPopup', () => new UibTypeaheadPopupDirective())
	.service('schemaValidator', SchemaValidatorService)
	.constant('schemaValidationConfig', new SchemaValidationConfig())
	.directive('schemaValidation', ()=> new SchemaValidationDirective())
	.directive('schemaValidate', ($log:LogDecorator,
	                              $timeout:ng.ITimeoutService,
	                              schemaValidator:SchemaValidatorService) => new SchemaValidateDirective($log, $timeout, schemaValidator))
	.service('unsavedChangesService', UnsavedChangesService)
	.directive('unsavedChanges', (unsavedChangesService:UnsavedChangesService) => new UnsavedChangesDirective(unsavedChangesService))

	// AngularJS component-based:
	.component('topControl', new TopControlComponent())
	.component('datePicker', new DatePickerComponent())
	.component('formControl', new FormControlComponent())
	.constant('multiselectConfig', new MultiselectConfig())
	.component('multiselect', new MultiselectComponent())
	.service('$navigator', NavigatorService)
	.component('navigator', new NavigatorComponent())
	.component('notifications', new NotificationsComponent())
;