<script>
    import Switch from "../../../components/part/Switch.svelte";
</script>

<div class="panel p-4">
    <h2>알림 설정</h2>
    <h4>항상 알람켜기</h4>
    <div class="col col-3">
        <Switch title="*껐을시 신규 요청에서만 소리가 납니다." styleclass="text-danger"/>
        
        <div class="d-flex">
            <div class="w-50">
                <Switch title="유저 생성 알람 설정" padding="p-0"/>
            </div>
            <select class="form-select w-50 ms-2">
                <option value="">1</option>
            </select>
            <button type="button" class="btn btn-primary w-150px ms-2">미리 듣기</button>
        </div>
        <div class="d-flex mt-4">
            <div class="w-50">
                <Switch title="충전 알람 설정" padding="p-0"/>
            </div>
            <select class="form-select w-50 ms-2">
                <option value="">1</option>
            </select>
            <button type="button" class="btn btn-primary w-150px ms-2">미리 듣기</button>
        </div>
        <div class="d-flex mt-4">
            <div class="w-50">
                <Switch title="환전 알람 설정" padding="p-0"/>
            </div>
            <select class="form-select w-50 ms-2">
                <option value="">1</option>
            </select>
            <button type="button" class="btn btn-primary w-150px ms-2">미리 듣기</button>
        </div>
        <div class="d-flex mt-4">
            <div class="w-50">
                <Switch title="1:1문의 알람 설정" padding="p-0"/>
            </div>
            <select class="form-select w-50 ms-2">
                <option value="">1</option>
            </select>
            <button type="button" class="btn btn-primary w-150px ms-2">미리 듣기</button>
        </div>
        <div class="d-flex mt-4">
            <div class="w-50">
                <Switch title="공지사항 알람 설정" padding="p-0"/>
            </div>
            <select class="form-select w-50 ms-2">
                <option value="">1</option>
            </select>
            <button type="button" class="btn btn-primary w-150px ms-2">미리 듣기</button>
        </div>
    </div>
</div>
.
<style>
   
</style>