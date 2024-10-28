import { writable } from 'svelte/store';

// Initial app options
const initialOptions = {
	isInit: false,
	isMobile: false,
	
	appHeaderHide: false,
	appHeaderFixed: true,
	appHeaderInverse: false,
	appHeaderMegaMenu: false,
	appHeaderLanguageBar: false,
	
	appSidebarHide: false,
	appSidebarFixed: false,
	appSidebarGrid: false,
	appSidebarToggled: false,
	appSidebarMobileToggled: false,
	appSidebarTwo: false,
	appSidebarEnd: false,
	appSidebarEndToggled: false,
	appSidebarEndMobileToggled: false,
	appSidebarWide: false,
	appSidebarLight: false,
	appSidebarTransparent: false,
	appSidebarHover: false,
	
	appTopMenu: false,
	
	appContentFullHeight: false,
	appContentClass: '',
	
	appFooterFixed: false,
	
	appBoxedLayout: false,
	appGradientEanbled: false,
	appThemePanelToggled: false
};

// Create a writable store with the initial options
export const appOptions = writable(initialOptions);