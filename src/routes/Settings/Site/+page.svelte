<script>
    import { onMount } from 'svelte';
    import jQuery from 'jquery';
    import 'jquery-timepicker/jquery.timepicker.css';
    import 'jquery-timepicker/jquery.timepicker';
  
    onMount(() => {
      window.addEventListener('load', () => {
        jQuery('#timepicker').timepicker();
      });
    });
  </script>
<div class="panel p-4">
    <div class="btn-wrapper">
        <button type="button" class="btn btn-primary">정보</button>
        <button type="button" class="btn btn-primary">수정 로그</button>
    </div>
    <div class="row mt-4">
        <div class="col col-3">
            <h3>기본 설정</h3>
            <div class="p-3" id="basic">
                <div class="d-flex justify-content-between align-items-center py-3">
                    <span>파워볼 배팅 허용</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="허용" data-off="금지"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>회원사이트 운영중지 (점검)</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="정상운영" data-off="중지"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>회원가입 가능여부</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>자동 회원승인 가능여부</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>회원용 파트너 사이트에서 <br> 회원 생성시 계좌정보 입력 </span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>회원사이트 배팅시 확인창 사용</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>회원사이트 비밀번호 변경</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>하부머니지급 사용</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>하부머니차감 사용</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>
                  <div class="d-flex justify-content-between align-items-center py-3">
                    <span>보너스 충전 사용</span>
                    <label class="switch">
                      <input type="checkbox" class="switch-input">
                      <span class="switch-label" data-on="사용" data-off="미사용"></span>
                      <span class="switch-handle"></span>
                    </label>
                  </div>                  
            </div>
        </div>
        <div class="col col-6">
            <h3>충전/환전 설정</h3>
            <div id="chargerefund" class="p-3">
                <div class="row">
                    <div class="col-5">
                        <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">충/환전 신청 가능 기준금액 (원) *0이면 제한없음</label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">회원 충전 최소 금액 (원) *0이면 제한없음</label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">동일금액 충전시 재신청 제한시간 (분) *0이면 제한없음</label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">회원 환전 최소금액 (원) *0이면 제한없음
                            </label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3 d-flex flex-column">
                            <label for="">텔레그램 문의 링크</label>
                            <input type="text" class="form-control w-100">
                          </div>
                          <div class="d-flex">
                            <div class="d-flex flex-column">
                                <span>첫충 타입</span>
                                <select class="form-select w-50" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                            </div>
                              <div class="d-flex flex-column">
                                <label for="chargerefundinput" class="form-label">회원 환전 최소금액 (원) *0이면 제한없음
                                </label>
                                <div class="custom-number-input d-flex">
                                  <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                                </div>
                              </div>
                          </div>
                    </div>
                    <div class="col-7">
                        <div class="d-flex justify-content-between">
                            <span>환전 휴식시간</span>
                            <span>수수료 전환신청 자동수락</span>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex">
                                <div class="d-flex align-items-center" >
                                    <div class="input-group bootstrap-timepicker flex-nowrap" >
                                        <span class="input-group-text input-group-addon">
                                            <i class="fa fa-clock"></i>
                                          </span>
                                          <input id="timepicker" type="text" class="form-control" />
                                
                                
                                      </div>
                                      <span class="d-block ms-2" style="width:50px">부터</span>
                                </div>
                                  <div class="d-flex align-items-center" >
                                      <div class="input-group bootstrap-timepicker">
                                
                                        <input id="timepicker" type="text" class="form-control" />
                                
                                
                                      </div>
                                      <span class="d-block ms-2" style="width:50px">까지</span>
                                  </div>
                            </div>
                              <div class="d-flex justify-content-between align-items-center flex-column ">
                                <label class="switch">
                                  <input type="checkbox" class="switch-input">
                                  <span class="switch-label" data-on="허용" data-off="금지"></span>
                                  <span class="switch-handle"></span>
                                </label>
                              </div>
                        </div>
                          <div class="my-3">
                            <label for="chargerefundinput" class="form-label">회원 충전 최소 금액 (원) *0이면 제한없음</label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">동일금액 충전시 재신청 제한시간 (분) *0이면 제한없음</label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3">
                            <label for="chargerefundinput" class="form-label">회원 환전 최소금액 (원) *0이면 제한없음
                            </label>
                            <div class="custom-number-input d-flex">
                              <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                            </div>
                          </div>
                          <div class="mb-3 d-flex flex-column">
                            <label for="">텔레그램 문의 링크</label>
                            <input type="text" class="form-control w-100">
                          </div>
                          <div class="d-flex">
                            <div class="d-flex flex-column">
                                <span>첫충 타입</span>
                                <select class="form-select w-50" aria-label="Default select example">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                  </select>
                            </div>
                              <div class="d-flex flex-column">
                                <label for="chargerefundinput" class="form-label">회원 환전 최소금액 (원) *0이면 제한없음
                                </label>
                                <div class="custom-number-input d-flex">
                                  <input type="number" class="form-control text-center w-100" id="chargerefundinput" value="10000" min="0" step="5000" max="100000" />
                                </div>
                              </div>
                          </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col col-3  ">
            <h3>알림</h3>
            <div id="alarm" class="p-3 ">
                <div class="d-flex flex-column">
                    <span>로그인 페이지 알림</span>
                    <textarea rows="9" data-parsley-minlength="20" data-parsley-maxlength="200"></textarea>
                 </div>
                 <div class="d-flex flex-column">
                    <span>충전용 입금계좌정보 설정</span>
                    <textarea rows="9" data-parsley-minlength="20" data-parsley-maxlength="200">가상</textarea>
                 </div>
            </div>
        </div>
    </div>
