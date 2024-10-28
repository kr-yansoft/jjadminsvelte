<script>
    import DataTable from "../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'refundrequestcategory', label: '요청분류'},
        { field:'accountholder', label: '예금주'},
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
</script>
<DataTable {tableColumns} title="환전 관리"/>