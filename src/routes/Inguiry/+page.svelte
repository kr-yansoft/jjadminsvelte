<script>
    import DataTable from "../../components/common/DataTable.svelte";
    

    const tableColumns = [
        { field:'toplevel', label: '최상위'},
        { field:'directorsuperior', label: '직상위'},
        { field:'member', label: '회원'},
        { field:'title', label: '제목'},
        { field:'datecreater', label: '작성일'},
        { field:'status', label: '상태'},
        { field:'responsedate', label: '응답일'},
        { field:'functionfeatures', label: '기능', type:'two-buttons'},
    ]
    let filterField = 'status'
</script>
<DataTable {tableColumns} showDatePicker={true} {filterField} showNoticeButtons={true} title="1:1 문의"/>