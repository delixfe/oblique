import {Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {SearchWidgetItem} from './search-box.component';
import {MasterLayoutService} from '../master-layout/master-layout.module';

@Component({
	selector: 'or-search-box-results',
	exportAs: 'orSearchBoxResults',
	templateUrl: './search-box-results.component.html',
	styleUrls: ['./search-box-results.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class SearchBoxResultsComponent implements OnDestroy {
	@Input() input: ElementRef;
	@Input() items: SearchWidgetItem[] = [];
	@Input() minPatternLength = 1;
	@Input() maxResults = 10;
	@Output() closed = new EventEmitter<void>();
	showResults = false;
	filteredItems: SearchWidgetItem[] = [];
	private active: number;
	private _pattern = '';
	@ViewChildren('link') private readonly links: QueryList<ElementRef>;

	constructor(private readonly translate: TranslateService, private readonly master: MasterLayoutService) {
	}

	@HostListener('keydown.arrowdown') navigateDown() {
		this.focusLink(this.active != null ? (this.active + 1) % this.filteredItems.length : 0);
	}

	@HostListener('keydown.arrowup') navigateUp() {
		this.focusLink(this.active != null ? (this.active - 1 + this.filteredItems.length) % this.filteredItems.length : this.filteredItems.length - 1);
	}

	@HostListener('keydown.escape') close(): void {
		this.pattern = '';
		this.filteredItems = [];
		this.active = undefined;
		this.closed.emit();
		this.master.menuCollapsed = true;
	}

	get pattern(): string {
		return this._pattern;
	}

	@Input() set pattern(pattern: string) {
		this._pattern = pattern;
		this.filteredItems = this.items
			.filter(this.filterItems.bind(this))
			.slice(0, this.maxResults);
		this.showResults = this.pattern.length >= this.minPatternLength;
	}

	ngOnDestroy(): void {
		this.closed.emit();
		this.closed.complete();
	}

	formatter(label: string, filterPattern?: string): string {
		filterPattern = (filterPattern || '').replace(/[.*+?^@${}()|[\]\\]/g, '\\$&');
		return !filterPattern ? label : label.replace(new RegExp(filterPattern, 'ig'), (text) => `<span class="highlight">${text}</span>`);
	}

	private filterItems(item: SearchWidgetItem): boolean {
		return this.pattern.length >= this.minPatternLength
			&& new RegExp(this.pattern.replace(/[.*+?^@${}()|[\]\\]/g, '\\$&'), 'gi').test(this.translate.instant(item.label));
	}

	private focusLink(index: number): void {
		this.active = index;
		this.links.toArray()[this.active].nativeElement.focus();
	}
}