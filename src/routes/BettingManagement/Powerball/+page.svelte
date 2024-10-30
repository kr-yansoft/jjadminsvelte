<script>
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
    import { dataStore } from '../../../lib/stores/dataStore';
    import DataTable from "../../../components/common/DataTable.svelte";
    
    let fileName = 'Powerball';
    const tableColumns = [
        { field:'id', label: '아이디/닉네임'},
        { field:'type', label: '종류'},
        { field:'gameprovider', label: '게임사'},
        { field:'gamename', label: '게임이름'},
        { field:'bettingamount', label: '배팅머니'},
        { field:'winningamount', label: '당첨금액'},
        { field:'commission', label: '수수료'},
        { field:'losing', label: '루징'},
        { field:'moneyafterbet', label: '배팅후머니'},
        { field:'result', label: '결과'},
        { field:'bettingdatetime', label: '배팅일시'},
        { field:'processingdatetime', label: '처리일시'},
        { field:'detailes', label: '상세'},
        { field:'result', label: '결과'},
        
    ]
    let filterField = "status";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<DataTable
{tableData}
{tableColumns} showDatePicker={true} {filterField} showButtons={true} title="파워볼"/>
