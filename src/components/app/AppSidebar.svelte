<script>
	import PerfectScrollbar from '/src/components/plugins/PerfectScrollbar.svelte';
  import { appOptions } from '/src/stores/appOptions.js';
  import { appSidebarMenus } from '/src/stores/appSidebarMenus.js';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
  import { slideUp, slideToggle } from '$lib/utils';
  
	let appSidebarFloatSubmenuTimeout = '';
	let appSidebarFloatSubmenuDom = '';
  
  function mobileToggler() {
  	$appOptions.appSidebarMobileToggled = !$appOptions.appSidebarMobileToggled;
  }
  
	function minifiedToggler(e) {
		e.preventDefault();
		
		$appOptions.appSidebarMinified = ($appOptions.appSidebarMinified) ? '' : true;
		
		if (localStorage) {
			localStorage.appSidebarMinified = $appOptions.appSidebarMinified;
		}
	}
	
  function hideMobileSidebar() {
  	$appOptions.appSidebarMobileToggled = false;
  }
  
  function checkChildMenu(childMenu) {
  	let check = false;
  	if (childMenu) {
  		for (var i = 0; i < childMenu.length; i++) {
  			if ($page.url.pathname == childMenu[i]['url']) {
  				check = true;
  			}
  		}
  	}
  	return check;
  }
  
  function handleSidebarMenuToggle(menus, expandTime) {
		menus.map(function(menu) {
			menu.onclick = function(e) {
				e.preventDefault();
				var target = this.nextElementSibling;

				menus.map(function(m) {
					var otherTarget = m.nextElementSibling;
					if (otherTarget !== target) {
						slideUp(otherTarget, expandTime);
						otherTarget.closest('.menu-item').classList.remove('expand');
						otherTarget.closest('.menu-item').classList.add('closed');
					}
				});

				var targetItemElm = target.closest('.menu-item');

				if (targetItemElm.classList.contains('expand') || (targetItemElm.classList.contains('active') && !target.style.display)) {
					targetItemElm.classList.remove('expand');
					targetItemElm.classList.add('closed');
					slideToggle(target, expandTime);
				} else {
					targetItemElm.classList.add('expand');
					targetItemElm.classList.remove('closed');
					slideToggle(target, expandTime);
				}
			}
		});
	}
	
	function handleSidebarMenu() {
		var targetSidebar       = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var expandTime          = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 250;
		var menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
		var submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

		// menu
		var menuLinkSelector =  menuBaseSelector + ' > .menu-link';
		var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
		handleSidebarMenuToggle(menus, expandTime);

		// submenu lvl 1
		var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
		var submenusLvl1 = [].slice.call(document.querySelectorAll(submenuLvl1Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl1, expandTime);

		// submenu lvl 2
		var submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
		var submenusLvl2 = [].slice.call(document.querySelectorAll(submenuLvl2Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl2, expandTime);
	}
	
	function handleSearchFunction(event) {
		var targetValue = event.target.value;
				targetValue = targetValue.toLowerCase();
	
		if (targetValue) {
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search), .app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.add('d-none');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .has-text'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.remove('has-text');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.remove('expand');
				});
			}
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search) > .menu-link, .app-sidebar .menu-submenu > .menu-item > .menu-link'));
			if (elms) {
				elms.map(function(elm) {
					var targetText = elm.textContent;
							targetText = targetText.toLowerCase();
					if (targetText.search(targetValue) > -1) {
						var targetElm = elm.closest('.menu-item');
						if (targetElm) {
							targetElm.classList.remove('d-none');
							targetElm.classList.add('has-text');
						}
						
						var targetElm = elm.closest('.menu-item.has-sub');
						if (targetElm) {
							var targetElm = targetElm.querySelector('.menu-submenu .menu-item.d-none');
							if (targetElm) {
								targetElm.classList.remove('d-none');
							}
						}
						
						var targetElm = elm.closest('.menu-submenu');
						if (targetElm) {
							targetElm.style.display = 'block';
							
							var targetElm = targetElm.querySelector('.menu-item:not(.has-text)');
							if (targetElm) {
								targetElm.classList.add('d-none');
							}
							
							var targetElm = elm.closest('.has-sub:not(.has-text)');
							if (targetElm) {
								targetElm.classList.remove('d-none');
								targetElm.classList.add('expand');
								
								var targetElm = targetElm.closest('.has-sub:not(.has-text)');
								if (targetElm) {
									targetElm.classList.remove('d-none');
									targetElm.classList.add('expand');
								}
							}
						}
					}
				});
			}
		} else {
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search).has-sub .menu-submenu'));
			if (elms) {
				elms.map(function(elm) {
					elm.removeAttribute('style');
				});
			}
			
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu > .menu-item:not(.menu-profile):not(.menu-header):not(.menu-search)'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.remove('d-none');
				});
			}
			
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .menu-submenu > .menu-item'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.remove('d-none');
				});
			}
			
			var elms = [].slice.call(document.querySelectorAll('.app-sidebar:not(.app-sidebar-end) .expand'));
			if (elms) {
				elms.map(function(elm) {
					elm.classList.remove('expand');
				});
			}
		}
	}

	function handleGetHiddenMenuHeight(elm) {
		elm.setAttribute('style', 'position: absolute; visibility: hidden; display: block !important');
		var targetHeight  = elm.clientHeight;
		elm.removeAttribute('style');
		return targetHeight;
	}

	function handleSidebarMinifyFloatMenuClick() {
		var elms = [].slice.call(document.querySelectorAll('#app-sidebar-float-submenu .menu-item.has-sub > .menu-link'));
		if (elms) {
			elms.map(function(elm) {
				elm.onclick = function(e) {
					e.preventDefault();
					var targetItem = this.closest('.menu-item');
					var target = targetItem.querySelector('.menu-submenu');
					var targetStyle = getComputedStyle(target);
					var close = (targetStyle.getPropertyValue('display') != 'none') ? true : false;
					var expand = (targetStyle.getPropertyValue('display') != 'none') ? false : true;
					
					slideToggle(target);
					
					var loopHeight = setInterval(function() {
						var targetMenu = document.querySelector('#app-sidebar-float-submenu');
						var targetMenuArrow = document.querySelector('#app-sidebar-float-submenu-arrow');
						var targetMenuLine = document.querySelector('#app-sidebar-float-submenu-line');
						var targetHeight = targetMenu.clientHeight;
						var targetOffset = targetMenu.getBoundingClientRect();
						var targetOriTop = targetMenu.getAttribute('data-offset-top');
						var targetMenuTop = targetMenu.getAttribute('data-menu-offset-top');
						var targetTop 	 = targetOffset.top;
						var windowHeight = document.body.clientHeight;
						if (close) {
							if (targetTop > targetOriTop) {
								targetTop = (targetTop > targetOriTop) ? targetOriTop : targetTop;
								targetMenu.style.top = targetTop + 'px';
								targetMenu.style.bottom = 'auto';
								targetMenuArrow.style.top = '20px';
								targetMenuArrow.style.bottom = 'auto';
								targetMenuLine.style.top = '20px';
								targetMenuLine.style.bottom = 'auto';
							}
						}
						if (expand) {
							if ((windowHeight - targetTop) < targetHeight) {
								var arrowBottom = (windowHeight - targetMenuTop) - 22;
								targetMenu.style.top = 'auto';
								targetMenu.style.bottom = 0;
								targetMenuArrow.style.top = 'auto';
								targetMenuArrow.style.bottom = arrowBottom + 'px';
								targetMenuLine.style.top = '20px';
								targetMenuLine.style.bottom = arrowBottom + 'px';
							}
							var floatSubmenuElm = document.querySelector('#app-sidebar-float-submenu .app-sidebar-float-submenu');
							if (targetHeight > windowHeight) {
								if (floatSubmenuElm) {
									var splitClass = ('overflow-scroll mh-100vh').split(' ');
									for (var i = 0; i < splitClass.length; i++) {
										floatSubmenuElm.classList.add(splitClass[i]);
									}
								}
							}
						}
					}, 1);
					setTimeout(function() {
						clearInterval(loopHeight);
					}, 250);
				}
			});
		}
	}
	
	function handleSidebarMinifyFloatMenu() {
		var elms = [].slice.call(document.querySelectorAll('.app-sidebar .menu > .menu-item.has-sub > .menu-link'));
		if (elms) {
			elms.map(function(elm) {
				elm.onmouseenter = function() {
					var appElm = document.querySelector('.app');
					if (appElm && appElm.classList.contains('app-sidebar-minified')) {
						clearTimeout(appSidebarFloatSubmenuTimeout);
						var targetMenu = this.closest('.menu-item').querySelector('.menu-submenu');
						if (appSidebarFloatSubmenuDom == this && document.querySelector('#app-sidebar-float-submenu')) {
							return;
						} else {
							appSidebarFloatSubmenuDom = this;
						}
						var targetMenuHtml = targetMenu.innerHTML;
						if (targetMenuHtml) {
							var bodyStyle     = getComputedStyle(document.body);
							var sidebar       = document.querySelector('#sidebar');
							var sidebarOffset = sidebar.getBoundingClientRect();
							var sidebarWidth  = parseInt(sidebar.clientWidth);
							var sidebarX      = (!appElm.classList.contains('app-sidebar-end') && bodyStyle.getPropertyValue('direction') != 'rtl') ? (sidebarOffset.left + sidebarWidth) : (document.body.clientWidth - sidebarOffset.left);
							var targetHeight  = handleGetHiddenMenuHeight(targetMenu);
							var targetOffset  = this.getBoundingClientRect();
							var targetTop     = targetOffset.top;
							var targetLeft    = (!appElm.classList.contains('app-sidebar-end') && bodyStyle.getPropertyValue('direction') != 'rtl') ? sidebarX : 'auto';
							var targetRight   = (!appElm.classList.contains('app-sidebar-end') && bodyStyle.getPropertyValue('direction') != 'rtl') ? 'auto' : sidebarX;
							var darkMode      = (sidebar.getAttribute('data-bs-theme') == 'dark') ? true : false;
							var windowHeight  = document.body.clientHeight;
							
							if (!document.querySelector('#app-sidebar-float-submenu')) {
								var overflowClass = '';
								if (targetHeight > windowHeight) {
									overflowClass = 'overflow-scroll mh-100vh';
								}
								var html = document.createElement('div');
								if (darkMode) {
									html.setAttribute('data-bs-theme', 'dark');
								}
								html.setAttribute('id', 'app-sidebar-float-submenu');
								html.setAttribute('class', 'app-sidebar-float-submenu-container');
								html.setAttribute('data-offset-top', targetTop);
								html.setAttribute('data-menu-offset-top', targetTop);
								html.innerHTML = ''+
								'	<div class="app-sidebar-float-submenu-arrow" id="app-sidebar-float-submenu-arrow"></div>'+
								'	<div class="app-sidebar-float-submenu-line" id="app-sidebar-float-submenu-line"></div>'+
								'	<div class="app-sidebar-float-submenu '+ overflowClass +'">'+ targetMenuHtml + '</div>';
								appElm.appendChild(html);
								
								var elm = document.getElementById('app-sidebar-float-submenu');
								elm.onmouseover = function() {
									clearTimeout(appSidebarFloatSubmenuTimeout);
								};
								elm.onmouseout = function() {
									appSidebarFloatSubmenuTimeout = setTimeout(() => {
										document.querySelector('#app-sidebar-float-submenu').remove();
									}, 250);
								};
							} else {
								var floatSubmenu = document.querySelector('#app-sidebar-float-submenu');
								var floatSubmenuElm = document.querySelector('#app-sidebar-float-submenu' + ' .app-sidebar-float-submenu');
								
								if (targetHeight > windowHeight) {
									if (floatSubmenuElm) {
										var splitClass = ('overflow-scroll mh-100vh').split(' ');
										for (var i = 0; i < splitClass.length; i++) {
											floatSubmenuElm.classList.add(splitClass[i]);
										}
									}
								}
								floatSubmenu.setAttribute('data-offset-top', targetTop);
								floatSubmenu.setAttribute('data-menu-offset-top', targetTop);
								floatSubmenuElm.innerHTML = targetMenuHtml;
							}
					
							var targetHeight = document.querySelector('#app-sidebar-float-submenu').clientHeight;
							var floatSubmenuElm = document.querySelector('#app-sidebar-float-submenu');
							var floatSubmenuArrowElm = document.querySelector('#app-sidebar-float-submenu-arrow');
							var floatSubmenuLineElm = document.querySelector('#app-sidebar-float-submenu-line');
							if ((windowHeight - targetTop) > targetHeight) {
								if (floatSubmenuElm) {
									floatSubmenuElm.style.top = targetTop + 'px';
									floatSubmenuElm.style.left = targetLeft + 'px';
									floatSubmenuElm.style.bottom = 'auto';
									floatSubmenuElm.style.right = targetRight + 'px';
								}
								if (floatSubmenuArrowElm) {
									floatSubmenuArrowElm.style.top = '20px';
									floatSubmenuArrowElm.style.bottom = 'auto';
								}
								if (floatSubmenuLineElm) {
									floatSubmenuLineElm.style.top = '20px';
									floatSubmenuLineElm.style.bottom = 'auto';
								}
							} else {
								var arrowBottom = (windowHeight - targetTop) - 21;
								if (floatSubmenuElm) {
									floatSubmenuElm.style.top = 'auto';
									floatSubmenuElm.style.left = targetLeft + 'px';
									floatSubmenuElm.style.bottom = 0;
									floatSubmenuElm.style.right = targetRight + 'px';
								}
								if (floatSubmenuArrowElm) {
									floatSubmenuArrowElm.style.top = 'auto';
									floatSubmenuArrowElm.style.bottom = arrowBottom + 'px';
								}
								if (floatSubmenuLineElm) {
									floatSubmenuLineElm.style.top = '20px';
									floatSubmenuLineElm.style.bottom = arrowBottom + 'px';
								}
							}
							handleSidebarMinifyFloatMenuClick();
						} else {
							document.querySelector('#app-sidebar-float-submenu-line').remove();
							appSidebarFloatSubmenuDom = '';
						}
					}
				}
				elm.onmouseleave = function() {
					var elm = document.querySelector('.app');
					if (elm && elm.classList.contains('app-sidebar-minified')) {
						appSidebarFloatSubmenuTimeout = setTimeout(() => {
							var elm = document.querySelector('#app-sidebar-float-submenu-line');
							if (elm) {
								elm.remove();
							}
							appSidebarFloatSubmenuDom = '';
						}, 250);
					}
				}
			});
		}
	}
	
	function toggleProfileMenu() {
		var target = document.getElementById('appSidebarProfileMenu');
		if (target) {
			slideToggle(target, 250);
		}
	}
  
  $: if($navigating) hideMobileSidebar();
  
	onMount(async () => {
		handleSidebarMenu();
		handleSidebarMinifyFloatMenu();
	});
