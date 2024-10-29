<script>
    import { onMount } from 'svelte';
    import imgbanner from '../../../img/img.png';
    import imgbanner2 from '../../../img/img2.png';
    import Dropzone from 'dropzone'; // Import Dropzone

    onMount(() => {
        // Disable the auto-discovery feature, otherwise Dropzone will try to discover automatically.
        Dropzone.autoDiscover = false;

        // Initialize multiple dropzones
        new Dropzone("#upload-zone-1", { url: "/upload" });
        new Dropzone("#upload-zone-2", { url: "/upload" });
        new Dropzone("#upload-zone-3", { url: "/upload" });
        new Dropzone("#upload-zone-4", { url: "/upload" });
    });
</script>

<div class="panel p-4">
    <div>
        <h3>1번째 배너</h3>
        <div class="input-group d-flex flex-column">
            <span>제목</span>
            <input type="text" value="필독사항">
        </div>
        <div class="input-group d-flex flex-column">
            <span>내용</span>
            <textarea rows="4" data-parsley-minlength="20" data-parsley-maxlength="100">
                카지노 1회 최대배팅금 500만, 최대당청금 1000 슬롯 1회 최대당첨금 3000만 입니다.
            </textarea>
        </div>
        <div class="d-flex mt-3">
            <!-- Dropzone 1 -->
        
            <div id="dropzone" class="me-3">
                <span>배경 이미지 (1920 x 476px)</span>
                <form id="upload-zone-1" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        <img src={imgbanner} alt="Banner Image">
                    </div>
                </form>
            </div>
            <!-- Dropzone 2 -->
            <div id="dropzone" class="me-3">
                <span>왼쪽 이미지 (600 x 320px)</span>
                <form id="upload-zone-2" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
            <!-- Dropzone 3 -->
            <div id="dropzone" class="me-3">
                <span>가운데 이미지 (600 x 320px)</span>
                <form id="upload-zone-3" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
            <!-- Dropzone 4 -->
            <div id="dropzone">
                <span>오른쪽 이미지 (600 x 320px)</span>
                <form id="upload-zone-4" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="mt-5">
        <h3>2번째 배너</h3>
        <div class="input-group d-flex flex-column">
            <span>제목</span>
            <input type="text" value="필독사항">
        </div>
        <div class="input-group d-flex flex-column">
            <span>내용</span>
            <textarea rows="4" data-parsley-minlength="20" data-parsley-maxlength="100">
                카지노 1회 최대배팅금 500만, 최대당청금 1000 슬롯 1회 최대당첨금 3000만 입니다.
            </textarea>
        </div>
        <div class="d-flex mt-3">
            <!-- Dropzone 1 -->
        
            <div id="dropzone" class="me-3">
                <span>배경 이미지 (1920 x 476px)</span>
                <form id="upload-zone-1" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        <img src={imgbanner2} alt="Banner Image">
                    </div>
                </form>
            </div>
            <!-- Dropzone 2 -->
            <div id="dropzone" class="me-3">
                <span>왼쪽 이미지 (600 x 320px)</span>
                <form id="upload-zone-2" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
            <!-- Dropzone 3 -->
            <div id="dropzone" class="me-3">
                <span>가운데 이미지 (600 x 320px)</span>
                <form id="upload-zone-3" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
            <!-- Dropzone 4 -->
            <div id="dropzone">
                <span>오른쪽 이미지 (600 x 320px)</span>
                <form id="upload-zone-4" class="dropzone needsclick">
                    <div class="dz-message needsclick">
                        Drop files <b>here</b> or <b>click</b> to upload.<br />
                        <span class="dz-note needsclick">
                            (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                        </span>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style scoped>
    img {
        max-width: 800px;
        width: 100%;
    }
</style>
