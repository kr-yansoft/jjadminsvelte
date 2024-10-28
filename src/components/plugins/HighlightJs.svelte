<script>
  import { HighlightAuto } from 'svelte-highlight';
  let code = $$props.code;
</script>
<div class="hljs-wrapper{($$props.class) ? ' '+ $$props.class : ''}">
	<HighlightAuto {code} />
</div>