</script>
<!-- BEGIN #sidebar -->
<div id="sidebar" class="app-sidebar" 
	data-bs-theme={($appOptions.appSidebarLight) ? 'light' : 'dark'}
	class:app-sidebar-grid={$appOptions.appSidebarGrid}
	class:app-sidebar-transparent={$appOptions.appSidebarTransparent}
>
	<!-- BEGIN scrollbar -->
	<PerfectScrollbar class={(!$appOptions.appSidebarFixed && !$appOptions.isMobile) ? 'min-vh-100 ps' : 'h-100  ps ps--active-y'}>
		<div class="app-sidebar-content">
			<!-- BEGIN menu -->
			<div class="menu">
				<div class="menu-profile">
					<a href="#/" class="menu-profile-link" on:click|preventDefault={toggleProfileMenu}>
						<div class="menu-profile-cover with-shadow"></div>
						<div class="menu-profile-image menu-profile-image-icon bg-gray-900 text-gray-600">
							<i class="fa fa-user"></i>
						</div>
						<div class="menu-profile-info">
							<div class="d-flex align-items-center">
								<div class="flex-grow-1">
									홍길동
								</div>
								<div class="menu-caret ms-auto"></div>
							</div>
							<small>관리자</small>
						</div>
					</a>
				</div>
				<div id="appSidebarProfileMenu" class="collapse">
					<div class="menu-item pt-5px">
						<a href="#/" class="menu-link">
							<div class="menu-icon"><i class="fa fa-cog"></i></div>
							<div class="menu-text">Settings</div>
						</a>
					</div>
					<div class="menu-item">
						<a href="#/" class="menu-link">
							<div class="menu-icon"><i class="fa fa-pencil-alt"></i></div>
							<div class="menu-text"> Send Feedback</div>
						</a>
					</div>
					<div class="menu-item pb-5px">
						<a href="#/" class="menu-link">
							<div class="menu-icon"><i class="fa fa-question-circle"></i></div>
							<div class="menu-text"> Helps</div>
						</a>
					</div>
					<div class="menu-divider m-0"></div>
				</div>
				
				{#if $appOptions.appSidebarSearch}
					<div class="menu-search mb-n3">
						<input type="text" class="form-control" placeholder="Sidebar menu filter..." on:keyup={handleSearchFunction} />
					</div>
				{/if}
				{#each $appSidebarMenus as menu}
					{#if menu.is_header}
						<div class="menu-header">{ menu.text }</div>
					{:else if menu.is_divider}
						<div class="menu-divider"></div>
					{:else}
						<div class="menu-item" class:has-sub={menu.children} class:active={$page.url.pathname === menu.url || checkChildMenu(menu.children)}>
							<a href={menu.url} class="menu-link">
								{#if menu.icon}
									<div class="menu-icon"><i class={menu.icon}></i></div>
								{/if}
								{#if menu.img}
									<div class="menu-icon-img">
										<img src="{menu.img}" alt="" />
									</div>
								{/if}
								<div class="menu-text">
									{menu.title} 
									{#if menu.label}<span class="menu-label">NEW</span>{/if}
									{#if menu.highlight}<i class="fa fa-paper-plane text-theme"></i>{/if}
								</div>
								{#if menu.badge}
									<div class="menu-badge">{menu.badge}</div>
								{:else if menu.children}
									<div class="menu-caret"></div>
								{/if}
							</a>
						
							{#if menu.children}
								<div class="menu-submenu">
									{#each menu.children as childMenu}
										<div class="menu-item" class:has-sub={childMenu.children}  class:active={$page.url.pathname === childMenu.url}>
											<a href={childMenu.url} class="menu-link">
												<span class="menu-text">{childMenu.title}</span>
												{#if childMenu.children}
													<div class="menu-caret"></div>
												{/if}
											</a>
											
											{#if childMenu.children}
												<div class="menu-submenu">
													{#each childMenu.children as childMenu2}
														<div class="menu-item" class:has-sub={childMenu2.children}  class:active={$page.url.pathname === childMenu2.url}>
															<a href={childMenu2.url} class="menu-link">
																<span class="menu-text">{childMenu2.title}</span>
																{#if childMenu2.children}
																	<div class="menu-caret"></div>
																{/if}
															</a>
															
															{#if childMenu2.children}
																<div class="menu-submenu">
																	{#each childMenu2.children as childMenu3}
																		<div class="menu-item" class:has-sub={childMenu3.children}  class:active={$page.url.pathname === childMenu3.url}>
																			<a href={childMenu3.url} class="menu-link">
																				<span class="menu-text">{childMenu3.title}</span>
																				{#if childMenu3.children}
																					<div class="menu-caret"></div>
																				{/if}
																			</a>
																		</div>
																	{/each}
																</div>
															{/if}
														</div>
													{/each}
												</div>
											{/if}
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{/if}
				{/each}
				
				<!-- BEGIN minify-button -->
				<div class="menu-item d-flex">
					<a href="#/" class="app-sidebar-minify-btn ms-auto d-flex align-items-center text-decoration-none" on:click={minifiedToggler}><i class="fa fa-angle-double-left"></i></a>
				</div>
				<!-- END minify-button -->
			</div>
			<!-- END menu -->
		</div>
	</PerfectScrollbar>
	<!-- END scrollbar -->
</div>
<!-- END #sidebar -->

<div class="app-sidebar-bg" data-bs-theme="dark"></div>
<div class="app-sidebar-mobile-backdrop"><a href="#/" on:click={mobileToggler} class="stretched-link">&nbsp;</a></div>