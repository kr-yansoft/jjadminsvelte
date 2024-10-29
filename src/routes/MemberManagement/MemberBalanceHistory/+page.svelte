<script>
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'member', label: '회원'},
        { field:'type', label: '타입'},
        { field:'game', label: '게임'},
        { field:'session', label: '회차'},
        { field:'prevbalance', label: '이전 잔고'},
        { field:'balance', label: '잔고'},
        { field:'postbalance', label: '이후 잔고'},
        { field:'accumulationtime', label: '적립 시간'},
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}
<DataTable
tableData={$dataStore.tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="회원 잔고내역"/>
{:else}
        <p>Loading data...</p>
    {/if}