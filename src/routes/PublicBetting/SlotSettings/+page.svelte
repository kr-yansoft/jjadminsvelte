<script>
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'viewall', label: '전체보기'},
        { field:'kingheadquarters', label: '왕본사'},
        { field:'mainheadquarters', label: '대본사'},
        { field:'branchheadquarters', label: '부본사'},
        { field:'distributor', label: '총판'},
        { field:'store', label: '매장'},
        { field:'user', label: '유저'},
        { field:'levels', label: '7단계'},
        { field:'heldmembers ', label: '보유회원'},
        { field:'commissionlimit', label: '수수료 한도 (0 = 무제한)'},
        { field:'missedattempts ', label: '누락 횟수 (n번중 1번)'},
        { field:'missrate', label: '누락율'},
        { field:'spincount ', label: '스핀 횟수'},
        { field:'applysubordinates', label: '하부 적용'},
       
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}
<DataTable
tableData={$dataStore.tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="슬롯 설정"/>
{:else}
        <p>Loading data...</p>
    {/if}