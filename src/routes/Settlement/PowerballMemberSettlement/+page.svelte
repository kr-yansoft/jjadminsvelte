<script>
     import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
import { dataStore } from '../../../lib/stores/dataStore';
import DataTable from "../../../components/common/DataTable.svelte";
let fileName = 'PowerballMemberSettlement';
const tableColumns = [
 { field:'toplevel', label: '최상위'},
 { field:'directsuperior', label: '직상위'},
 { field:'member', label: '회원'},
 { field:'bettinghistory', label: '배팅내역'},
 { field:'ctr', label: '누르기율'},
 { field:'balanceheldamount', label: '보유금액'},
 { field:'donutpoints', label:'더너트 알'},
 { field:'commission', label: '수수료', type:'html'},
 { field:'totalrecharge', label: '충전합'},
 { field:'totalwithdrawal', label: '환전합'},
 { field:'profit', label: '수익'},
 { field:'membermanagement', label: '회원관리'},
 { field:'detailedhistory', label: '상세내역', type:'button'},
     ]
     onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="파워볼 회원정산" showTitle={true} showPerPage={true} />  
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}/>
</div>