</div>
<style scoped>
    #basic{
        border: 1px solid black;
        height: 640px;
    }
    #alarm{
        border: 1px solid black;
        height: 640px;
    }
    #chargerefund{
        border: 1px solid black;
        height: 640px;
    }
    #basic>div:not(:last-child){
        border-bottom: 1px solid lightgray;
    }
    #basic>div>span{
       font-size: 16px;
    }
   
    .switch {
    width: 80px;
    height: 28px;
    }

    .switch {
    position: relative;
    display: inline-block;
    vertical-align: top;
    border-radius: 18px;
    cursor: pointer;
    }

    .switch-input {
    position: absolute;
    transform: translate3d(5px, 5px, 0);
    }

    .switch-label {
    position: relative;
    display: block;
    height: inherit;
    font-size: 13px;
    background: #d1d3d4;
    border-radius: inherit;
    }

    .switch-label:before,
    .switch-label:after {
    position: absolute;
    top: 50%;
    margin-top: -0.5em;
    line-height: 1.1;
    }

    .switch-label:before {
    content: attr(data-off);
    right: 10px;
    color: white;
    }

    .switch-label:after {
    content: attr(data-on);
    left: 10px;
    color: white;
    opacity: 0;
    }

    .switch-input:checked ~ .switch-label {
    background:#2d353c;
    }
    .switch-input:checked ~ .switch-label:before {
    opacity: 0;
    }
    .switch-input:checked ~ .switch-label:after {
    opacity: 1;
    }

    .switch-handle {
    position: absolute !important;
    top: 4px;
    left: 5px;
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
    }

    .switch-handle:before {
    content: "";
    top: 50%;
    left: 50%;
    position: absolute !important;
    margin: -6px 0 0 -6px;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    }

    .switch-label:active ~ .switch-handle, .switch-handle:active {
    width: 30px;
    }

    .switch-input:checked ~ .switch-handle {
    left: unset;
    right: 5px;
    }
    .custom-number-input {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .form-control {
    width: 100px;
    text-align: center;
    font-size: 16px;
  }

</style>