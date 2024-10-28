<!-- <script>
	import { onMount } from 'svelte';
	import PerfectScrollbar from '/src/components/plugins/PerfectScrollbar.svelte';
	import Card from '/src/components/bootstrap/Card.svelte';
	import CardBody from '/src/components/bootstrap/CardBody.svelte';
  import { appVariables, generateVariables } from '/src/stores/appVariables.js';
  import { appOptions } from '/src/stores/appOptions.js';
	
	let active = 'false';
	let activeMode = 'light';
	let activeTheme = 'theme-teal';

	let themeList = [
	 { name: 'Pink', bgClass: 'bg-pink', themeClass: 'theme-pink' },
	 { name: 'Red', bgClass: 'bg-red', themeClass: 'theme-red' },
	 { name: 'Orange', bgClass: 'bg-warning', themeClass: 'theme-warning' },
	 { name: 'Yellow', bgClass: 'bg-yellow', themeClass: 'theme-yellow' },
	 { name: 'Lime', bgClass: 'bg-lime', themeClass: 'theme-lime' },
	 { name: 'Green', bgClass: 'bg-green', themeClass: 'theme-green' },
	 { name: 'Default', bgClass: 'bg-teal', themeClass: 'theme-teal' },
	 { name: 'Cyan', bgClass: 'bg-info', themeClass: 'theme-info' },
	 { name: 'Blue', bgClass: 'bg-primary', themeClass: 'theme-primary' },
	 { name: 'Purple', bgClass: 'bg-purple', themeClass: 'theme-purple' },
	 { name: 'Indigo', bgClass: 'bg-indigo', themeClass: 'theme-indigo' },
	 { name: 'Gray', bgClass: 'bg-gray-200', themeClass: 'theme-gray-200' }
	];

  function themePanelToggler(event) {
  	event.preventDefault();
  	active = (active === 'true') ? 'false' : 'true';
  	localStorage.setItem('theme-panel', active);
  }
  
  function themeModeToggler() {
  	activeMode = (activeMode == 'light') ? 'dark' : 'light';
  	localStorage.setItem('theme-mode', activeMode);
  	document.documentElement.setAttribute('data-bs-theme', activeMode);
  	$appVariables = generateVariables();
  }
  
  function themeColorToggler(themeClass) {
  	activeTheme = themeClass;
  	localStorage.setItem('theme-color', themeClass);
  	
  	for (var x = 0; x < document.body.classList.length; x++) {
			var targetClass = document.body.classList[x];
			if (targetClass.search('theme-') > -1) {
				document.body.classList.remove(targetClass);
			}
		}
	
		document.body.classList.add(themeClass);
		$appVariables = generateVariables();
  }
  
  function toggleHeaderFixed() {
  	$appOptions.appHeaderFixed = !$appOptions.appHeaderFixed;
  	if (!$appOptions.appHeaderFixed && $appOptions.appSidebarFixed) {
  		alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
  		$appOptions.appSidebarFixed = false;
  		localStorage.setItem('app-sidebar-fixed', $appOptions.appSidebarFixed);
  	}
  	localStorage.setItem('app-header-fixed', $appOptions.appHeaderFixed);
  }
  
  function toggleHeaderInverse() {
  	$appOptions.appHeaderInverse = !$appOptions.appHeaderInverse;
  	localStorage.setItem('app-header-inverse', $appOptions.appHeaderInverse);
  }
  
  function toggleSidebarFixed() {
  	$appOptions.appSidebarFixed = !$appOptions.appSidebarFixed;
  	localStorage.setItem('app-sidebar-fixed', $appOptions.appSidebarFixed);
  	if (!$appOptions.appHeaderFixed && $appOptions.appSidebarFixed) {
  		alert('Default Header with Fixed Sidebar option is not supported. Proceed with Default Header with Default Sidebar.');
  		$appOptions.appHeaderFixed = true;
  		localStorage.setItem('app-header-fixed', $appOptions.appHeaderFixed);
  	}
  }
  
  function toggleSidebarGrid() {
  	$appOptions.appSidebarGrid = !$appOptions.appSidebarGrid;
  	localStorage.setItem('app-sidebar-grid', $appOptions.appSidebarGrid);
  }
  
  function toggleGradientEnabled() {
  	$appOptions.appGradientEnabled = !$appOptions.appGradientEnabled;
  	localStorage.setItem('app-gradient-enabled', $appOptions.appGradientEnabled);
  }
  
  function showDotnetAlert() {
  	alert('.NET Core 8.0 MVC Version only available in downloaded version.');
  }
  
  function showLaravelAlert() {
  	alert('Laravel 10 Version only available in downloaded version.');
  }
  
  function showDjangoAlert() {
  	alert('Django Version only available in downloaded version.');
  }
  
	onMount(async () => {
		let bootstrap = await import('bootstrap');
		let targets =  document.querySelectorAll('[data-bs-toggle="tooltip"]');
	
		targets.forEach(target => {
			new bootstrap.Tooltip(target);
		});
		
		if (typeof localStorage !== 'undefined') {
			active = (localStorage.getItem('theme-panel')) ? localStorage.getItem('theme-panel') : active;
			activeTheme = (localStorage.getItem('theme-color')) ? localStorage.getItem('theme-color') : activeTheme;
			
			themeColorToggler(activeTheme);
			
			if (localStorage.getItem('theme-mode') == 'dark') {
				themeModeToggler();
			}
			if (localStorage.getItem('app-header-fixed')) {
				$appOptions.appHeaderFixed = JSON.parse(localStorage.getItem('app-header-fixed'));
			}
			if (localStorage.getItem('app-header-inverse')) {
				$appOptions.appHeaderInverse = JSON.parse(localStorage.getItem('app-header-inverse'));
			}
			if (localStorage.getItem('app-sidebar-fixed')) {
				$appOptions.appSidebarFixed = JSON.parse(localStorage.getItem('app-sidebar-fixed'));
			}
			if (localStorage.getItem('app-sidebar-grid')) {
				$appOptions.appSidebarGrid = JSON.parse(localStorage.getItem('app-sidebar-grid'));
			}
			if (localStorage.getItem('app-gradient-enabled')) {
				$appOptions.appGradientEnabled = JSON.parse(localStorage.getItem('app-gradient-enabled'));
			}
		}
	});
