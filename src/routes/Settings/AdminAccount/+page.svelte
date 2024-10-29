<script>
    import DataTable from "../../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    const tableColumns = [
        { field:'permission', label: '권한'},
        { field:'id', label: '아이디'},
        { field:'password', label: '비밀번호'},
        { field:'ipallow', label: '아이피 허용'},
        { field:'useunuse', label: '사용'},
        { field:'createddate', label: '생성일'},
        { field:'edit', label: '수정', type:'button'},
        { field:'delete', label: '삭제', type:'button'},
    ]
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}

<DataTable {tableColumns} tableData={$dataStore.tableData} title="관리자 계정"/>
{:else}
        <p>Loading data...</p>
    {/if}