import {Injectable} from '@angular/core';
import {ORFooterLink} from './master-layout-footer.component';
import {ORNavigationLink} from './master-layout-navigation.component';

interface MasterLayoutFooter {
	small: boolean;
	links: ORFooterLink[];
}

interface MasterLayoutNavigation {
	fullWidth: boolean;
	scrollable: boolean;
	activeClass: string;
	links: ORNavigationLink[];
}
/**
 * Configuration service for the Master Layout component.
 *
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for the master layout
 */
@Injectable()
export class MasterLayoutConfig {
	/**
	 * Route to the home page
	 */
	homePageRoute = '/home';

	/**
	 * Locales of the application
	 */
	locales = ['de', 'fr', 'it'];

	/**
	 *  Controls the application's layout
	 */
	layout = {
		fixed: false,
		cover: false,
		mainNavigation: true
	};

	/**
	 * Controls the application's header
	 */
	header = {
		animate: true,
		sticky: true,
		medium: false
	};

	/**
	 * Controls the application's main navigation
	 */
	navigation: MasterLayoutNavigation = {
		fullWidth: true,
		scrollable: false,
		activeClass: 'active',
		links: []
	};

	/**
	 * Controls the applications's footer
	 */
	footer: MasterLayoutFooter = {
		small: true,
		links: [{url: 'http://www.disclaimer.admin.ch', label: 'i18n.application.footer.legal.label', title: 'i18n.application.footer.legal.title'}]
	};
}