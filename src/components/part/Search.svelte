
<script>
    import { locale } from 'svelte-i18n';
    import { t } from '../../i18n/i18n';
    import handleSearchInput from '../common/DataTable.svelte';
    import searchQuery from '../common/DataTable.svelte';
    import filterByEmail from '../common/DataTable.svelte';
</script>
{#if $locale}
<div class="d-flex align-items-center">
    <div class="input-group w-250px">
        <input
            type="text"
            id="custom-search"
            class="form-control "
            placeholder="{$t('content.search')}"
            on:input={handleSearchInput} />
        <button type="button" class="btn btn-indigo" on:click={() => filterByEmail(searchQuery)}>Go!</button>
    </div>

</div>
{/if}