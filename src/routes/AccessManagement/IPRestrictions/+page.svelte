<script>
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'ip', label: '아이피'},
        { field:'memo', label: '메모',type:'input'},
        { field:'regdate', label: '등록일시'},
        { field:'delete', label: '삭제'}
       
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}
<DataTable
tableData={$dataStore.tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="접속 아이피 제한"/>
{:else}
        <p>Loading data...</p>
    {/if}