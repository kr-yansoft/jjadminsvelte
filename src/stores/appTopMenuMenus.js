import { writable } from 'svelte/store';

const menus = [{
	text: 'Navigation',
	is_header: true
},
{ 
	url: '/home', icon: 'fa fa-sitemap', title: 'Home'
},
{ url: '/menu', icon: 'fa fa-align-left', title: 'Menu Level',
	children: [
		{ url: '/menu/menu-1-1', title: 'Menu 1.1',
			children: [
				{ url: '/menu/menu-1-1/menu-2-1', title: 'Menu 2.1',
					children: [
						{ url: '/menu/menu-1-1/menu-2-1/menu-3-1', title: 'Menu 3.1' },
						{ url: '/menu/menu-1-1/menu-2-1/menu-3-2', title: 'Menu 3.2' }
					]
				},
				{ url: '/menu/menu-1-1/menu-2-2', title: 'Menu 2.2' },
				{ url: '/menu/menu-1-1/menu-2-3', title: 'Menu 2.3' },
			]
		},
		{ url: '/menu/menu-1-2', title: 'Menu 1.2' },
		{ url: '/menu/menu-1-3', title: 'Menu 1.3' },
	]
}];

// Create a writable store with the initial options
export const appTopMenuMenus = writable(menus);