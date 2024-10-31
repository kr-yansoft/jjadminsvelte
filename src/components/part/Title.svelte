<script>
    import { t } from '../../i18n/i18n';
    import onItemsPerPageChange from '../common/DataTable.svelte';
    import itemsPerPage from '../common/DataTable.svelte';
    import { locale } from 'svelte-i18n';
    export let title = 'Default Title';
    export let subtitle = '';
    import showTitle from '../common/DataTable.svelte';
    import showSubTitle from '../common/DataTable.svelte';
    import showPerPage from '../common/DataTable.svelte';

   
</script>
{#if $locale}
{#if showTitle}
<div class="d-flex align-items-center justify-content-between w-100">
    <div class="d-flex align-items-end w-100" id="title">
        <div class="d-flex align-items-end">
            <h1 class="m-0 me-2">{title}</h1> <span class="d-none d-lg-block">{$t('content.list')}</span>
        </div>
        {#if showPerPage}
        <select on:change={(event) => onItemsPerPageChange(event)} class="ms-4">
            <option value="10" selected={itemsPerPage === 10}>10</option>
            <option value="25" selected={itemsPerPage === 25}>25</option>
            <option value="50" selected={itemsPerPage === 50}>50</option>
            <option value="100" selected={itemsPerPage === 100}>100</option>
        </select>
        {/if}
    </div>

</div>
{/if}

{#if showSubTitle}
<div class="d-flex align-items-end" id="title">
    <h5 class="m-0 me-2">{subtitle}</h5>
</div>
{/if}
{/if}
<style scoped>
         #title h1 {
         color: #415e80;
     }
     #title span {
         font-size: 20px;
         color: #415e80;
         flex-direction: column;
     }
     select {
         padding: 5px;
         border: 1px solid lightgray;
         border-radius: 5px;
     }
     option {
         padding: 5px;
     }
</style>