</script>

<div class="theme-panel" class:active={ active === 'true' }>
	<a href="#/" on:click={themePanelToggler} class="theme-collapse-btn"><i class="fa fa-cog"></i></a>
	<PerfectScrollbar class="theme-panel-content h-100">
		<h5>App Settings</h5>
		<div class="theme-list">
			{#each themeList as theme}
				<div class="theme-list-item" class:active={theme.themeClass == activeTheme}>
					<a href="#/" class="theme-list-link {theme.bgClass}" on:click|preventDefault={() => themeColorToggler(theme.themeClass)} data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-container="body" data-bs-title="{theme.name}">&nbsp;</a>
				</div>
			{/each}
		</div>
		<div class="theme-panel-divider"></div>
		<div class="row mt-10px">
			<div class="col-8 control-label text-dark fw-bold">
				<div>Dark Mode <span class="badge bg-primary ms-1 py-2px position-relative" style="top: -1px;">NEW</span></div>
				<div class="lh-14">
					<small class="text-dark opacity-50">
						Adjust the appearance to reduce glare and give your eyes a break.
					</small>
				</div>
			</div>
			<div class="col-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" on:click={themeModeToggler} checked={activeMode == 'dark'} />
					<label class="form-check-label" for="appThemeDarkMode">&nbsp;</label>
				</div>
			</div>
		</div>
		
		<div class="theme-panel-divider"></div>
		
		<div class="row mt-10px align-items-center">
			<div class="col-8 control-label text-dark fw-bold">Header Fixed</div>
			<div class="col-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" id="appHeaderFixed" on:click={toggleHeaderFixed} checked={$appOptions.appHeaderFixed} />
					<label class="form-check-label" for="appHeaderFixed">&nbsp;</label>
				</div>
			</div>
		</div>
		<div class="row mt-10px align-items-center">
			<div class="col-8 control-label text-dark fw-bold">Header Inverse</div>
			<div class="col-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" id="appHeaderInverse" on:click={toggleHeaderInverse} checked={$appOptions.appHeaderInverse} />
					<label class="form-check-label" for="appHeaderInverse">&nbsp;</label>
				</div>
			</div>
		</div>
		<div class="row mt-10px align-items-center">
			<div class="col-8 control-label text-dark fw-bold">Sidebar Fixed</div>
			<div class="col-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" id="appSidebarFixed" on:click={toggleSidebarFixed} checked={$appOptions.appSidebarFixed} />
					<label class="form-check-label" for="appSidebarFixed">&nbsp;</label>
				</div>
			</div>
		</div>
		<div class="row mt-10px align-items-center">
			<div class="col-8 control-label text-dark fw-bold">Sidebar Grid</div>
			<div class="col-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" id="appSidebarGrid" on:click={toggleSidebarGrid} checked={$appOptions.appSidebarGrid} />
					<label class="form-check-label" for="appSidebarGrid">&nbsp;</label>
				</div>
			</div>
		</div>
		<div class="row mt-10px align-items-center">
			<div class="col-md-8 control-label text-dark fw-bold">Gradient Enabled</div>
			<div class="col-md-4 d-flex">
				<div class="form-check form-switch ms-auto mb-0">
					<input type="checkbox" class="form-check-input" id="appGradientEnabled" on:click={toggleGradientEnabled} checked={$appOptions.appGradientEnabled} />
					<label class="form-check-label" for="appGradientEnabled">&nbsp;</label>
				</div>
			</div>
		</div>
		
		<div class="theme-panel-divider"></div>
		
		<h5>Admin Design (6)</h5>
		<div class="theme-version">
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/html/index_v3.html" class="theme-version-link active">
					<span style="background-image: url(/img/theme/default.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/transparent/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/theme/transparent.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/apple/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/theme/apple.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/material/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/theme/material.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/facebook/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/theme/facebook.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/google/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/theme/google.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
		</div>
		
		<div class="theme-panel-divider"></div>
		
		<h5>Language Version (9)</h5>
		<div class="theme-version">
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/html/index_v3.html" class="theme-version-link">
					<span style="background-image: url(/img/version/html.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/ajax/" class="theme-version-link">
					<span style="background-image: url(/img/version/ajax.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/angularjs/" class="theme-version-link">
					<span style="background-image: url(/img/version/angular1x.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/angularjs17/" class="theme-version-link">
					<span style="background-image: url(/img/version/angular10x.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/svelte/" class="theme-version-link active">
					<span style="background-image: url(/img/version/svelte.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="#/" on:click|preventDefault={showLaravelAlert} class="theme-version-link">
					<span style="background-image: url(/img/version/laravel.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="#/" on:click|preventDefault={showDjangoAlert} class="theme-version-link">
					<span style="background-image: url(/img/version/django.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/vue3/" class="theme-version-link">
					<span style="background-image: url(/img/version/vuejs.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/admin/react/" class="theme-version-link">
					<span style="background-image: url(/img/version/reactjs.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="#/" on:click|preventDefault={showDotnetAlert} class="theme-version-link">
					<span style="background-image: url(/img/version/dotnet.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
		</div>
		
		<div class="theme-panel-divider"></div>
		
		<h5>Frontend Design (5)</h5>
		<div class="theme-version">
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/frontend/one-page-parallax/" target="_blank" class="theme-version-link">
					<span style="background-image: url(/img/theme/one-page-parallax.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/frontend/e-commerce/" target="_blank" class="theme-version-link">
					<span style="background-image: url(/img/theme/e-commerce.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/frontend/blog/" target="_blank" class="theme-version-link">
					<span style="background-image: url(/img/theme/blog.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/frontend/forum/" target="_blank" class="theme-version-link">
					<span style="background-image: url(/img/theme/forum.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
			<div class="theme-version-item">
				<a href="https://seantheme.com/color-admin/frontend/corporate/" target="_blank" class="theme-version-link">
					<span style="background-image: url(/img/theme/corporate.jpg);" class="theme-version-cover"></span>
				</a>
			</div>
		</div>
		
		<div class="theme-panel-divider"></div>
		
		<a href="https://seantheme.com/color-admin/documentation/" class="btn btn-dark d-block w-100 rounded-pill mb-10px" target="_blank"><b>Documentation</b></a>
		<a href="#/" class="btn btn-default d-block w-100 rounded-pill" data-toggle="reset-local-storage"><b>Reset Local Storage</b></a>
	</PerfectScrollbar>
</div> -->