<script>
    import { dataStore,  fetchDataForPage } from '../../lib/stores/dataStore';
    import countryCodeMap  from '../../lib/countryCodeMap'
    import { onMount, onDestroy, tick } from 'svelte';
    import DataTable from 'datatables.net-bs5';
    import 'datatables.net-responsive-bs5';
    import 'datatables.net-fixedcolumns-bs5';
    import 'datatables.net-bs5/css/dataTables.bootstrap5.css';
    import 'datatables.net-responsive-bs5/css/responsive.bootstrap5.css';
    import 'datatables.net-fixedcolumns-bs5/css/fixedColumns.bootstrap5.css';
    import flatpickr from 'flatpickr';
    import 'flatpickr/dist/flatpickr.css';
    import { Korean } from 'flatpickr/dist/l10n/ko.js';
    import { english } from 'flatpickr/dist/l10n/default.js';
    import * as XLSX from 'xlsx';
    import { t } from '../../i18n/i18n';
    import { locale } from 'svelte-i18n';
    import { get } from 'svelte/store';
    import { setPageTitle } from '$lib/utils';


    export let showPagination = true;
    export let tableColumns = [];
    export let orderableColumns = [];
    export let tableData = [];
    export let totalRecords = 0;
    export let order = true;
    export let showDatePicker = false;
    export let firstFixedColumns = 0;
 //    export let lastFixedColumns = 0;
    export let firstColumnAlign = "text-center";
    export let firstColumnColorClass = "column-text-color";
    export let applyRedColor = false;
    export let title = "Default Title";
    export let filterField = "";
    export let filterField2 = "";
    export let dateRange = { start: '', end: '' };
    export let showOrderControls = true;
    export let showTitle = true;
    export let subtitle = "Default Title";
    export let showSubTitle = false;
    export let showOrderableColumns = false;
    export let itemsPerPage = 10;
    export let currentPage = 1;
    export let showPerPage = true;
 export let showButtons = false;
 export let showNoticeButtons = false;
    let dataTableElement;
    let dataTableInstance;
    let selectedColumn = '';
    let selectedOrder = 'asc';
    let datePickerInstance;
    let searchQuery = '';
    let selectedFilters = []; 
    let isDropdownOpen = false; 
    let isDropdownOpen2 = false; 
  
    $: filteredData = tableData.filter(row =>
         selectedFilters.length === 0 || selectedFilters.includes(row[filterField])
     );
     function handleCheckboxChange(value, event) {
         if (event.target.checked) {
             if (!selectedFilters.includes(value)) {
                 selectedFilters = [...selectedFilters, value]; 
             }
         } else {
             selectedFilters = selectedFilters.filter(v => v !== value);
         }
     }
     onMount(() => {
        const unsubscribe = locale.subscribe(value => {
            setTimeout(() => {
                setupDatePicker(); 
                setPageTitle(title); 

                if (dataTableElement) {
                    initializeDataTable(); 
                }
            }, 500); 
        });
    return () => {
        unsubscribe();
        destroyDataTable();
    };
});

     onDestroy(() => {
         destroyDataTable();
     });
 
     $: tableData = $dataStore.tableData;
     $: totalRecords = $dataStore.totalRecords;
     $: currentPage = $dataStore.currentPage;
     $: itemsPerPage = $dataStore.itemsPerPage;
     $: totalPages = totalRecords ? Math.ceil(totalRecords / itemsPerPage) : 1;
     let filteredData = [...tableData];
 
     function preprocessTableData(row) {
         return tableColumns.reduce((acc, col) => {
             acc[col.field] = col.translate ? get(t)(row[col.field]) : row[col.field];
             return acc;
         }, {});
     }
    function destroyDataTable() {
         if (dataTableInstance) {
             dataTableInstance.clear().destroy(true);
             dataTableInstance = null;
         }
     }
 
     async function initializeDataTable(dataToUse = filteredData) {
         await tick();
         if (dataTableInstance) {
             dataTableInstance.clear().destroy(); 
         }
         const currentLocale = get(locale);
 
         if (dateRange.start && dateRange.end) {
            dataToUse = dataToUse.filter(row => {
                return tableColumns.some(column =>
                    row[column.field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                );
            });
        }

         if (searchQuery) {
             dataToUse = dataToUse.filter(row =>
                 tableColumns.some(column =>
                     row[column.field]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
                 )
             );
         }
         dataTableInstance = new DataTable(dataTableElement, {
            data: dataToUse.map(row => preprocessTableData(row)),
            scrollY: 450,
            scrollX: false,
            autoWidth: false,
            paging: false,
            searching: false,
            info: false,
            ordering: order,
            lengthChange: false,
            fixedColumns: {
                leftColumns: firstFixedColumns,
             //    rightColumns: lastFixedColumns
            },
            columns: tableColumns.map(col => ({
                data: col.field,
                defaultContent: '', 
                orderable: orderableColumns.some(orderableCol => orderableColumns.field === col.field)
            })),
            order: [],
            language: {
                lengthMenu: '',
                url: `/src/locales/${currentLocale}.json`,
            },
            dom: 't',
            createdRow: (row, rowData) => {
                const cells = row.querySelectorAll('td');
                cells.forEach((cell, index) => {
                    const column = tableColumns[index];
                    if (column) {
                            const getFlagImageSrc = (code) =>
                            `https://flagcdn.com/w40/${code}.png`;

                        if (column.field === 'nationality') {
                            const countryName = rowData[column.field];
                            const countryCode = countryCodeMap[countryName] || 'unknown';
                            const flagImg = document.createElement('img');
                            flagImg.src = getFlagImageSrc(countryCode);
                            flagImg.alt = countryName;
                            flagImg.width = 18;
                            flagImg.height = 12;
                            flagImg.style.marginRight = '8px';
                            flagImg.style.verticalAlign = 'middle';
                            const countryText = document.createTextNode(countryName);
                            cell.innerHTML = '';
                            cell.appendChild(flagImg);
                            cell.appendChild(countryText);
                        }
                        if (column.field === 'regdate' || column.field === 'datetime' || column.field === 'processeddate') {
                            const dateTime = rowData[column.field]; 

                            const [datePart, timePart] = dateTime.split(' '); 

                            const dateText = document.createTextNode(datePart + ' ');

                            const timeText = document.createElement('span');
                            timeText.innerText = timePart;
                            timeText.style.fontStyle = 'italic'; 
                            timeText.style.color = '#415e80'

                            cell.innerHTML = '';
                            cell.appendChild(dateText);
                            cell.appendChild(timeText);
                        }
                        if(column.field === 'remarks'){
                            const translatedType = get(t)(rowData[column.field]);
                            if (translatedType === 'Completed' || translatedType === '완료됨') {
                                cell.style.color = 'green';
                             } else if (translatedType === 'Suspicious Player' || translatedType === '의심스러운 플레이어' ) {
                                cell.style.color = 'indigo';
                                cell.style.fontWeight = 'bold'
                                cell.style.backgroundColor = '#DCCFE1'
                             }
                             else if (translatedType === 'Access Failed' || translatedType === '접근 실패' ) {
                                cell.style.color = 'red';
                             }
                             else if (translatedType === 'For Investigation' || translatedType === '조사 중' ) {
                                cell.style.color = 'gray';
                                cell.style.backgroundColor = '#ECECEC'
                                cell.style.fontStyle = 'italic'
                             }
                           
                        }
                        if (index === 0) {
                            cell.classList.add(firstColumnAlign);
                            cell.classList.add(firstColumnColorClass);
                        }
                        if (column.textAlign) {
                             cell.style.setProperty("text-align", "center", "important");
 
                        }
                        if (column.greenBack) {
                            cell.style.backgroundColor = '#D2E4E5';
                        }
                        if (column.blueBack) {
                            cell.style.backgroundColor = '#ACF0AF';
                        }
                        if (column.width) {
                            cell.style.width = column.width;
                        }
                        if (column.maxWidth) {
                            cell.style.maxWidth = column.maxWidth;
                            cell.style.whiteSpace = 'normal';
                        }
                        if (column.field === 'dealerIDinput') {
                            if (rowData[column.field]?.textField) {
                                cell.style.backgroundColor = '#4098EB'; 
                            } else {
                                cell.style.backgroundColor = '#E33F3F';
                            }
                        }
                        if(column.field === 'requestcategory'){
                            cell.style.color = 'blue'
                        }
                        if(column.field === 'profit'){
                            cell.style.textAlign = 'right'
                            cell.style.color = 'red'
                        }
                        if(column.field === 'commission'){
                            cell.style.textAlign = 'right'
                            cell.style.color = 'red'
                        }
                        if(column.field === 'loginaccess'){
                            if ( rowData[column.field] === '미접속') { 
                                cell.style.color = "gray"
                            } else if ( rowData[column.field] === '접속') {    
                                const span = document.createElement('span'); 
                                const spanData = rowData[column.field] || ''; 
                                span.textContent = spanData;
                                span.style.background = '#00ae5f'
                                span.style.width = '100%';
                                span.style.textAlign = 'center';
                                span.style.borderRadius = "5px"
                                span.style.padding = '3px'; 
                                span.style.display = 'inline-block'; 
                                span.style.color = 'white'
                                cell.innerHTML = ''; 
                                cell.appendChild(span);
                            } 
                        }
                        if (column.field === 'loginfailure') {
                            const span = document.createElement('span');
                            let clickCount = 0; 
                            span.textContent = `${clickCount}`; 
                            span.style.marginRight = '10px'; 
                            const button = document.createElement('button');
                            button.textContent = 'reset'; 
                            button.classList.add('btn', 'btn-secondary'); 
                            button.style.padding = '5px 10px'; 
                            button.style.cursor = 'pointer'; 
                            button.addEventListener('click', () => {
                                clickCount++; 
                                span.textContent = ` ${clickCount}`; 
                            });
                            cell.appendChild(span);
                            cell.appendChild(button);
                            row.appendChild(cell);
                        }

                        if(column.field === 'refundrequestcategory'){
                            cell.style.color = 'red'
                        }
                        if(column.field === 'requestamount'){
                            cell.style.color = 'red'
                        }
                        if(column.field === 'refundrequestamount'){
                            cell.style.color = 'blue'
                        }
                        if(column.field === 'status'){
                            cell.style.color = 'red'
                        }
                        if (column.field === 'type') {
                            const translatedType = get(t)(rowData[column.field]); 
                            if (translatedType === 'Deposit' || translatedType === '입금') { 
                                cell.style.backgroundColor = '#FFE7A8'; 
                                cell.style.color = '#155724'; 
                            } else if (translatedType === 'Cash' || translatedType === '현금') {    
                                cell.style.backgroundColor = '#EAF9EA'; 
                                cell.style.color = '#004085';
                            } else {
                                cell.style.backgroundColor = '#FFFFFF'; 
                                cell.style.color = '#000000'; 
                            }
                        }
                        if (column.field.includes('depositrequestamount')){
                         cell.style.backgroundColor = '#C2EFCE';
                        }
                        if (column.field.includes('balanceafwithdraw')){
                         cell.style.backgroundColor = '#C2EFCE';
                        }
                        if(column.field.includes('withdrawreqamount')){
                         cell.style.backgroundColor = '#FFE1CB';
                        }
                        if(column.field.includes('play')){
                            const translatedType = get(t)(rowData[column.field]);
                            if (translatedType === 'Active' || translatedType === '활성') {
                                cell.style.fontWeight = '600';
                             } else if (translatedType === '게임 중이 아님' || translatedType === 'Not In Game' ) {
                                 cell.style.fontStyle = 'italic';
                             }
                           
                        }
                        if (column.field.includes('result')) {
                             const translatedType = get(t)(rowData[column.field]);
                             if (translatedType === 'Win' || translatedType === '승리') {
                                 cell.style.backgroundColor = '#EAF9EA';
                                 cell.style.color = '#155724';
                             } else if (translatedType === 'Lose' || translatedType === '패배') {
                                 cell.style.backgroundColor = '#FF9F9F';
                                 cell.style.color = '#004085';
                             } 
                         }           
                         if (column.type === 'button' || column.button) {
                            const buttonData = rowData[column.field]; 
                            if (buttonData && buttonData.toLowerCase() === 'none') {
                                cell.innerHTML = ''; 
                                return; 
                            }
                            cell.style.paddingTop = '3px';
                            cell.style.paddingBottom = '3px';
                            cell.style.textAlign = "center";

                            const buttonLabel = typeof column.btnlabel === 'function'
                                ? column.btnlabel(rowData)
                                : buttonData || ''; 

                            const buttonClass = typeof column.className === 'function'
                                ? column.className(rowData)
                                : (column.className || 'btn btn-primary');

                            const isDisabled = rowData.disabled ? 'disabled' : '';
                            let buttonStyle = '';

                            if (['gameno', 'email', 'noticetitle'].includes(column.field)) {
                                cell.style.padding = '0';
                                cell.style.textAlign = "left";
                                buttonStyle = 'color: #415e80; font-weight: bold; background:transparent; border:none';
                            }

                            cell.innerHTML = `
                                <button class="${buttonClass} py-1" style="${buttonStyle}" ${isDisabled}>
                                    ${buttonLabel}
                                </button>
                            `;
                            const buttonElement = cell.querySelector('button');
                            cell.addEventListener('click', (event) => {
                                if (event.target.tagName === 'BUTTON' && !rowData.disabled) {
                                    column.handler(rowData); 
                                }
                            });

                            cell.appendChild(buttonElement);
                        }
                         if (applyRedColor && index > 0 && !isNaN(rowData[column.field])) {
                         cell.innerHTML = formatAmount(cell.innerHTML);
                         cell.style.textAlign = 'right';
                         cell.style.fontWeight = '600';
                         }
                         if (column.type === 'two-buttons') {
                             cell.style.padding = '0';
                             cell.style.paddingLeft = '10px';
                             cell.style.paddingRight = '10px';
 
                             const firstButtonTitle = column.firstButtonTitle || get(t)('button.approve');
                            const secondButtonTitle = column.secondButtonTitle || get(t)('button.reject');
 
                             const firstButton = document.createElement('button');
                             firstButton.innerText = firstButtonTitle; 
                             firstButton.className = 'btn btn-success ms-2 py-1';
 
                             if (typeof column.handleApprove === 'function') {
                                 firstButton.addEventListener('click', () => {
                                     column.handleApprove(rowData);
                                 });
                             }
 
                             const secondButton = document.createElement('button');
                             secondButton.innerText = secondButtonTitle; 
                             secondButton.className = 'btn btn-danger ms-2 py-1';
 
                             if (typeof column.handleReject === 'function') {
                                 secondButton.addEventListener('click', () => {
                                     column.handleReject(rowData);
                                 });
                             }
 
                             cell.appendChild(firstButton);
                             cell.appendChild(secondButton);
                         }
                         if (column.type === 'three-buttons') {
                         cell.style.padding = '0';
                         cell.style.paddingLeft = '10px';
                         cell.style.paddingRight = '10px';
                         const firstButton = document.createElement('button');
                         firstButton.innerText = get(t)('button.approve'); 
                         firstButton.className = 'btn btn-success ms-2 py-1';
                         if (typeof column.handleApprove === 'function') {
                             firstButton.addEventListener('click', () => {
                                 column.handleApprove(rowData); 
                             });
                         }
                         const secondButton = document.createElement('button');
                         secondButton.innerText = get(t)('button.reject'); 
                         secondButton.className = 'btn btn-danger ms-2 py-1';
                         if (typeof column.handleReject === 'function') {
                             secondButton.addEventListener('click', () => {
                                 column.handleReject(rowData); 
                             });
                         }
                         const thirdButton = document.createElement('button');
                         thirdButton.innerText = get(t)('button.cancel'); ; 
                         thirdButton.className = 'btn btn-warning ms-2 py-1';
                         if (typeof column.handleReview === 'function') {
                             thirdButton.addEventListener('click', () => {
                                 column.handleReview(rowData); 
                             });
                         }
                         cell.appendChild(firstButton);
                         cell.appendChild(secondButton);
                         cell.appendChild(thirdButton);
                         }
                        if (column.type === 'select-change') {
                            const fieldData = rowData[column.field] || ''; 
                            const tableNumbers = fieldData.split(', ').map(value => value.trim());
                            let selectedValues = [...tableNumbers];

                            console.log('Field Data:', fieldData); 
                            console.log('Table Numbers:', tableNumbers); 

                            cell.innerHTML = `
                                <span class="editable-container editable-inline">
                                    <div>
                                        <form class="form-inline editableform" style="display: none;">
                                            <div class="d-flex align-items-center">
                                                <div class="editable-checklist d-flex">
                                                    ${tableNumbers.map(table => `
                                                        <div >
                                                            <label class="d-flex align-items-center" >
                                                                <input type="checkbox" value="${table}" class="form-check-input">
                                                                <span class="mx-1">${table}</span>
                                                            </label>
                                                        </div>`).join('')}
                                                </div>
                                                <div class="editable-buttons">
                                                    <button type="submit" class="btn btn-primary btn-sm editable-submit">
                                                        <i class="fa fa-check" aria-hidden="true"></i>
                                                    </button>
                                                    <button type="button" class="btn btn-default btn-sm editable-cancel">
                                                        <i class="fa fa-times" aria-hidden="true"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </span>
                            `;

                            setTimeout(() => {
                                const form = cell.querySelector('.editableform');
                                const checkboxContainer = cell.querySelector('.editable-checklist');
                                const cancelButton = cell.querySelector('.editable-cancel');
                                const link = document.createElement('a');

                                link.href = "#";
                                link.className = "editable editable-click";
                                link.textContent = selectedValues.join(', ') || 'No tables selected';
                                cell.prepend(link); 

                                console.log('Form:', form); 

                                if (!form || !checkboxContainer || !cancelButton || !link) {
                                    console.error('Failed to initialize elements properly.');
                                    return;
                                }

                                function initializeCheckboxes() {
                                    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
                                        checkbox.checked = selectedValues.includes(checkbox.value);
                                    });
                                }

                                
                                link.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    console.log('Link clicked'); 
                                    initializeCheckboxes();
                                    form.style.display = 'block';
                                });

                                form.addEventListener('submit', (event) => {
                                    event.preventDefault();
                                    selectedValues = Array.from(
                                        checkboxContainer.querySelectorAll('input[type="checkbox"]:checked')
                                    ).map(checkbox => checkbox.value);
                                    link.textContent = selectedValues.join(', ') || 'No tables selected';
                                    form.style.display = 'none';
                                });

                                cancelButton.addEventListener('click', (event) => {
                                    event.preventDefault();
                                    form.style.display = 'none';
                                });

                                document.addEventListener('click', (event) => {
                                    if (!cell.contains(event.target) && form.style.display === 'block') {
                                        form.style.display = 'none';
                                    }
                                });
                            }, 0);
                        }
                        if (column.type === 'editable-input') {
                            cell.style.minWidth = '130px'
                            cell.style.maxWidth = '180px'
                            const initialValue = rowData[column.field]?.textField || ''; 
                            let currentValue = initialValue;

                            cell.innerHTML = `
                                <span class="editable-text" style="color:#348fe2; cursor:pointer;">${currentValue}</span>
                                <form class="form-inline editableform" style="display: none;">
                                    <div class="control-group form-group">
                                        <div class="d-flex">
                                            <div class="editable-input" style="position: relative;">
                                                <input type="text" class="form-control px-1" value="${currentValue}" 
                                                    style="box-shadow:none">
                                                <span class="editable-clear-x"></span>
                                            </div>
                                            <div class="editable-buttons ms-1">
                                                <button type="submit" class="btn btn-primary  editable-submit ">
                                                    <i class="fa fa-check" aria-hidden="true"></i>
                                                </button>
                                                <button type="button" class="btn btn-default  editable-cancel ">
                                                    <i class="fa fa-times" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="editable-error-block help-block" style="display: none;"></div>
                                    </div>
                                </form>
                            `;

                            const editableText = cell.querySelector('.editable-text');
                            const form = cell.querySelector('.editableform');
                            const input = form.querySelector('input');
                            const submitButton = form.querySelector('.editable-submit');
                            const cancelButton = form.querySelector('.editable-cancel');
                            editableText.addEventListener('click', () => {
                                editableText.style.display = 'none'; 
                                form.style.display = 'inline'; 
                                input.focus(); 
                            });
                            form.addEventListener('submit', (event) => {
                                event.preventDefault(); 
                                currentValue = input.value; 
                                editableText.textContent = currentValue; 
                                form.style.display = 'none'; 
                                editableText.style.display = 'inline'; 
                            });

                            
                            cancelButton.addEventListener('click', () => {
                                input.value = currentValue; 
                                form.style.display = 'none'; 
                                editableText.style.display = 'inline';
                            });
                            document.addEventListener('click', (event) => {
                                if (!cell.contains(event.target) && form.style.display === 'inline') {
                                    input.value = currentValue; 
                                    form.style.display = 'none'; 
                                    editableText.style.display = 'inline'; 
                                }
                            });
                        }
                        if (column.type === 'editable-select') {
                            cell.style.maxWidth = '200px';

                            const options = rowData[column.field]?.options || []; 
                            const placeholder = options.length > 0 ? options[0] : 'Select';
                            const initialValue = rowData[column.field]?.textField || ''; 
                            const optionsHTML = `
                                <option value="" disabled hidden>${placeholder}</option>
                                ${options.map(option => 
                                    `<option value="${option}" ${option === initialValue ? 'selected' : ''}>${option}</option>`
                                ).join('')}
                            `;

                            cell.innerHTML = `
                                <span class="editable-text" style="color:#348fe2; cursor:pointer;">
                                    ${initialValue || placeholder}
                                </span>
                                <form class="form-inline editableform" style="display: none;">
                                    <div class="control-group form-group d-flex">
                                        <div class="editable-input w-100">
                                            <select class="form-control p-1 w-100">
                                                ${optionsHTML}
                                            </select>
                                        </div>
                                        <div class="editable-buttons ms-2">
                                            <button type="submit" class="btn btn-primary btn-sm editable-submit">
                                                <i class="fa fa-check" aria-hidden="true"></i>
                                            </button>
                                            
                                        </div>
                                        <div class="editable-error-block help-block" style="display: none;"></div>
                                    </div>
                                </form>
                            `;

                            const editableText = cell.querySelector('.editable-text');
                            const form = cell.querySelector('.editableform');
                            const select = form.querySelector('select');

                            editableText.addEventListener('click', () => {
                                editableText.style.display = 'none';
                                form.style.display = 'inline';
                                select.focus();
                            });
                            form.addEventListener('submit', (event) => {
                                event.preventDefault();
                                const selectedValue = select.options[select.selectedIndex].text;
                                editableText.textContent = selectedValue;
                                form.style.display = 'none';
                                editableText.style.display = 'inline';
                            });
                            document.addEventListener('click', (event) => {
                                if (!cell.contains(event.target) && form.style.display === 'inline') {
                                    select.value = initialValue;
                                    form.style.display = 'none';
                                    editableText.style.display = 'inline';
                                }
                            });
                        }
                         if (column.type === 'checkbox') {
                             cell.innerHTML = `<input type="checkbox" ${rowData[column.field] ? 'checked' : ''} />`;
                             cell.querySelector('input').addEventListener('change', (e) => {
                                 rowData[column.field] = e.target.checked;
                             });
                         }
                         if (column.type === 'input-button') {
                             cell.style.padding = '0';
                             cell.style.paddingLeft = '10px';
                             cell.style.paddingRight = '10px';
                             const value = rowData[column.field]?.textField || '';  
                             const buttonLabel = typeof column.btnlabel === 'function' 
                                 ? column.btnlabel(rowData)  
                                 : column.btnlabel || 'Click'; 
                                 cell.innerHTML = `
                                     <div class="input-group">
                                         <input type="text" class="form-control px-2 py-1" value="${value}" />
                                         <button class="btn btn-dark py-1">${buttonLabel}</button>
                                     </div>`;
                                     const button = cell.querySelector('button');
                                     if (button) {
                                         button.addEventListener('click', () => {
                                             if (column.handler) {
                                                 column.handler(rowData);  
                                             }
                                         });
                                     }
                                     const input = cell.querySelector('input');
                                     if (input) {
                                         input.addEventListener('input', (e) => {
                                             rowData[column.field].textField = e.target.value;  
                                         });
                                     }
                         }
                         if (column.type === 'text-button') {
                            cell.style.padding = '0';
                            cell.style.paddingLeft = '10px';
                            cell.style.paddingRight = '10px';
                            const value = rowData[column.field]?.textField || '';  
                            if (value) {
                                const buttonLabel = typeof column.btnlabel === 'function' 
                                    ? column.btnlabel(rowData)  
                                    : column.btnlabel || 'Click'; 
                                const buttonClass = typeof column.className === 'function' 
                                    ? column.className(rowData)
                                    : 'btn btn-primary'; 
                                cell.innerHTML = `
                                <div class="d-flex align-items-center">
                                    <span style="color:white">${value}</span>
                                    <button class="${buttonClass} ms-2 py-1">${buttonLabel}</button>
                                </div>`;
                                cell.querySelector('button').addEventListener('click', () => {
                                    column.handler && column.handler(rowData);
                                });
                            } else {
                                cell.innerHTML = `<span></span>`;
                            }
                         }
                         if (column.type === 'one-select') {
                             cell.style.padding = '0';
                             cell.style.paddingLeft = '10px';
                             cell.style.paddingRight = '10px';
 
                             const fieldData = rowData[column.field] || {};
                             const options = fieldData.options || [];
                             const selectedValue = fieldData.value || '';
                             const translatedLabel = $t(column.label);
 
                             cell.innerHTML = `
                                 <select class="form-select-sm w-100 py-1">
                                     <option value="" disabled ${!selectedValue ? 'selected' : ''}>${translatedLabel}</option>
                                     ${options.map(option => `
                                         <option value="${option}" ${option === selectedValue ? 'selected' : ''}>${option}</option>
                                     `).join('')}
                                 </select>
                             `;
                             const selectElement = cell.querySelector('select');
                             selectElement.addEventListener('change', (e) => handleSelectChange(rowData, e));
                         }
                         if (column.type === 'html') {
                const htmlContent = rowData[column.field] || ''; 
                cell.innerHTML = htmlContent;
            } 
            if (column.type === 'not-allowed') {
                const span = document.createElement('span'); 
                const spanData = rowData[column.field] || ''; 
                span.textContent = spanData;
                span.style.border = '1px solid #ced4da'; 
                span.style.background = '#f5f5f5'
                span.style.width = '100%';
                span.style.textAlign = 'center';
                span.style.borderRadius = "5px"
                span.style.padding = '3px'; 
                span.style.cursor = 'not-allowed'; 
                span.style.display = 'inline-block'; 
                span.classList.add('not-allowed-span');
                cell.innerHTML = ''; 
                cell.appendChild(span);
            }
                         if (column.type === 'input') {   
                            cell.style.padding = '0';
                                cell.style.paddingLeft = '10px';
                                cell.style.paddingRight = '10px';
                                cell.style.minWidth = '130px'
                                const inputType = column.inputType || 'text'; 
                                cell.innerHTML = `<input type="${inputType}" value="${rowData[column.field]}" class="form-control input-field py-1" />`;
                                const inputElement = cell.querySelector('input');
                                inputElement.addEventListener('input', (e) => {
                                    rowData[column.field] = e.target.value;  
                                });
                         }
                         if (column.type === 'select-range' && rowData[column.field]) {
                             const fromOptions = rowData[column.field]?.fromOptions || []; 
                             const toOptions = rowData[column.field]?.toOptions || [];    
                             cell.style.minWidth = '250px' 
                             cell.style.padding = '0';
                            cell.style.paddingLeft = '10px';
                            cell.style.paddingRight = '10px';
                             cell.innerHTML = `
                             <div class="d-flex align-items-center justify-content-between">
                                 <div class="input-group">
                                     
                                     <select class="form-select" data-part="from">
                                         ${fromOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
                                     </select>
                                     <span class="input-group-text">₱</span>
                                 </div>
                                 <span class="px-2 "> ~ </span>
                                 <div class="input-group">
                                     
                                     <select class="form-select" data-part="to">
                                         ${toOptions.map(option => `<option value="${option}">${option}</option>`).join('')}
                                     </select>
                                     <span class="input-group-text">₱</span>
                                 </div>
                             </div>
                             `;
 
                             const selects = cell.querySelectorAll('select');
                             selects[0].addEventListener('change', (e) => {
                             rowData[column.field].from = e.target.value;  
                             });
                             selects[1].addEventListener('change', (e) => {
                             rowData[column.field].to = e.target.value;  
                             });
                         }
                         if (column.type === 'input-range' && rowData[column.field]) {
                                const { from = '', to = '' } = rowData[column.field];
                                if (typeof rowData[column.field] === 'string' && rowData[column.field].includes('Private Table')) {
                                    cell.innerHTML = `<span>${rowData[column.field]}</span>`;
                                    return; 
                                }
                                cell.style.minWidth = '250px';
                                cell.style.padding = '0';
                                cell.style.paddingLeft = '10px';
                                cell.style.paddingRight = '10px';

                                cell.innerHTML = `
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="input-group">
                                            <input 
                                                type="number" 
                                                class="form-control" 
                                                data-part="from" 
                                                value="${from}" 
                                                placeholder="Min"
                                            />
                                            <span class="input-group-text">₱</span>
                                        </div>
                                        <span class="px-2"> ~ </span>
                                        <div class="input-group">
                                            <input 
                                                type="number" 
                                                class="form-control" 
                                                data-part="to" 
                                                value="${to}" 
                                                placeholder="Max"
                                            />
                                            <span class="input-group-text">₱</span>
                                        </div>
                                    </div>
                                `;

                                const inputs = cell.querySelectorAll('input');

                                inputs[0].addEventListener('input', (e) => {
                                    rowData[column.field].from = e.target.value;  
                                });

                                inputs[1].addEventListener('input', (e) => {
                                    rowData[column.field].to = e.target.value; 
                                });
                         }
                    }
                });
            }
        });
    }
 
 // WORKING!!! setting current Page
    function setCurrentPage(page) {
         if (page >= 1 && page <= Math.ceil(totalRecords / itemsPerPage)) {
             currentPage = page;
             fetchDataForPage(currentPage, itemsPerPage).then(() => {
                 initializeDataTable(); 
             });
         }
     }
 
     function handleSelectChange(row, event) {
         row.selectedValue = event.target.value;
     }
 
     function applyFilters() {
         initializeDataTable(); 
         isDropdownOpen = false; 
     }
     function clearFilters() {
         selectedFilters = [];
         initializeDataTable(); 
         isDropdownOpen = false; 
     }
     function toggleDropdown() {
         isDropdownOpen = !isDropdownOpen; 
     }
     function toggleDropdown2() {
         isDropdownOpen2 = !isDropdownOpen2; 
     }
     function getUniqueColumnValues(columnField) {
         const uniqueValues = [...new Set(tableData.map(row => row[columnField]))];
         return uniqueValues.map(value => ({ value, label: $t(value) }));
     }
 //WORKING!!!  Searching input
     function filterByEmail(query) {
         filteredData = tableData.filter(row => row.email.toLowerCase().includes(query.toLowerCase()));
     }
     function handleSearchInput(event) {
         searchQuery = event.target.value;
         filterByEmail(searchQuery); 
         initializeDataTable();
     }
 
 // WORKING!!! show orderableColumns
    function updateTableOrder() {
        if (selectedColumn) {
            const columnIndex = tableColumns.findIndex(col => col.field === selectedColumn);
            if (columnIndex !== -1 && dataTableInstance) {
                dataTableInstance.order([columnIndex, selectedOrder]).draw();
            }
        }
    }
    function handleColumnChange(event) {
        selectedColumn = event.target.value;
        updateTableOrder();
    }
    function filterDataByDateRange(startDate, endDate) {
    return tableData.filter(row => {
        const rowDate = new Date(row.regdate || row.datetime || row.processeddate); 
        return rowDate >= startDate && rowDate <= endDate;
    });
}
     // WORKING!!! DatePicker 
     function setupDatePicker() {
    if (showDatePicker && datePickerInstance) {
        datePickerInstance.destroy();
    }

    if (showDatePicker) {
        const lang = get(locale).split('-')[0];
        const localeConfig = lang === 'ko' ? Korean : english;

        datePickerInstance = flatpickr("#date-picker", {
            mode: "range",
            clickOpens: true,
            dateFormat: "Y-m-d",
            altInput: true,
            altFormat: "F j, Y",
            locale: localeConfig,
            onChange: (selectedDates) => {
                if (selectedDates.length === 2) {
                    const [startDate, endDate] = selectedDates;
                    startDate.setHours(0, 0, 0, 0); 
                    endDate.setHours(23, 59, 59, 999); 

                    dateRange.start = startDate;
                    dateRange.end = endDate;

                    const filteredData = filterDataByDateRange(startDate, endDate);
                    initializeDataTable(filteredData);
                }
            },
            onReady: (selectedDates, dateStr, instance) => {
                setupDateRangeButtons(instance);
            }
        });
    }
}
function setupDateRangeButtons(instance) {
    const createButton = (label, onClick, className = "btn-primary") => {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", className, "ms-2");
        button.textContent = label;
        button.addEventListener("click", onClick);
        return button;
    };

    const lastWeekButton = createButton($t('content.lastweek'), () => {
        const today = new Date();
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        lastWeekStart.setHours(0, 0, 0, 0);

        instance.setDate([lastWeekStart, today]);
        dateRange.start = lastWeekStart;
        dateRange.end = today;

        const filteredData = filterDataByDateRange(lastWeekStart, today);
        initializeDataTable(filteredData);
    });

    const lastMonthButton = createButton($t('content.lastmonth'), () => {
        const today = new Date();
        const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

        instance.setDate([lastMonthStart, lastMonthEnd]);
        dateRange.start = lastMonthStart;
        dateRange.end = lastMonthEnd;

        const filteredData = filterDataByDateRange(lastMonthStart, lastMonthEnd);
        initializeDataTable(filteredData);
    });

    const clearFilterButton = createButton($t('content.clearfilter'), () => {
        instance.clear();
        dateRange.start = '';
        dateRange.end = '';
        initializeDataTable(tableData); 
    }, "btn-secondary");

    instance.calendarContainer.appendChild(lastWeekButton);
    instance.calendarContainer.appendChild(lastMonthButton);
    instance.calendarContainer.appendChild(clearFilterButton);
}

     //  WORKING!!! Applying Red on Numbers after dote
     function formatAmount(amount) {
         if (!applyRedColor) return amount;
         const number = parseFloat(amount);
         if (isNaN(number)) return amount;
         const [whole, decimal] = amount.split('.');
         const formattedWhole = parseInt(whole).toLocaleString();
         return decimal
             ? `${formattedWhole}.<span style="color: red; text-align:right; letter-spacing:-1px; font-weight:normal">${decimal}</span>`
             : formattedWhole;  
     }
 
     // WORKING!! showing Items per Page
     function onItemsPerPageChange(event) {
         const newSize = parseInt(event.target.value);
         dataStore.update(store => {
             store.itemsPerPage = newSize;
             store.currentPage = 1;
             return store;
         });
         fetchDataForPage(1, newSize).then(() => {
             tick().then(() => {
                 initializeDataTable();
             });
         });
     }
 // WORKING!! for get not more than 5 pagination buttons
     function getVisiblePages(totalPages, currentPage) {
         const maxPagesToShow = 5;
         let startPage, endPage;
 
         if (totalPages <= maxPagesToShow) {
             startPage = 1;
             endPage = totalPages;
         } else {
             if (currentPage <= 3) {
                 startPage = 1;
                 endPage = maxPagesToShow;
             } else if (currentPage + 2 >= totalPages) {
                 startPage = totalPages - (maxPagesToShow - 1);
                 endPage = totalPages;
             } else {
                 startPage = currentPage - 2;
                 endPage = currentPage + 2;
             }
         }
         const visiblePages = [];
         for (let i = startPage; i <= endPage; i++) {
             visiblePages.push(i);
         }
         return visiblePages;
 }
 </script>
 {#if $locale}
 <div class="panel panel-inverse px-4 py-4 m-0">
    
         <div class="scrollable-panel">
             <div class="d-flex justify-content-between   flex-row flex-wrap" id="table-header">
                 {#if showTitle}
                     <div class="d-flex align-items-center justify-content-between w-100">
                         <div class="d-flex align-items-end w-100" id="title">
                             <div class="d-flex align-items-end">
                                 <h1 class="m-0 me-2">{title}</h1> <span class="d-none d-lg-block">{$t('content.list')}</span>
                             </div>
                             {#if showPerPage}
                             <select on:change={(event) => onItemsPerPageChange(event)} class="ms-4">
                                 <option value="10" selected={itemsPerPage === 10}>10</option>
                                 <option value="25" selected={itemsPerPage === 25}>25</option>
                                 <option value="50" selected={itemsPerPage === 50}>50</option>
                                 <option value="100" selected={itemsPerPage === 100}>100</option>
                             </select>
                             {/if}
                         </div>
             
                     </div>
                 {/if}
             
                 {#if showSubTitle}
                     <div class="d-flex align-items-end" id="title">
                         <h5 class="m-0 me-2">{subtitle}</h5>
                     </div>
                 {/if}
                 {#if showOrderControls}
                 <div class="d-flex mt-2 justify-content-end w-100 flex-wrap">
                    <div class="d-flex  w-100">
                        {#if showButtons}
                        <div class="d-flex w-100 mb-2">
                            <button type="button" class="btn btn-primary">전체</button>
                            <button type="button" class="btn btn-danger mx-2">요청</button>
                            <button type="button" class="btn btn-secondary">대기</button>
                         </div>
                         {/if}
                         {#if showNoticeButtons}
                         <div class="d-flex justify-content-between w-100 mb-2">
                            <div class="d-flex" id="noticebuttons">
                                <button class="btn">전체</button>
                                <button class="btn">신규문의</button>
                                <button class="btn">대기</button>
                                <button class="btn">답변 완료</button>
                                <button class="btn">삭제</button>
                            </div>
                            <div class="d-flex">
                                <button class="btn btn-danger me-1">전체 삭제</button>
                                <button class="btn btn-secondary">템플릿 관리</button>
                            </div>
                         </div>
                         {/if}
                    </div>
                     <div class="d-flex justify-content-between w-100 align-items-center">
                         <div class="d-flex">
                             <div class="order-controls text-end d-flex">
                                 {#if showDatePicker}
                                     <div class="d-flex">
                                         <input type="text" id="date-picker"  placeholder="{$t('content.datepicker')}" class="form-control  me-2 w-200px" />
                                     </div>
                                 {/if}
                                 {#if filterField}
                                 <div class="filter-select me-2" >
                                     <button class="btn btn-select first-option text-nowrap" on:click={toggleDropdown}>
                                         {$t(tableColumns.find(col => col.field === filterField)?.label || filterField)}
                                         <i class=" fa-solid fa-chevron-down"></i>
                                     </button>
                                     {#if isDropdownOpen}
                                     <div class="dropdown-content">
                                        {#each getUniqueColumnValues(filterField) as { value, label }, index}
                                        <div class="checkbox-option checkbox-wrapper-13">
                                          <input
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={selectedFilters.includes(value)}
                                            class="substituted"
                                            on:change={(e) => handleCheckboxChange(value, e)}
                                          />
                                          <label for={`checkbox-${index}`}>{label}</label>
                                        </div>
                                      {/each}
                                         <div class="btn-wrap text-center my-2">
                                             <button type="button" class="btn btn-primary" on:click={applyFilters}>{$t('button.save')}</button>
                                             <button type="button" class="btn btn-danger" on:click={clearFilters}>{$t('button.clear')}</button>
                                         </div>
                                     </div>
                                     {/if}
                                 </div>
                                 {/if}
                                 {#if filterField2}
                                 <div class="filter-select me-2" >
                                     <button class="btn btn-select first-option text-nowrap" on:click={toggleDropdown2}>
                                         {$t(tableColumns.find(col => col.field === filterField2)?.label || filterField2)}
                                         <i class=" fa-solid fa-chevron-down"></i>
                                     </button>
                                     {#if isDropdownOpen2}
                                     <div class="dropdown-content">
                                        {#each getUniqueColumnValues(filterField2) as { value, label }, index}
                                        <div class="checkbox-option checkbox-wrapper-13">
                                          <input
                                            type="checkbox"
                                            id={`checkbox-${index}`}
                                            checked={selectedFilters.includes(value)}
                                            class="substituted"
                                            on:change={(e) => handleCheckboxChange(value, e)}
                                          />
                                          <label for={`checkbox-${index}`}>{label}</label>
                                        </div>
                                      {/each}
                                         <div class="btn-wrap text-center my-2">
                                             <button type="button" class="btn btn-primary" on:click={applyFilters}>{$t('button.save')}</button>
                                             <button type="button" class="btn btn-danger" on:click={clearFilters}>{$t('button.clear')}</button>
                                         </div>
                                     </div>
                                     {/if}
                                 </div>
                                 {/if}
                                 {#if showOrderableColumns}
                                     <select class="me-2" id="column-select" on:change={handleColumnChange}>
                                        <option value="" class="first-option">{$t('content.search')}</option>
                                         {#each orderableColumns as column}
                                         <option value={column.field}>{$t(column.label)}</option>
                                         {/each}
                                     </select>
                                 {/if}
             
                             </div>
                             <div class="d-flex align-items-center">
                                 <div class="input-group w-250px">
                                     <input
                                         type="text"
                                         id="custom-search"
                                         class="form-control "
                                         placeholder="{$t('content.search')}"
                                         on:input={handleSearchInput} />
                                     <button type="button" class="btn btn-indigo" on:click={() => filterByEmail(searchQuery)}>Go!</button>
                                 </div>
             
                             </div>
                         </div>
                         <span class="d-block ms-2 w-70px" id='totalamount'>총 금액: <b>0</b></span>
                     </div>
             
                 </div>
                 {/if}
             </div>
             <slot>
                 <!-- Post Notice Part goes here -->
             </slot>
             
             <table bind:this={dataTableElement}  tableData={$dataStore.tableData2} class="table mt-3 table-hover table-bordered align-middle text-nowrap">
                <thead>
                     <tr>
                         {#each tableColumns as col}
                             <th class="text-center">{$t(col.label)}</th>
                         {/each}
                     </tr>
                 </thead>
                 <tbody>
                    {#if tableData?.length > 0}
                        {#each tableData as row}
                            <tr>
                                {#each tableColumns as column}
                                    <td >
                                        {row[column.field] ?? ''}
                                    </td>
                                {/each}
                            </tr>
                        {/each}
                    {:else}
                        <tr>
                            <td colspan={tableColumns.length} class="text-center">
                                No matching records found.
                            </td>
                        </tr>
                    {/if}
                </tbody>
             
             </table>
             {#if showPagination}
             {#if totalPages > 0}
             <div class="bottom-wrapper d-flex justify-content-between align-items-center mt-3 flex-row">
                 <div class="d-flex justify-content-center w-100">
                     <div class="pagination-controls d-flex justify-content-center align-items-center">
                         <!-- First Page Button -->
                         <button
                             class="pagination-btn"
                             on:click={() => setCurrentPage(1)}
                             disabled={currentPage === 1}
                         >
                             &laquo;
                         </button>
             
                         <!-- Previous Page Button -->
                         <button
                             class="pagination-btn"
                             on:click={() => setCurrentPage(currentPage - 1)}
                             disabled={currentPage === 1}
                         >
                         &lsaquo;
                         </button>
             
                         <!-- Page Number Buttons -->
                         {#each getVisiblePages(totalPages, currentPage) as page}
                             <button
                                 class="pagination-number-btn"
                                 class:active={currentPage === page}
                                 on:click={() => setCurrentPage(page)}
                             >
                                 {page}
                             </button>
                         {/each}
             
                         <!-- Next Page Button -->
                         <button
                             class="pagination-btn"
                             on:click={() => setCurrentPage(currentPage + 1)}
                             disabled={currentPage === totalPages}
                         >
                         &rsaquo;
                         </button>
             
                         <!-- Last Page Button -->
                         <button
                             class="pagination-btn"
                             on:click={() => setCurrentPage(totalPages)}
                             disabled={currentPage === totalPages}
                         >
                             &raquo;
                         </button>
                     </div>
                 </div>
                 
             </div>
              {/if}
              {/if}
         </div>
    
 </div>
 {/if}
 <style scoped>
    .scrollable-panel{
        overflow-x: auto;
    }
  
   @media screen and (max-width: 1150px){
        #table-header{
            flex-direction:column !important;
        }
    }
     #title h1 {
         color: #415e80;
     }
     #title span {
         font-size: 20px;
         color: #415e80;
         flex-direction: column;
     }
     select {
         padding: 5px;
         border: 1px solid lightgray;
         border-radius: 5px;
     }
     option {
         padding: 5px;
     }
     table {
         font-size: 14px;
         border-collapse: collapse;
         overflow-x:hidden;
     }
     table th {
         font-size: 13px;
         color: #415e80;
     }
     table tbody{
        text-align: center !important;
     }
     #totalamount{
        width: 90px;
        display: block;
        font-size: 15px;
     }
     .text-nowrap {
         white-space: nowrap;
     }

     .first-option{
        color:gray !important
     }
     #noticebuttons{
        gap: 5px;
     }
     #noticebuttons button{
        border: 1px solid #dee2e6;
        border-radius: 0;
     }
     .dropdown-content {
         display: block;
         position: absolute;
         background-color: #f9f9f9;
         min-width: 160px;
         border: 1px solid #ddd;
         z-index: 1;
         box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
     }
     .dropdown-content label{
        width: 100%;
        text-align: left;
        padding-left: 5px;
     }
 
     .checkbox-option {
         padding: 5px;
         display: flex;
         align-items: center;
     }
 
     .checkbox-option input[type="checkbox"] {
         margin-right: 10px;
     }
     .btn-select{
         border: 1px solid lightgray;
     }
 
     .btn-select i{
         color:black;
         font-weight: bold;
     }
     .pagination-btn {
         padding: 0.5rem 1rem;
         margin: 0 0.2rem;
         border: none;
         background-color: #415e80;
         color: white;
         cursor: pointer;
         border-radius: 4px;
     }
 
     .pagination-number-btn {
         padding: 0.5rem 1rem;
         margin: 0 0.2rem;
         border: 1px solid lightgray;
         background-color: white;
         color: black;
         cursor: pointer;
         border-radius: 4px;
     }
 
     .pagination-number-btn.active {
         background-color: #415e80;
         color: white;
         border: none;
     }
 
     .pagination-btn:disabled {
         background-color: lightgray;
         cursor: not-allowed;
     }
     .checkbox-wrapper-13 input[type=checkbox] {
      --active: #275EFE;
      --active-inner: #fff;
      --focus: 2px rgba(39, 94, 254, .3);
      --border: #BBC1E1;
      --border-hover: #275EFE;
      --background: #fff;
      --disabled: #F6F8FF;
      --disabled-inner: #E1E6F9;
      height: 18px;
      outline: none;
      display: inline-block;
      vertical-align: top;
      position: relative;
      margin: 0;
      cursor: pointer;
      border: 1px solid var(--bc, var(--border));
      background: var(--b, var(--background));
      transition: background 0.3s, border-color 0.3s, box-shadow 0.2s;
    }
    .checkbox-wrapper-13 input[type=checkbox]:after {
      content: "";
      display: block;
      left: 0;
      top: 0;
      position: absolute;
      transition: transform var(--d-t, 0.3s) var(--d-t-e, ease), opacity var(--d-o, 0.2s);
    }
    .checkbox-wrapper-13 input[type=checkbox]:checked {
      --b: var(--active);
      --bc: var(--active);
      --d-o: .3s;
      --d-t: .6s;
      --d-t-e: cubic-bezier(.2, .85, .32, 1.2);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled {
      --b: var(--disabled);
      cursor: not-allowed;
      opacity: 0.9;
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled:checked {
      --b: var(--disabled-inner);
      --bc: var(--border);
    }
    .checkbox-wrapper-13 input[type=checkbox]:disabled + label {
      cursor: not-allowed;
    }
    .checkbox-wrapper-13 input[type=checkbox]:hover:not(:checked):not(:disabled) {
      --bc: var(--border-hover);
    }
    .checkbox-wrapper-13 input[type=checkbox]:focus {
      box-shadow: 0 0 0 var(--focus);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      width: 21px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      opacity: var(--o, 0);
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --o: 1;
    }
    .checkbox-wrapper-13 input[type=checkbox] + label {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-left: 4px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch) {
      border-radius: 3px;
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):after {
      width: 5px;
      height: 9px;
      border: 2px solid var(--active-inner);
      border-top: 0;
      border-left: 0;
      left: 6px;
      top: 2px;
      transform: rotate(var(--r, 20deg));
    }
    .checkbox-wrapper-13 input[type=checkbox]:not(.switch):checked {
      --r: 43deg;
    }
    .checkbox-wrapper-13 * {
        box-sizing: inherit;
    }
    .checkbox-wrapper-13 *:before,
    .checkbox-wrapper-13 *:after {
        box-sizing: inherit;
    }


 </style>