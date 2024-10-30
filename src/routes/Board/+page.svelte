<script>
    import DataTable from "../../components/common/DataTable.svelte";
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../lib/stores/dataHelpers';
    let fileName = 'Board';
    // import { fetchAndSetData } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
  

    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    const tableColumns = [
        { field:'title', label: '제목'},
        { field:'popupapprove', label: '팝업 여부'},
        { field:'creationdate', label: '작성일'},
        { field:'edit', label: '수정', type:'button'},
        { field:'delete', label: '삭제', type:'button',buttonLabel:'get'},
    ]
    $: tableData = $dataStore.tableData;
    // onMount(() => {
    //     fetchAndSetData();
    // });
</script>


<DataTable  {tableColumns} {tableData} title="게시판"/>
