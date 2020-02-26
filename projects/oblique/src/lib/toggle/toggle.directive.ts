import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
	selector: '[obToggle]',
	exportAs: 'obToggle'
})
export class ObToggleDirective implements OnInit {
	@HostBinding('class.show') @Input() active = false;
	@HostBinding('class') @Input('class') hostClass: string;
	@Input('obToggle') direction: string;
	@Input() after = false;

	@HostListener('click') toggle() {
		this.active = !this.active;
	}

	ngOnInit() {
		// use a Set to ensure there are no duplicates
		const classes = new Set();
		if (this.hostClass) {
			classes.add(this.hostClass.split(' '));
		}
		classes.add('toggle').add(`toggle-${this.direction || 'down-up'}`);
		if (this.after) {
			classes.add('toggle-after');
		}
		if (this.active) {
			classes.add('show');
		}
		this.hostClass = Array.from(classes).join(' ');
	}
}
