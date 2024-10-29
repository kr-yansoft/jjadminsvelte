<script>
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'member', label: '회원'},
        { field:'type', label: '타입'},
        { field:'bettingid', label: '배팅아이디'},
        { field:'game', label: '게임'},
        { field:'session', label: '회차'},
        { field:'prevpoint', label: '이전 포인트'},
        { field:'point', label: '포인트'},
        { field:'postpoint', label: '이후 포인트'},
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
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="회원 수수료내역"/>
{:else}
        <p>Loading data...</p>
    {/if}