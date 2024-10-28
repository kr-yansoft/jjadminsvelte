<script>
        import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'member', label: '회원'},
        { field:'casinobettingamount', label: '카지노 배팅금액'},
        { field:'casinowinningamount', label: '카지노 당첨금액'},
        { field:'casinocommission', label: '카지노 수수료'},
        { field:'casinobetswins', label: '카지노 배팅횟수 / 당첨횟수'},
        { field:'casinosettlement', label: '카지노 정산'},
        { field:'slotbettingamount', label:'슬롯 배팅금액'},
        { field:'slotwinningamount', label: '슬롯 당첨금액'},
        { field:'slotcommission', label: '슬롯 수수료'},
        { field:'slotbetswins', label: '슬롯 배팅횟수 / 당첨횟수'},
        { field:'slotsettlement', label: '슬롯 정산'},
        { field:'totalbetswins', label: '총 배팅횟수 / 당첨횟수'},
        { field:'totalsettlement', label: '총 정산'},
        { field:'details', label: '상세'},
        { field:'calculator', label: '계산기', button:'one-button'},
            ]
            let filterField = "status";
    onMount(() => {
        fetchAndSetData();
    });  
</script>
{#if $dataStore.tableData.length > 0}
<DataTable 
tableData={$dataStore.tableData}
{tableColumns} title="카지노/슬롯 회원 정산"/>
{:else}
        <p>Loading data...</p>
    {/if}