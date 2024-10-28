<script>
	import { page } from '$app/stores';
	import DailyOverview from '../components/common/DailyOverview.svelte';
	import '/src/scss/svelte.scss';
	import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import 'perfect-scrollbar/css/perfect-scrollbar.css';
	import { Body, classList, style } from 'svelte-body';
	import AppLoader from '/src/components/app/AppLoader.svelte';
	import AppHeader from '/src/components/app/AppHeader.svelte';
	import AppSidebar from '/src/components/app/AppSidebar.svelte';
	import AppSidebarRight from '/src/components/app/AppSidebarRight.svelte';
	import AppTopMenu from '/src/components/app/AppTopMenu.svelte';
	import AppThemePanel from '/src/components/app/AppThemePanel.svelte';
	import { onMount } from 'svelte';
  import { appOptions } from '/src/stores/appOptions.js';
  import { appVariables, generateVariables } from '/src/stores/appVariables.js';
  import { setPageTitle } from '$lib/utils';
  
	function handleResize() {
    $appOptions.isMobile = window.innerWidth <= 768; // Adjust the threshold as needed
  }
  
  function handleScroll() {
  	var scrollPosition = window.scrollY || window.pageYOffset;
    if (scrollPosition > 0) {
    	$appOptions.hasScroll = true;
    } else {
    	$appOptions.hasScroll = false;
    }
  }
	
	onMount(async () => {
		import('bootstrap');
		
		$appVariables = generateVariables();
		$appOptions.isInit = true;
		$appOptions.isMobile = window.innerWidth <= 768;
		
		window.addEventListener('resize', handleResize);
		window.addEventListener('scroll', handleScroll); 
	});
</script>

<AppLoader />

<svelte:body use:classList={($appOptions.isInit ? 'app-init ' : '') + ($appOptions.appBoxedLayout ? 'boxed-layout ' : '')} />

<div id="app" class="app" 
	class:app-gradient-enabled={$appOptions.appGradientEnabled}
	class:app-header-fixed={$appOptions.appHeaderFixed && !$appOptions.appHeaderHide}
	class:app-sidebar-fixed={$appOptions.appSidebarFixed && !$appOptions.appSidebarHide}
	class:app-sidebar-minified={$appOptions.appSidebarMinified && !$appOptions.appSidebarHide}
	class:app-sidebar-mobile-toggled={$appOptions.appSidebarMobileToggled}
	class:app-content-full-height={$appOptions.appContentFullHeight}
	class:app-without-sidebar={$appOptions.appSidebarHide}
	class:app-without-header={$appOptions.appHeaderHide}
	class:app-with-top-menu={$appOptions.appTopMenu}
	class:app-with-wide-sidebar={$appOptions.appSidebarWide}
	class:app-with-end-sidebar={$appOptions.appSidebarEnd}
	class:app-with-two-sidebar={$appOptions.appSidebarTwo}
	class:app-with-hover-sidebar={$appOptions.appSidebarHover}
	class:app-sidebar-end-toggled={$appOptions.appSidebarEndToggled && !$appOptions.isMobile}
	class:app-sidebar-end-mobile-toggled={$appOptions.appSidebarEndMobileToggled && $appOptions.isMobile}
	class:app-footer-fixed={$appOptions.appFooterFixed}
	class:has-scroll={$appOptions.hasScroll}
>
	{#if !$appOptions.appHeaderHide}<AppHeader />{/if}
	{#if !$appOptions.appSidebarHide}<AppSidebar />{/if}
	{#if $appOptions.appSidebarTwo}<AppSidebarRight />{/if}
	{#if $appOptions.appTopMenu}<AppTopMenu />{/if}
	<AppThemePanel />
	
	<div id="content" class="app-content{($appOptions.appContentClass) ? ' '+ $appOptions.appContentClass : ''}">
		{#if $page.url.pathname !== '/Auth/Login'}
		<DailyOverview />
	{/if}
		<slot />
		
	</div>
</div>