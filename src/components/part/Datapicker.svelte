<script>
  import { locale } from 'svelte-i18n';
  import { t } from '../../i18n/i18n';
</script>
{#if $locale}
<div class="d-flex">
    <input type="text" id="date-picker"  placeholder="{$t('content.datepicker')}" class="form-control  me-2 w-200px" />
</div>
{/if}