<script>
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

<DataTable 
{tableData}
{tableColumns} title="파워볼 회원정산"/>
