import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {MasterLayoutConfig, NotificationService, SpinnerService} from 'oblique-reactive';
import {AppComponent} from './app.component';
import {MockTranslatePipe} from 'tests';

describe('AppComponent', () => {
	beforeEach(async(() => {
		const mockNotificationService = {
			success: jest.fn()
		};

		const mockTranslateService = {
			setDefaultLang: jest.fn(),
			use: jest.fn()
		};

		TestBed.configureTestingModule({
			declarations: [
				AppComponent, MockTranslatePipe
			],
			imports: [
				RouterTestingModule
			],
			schemas: [
				CUSTOM_ELEMENTS_SCHEMA
			],
			providers: [
				{provide: NotificationService, useValue: mockNotificationService},
				{provide: TranslateService, useValue: mockTranslateService},
				SpinnerService,
				MasterLayoutConfig
			]
		});
		TestBed.compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});
});

