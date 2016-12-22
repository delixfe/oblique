<a name="1.3.0"></a>
### [1.3.0](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse?at=1.3.0) (2016-12-12)

#### Dependencies updates
* **ObliqueUI:** 1.3.0
* **Angular:** 1.6.0
* **angular-translate:** 2.13.1
* **angular-ui-bootstrap:** 2.3.1
* **angular-ui-router:** 0.3.2
* **lodash:** 4.17.2
* **moment:** 2.17.1

(see [package.json](https://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse/package.json?at=1.3.0) for the full list of dependencies)

#### Features
* **unsaved-changes:** integrate `UnsavedChangesDirective` and provide an usage sample ([1b91cf4](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/1b91cf4))
* **control-top:** add a wrapper for the ObliqueUI [TopControl](https://eui.bit.admin.ch/oblique-ui/1.3.0/components.html#components-feedback-top-control) component ([d423315](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/d423315))
* **webpack:** bundle UI with Webpack and separate `showcase` and `src` builds ([526e803](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/526e803))
* **typescript:** rewrite ObliqueReactive into TypeScript ([3db0ca7](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/3db0ca7), [1e702e4](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/1e702e4), [9503d46](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/9503d46))
* **sourcemaps:** sourcemap integration in dev and publish build ([9e2504c](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/9e2504c))

#### Bug Fixes
* **notifications:**
	- ensure notification message key is correctly retrieved for translation ([e028fd4](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e028fd4))
	- removed CSS class `.lead` to match ObliqueUI [notifications](https://eui.bit.admin.ch/oblique-ui/1.3.0-RC.8/components.html#components-dialogs-notifications) specs ([a01b0ef](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/a01b0ef))
* **spinner:**
	- callable from other controllers than `app-controller` ([b9d527d](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/b9d527d))
	- overlay uses the fixed variant ([e343224](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e343224))
* **datepicker:** min/max date validation ([9cea457](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/9cea457))
* **multiselect:** add support for schema validation ([506d8ec](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/506d8ec))

#### Code Refactoring
* **validation:** normalize namings of validation components (directives & events) ([817a9a0](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/817a9a0))

#### BREAKING CHANGES
* **header-navigation:** partial needs to be updated to support ObliqueUI 1.3.0 (see [primary navigation](https://eui.bit.admin.ch/oblique-ui/1.3.0/components.html#components-navs-navbars-primary))
* **footer:** partial needs to be updated to support ObliqueUI 1.3.0 (see [footer](https://eui.bit.admin.ch/oblique-ui/1.3.0/components.html#components-branding-footer))
* **validation**:
	- `validation-schema` directive has been renamed into `schema-validation`
	- `validationSchemaEvent` event has been renamed into `schemaValidationEvent`
	- `validationBusinessEvent` event has been renamed into `businessValidationEvent`


<a name="1.2.7"></a>
### [1.2.7](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse?at=v1.2.7) (2016-05-31)

#### Features
* **navigable:**
	- enable item activation on load ([93f46f0](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/93f46f0))
	- enable item highlighting on load ([e57a76a](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e57a76a))
* **npm:** remove Bower and use only npm to fetch all dependencies ([094709a](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/094709a), [2e01c74](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/2e01c74), [e8f9e2f](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e8f9e2f), [929bf49](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/929bf49))

#### Bug Fixes
* **navigable:** ensure `navigable` item gets activated when a child element gets focused ([972e7ad](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/972e7ad), [df64911](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/df64911))
* **ngAnimate:** ensure `ngRepeat` does not show stale items due to ngAnimate transitions ([51cbfdc](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/51cbfdc))
* **typeahead:** provide a workaround for scrollable AngularUI Typeahead suggestions and create a sample state to showcase it. ([cca3282](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/cca3282))


<a name="1.2.2"></a>
### [1.2.2](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse?at=v1.2.2) (2015-09-11)

#### Features
* **delayed-change:** Added delayed-change directive for firing delayed callback when inputs value changes ([f84d177](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/f84d177))
* **locale:** enable i18n localization for 3rd-party directives (including AngularUI datepicker) ([d9e93fc](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/d9e93fc))
* **navigator:** implement a state navigator service & directive and provide sample usage ([e3ef760](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e3ef760))
* **auth:**
	- bind user roles with UI elements ([90cc7b3](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/90cc7b3))
	- finalize client-side authentication and refactor accordingly ([e75752a](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/e75752a))
	- prepare application for client-side authentication ([43addf0](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/43addf0))

#### Bug Fixes
* **locale:** do not determine preferred language as locale keys are inconsistent across browsers ([8e55f4b](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/8e55f4b))
* **notifications:** notification can now be dismissed with the close button ([a24bf28](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/a24bf28))
* **schema-validation:** fix nested properties validation and showcase with a sample usage ([6ff2932](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/6ff2932))


<a name="0.0.3"></a>
### [0.0.3](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse?at=v0.0.3) (2015-03-18)

#### Bug Fixes
* **notifications:** ensure notifications are correctly displayed for API exceptions ([527807e](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/527807e))

#### BREAKING CHANGES
* notifications: API-specific methods are now scoped under `$http.api` (i.e. `$http.api.get()`, `$http.api.post()`, etc.)


<a name="0.0.2"></a>
### [0.0.2](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/browse?at=v0.0.2) (2015-03-11)

#### Features
* **AppController:** enable global control for core UI components (layout, page title & spinner) ([58a25c8](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/58a25c8))
* **head-title:** implement composable block for the head `title` element and use `ng-bind` to avoid curlies (`{{}}`) FoC ([17e6404](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/17e6404))

#### Bug Fixes
* **navbar-global:** use `ui-sref` and `ui-sref-active` directives instead of custom state handling ([cdd754d](http://stash.eap.bit.admin.ch/projects/OUI/repos/oblique-reactive/commits/cdd754d))