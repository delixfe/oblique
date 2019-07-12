import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MockTranslatePipe} from 'tests';
import {StickySampleComponent} from './sticky-sample.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('StickySampleComponent', () => {
	let component: StickySampleComponent;
	let fixture: ComponentFixture<StickySampleComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StickySampleComponent, MockTranslatePipe],
			schemas: [NO_ERRORS_SCHEMA]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StickySampleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});