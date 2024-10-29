<script>
    import DataTable from "../../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    const tableColumns = [
        { field:'sitemap', label: '사이트이름'},
        { field:'domain', label: '도메인'},
        { field:'apiid', label: 'API아이디'},
        { field:'apikey', label: 'API KEY'},
        { field:'ratio', label: '비율'},
        { field:'activestatus', label: '활성여부'},
        { field:'edit', label: '수정', type:'button'},
        { field:'delete', label: '삭제', type:'button'},
    ]
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}

<DataTable {tableColumns} tableData={$dataStore.tableData} title="카지노 보험내역"/>
{:else}
        <p>Loading data...</p>
    {/if}