<script>
    import DailyOverview from '../../components/common/DailyOverview.svelte';
    import { onMount } from 'svelte';
    import { fetchAndSetData } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    import DataTable from "../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'requestcategory', label: '요청분류'},
        { field:'accountholder', label: '예금주'},
        { field:'requestamount', label: '신청금액'},
        { field:'resultamount', label: '결과금액'},
        { field:'requestdatetime', label: '신청일시'},
        { field:'handlerproccesor', label: '처리자'},
        { field:'processingdatetime', label: '처리일시'},
        { field:'status', label: '상태'},
        { field:'memonotes', label: '메모', type:'input'},
        { field:'bonustype', label: '보너스 타입'},
        { field:'bonusrecharge', label: '보너스 충전', type:'not-allowed'},
        { field:'functionfeatures', label: '기능'},
    ]
    let filterField = "status";
    let filterField2 = "requestcategory";
    onMount(() => {
        fetchAndSetData();
    });
</script>

{#if $dataStore.tableData.length > 0}
<DataTable
tableData={$dataStore.tableData}
{tableColumns} showDatePicker={true} {filterField} {filterField2} showButtons={true} title="충전 관리"/>
{:else}
        <p>Loading data...</p>
    {/if}