<script>
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    
    let fileName = 'IPRestrictions';
    const tableColumns = [
        { field:'ip', label: '아이피'},
        { field:'memo', label: '메모',type:'input'},
        { field:'regdate', label: '등록일시'},
        { field:'delete', label: '삭제'}
       
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<DataTable
{tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="접속 아이피 제한"/>
