import {Directive, HostBinding, HostListener, Input, OnInit} from '@angular/core';

@Directive({
	selector: '[orToggle]',
	exportAs: 'orToggle'
})
export class ToggleDirective implements OnInit {
	@HostBinding('class.show') active = false;
	@HostBinding('class') @Input('class') hostClass: string;
	@Input('orToggle') direction: string;

	@HostListener('click') activate() {
		this.active = !this.active;
	}

	ngOnInit() {
		// use a Set to ensure there are no duplicates
		const classes = new Set((this.hostClass || '').split(' '))
			.add('toggle')
			.add(`toggle-${this.direction || 'down-up'}`);
		this.hostClass = Array.from(classes).join(' ');
	}
}