<script>
    import DataTable from "../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    const tableColumns = [
        { field:'title', label: '제목'},
        { field:'noticeapprove', label: '팝업 여부'},
        { field:'regcreatedate', label: '작성일'},
        { field:'edit', label: '수정', type:'button'},
        { field:'delete', label: '삭제', type:'button'},
    ]
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}

<DataTable  {tableColumns} tableData={$dataStore.tableData} title="게시판"/>
{:else}
        <p>Loading data...</p>
    {/if}