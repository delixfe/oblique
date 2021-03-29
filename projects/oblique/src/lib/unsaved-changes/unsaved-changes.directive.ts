import {Directive, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer} from '@angular/forms';
import {ObUnsavedChangesService} from './unsaved-changes.service';

@Directive({
	selector: '[obUnsavedChanges]',
	exportAs: 'obUnsavedChanges',
	// eslint-disable-next-line @angular-eslint/no-host-metadata-property
	host: {class: 'ob-unsaved-changes'}
})
export class ObUnsavedChangesDirective implements OnChanges, OnInit, OnDestroy {
	@Input() id: string;
	@Input() isActive = true;

	constructor(private readonly unsavedChangesService: ObUnsavedChangesService, private readonly form: ControlContainer) {}

	ngOnChanges() {
		if (this.id) {
			if (this.isActive) {
				this.unsavedChangesService.watch(this.id, this.form);
			} else {
				this.unsavedChangesService.unWatch(this.id);
			}
		}
	}

	ngOnInit() {
		if (!this.id) {
			throw new Error('obUnsavedChanges directive needs an "id" attribute.');
		}
	}

	ngOnDestroy() {
		this.unsavedChangesService.unWatch(this.id);
	}
}
