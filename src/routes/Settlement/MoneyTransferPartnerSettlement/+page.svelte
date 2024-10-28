<script>
    import { onMount } from 'svelte';
import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
import { dataStore } from '../../../lib/stores/dataStore';
import DataTable from "../../../components/common/DataTable.svelte";

const tableColumns = [
 { field:'headheadquarters', label: '왕본사'},
 { field:'mainheadquarters', label: '대본사'},
 { field:'subheadquarters', label: '부본사'},
 { field:'distributor', label: '총판'},
 { field:'store', label: '매장'},
 { field:'user', label: '유저'},
 { field:'7levels', label:'7단계'},
 { field:'moneytransfer', label: '머니이동'},
     ]
     onMount(() => {
 fetchAndSetData();
}); 
</script>
{#if $dataStore.tableData.length > 0}
<DataTable 
tableData={$dataStore.tableData}
{tableColumns} title="카지노/슬롯 파트너 정산"/>
{:else}
 <p>Loading data...</p>
{/if}