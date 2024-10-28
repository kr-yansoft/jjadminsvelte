<script>
	import { onMount } from 'svelte';
  import { slideToggle } from '$lib/utils';

	function fullscreenToggler(e) {
		e.preventDefault();
	
		var target = this.closest('.panel');
		var targetClass = 'panel-expand';
		var targetTop = 40;
		if (document) {
			if (document.body.classList.contains(targetClass) && target.classList.contains(targetClass)) {
				target.removeAttribute('style');
				target.classList.remove(targetClass);
				document.body.classList.remove(targetClass);
			} else {
				document.body.classList.add(targetClass);
				target.classList.add(targetClass);
			}
		}

		window.dispatchEvent(new Event('resize'));
	}
	
	function reloadToggler(e) {
		e.preventDefault();
		
		var target = this.closest('.panel');
		document.querySelector('.tooltip').remove();
		
		if (!target.classList.contains('panel-loading')) {
			var targetBody = target.querySelector('.panel-body');
			var spinnerHtml = document.createElement('div');
			spinnerHtml.classList.add('panel-loader');
			spinnerHtml.innerHTML = '<span class="spinner spinner-sm"></span>';
			target.classList.add('panel-loading');
			targetBody.appendChild(spinnerHtml);
			
			setTimeout(() => {
				target.classList.remove('panel-loading');
				target.querySelector('.panel-loader').remove();
			}, 2000);
		}
	}
	
	function collapseToggler(e) {
		e.preventDefault();
		
		var target = this.closest('.panel');
		slideToggle(target.querySelector('.panel-body'));
	}
	
	function removeToggler(e) {
		e.preventDefault();
	
		this.closest('.panel').remove();
	}


	onMount(async () => {
		let bootstrap = await import('bootstrap');
		let targets =  document.querySelectorAll('[data-bs-toggle="tooltip"]');
	
		targets.forEach(target => {
			new bootstrap.Tooltip(target);
		});
	});
</script>

<div class="panel-heading-btn">
	<a href="#/" class="btn btn-xs btn-icon btn-default" on:click={fullscreenToggler} data-bs-toggle="tooltip" data-bs-title="Expand / Compress" data-bs-placement="bottom" data-bs-container="body"><i class="fa fa-expand"></i></a>
	<a href="#/" class="btn btn-xs btn-icon btn-success" on:click={reloadToggler} data-bs-toggle="tooltip" data-bs-title="Reload" data-bs-placement="bottom" data-bs-container="body"><i class="fa fa-redo"></i></a>
	<a href="#/" class="btn btn-xs btn-icon btn-warning" on:click={collapseToggler} data-bs-toggle="tooltip" data-bs-title="Collapse / Expand" data-bs-placement="bottom" data-bs-container="body"><i class="fa fa-minus"></i></a>
	<a href="#/" class="btn btn-xs btn-icon btn-danger" on:click={removeToggler} data-bs-toggle="tooltip" data-bs-title="Remove" data-bs-placement="bottom" data-bs-container="body"><i class="fa fa-times"></i></a>
</div>

