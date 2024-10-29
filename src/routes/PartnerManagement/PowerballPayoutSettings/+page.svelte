<script>
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'kingheadquarters', label: '왕본사'},
        { field:'mainheadquarters', label: '대본사'},
        { field:'brancheadquarters', label: '부본사'},
        { field:'distributor', label: '총판'},
        { field:'store', label: '매장', textAlign:'right'},
        { field:'user', label: '유저'},
        { field:'levels', label: '7단계'},
        { field:'pgbbettingrate', label: 'PBG파워볼 배팅 수수료율'},
        { field:'pgbwinningrate', label: 'PBG파워볼 당첨 수수료율'},
        { field:'commission', label: '수수료'},
        { field:'partnercommission', label: '파트너 수수료'},
        { field:'subordinate', label: '하부'},
        { field:'settings', label: '설정'}
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}
<DataTable
tableData={$dataStore.tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="파워볼 배당설정"/>
{:else}
        <p>Loading data...</p>
    {/if}