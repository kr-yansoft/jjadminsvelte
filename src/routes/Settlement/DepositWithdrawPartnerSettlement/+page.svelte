<script>
        import FilterField from '../../../components/part/FilterField.svelte';
import Title from '../../../components/part/Title.svelte';
    import Datapicker from '../../../components/part/Datapicker.svelte';
    import Search from '../../../components/part/Search.svelte';
    import { onMount } from 'svelte';
import { fetchAndSetDataForPage } from '../../../lib/stores/dataHelpers';
import { dataStore } from '../../../lib/stores/dataStore';
import DataTable from "../../../components/common/DataTable.svelte";
let fileName = 'DepositWithdrawPartnerSettlement';
const tableColumns = [
 { field:'headheadquarters', label: '왕본사'},
 { field:'mainheadquarters', label: '대본사',},
 { field:'subheadquarters', label: '부본사', },
 { field:'distributor', label: '총판'},
 { field:'store', label: '매장'},
 { field:'user', label: '유저'},
 { field:'7levels', label:'7단계'},
 { field:'admindepositswithdrawals', label: '관리자 입출금'},
 { field:'personaldepositswithdrawals', label: '개인 입출금'},
 { field:'subordinatedepositswithdrawals', label: '하부 입출금'},
 { field:'totaldepositswithdrawals', label: '토탈 입출금'},
     ]
     onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
 function toggleRow(index) {
        // Reactively update the row's expanded state
        tableData = tableData.map((row, i) =>
            i === index ? { ...row, expanded: !row.expanded } : row
        );
    }
</script>
<!-- <div class="panel p-4">
    <ToggleTable {tableData}
    {tableColumns} />
</div> -->

<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="입출금 파트너 정산" showTitle={true} showPerPage={true} />
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
            <FilterField />
            <Datapicker />
            <Search />
        </div>
    </div>
    <DataTable
    {tableData}
    {tableColumns}
    on:row-toggle={event => toggleRow(event.detail.index)}
     />
</div>
