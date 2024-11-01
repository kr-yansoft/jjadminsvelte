<script>
    import FilterField from '../../components/part/FilterField.svelte';
    import FilterField2 from '../../components/part/FilterField2.svelte';
    import Title from '../../components/part/Title.svelte';
    import Datapicker from '../../components/part/Datapicker.svelte';
   
    import { onMount } from 'svelte';
    import { fetchAndSetDataForPage } from '../../lib/stores/dataHelpers';
    import { dataStore } from '../../lib/stores/dataStore';
    import DataTable from "../../components/common/DataTable.svelte";
    import { t } from '../../i18n/i18n'
    import { locale } from 'svelte-i18n';
    
    let fileName = 'RefundManagement';

    

    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'refundrequestcategory', label: '요청분류'},
        { field:'depositinformation', label: '입금정보'},
        { field:'refundrequestamount', label: '신청금액'},
        { field:'credit', label:'여신'},
        { field:'resultamount', label: '결과금액'},
        { field:'requestdatetime', label: '신청일시'},
        { field:'handlerproccesor', label: '처리자'},
        { field:'processingdatetime', label: '처리일시'},
        { field:'status', label: '상태'},
        { field:'memonotes', label: '메모', type:"input"},
        { field:'functionfeatures', label: '기능'},
    ]
    let filterField = "status";
    let filterField2 = "member";
    onMount(() => {
        fetchAndSetDataForPage(fileName);
    });
    $: tableData = $dataStore.tableData;
</script>

{#if $locale}
<div class="panel panel-inverse px-4 py-4 m-0">
    <Title title="환전 관리" showTitle={true} showPerPage={true} />
    <div class="btn-wrapper mt-2">
        <button class="btn btn-primary">전체</button>
        <button class="btn btn-danger">요청</button>
        <button class="btn btn-secondary">대기</button>
    </div>
  
    <div class="d-flex justify-content-between align-items-center mt-2">
        <div class="d-flex">
           
            <Datapicker />
            <FilterField {filterField} {tableData} />
            <FilterField2 {filterField2} {tableData} />
        </div>
        <span>총 금액: 0</span>
    </div>
    
    <DataTable
        {tableData}
        {tableColumns}
        showDatePicker={true}
     
    />

</div>
{/if}