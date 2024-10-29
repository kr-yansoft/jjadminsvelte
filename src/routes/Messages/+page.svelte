<script>
    import DataTable from "../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directsuperior', label: '직상위'},
        { field:'recipient', label: '받은사람'},
        { field:'title', label: '제목'},
        { field:'ip', label: '아이피'},
        { field:'datecreated', label: '작성일'},
        { field:'readstatus', label: '읽음여부', },
        { field:'dateread', label: '읽은날짜', },
        { field:'function', label: '기능', }
    ]
    onMount(() => {
        fetchAndSetData();
    });
</script>
{#if $dataStore.tableData.length > 0}

<DataTable  {tableColumns} tableData={$dataStore.tableData} title="쪽지"/>
{:else}
        <p>Loading data...</p>
    {/if}