<script>
    export let title = 'Switch Title';
    export let dataOn = '사용'; 
    export let dataOff = '미사용'; 
    export let checked = false;
    export let styleclass=""
    export let padding = "p-4"
  </script>
  
  <div class="d-flex flex-column {padding}">
    <span class={styleclass}>{title}</span>
    <label class="switch">
      <input type="checkbox" class="switch-input" bind:checked>
      <span class="switch-label" data-on={dataOn} data-off={dataOff}></span>
      <span class="switch-handle"></span>
    </label>
  </div>
  <style scoped>   
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


</style>