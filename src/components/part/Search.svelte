<script>
    import { createEventDispatcher } from 'svelte';
    import { t } from '../../i18n/i18n';

    export let tableData = []; 
    export let searchQuery = ''; 

    const dispatch = createEventDispatcher();

    
    $: filteredData = tableData.filter(row => 
        row.member && row.member.toLowerCase().includes(searchQuery.toLowerCase())
    );

    
    $: dispatch('filter', filteredData);

    
    function handleSearchInput(event) {
        searchQuery = event.target.value;
    }

   
    function handleSearch() {
        dispatch('filter', filteredData); 
    }
</script>

<div class="input-group justify-content-end">
    <input
        type="text"
        id="custom-search"
        class="form-control"
        placeholder="{$t('content.search')}"
        bind:value={searchQuery}
        on:input={handleSearchInput} />
    <button type="button" class="btn btn-indigo" on:click={handleSearch}>Go!</button>
</div>
