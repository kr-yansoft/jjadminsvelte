<script>
  import { appOptions } from '/src/stores/appOptions.js';
</script>

<div id="loader" class:loaded={$appOptions.isInit} class="app-loader">
	<span class="spinner"></span>
</div>