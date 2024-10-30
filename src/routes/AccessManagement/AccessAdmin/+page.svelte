<script>
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    
    let fileName = 'AccessAdmin';
    const tableColumns = [
        { field:'attemptedid', label: '시도한 아이디'},
        { field:'attemptedpassword', label: '시도한 비밀번호'},
        { field:'permission', label: '권한'},
        { field:'ip', label: '아이피'},
        { field:'accessdomain', label: '접속 도메인'},
        { field:'browser', label: '브라우저'},
        { field:'logintime', label: '로그인 시간'},
        { field:'result', label: '결과'},
        { field:'status', label: '상태'}
       
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<DataTable
{tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="접속 관리자"/>
