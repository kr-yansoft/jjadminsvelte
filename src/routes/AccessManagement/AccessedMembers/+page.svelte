<script>
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    
    let fileName = 'AccessedMembers';
    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'heldamount', label: '보유금액'},
        { field:'donutalarm', label: '더너트 알'},
        { field:'commission', label: '수수료'},
        { field:'totalrecharge', label: '충전합'},
        { field:'totalwithdrawal', label: '환전합'},
        { field:'profit', label: '수익'},
        { field:'credit', label: '여신'},
        { field:'accounthelder', label: '예금주'},
        { field:'message', label: '쪽지'},
        { field:'status', label: '상태'},
        { field:'connection', label: '접속'},
        { field:'loginfailure', label: '접속실패'},
        { field:'registrationdate', label: '가입일'},
        { field:'lastlogin', label: '최근로그인'},
        { field:'edit', label: '수정'},
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<DataTable
{tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="접속 회원"/>
