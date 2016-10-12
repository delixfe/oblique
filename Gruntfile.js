module.exports = function (grunt) {
	'use strict';

	// Required project configuration:
	var project = require('./project.conf.js');

    // Optional build configuration:
    var paths = {
        oblique: 'src/',
        src: 'showcase/',
        app: 'showcase/app/',
        states: 'showcase/app/states/',
        less: 'showcase/less/',
        pages: 'showcase/pages/',
        partials: 'showcase/partials/',
        testResources: 'testResources/',
	    modules: 'node_modules/',
	    vendor: 'vendor/',
        staging: '.tmp/'
    };

	// Grunt init
	grunt.initConfig({

			// Metadata -----------------------------------------------------------------

			// Package configuration
			pkg: grunt.file.readJSON('package.json'),

			// Make project paths available to grunt:
			paths: paths,

			// Tasks --------------------------------------------------------------------

			/*
			 * grunt-config
			 *
			 * https://github.com/almeidap/grunt-config
			 *
			 * Environment configuration
			 */
			config: {

				// Default & shared environment variables (may be overrided by other jobs through `options.variables`)
				options: {
					variables: {
						env: project.common
					}
				},
				dev: {
					options: {
						variables: {
							env: project.dev
						}
					}
				},
				prod: {
					options: {
						variables: {
							env: project.prod
						}
					}
				}
			},

			/*
			 * grunt-contrib-clean
			 *
			 * https://github.com/gruntjs/grunt-contrib-clean
			 *
			 * Clean files and folders.
			 */
			clean: {
				options: {
					force: true
				},
				build: ['<%= env.build.target %>'],
				staging: ['<%= paths.staging %>']
			},

            /*
             * grunt-exec
             *
             * https://github.com/jharding/grunt-exec
             *
             * Runs tsc and npm publish in the terminal
             */
            exec: {
                tsc: 'tsc', //TODO: remove this as soon as this is fixed: https://github.com/TypeStrong/grunt-ts/issues/339
                publish: 'npm publish target/oblique-reactive'
            },

            /*
             * grunt-ts
             *
             * https://github.com/TypeStrong/grunt-ts
             *
             * Compiles our TypeScript sources to JS
             */
            ts: {
                oblique: {
                    tsconfig: 'tsconfig.publish.json'
                },
                //Currently not used, see exec
                showcase: {
                    tsconfig: true
                }
            },

            /*
             * grunt-tslint
             *
             * https://github.com/palantir/grunt-tslint
             *
             * Validate files with TSLint, a tool that helps to detect errors and potential problems in your TypeScript code.
             */
            tslint: {
                options: {
                    configuration: "tslint.json"
                },
                files: {
                    src: [
                        "<%= paths.app %>**/*.ts",
                        "<%= paths.oblique %>**/*.ts"
                    ]
                }
            },

            /*
             * grunt-browserify
             *
             * https://github.com/jmreidy/grunt-browserify
             *
             * Bundle all TypeScript files into one.
             */
            browserify: {
                app: {
                    src: '<%= env.build.target %>app/app-module.js',
                    dest: '<%= env.build.target %>app/bundles/app.js',
                    //Alias to the components (bundles them together with the showcase)
                    options: {
                        alias: {
                            'oblique-reactive/oblique-reactive': './<%= env.build.target %>oblique-reactive/oblique-reactive.js'
                        }
                    }
                },
                oblique: {
                    src: '<%= env.build.target %>/oblique-reactive/oblique-reactive.js',
                    dest: '<%= env.build.target %>/oblique-reactive/bundles/oblique-reactive.js'
                }
            },

			/*
			 * grunt-contrib-copy
			 *
			 * https://github.com/gruntjs/grunt-contrib-copy
			 *
			 * Copy files and folders
			 */
			copy: {
				// RootDirs will mess up the structure, so we copy the compiled files to the right place
				typescript: {
					files: [
						{
							expand: true,
							cwd: '<%= paths.staging %>src/',
							src: '**/*',
							dest: '<%= env.build.target %>oblique-reactive/'
						},
						{
							expand: true,
							cwd: '<%= paths.staging %>showcase/app/',
							src: '**/*',
							dest: '<%= env.build.target %>app/'
						}
					]
				},
				oblique: {
					files: [{
						expand: true,
						cwd: '<%= paths.modules %>oblique-ui/dist/',
						src: '**/*',
						dest: '<%= env.build.target %><%= paths.vendor %>oblique-ui/'
					}]
				},
				app: {
					files: [{
						cwd: '<%= paths.app %>',
						src: ['**/*.js', '**/*.json'],
						dest: '<%= env.build.target %>app/',
						expand: true
					}]
				},
				assets: {
					files: [{
						cwd: '<%= paths.src %>',
						src: ['images/**/*', 'js/**/*', 'fonts/**/*'],
						dest: '<%= env.build.target %>',
						expand: true
					}]
				},
				'vendor-js': {
					files: [{
						cwd: '<%= paths.modules %>',
						src: '<%= env.resources.vendor.js %>',
						dest: '<%= env.build.target %><%= paths.vendor %>',
						expand: true
					}]
				},
				'vendor-css': {
					files: [{
						cwd: '<%= paths.modules %>',
						src: '<%= env.resources.vendor.css %>',
						dest: '<%= env.build.target %><%= paths.vendor %>',
						expand: true
					}]
				},
				'vendor-assets': {
					files: [{
						cwd: '<%= paths.modules %>',
						src: '<%= env.resources.vendor.assets %>',
						dest: '<%= env.build.target %><%= paths.vendor %>',
						expand: true,
						flatten: false
					}]
				},
				'testResources': {
					files: [{
						cwd: '<%= paths.modules %>',
						src: '<%= env.resources.vendor.testResources %>',
						dest: '<%= env.build.target %><%= paths.testResources %>',
						expand: true
					}]
				},
				'system-js': {
					files: [{
						cwd: '<%= paths.modules %>',
						src: [
							'systemjs/dist/system.js',
							'systemjs/dist/system-polyfills.js'
						],
						dest: '<%= env.build.target %><%= paths.vendor %>',
						expand: true
					}]
				}
			},

			/*
			 * assemble
			 *
			 * https://github.com/assemble/assemble
			 *
			 * Static site generator
			 */
			assemble: {
				options: {
					flatten: false,

					assets: '<%= env.build.target %>',
					env: '<%= env %>',
					paths: '<%= paths %>',

					data: [
						'package.json'
					],
					layout: false, // Using `composable` layouts, see why here: https://github.com/assemble/assemble/issues/555
					layoutdir: '<%= paths.modules %>oblique-ui/templates/layouts/',
					partials: [
						'<%= paths.modules %>oblique-ui/templates/**/*.hbs',
						'<%= paths.partials %>**/*.hbs'
					],
					helpers: [
						'<%= paths.modules %>oblique-ui/templates/helpers/**/*.js'
					],

                    // Layout placeholders override:
                    'html-attrs': 'ng-controller="appController as appController"',

					// App-specific configuration used by ObliqueUI layouts:
					app: {
						name:               '<%= env.app.module %>',
						title:              '<%= env.app.title %>',
						description:        '<%= env.app.description %>',
						lang:               '<%= env.app.defaults.locale %>',
						home:               '<%= env.app.home %>',
						organization: {
							name:           'Federal Office of Information Technology, Systems and Telecommunication FOITT',
							url:            'http://www.bit.admin.ch',
							email:          'info@bit.admin.ch',
							contact:        false
						},

						// Available locales:
						locales: '<%= env.app.locales %>',

						// Theming:
						theme: {
							tooltips:       true,
							application: {
								fixed:      true
							},
							header: {
								transitions:true
								//variant:  "application-header-sm"
							}
						},

						// References:
						pages: '',
						vendor: {
							path: '<%= paths.vendor %>',
							obliqueui: {
								name: 'oblique-ui',
								title: 'ObliqueUI',
								path: 'oblique-ui/'
							}
						}
					}
				},
				pages: {
					files: [
						{
							expand: true,
							cwd: '<%= paths.pages %>',
							src: '**/*.hbs',
							dest: '<%= env.build.target %>'
						}
					]
				}
			},

			/*
			 * grunt-contrib-less
			 *
			 * https://github.com/gruntjs/grunt-contrib-less
			 *
			 * Compile LESS files to CSS
			 */
			less: {
				css: {
					options: {
						cleancss: false
					},
					files: [{
						src: '<%= paths.less %>main.less',
						dest: '<%= env.build.target %>css/main.css'
					}]
				}
			},

            /*
             * grunt-text-replace
             *
             * https://github.com/yoniholmes/grunt-text-replace
             */
            replace: {
                showcase: {
                    src: [
                        '<%= env.build.target%>/app/**/*.js',
                        '<%= env.build.target%>/oblique-reactive/**/*.js' //Used in tests
                    ],
                    overwrite: true,
                    replacements: [
                        {
                            from: "__MODULE__",
                            to: '<%= env.app.module %>'
                        },
                        {
                            from: "'__CONFIG__'",
                            to: '<%= JSON.stringify(env.app) %>'
                        }
                    ]
                }
            },

            /*
             * html2js
             *
             * https://github.com/karlgoldstein/grunt-html2js
             *
             * Converts AngularJS templates to JavaScript
             */
            html2js: {
                options: {
                    amd: true,
                    amdSuffixString: ''
                },
                showcase: {
                    module: '<%= env.app.module %>.app-templates',
                    options: {
                        amdPrefixString: 'exports.templateModuleName = \'__MODULE__.app-templates\';\n',
                        base: '<%= paths.states %>'
                    },
                    src: '<%= paths.app %>**/*.tpl.html',
                    dest: '<%= env.build.target %>app/app-templates.js'
                },
                oblique: {
                    options: {
                        amdPrefixString: 'exports.templateModuleName = \'oblique-reactive.app-templates\';\n',
                    },
                    module: 'oblique-reactive.app-templates',
                    src: '<%= paths.oblique %>**/*.tpl.html',
                    dest: '<%= env.build.target %>oblique-reactive/oblique-reactive-templates.js'
                }
            },

			/*
			 * grunt-ng-annotate
			 *
			 * https://github.com/mzgol/grunt-ng-annotate
			 *
			 * Grunt plugin to add, remove and rebuild AngularJS dependency injection annotations. Based on ng-annotate.
			 */
			ngAnnotate: {
				app: {
					files: [
						{
							cwd: '<%= env.build.target %>',
							src: ['app/**/*.js'],
							dest: '<%= env.build.target %>',
							expand: true
						}
					]
				}
			},

			/*
			 * grunt-usemin
			 *
			 * https://github.com/yeoman/grunt-usemin
			 *
			 * Replaces references from non-optimized scripts, stylesheets and other assets to their optimized version within a set of HTML files (or any templates/views).
			 */
			useminPrepare: {
				options: {
					dest: '<%= env.build.target %>'
				},
				html: {
					src: '<%= env.build.target %>index.html'
				}
			},

			/*
			 * grunt-filerev
			 *
			 * https://github.com/yeoman/grunt-filerev
			 *
			 * Static asset revisioning through file content hash.
			 */
			filerev: {
				options: {
					encoding: 'utf8',
					algorithm: 'md5',
					length: 8
				},
				min: {
					src: '<%= env.build.target %>min/**/*'
				}
			},

			/*
			 * grunt-usemin
			 *
			 * https://github.com/yeoman/grunt-usemin
			 *
			 * Replaces references to non-optimized scripts or stylesheets into a set of HTML files (or any templates/views).
			 */
			usemin: {
				html: '<%= env.build.target %>index.html',
				options: {
					assetsDirs: ['<%= env.build.target %>']
				}
			},

			/*
			 * grunt-karma
			 *
			 * https://github.com/karma-runner/grunt-karma
			 *
			 * Grunt plugin for Karma test runner
			 */
			karma: {
				unit: {
					configFile: 'karma.conf.js',
					logLevel: 'info',
					singleRun: true
				}
			},

            /*
             * grunt-contrib-watch
             *
             * https://github.com/gruntjs/grunt-contrib-watch
             *
             * Run predefined tasks whenever watched file patterns are added, changed or deleted
             */
            watch: {
                options: {
                    livereload: true,
                    spawn: false
                },
                project: {
                    files: [
                        'project.conf.js',
                        'Gruntfile.js'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'build-<%= _currentEnv() %>'
                    ]
                },
                app: {
                    files: [
                        '<%= paths.app %>**/*.js',
                        '<%= paths.app %>**/*.ts',
                        '<%= paths.oblique %>**/*.ts',
                        '<%= paths.app %>**/*.json'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'tslint',
                        'exec:tsc',
                        'copy:typescript',
                        'copy:app',
                        'html2js',
                        'replace'
                    ]
                },
                assets: {
                    options: {
                        cwd: '<%= paths.src %>'
                    },
                    files: [
                        'images/**/*',
                        'js/**/*',
                        'fonts/**/*'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'copy:assets'
                    ]
                },
                'vendor-js': {
                    options: {
                        cwd: '<%= paths.modules %>'
                    },
                    files: '{<%= env.resources.vendor.js %>}',
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'copy:vendor-js'
                    ]
                },
                'vendor-css': {
                    options: {
                        cwd: '<%= paths.modules %>'
                    },
                    files: '{<%= env.resources.vendor.css %>}',
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'copy:vendor-css'
                    ]
                },
                less: {
                    files: ['<%= paths.less %>**/*.less'],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'less'
                    ]
                },
                pages: {
                    files: [
                        '<%= paths.pages %>**/*.hbs',
                        '<%= paths.partials %>**/*.hbs'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'assemble'
                    ]
                },
                views: {
                    files: [
                        '<%= paths.app %>**/*.tpl.html',
                        '<%= paths.oblique %>**/*.tpl.html'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'html2js'
                    ]
                },
                prod: {
                    files: [
                        '<%= env.build.target %>app/**/*',
                        '<%= env.build.target %>js/**/*',
                        '<%= env.build.target %>css/**/*',
                        '<%= env.build.target %><%= paths.vendor %>**/*'
                    ],
                    tasks: [
                        'config:<%= _currentEnv() %>',
                        'assemble',
                        'optimize'
                    ]
                }
            },

			/*
			 * grunt-focus
			 *
			 * https://github.com/joeytrapp/grunt-focus
			 *
			 * Configure subsets of `watch` configs and focus your Grunt processes.
			 */
			focus: {
				dev: {
					exclude: ['prod']
				},
				prod: {}
			},

            /*
             * grunt-contrib-connect
             *
             * https://github.com/gruntjs/grunt-contrib-connect
             *
             * Start a connect web server.
             */
            connect: {
                local: {
                    options: {
	                    open: true,
                        port: 9000, // Port used to deploy the client
                        base: '<%= env.build.target %>',
                        hostname: '<%= env.app.api.hostname %>',
                        index: '<%= env.app.home %>',
                        middleware: function (connect, options) {
                            if (!Array.isArray(options.base)) {
                                options.base = [options.base];
                            }
                            // Setup the proxy
                            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

                            var serveStatic = require('serve-static');

                            // Serve static files.
                            options.base.forEach(function (base) {
                                middlewares.push(serveStatic(base));
                            });

                            return middlewares;
                        }
                    },
                    proxies: [
                        {
                            context: '/api',
                            host: 'localhost',
                            port: 3000
                        }
                    ]
                }
            },

			/*
			 * grunt-nodemon
			 *
			 * https://github.com/ChrisWren/grunt-nodemon
			 *
			 * Monitor for any changes in your node.js application and automatically restart the server - perfect for development
			 * http://nodemon.io/
			 */
			nodemon: {
				dummy: {
					script: 'server/server.js',
					options: {
						nodeArgs: ['--debug'],
						env: {
							//PORT: '9001'
						},
						watch: ['server/']
					}
				}
			},

			/*
			 * grunt-bump
			 *
			 * https://github.com/vojtajina/grunt-bump
			 *
			 * Bump package version, create tag, commit, push & more.
			 */
			bump: {
				options: {
					files: ["package.json", "bower.json"],
					updateConfigs: ["pkg"],
					commit: true,
					commitMessage: "Release v%VERSION%",
					commitFiles: ["."],
					createTag: true,
					tagName: "v%VERSION%",
					tagMessage: "Version v%VERSION%",
					push: true,
					pushTo: "origin",
					gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d"
				}
			},

			/*
			 * Retrieves the current environment name.
			 */
			_currentEnv: function () {
				var args = grunt.task.current.args || [];
				return args.length > 1 ? args[1] : "dev"; // Args extracted as <task>[:<target>[:<param>]*]
			}
		}
	)
	;

	// Build dependencies -------------------------------------------------------
	require('load-grunt-tasks')(grunt, {scope: "devDependencies"});
	grunt.loadNpmTasks('assemble');

	// Project tasks
	// ----------------------------------

    // Build:
    grunt.registerTask('build', [
        'clean',
        'tslint',
        //'ts:oblique',
        'exec:tsc',
        'copy',
        'assemble',
        'less',
        'html2js',
        'replace',
        'karma:unit',
        'clean:staging'
    ]);

	grunt.registerTask('build-dev', [
		'config:dev',
		'build'
	]);

	grunt.registerTask('build-prod', [
		'config:prod',
		'build',
		'optimize'
	]);

	// Run (build & serve):
	grunt.registerTask('run-dev', [
		'build-dev',
		'configureProxies:local',
		'connect:local',
		'focus:dev:dev'
	]);

    grunt.registerTask('run-prod-local', [
        'config:prod-local', // workaround for proxy because of cors
        'build',
        'optimize',
        'configureProxies:local',
        'connect:local:keepalive',
        'focus:prod:prod'
    ]);

	grunt.registerTask('run-prod', [
		'build-prod',
		'configureProxies:local',
		'connect:local:keepalive',
		'focus:prod:prod'
	]);

    /**
     * Optimizes resources for deployment.
     */
    grunt.registerTask("optimize", [
        'browserify:app',
        'ngAnnotate',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'clean:staging'
    ]);

	// Template-only tasks (remove if necessary)
	// ----------------------------------

	// Release (see https://github.com/vojtajina/grunt-bump#usage-examples):
	grunt.registerTask("release", function (target) {
		grunt.task.run([
			"bump-only:" + (target || "patch"),
			"bump-commit"
		]);
	});

    grunt.registerTask('build-publish', [
        'config:prod',
        'clean:build',
        'build',        //Run test before we publish
        'clean:build',
        'ts:oblique',
        'html2js:oblique',
        'browserify:oblique',
        'package.json',
        'clean:staging'
    ]);

    //Publishes the oblique module on the Nexus
    grunt.registerTask('publish', [
        'build-publish',
        'exec:publish'
    ]);

    //This creates the package.json for publishing
    grunt.registerTask('package.json', function (target) {
        var pkgJson = require('./package.json');
        var targetPkgJson = {};
        var fieldsToCopy = ['version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage', 'publishConfig'];

        targetPkgJson['name'] = 'oblique-reactive';

        fieldsToCopy.forEach(function (field) {
            targetPkgJson[field] = pkgJson[field];
        });

        targetPkgJson['main'] = 'oblique-reactive.js';

        targetPkgJson.peerDependencies = pkgJson.dependencies;

        grunt.file.write('target/oblique-reactive/package.json', JSON.stringify(targetPkgJson, null, 2));
    });

    // Main task aliases
    // ----------------------------------

	// Default:
	grunt.registerTask('default', ['run-dev']);

	// Test-only tasks
	// ----------------------------------
	grunt.registerTask('dummy-server', ['nodemon']);
};