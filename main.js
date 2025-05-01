$(document).ready(function() {
    // Expanded operator sets for each field (including ICD, CPT, Modifiers)
    const operators = {
        'CPT/Procedure Code': ['Does Not Exist', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List'],
        'Diagnosis/ICD-10 Code': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Rendering Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Sup. Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Ordering Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Ref. Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Service Location': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Units': ['Between', 'Equals', 'Greater Than', 'Less Than'],
        'Modifier 1': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Modifier 2': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Modifier 3': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Modifier 4': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Charge Amount': ['Between', 'Equals', 'Greater Than', 'Less Than'],
        'Primary Diagnosis Code': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
        'Service Date': ['After', 'Before', 'Between', 'Equals'],
        'Place of Service': ['Equals', 'Not Equals'],
        'Provider Type': ['Equals', 'Not Equals'],
        'Patient Age': ['Between', 'Equals', 'Greater Than', 'Less Than'],
        'Gender': ['Equals', 'Is Empty', 'Is Not Empty', 'Not Equals'],
        'Zip Code': ['Equals', 'Has Valid Format', 'In List', 'Is Empty', 'Is Invalid Format', 'Not In List'],
        'Address 1': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'Address 2': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'Phone Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
        'Work Phone Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
        'Mobile Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
        'Email': ['Contains', 'Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
        'First Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'Last Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'Date of Birth': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
        'SSN': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
        'Marital Status': ['Equals', 'In List', 'Is Empty', 'Is Not Empty'],
        'DOS From': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
        'DOS To': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
        'Total Amount': ['Between', 'Equals', 'Greater Than', 'Is Empty', 'Is Not Empty', 'Less Than'],
        'Middle Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'City': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'State': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
        'POS': ['Equals', 'Is Empty', 'Is Not Empty', 'Not Equals']
    };
    // Value input type for each field
    const valueInputType = {
        'CPT/Procedure Code': 'text',
        'Diagnosis/ICD-10 Code': 'text',
        'Rendering Provider': 'select',
        'Sup. Provider': 'select',
        'Ordering Provider': 'select',
        'Ref. Provider': 'select',
        'Service Location': 'select',
        'POS': 'select',        
        'Units': 'number',
        'Modifier 1': 'text',
        'Modifier 2': 'text',
        'Modifier 3': 'text',
        'Modifier 4': 'text',
        'Charge Amount': 'number',
        'Primary Diagnosis Code': 'text',
        'Service Date': 'date',
        'Place of Service': 'select',
        'Provider Type': 'text',
        'Patient Age': 'number',
        'Gender': 'select',
        'Zip Code': 'text',
        'Address 1': 'text',
        'Address 2': 'text',
        'Phone Number': 'text',
        'Work Phone Number': 'text',
        'Mobile Number': 'text',
        'Email': 'text',
        'First Name': 'text',
        'Last Name': 'text',
        'Date of Birth': 'date',
        'SSN': 'text',
        'Marital Status': 'text',
        'DOS From': 'date',
        'DOS To': 'date',
        'Total Amount': 'number',
        'Middle Name': 'text'
    };
    const placeOfServiceOptions = ['Office', 'Hospital', 'Telehealth', 'Home'];
    const genderOptions = ['Male', 'Female', 'Other'];
    const practiceOptions = ['Family Medicine', 'Internal Medicine', 'Pediatrics'];

    // Initialize practice dropdown
    const practiceSelect = document.querySelector('select[name="practice"]');
    practiceOptions.forEach(practice => {
        const option = document.createElement('option');
        option.value = practice;
        option.textContent = practice;
        practiceSelect.appendChild(option);
    });

    // Action types
    const actionTypes = [
        // Positive Actions
        'Approve Claim',
        'Fast Track Claim',
        'Auto-Pay Claim',
        'Mark as Reviewed',
        'Add Positive Note',
        // Negative Actions
        'Flag Charge Line',
        'Add Note to Claim',
        'Deny Claim',
        'Require Documentation',
        'Send Alert'
    ];

    // Quick rule template handling
    $('.quick-rule-templates').on('click', '.quick-rule', function() {
        const template = $(this).data('template');
        insertQuickRule(template);
    });

    // Enhanced getValueInput to support 'Between' operator for number/date fields
    function getValueInput(field, operator) {
        // Return empty for these operators regardless of field
        if (operator === 'Is Empty' || operator === 'Is Not Empty' || 
            operator === 'Is Valid Format' || operator === 'Is Invalid Format' ||
            operator === 'Exists' || operator === 'Does Not Exist') {
            return '';
        }

        // Handle specific field types
        if (field === 'Gender') {
            if (operator === 'Equals' || operator === 'Not Equals') {
                return `<select class="value-input">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>`;
            }
        } else if (field === 'Rendering Provider' || field === 'Sup. Provider' || 
                   field === 'Ordering Provider' || field === 'Ref. Provider') {
            if (operator === 'Equals' || operator === 'Not Equals') {
                return `<select class="value-input">
                    <option value="">Select ${field}</option>
                    <option value="Provider1">Provider 1</option>
                    <option value="Provider2">Provider 2</option>
                    <option value="Provider3">Provider 3</option>
                </select>`;
            }
        } else if (field === 'Diagnosis/ICD-10 Code') {
            if (operator === 'Equals' || operator === 'Not Equals' || operator === 'Starts With' || operator === 'Ends With') {
                return `<input type="text" class="value-input" placeholder="Enter ICD-10 Code">
                       <div class="input-help">Format: A00.0</div>`;
            } else if (operator === 'In List' || operator === 'Not In List') {
                return `<div class="list-input-container">
                    <input type="text" class="value-input list-input" placeholder="Enter ICD-10 codes separated by commas">
                    <div class="input-help">Enter multiple ICD-10 codes separated by commas (e.g., A00.0, B01.1)</div>
                </div>`;
            }
        } else if (field === 'CPT/Procedure Code') {
            if (operator === 'Equals' || operator === 'Not Equals' || operator === 'Starts With' || operator === 'Ends With') {
                return `<input type="text" class="value-input" placeholder="Enter CPT Code">
                       <div class="input-help">Format: 99213</div>`;
            } else if (operator === 'In List' || operator === 'Not In List') {
                return `<div class="list-input-container">
                    <input type="text" class="value-input list-input" placeholder="Enter CPT codes separated by commas">
                    <div class="input-help">Enter multiple CPT codes separated by commas (e.g., 99213, 99214)</div>
                </div>`;
            }
        } else if (field === 'Modifier 1' || field === 'Modifier 2' || field === 'Modifier 3' || field === 'Modifier 4') {
            if (operator === 'Equals' || operator === 'Not Equals' || operator === 'Starts With') {
                return `<input type="text" class="value-input" placeholder="Enter Modifier">
                       <div class="input-help">Format: 25</div>`;
            } else if (operator === 'In List' || operator === 'Not In List') {
                return `<div class="list-input-container">
                    <input type="text" class="value-input list-input" placeholder="Enter modifiers separated by commas">
                    <div class="input-help">Enter multiple modifiers separated by commas (e.g., 25, 59)</div>
                </div>`;
            }
        } else if (field === 'POS' || field === 'Service Location') {
            if (operator === 'Equals' || operator === 'Not Equals') {
                if (field === 'POS') {
                    return `<select class="value-input" style="width: 100px;">
                        <option value="">Select POS</option>
                        <option value="11">Office</option>
                        <option value="21">Inpatient Hospital</option>
                        <option value="22">Outpatient Hospital</option>
                        <option value="23">Emergency Room</option>
                        <option value="24">Ambulatory Surgical Center</option>
                        <option value="31">Skilled Nursing Facility</option>
                        <option value="32">Nursing Facility</option>
                        <option value="33">Custodial Care Facility</option>
                        <option value="34">Hospice</option>
                        <option value="41">Ambulance - Land</option>
                        <option value="42">Ambulance - Air or Water</option>
                        <option value="49">Independent Clinic</option>
                        <option value="50">Federally Qualified Health Center</option>
                        <option value="51">Inpatient Psychiatric Facility</option>
                        <option value="52">Psychiatric Facility Partial Hospitalization</option>
                        <option value="53">Community Mental Health Center</option>
                        <option value="54">Intermediate Care Facility/Individuals with Intellectual Disabilities</option>
                        <option value="55">Residential Substance Abuse Treatment Facility</option>
                        <option value="56">Psychiatric Residential Treatment Center</option>
                        <option value="57">Non-residential Substance Abuse Treatment Facility</option>
                        <option value="60">Mass Immunization Center</option>
                        <option value="61">Comprehensive Inpatient Rehabilitation Facility</option>
                        <option value="62">Comprehensive Outpatient Rehabilitation Facility</option>
                        <option value="65">End-Stage Renal Disease Treatment Facility</option>
                        <option value="71">State or Local Public Health Clinic</option>
                        <option value="72">Rural Health Clinic</option>
                        <option value="81">Independent Laboratory</option>
                        <option value="99">Other Place of Service</option>
                    </select>`;
                } else {
                    return `<select class="value-input" style="width: 200px;" data-searchable="true">
                        <option value="">Select Service Location</option>
                        <optgroup label="Northeast">
                            <option value="New York, NY">New York, NY</option>
                            <option value="Boston, MA">Boston, MA</option>
                            <option value="Philadelphia, PA">Philadelphia, PA</option>
                            <option value="Washington, DC">Washington, DC</option>
                        </optgroup>
                        <optgroup label="South">
                            <option value="Houston, TX">Houston, TX</option>
                            <option value="Dallas, TX">Dallas, TX</option>
                            <option value="Atlanta, GA">Atlanta, GA</option>
                            <option value="Miami, FL">Miami, FL</option>
                            <option value="Charlotte, NC">Charlotte, NC</option>
                        </optgroup>
                        <optgroup label="Midwest">
                            <option value="Chicago, IL">Chicago, IL</option>
                            <option value="Detroit, MI">Detroit, MI</option>
                            <option value="Minneapolis, MN">Minneapolis, MN</option>
                            <option value="St. Louis, MO">St. Louis, MO</option>
                        </optgroup>
                        <optgroup label="West">
                            <option value="Los Angeles, CA">Los Angeles, CA</option>
                            <option value="San Francisco, CA">San Francisco, CA</option>
                            <option value="Seattle, WA">Seattle, WA</option>
                            <option value="Denver, CO">Denver, CO</option>
                            <option value="Phoenix, AZ">Phoenix, AZ</option>
                        </optgroup>
                    </select>`;
                }
            }
        } else if (field === 'Zip Code') {
            switch (operator) {
                case 'Equals':
                    return `<input type="text" class="value-input" placeholder="Enter ZIP (e.g., 12345 or 12345-1234)" pattern="\\d{5}(-\\d{4})?">
                           <div class="input-help">Format: 12345 or 12345-1234</div>`;
                case 'In List':
                    return `<div class="list-input-container">
                        <input type="text" class="value-input list-input" placeholder="Enter ZIPs separated by commas">
                        <div class="input-help">Enter multiple ZIPs separated by commas (e.g., 12345, 12345-1234)</div>
                    </div>`;
            }
        } else if (field === 'Phone Number' || field === 'Work Phone Number' || field === 'Mobile Number') {
            if (operator === 'Equals') {
                return `<input type="text" class="value-input" placeholder="Enter phone number (e.g., 555-555-5555)" pattern="\\d{3}-\\d{3}-\\d{4}">
                       <div class="input-help">Format: 555-555-5555</div>`;
            }
        } else if (field === 'Email') {
            if (operator === 'Equals' || operator === 'Contains') {
                return `<input type="text" class="value-input" placeholder="Enter email address">
                       <div class="input-help">Example: user@example.com</div>`;
            }
        } else if (field === 'Date of Birth' || field === 'DOS From' || field === 'DOS To') {
            switch (operator) {
                case 'Equals':
                case 'Before':
                case 'After':
                    return `<input type="date" class="value-input">`;
                case 'Between':
                    return `<div class="between-inputs">
                        <input type="date" class="value-between-min" placeholder="From">
                        <input type="date" class="value-between-max" placeholder="To">
                    </div>`;
            }
        } else if (field === 'SSN') {
            if (operator === 'Equals') {
                return `<input type="text" class="value-input" placeholder="Enter SSN (e.g., 123-45-6789)" pattern="\\d{3}-\\d{2}-\\d{4}">
                       <div class="input-help">Format: 123-45-6789</div>`;
            }
        } else if (field === 'Marital Status') {
            switch (operator) {
                case 'Equals':
                    return `<select class="value-input">
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Separated">Separated</option>
                    </select>`;
                case 'In List':
                    return `<div class="list-input-container">
                        <input type="text" class="value-input list-input" placeholder="Enter statuses separated by commas">
                        <div class="input-help">Example: Single, Married, Divorced</div>
                    </div>`;
            }
        } else if (field === 'Total Amount' || field === 'Charge Amount') {
            switch (operator) {
                case 'Equals':
                case 'Greater Than':
                case 'Less Than':
                    return `<input type="number" step="0.01" min="0" class="value-input" placeholder="Enter amount">
                           <div class="input-help">Enter numeric value (e.g., 100.00)</div>`;
                case 'Between':
                    return `<div class="between-inputs">
                        <input type="number" step="0.01" min="0" class="value-between-min" placeholder="From">
                        <input type="number" step="0.01" min="0" class="value-between-max" placeholder="To">
                    </div>`;
            }
        } else if (operator === 'In List' || operator === 'Not In List') {
            return `<div class="list-input-container">
                <input type="text" class="value-input list-input" placeholder="Enter values separated by commas">
                <div class="input-help">Enter multiple values separated by commas</div>
            </div>`;
        } else if (operator === 'Between') {
            return `<div class="between-inputs">
                <input type="text" class="value-between-min" placeholder="From">
                <input type="text" class="value-between-max" placeholder="To">
            </div>`;
        }
        
        return '<input type="text" class="value-input" placeholder="Value">';
    }

    // Helper function to validate ZIP code format
    function isValidZipFormat(zip) {
        if (!zip) return false;
        
        // Format: 12345 or 12345-1234
        const zipRegex = /^\d{5}(-\d{4})?$/;
        return zipRegex.test(zip);
    }

    // Helper function to evaluate ZIP code conditions
    function evaluateZipCondition(operator, value, zipCode) {
        switch (operator) {
            case 'Is Empty':
                return !zipCode || zipCode.trim() === '';
            case 'Is Invalid Format':
                return !isValidZipFormat(zipCode);
            case 'Has Valid Format':
                return isValidZipFormat(zipCode);
            case 'Equals':
                return zipCode === value;
            case 'In List':
                const zipList = value.split(',').map(z => z.trim());
                return zipList.includes(zipCode);
            default:
                return false;
        }
    }

    // Helper function to validate input
    function isValidInput(field, operator, value) {
        if (operator === 'Is Empty' || operator === 'Is Not Empty' || 
            operator === 'Is Valid Format' || operator === 'Is Invalid Format') {
            return true;
        }
        
        if (field === 'Phone Number' || field === 'Work Phone Number' || field === 'Mobile Number') {
            if (operator === 'Equals') {
                return /^\d{3}-\d{3}-\d{4}$/.test(value);
            }
        } else if (field === 'Email') {
            if (operator === 'Equals' || operator === 'Contains') {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        } else if (field === 'SSN') {
            if (operator === 'Equals') {
                return /^\d{3}-\d{2}-\d{4}$/.test(value);
            }
        } else if (field === 'Date of Birth') {
            if (operator === 'Between') {
                return value.min && value.max && new Date(value.min) <= new Date(value.max);
            }
            return value && !isNaN(new Date(value).getTime());
        } else if (field === 'DOS From' || field === 'DOS To') {
            if (operator === 'Between') {
                return value.min && value.max && new Date(value.min) <= new Date(value.max);
            }
            return value && !isNaN(new Date(value).getTime());
        } else if (field === 'Total Amount') {
            if (operator === 'Between') {
                return value.min !== '' && value.max !== '' && 
                       !isNaN(value.min) && !isNaN(value.max) && 
                       parseFloat(value.min) <= parseFloat(value.max);
            }
            return value !== '' && !isNaN(value) && parseFloat(value) >= 0;
        }
        
        return value && value.length > 0;
    }

    // Update addConditionRow to use correct operator and value input
    function addConditionRow($group) {
        const sectionOptions = Object.keys(sections).map(s => 
            `<option value="${s}">${s}</option>`
        ).join('');
        
        const firstSection = Object.keys(sections)[0];
        const firstField = Object.keys(sections[firstSection])[0];
        const firstOperators = sections[firstSection][firstField];
        
        const fieldOptions = Object.keys(sections[firstSection]).map(f => 
            `<option value="${f}">${f}</option>`
        ).join('');
        
        const operatorOptions = firstOperators.map(op => 
            `<option value="${op}">${op}</option>`
        ).join('');
        
        const valueInput = getValueInput(firstField, firstOperators[0]);

        var val = $group.find('.conditions-list').find('.condition-row').last().find('.section-select').val();
        console.log(val);
        
        const row = `<div class="condition-row" draggable="true">
            <div class="drag-handle">⋮⋮</div>
            <select class="section-select">
                <option value="">Select Section</option>
                ${sectionOptions}
            </select>
            <select class="field-select">
                <option value="">Select Field</option>
                ${fieldOptions}
            </select>
            <select class="operator-select">
                <option value="">Select Operator</option>
                ${operatorOptions}
            </select>
            <div class="value-input-container">
                ${valueInput}
            </div>
            <button type="button" class="remove-condition" title="Remove Condition">&times;</button>
        </div>`;        
        
        $group.find('.conditions-list').append(row);

        var selectSection = $group.find('.conditions-list').find('.condition-row').last().find('.section-select');
        selectSection.val(val);
        selectSection.trigger('change');
        
        updateRowLogicDropdowns($group);
    }

    function getConditionRowHtml() {
        return `
            <div class="condition-row" draggable="true">
                <div class="drag-handle">⋮⋮</div>
                <select class="field-select">
                    <option value="">Select Field</option>
                    ${getFieldOptionsHtml()}
                </select>
                <select class="operator-select">
                    <option value="">Select Operator</option>
                </select>
                <div class="value-input-container">
                    <input type="text" class="value-input" placeholder="Enter value">
                </div>
                <button type="button" class="remove-condition" title="Remove Condition">&times;</button>
            </div>`;
    }

    function getFieldOptionsHtml() {
        const sortedFields = Object.keys(operators).sort((a, b) => a.localeCompare(b));
        return sortedFields.map(f => `<option value="${f}">${f}</option>`).join('');
    }

    // Update operator/value input on field/operator change
    $(document).on('change', '.section-select', function() {
        const section = $(this).val();
        const $row = $(this).closest('.condition-row');
        const fields = getFieldsForSection(section);
        
        const $fieldSelect = $row.find('.field-select');
        $fieldSelect.empty().append('<option value="">Select Field</option>');
        
        Object.keys(fields).forEach(field => {
            $fieldSelect.append(`<option value="${field}">${field}</option>`);
        });
        
        // Reset operator and value
        $row.find('.operator-select').empty().append('<option value="">Select Operator</option>');
        $row.find('.value-input-container').empty();
    });

    $(document).on('change', '.field-select', function() {
        const $row = $(this).closest('.condition-row');
        const section = $row.find('.section-select').val();
        const field = $(this).val();
        const operators = getOperatorsForField(section, field);
        
        const $operatorSelect = $row.find('.operator-select');
        $operatorSelect.empty().append('<option value="">Select Operator</option>');
        
        operators.forEach(op => {
            $operatorSelect.append(`<option value="${op}">${op}</option>`);
        });
        
        // Reset value
        $row.find('.value-input-container').empty();
    });

    $(document).on('change', '.operator-select', function() {
        const $row = $(this).closest('.condition-row');
        const section = $row.find('.section-select').val();
        const field = $row.find('.field-select').val();
        const operator = $(this).val();
        
        const $valueContainer = $row.find('.value-input-container');
        $valueContainer.html(getValueInput(field, operator));
    });

    // Quick claim templates data
    const claimTemplates = {
        'standard-office-visit': {
            cptCode: '99213',
            icdCode: 'J02.9',
            charge: 125,
            description: 'Acute pharyngitis, unspecified',
            units: 1
        },
        'preventive-visit': {
            cptCode: '99395',
            icdCode: 'Z00.00',
            charge: 185,
            description: 'General adult medical examination without abnormal findings',
            units: 1
        },
        'consultation': {
            cptCode: '99243',
            icdCode: 'R07.9',
            charge: 225,
            description: 'Chest pain, unspecified',
            units: 1
        },
        'minor-procedure': {
            cptCode: '12001',
            icdCode: 'S01.81XA',
            charge: 350,
            description: 'Laceration without foreign body',
            units: 1
        },
        'lab-work': {
            cptCode: '80053',
            icdCode: 'R79.89',
            charge: 95,
            description: 'Comprehensive metabolic panel',
            units: 1
        }
    };

    // Quick claim template handling
    $('.quick-claim').click(function() {
        const template = $(this).data('template');
        insertQuickRule(template);
    });

    // Define sections and their fields
    const sections = {
        'Patient Demographics': {
            'Address 1': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Address 2': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'City': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Date of Birth': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
            'Email': ['Contains', 'Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
            'First Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Last Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Marital Status': ['Equals', 'In List', 'Is Empty', 'Is Not Empty'],
            'Middle Name': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Mobile Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
            'Gender': ['Equals', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'Zip Code': ['Equals', 'Has Valid Format', 'In List', 'Is Empty', 'Is Invalid Format', 'Not In List'],
            'Phone Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
            'SSN': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format'],
            'State': ['Contains', 'Ends With', 'Equals', 'Is Empty', 'Is Not Empty', 'Starts With'],
            'Work Phone Number': ['Equals', 'Is Empty', 'Is Invalid Format', 'Is Not Empty', 'Is Valid Format']
        },
        'Billing Provider': {
            'Rendering Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'Sup. Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'Ordering Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'Ref. Provider': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'Service Location': ['Does Not Exist', 'Equals', 'Exists', 'Is Empty', 'Is Not Empty', 'Not Equals'],
            'POS': ['Equals', 'Is Empty', 'Is Not Empty', 'Not Equals']
        },
        'Diagnosis/ICD-10 Codes': {
            'Diagnosis/ICD-10 Code': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With']
        },
        'Charges': {
            'CPT/Procedure Code': ['Does Not Exist', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List'],
            'Charge Amount': ['Between', 'Equals', 'Greater Than', 'Less Than'],
            'DOS From': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
            'DOS To': ['After', 'Before', 'Between', 'Equals', 'Is Empty', 'Is Not Empty'],
            'Modifier 1': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
            'Modifier 2': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
            'Modifier 3': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
            'Modifier 4': ['Does Not Exist', 'Ends With', 'Equals', 'Exists', 'In List', 'Not Equals', 'Not In List', 'Starts With'],
            'Total Amount': ['Between', 'Equals', 'Greater Than', 'Is Empty', 'Is Not Empty', 'Less Than'],
            'Units': ['Between', 'Equals', 'Greater Than', 'Less Than'],
            'POS': ['Equals', 'Is Empty', 'Is Not Empty', 'Not Equals']
        }
    };

    // Helper functions for sections
    function getFieldsForSection(section) {
        return sections[section] || {};
    }

    function getOperatorsForField(section, field) {
        return sections[section]?.[field] || [];
    }

    // Update row logic dropdowns
    function updateRowLogicDropdowns($group) {
        const $rows = $group.find('.condition-row');
        
        // Store existing logic values
        const logicValues = $rows.map(function() {
            const $logic = $(this).find('.row-logic');
            return $logic.length ? $logic.val() : 'AND';
        }).get();
        
        // Remove all row logic dropdowns first
        $rows.find('.row-logic').remove();
        
        // Add logic dropdown to all rows except the last one
        $rows.each(function(index) {
            if (index < $rows.length - 1) {
                const $row = $(this);
                const $lastChild = $row.children().last();
                const logicHtml = `<select class="row-logic">
                    <option value="AND" ${logicValues[index] === 'AND' ? 'selected' : ''}>AND</option>
                    <option value="OR" ${logicValues[index] === 'OR' ? 'selected' : ''}>OR</option>
                </select>`;
                
                // Insert before the remove button
                $(logicHtml).insertBefore($lastChild);
            }
        });
    }

    // Check group conditions and show message if needed
    function checkGroupConditions($group) {
        const $conditions = $group.find('.condition-row');
        
        if ($conditions.length === 0) {
            return false;
        }
        
        let isValid = true;
        $conditions.each(function() {
            const $row = $(this);
            const field = $row.find('.field-select').val();
            const operator = $row.find('.operator-select').val();
            const value = $row.find('.value-input').val();
            
            if (!field || !operator || (!value && value !== '0')) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    // Add event listeners for validation
    $('#condition-groups').on('change', '.field-select, .operator-select, .value-input', function() {
        checkGroupConditions($(this).closest('.condition-group'));
    });

    // Validate entire group and show messages
    function validateGroup($group) {
        const $rows = $group.find('.condition-row');
        const messages = [];
        
        if ($rows.length === 0) {
            messages.push('Group must have at least one condition');
        }
        
        $rows.each(function(index) {
            const error = validateConditionRow($(this));
            if (error) {
                messages.push(`Condition ${index + 1}: ${error}`);
            }
        });
        
        return messages.length === 0;
    }

    // Validate all groups
    function validateAllGroups() {
        let isValid = true;
        $('.condition-group').each(function() {
            if (!validateGroup($(this))) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Add event listener for group logic dropdown changes
    $('#condition-groups').on('change', '.group-logic', function() {
        updateRulePreview();
    });

    // Add validation check to form submission
    $('#save, #save-test').click(function(e) {
        e.preventDefault();
        let isValid = true;
        
        $('.condition-group').each(function() {
            if (!checkGroupConditions($(this))) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Reset all validation styling
        $('.list-input').removeClass('invalid');
        
        let valid = true;
        
        // Validate list inputs
        $('#condition-groups .condition-row').each(function() {
            const operator = $(this).find('.operator-select').val();
            if (operator === 'In List' || operator === 'Not In List') {
                const value = $(this).find('.value-input').val().trim();
                if (!value) {
                    $(this).find('.value-input').addClass('invalid');
                    valid = false;
                    alert('Please enter values for all In List / Not In List conditions');
                }
            }
        });

        // At least one condition
        if ($('#condition-groups .condition-row').length === 0) {
            valid = false;
            alert('At least one condition is required.');
        }
        
        // At least one action
        if ($('#actions-list .action-row').length === 0) {
            valid = false;
            alert('At least one action is required.');
        }
        
        return valid;
    });

    $('#save').on('click', function() {
        if (!validateRule()) return;
        const ruleObj = getRuleObject();
        console.log('Rule saved:', ruleObj);
        alert('Rule saved! Check the console for JSON output.');
    });
    $('#save-test').on('click', function() {
        if (!validateRule()) return;
        const ruleObj = getRuleObject();
        console.log('Rule saved & tested:', ruleObj);
        alert('Rule saved & tested! Check the console for JSON output.');
    });
    $('#cancel').on('click', function() {
        console.log('Cancel clicked');
    });

    // --------- Quick Rule Template Logic ---------
    function insertQuickRule(template) {
        $('#condition-groups').empty();
        addConditionGroup();
        const $group = $('#condition-groups .condition-group').last();
        $group.find('.condition-row').remove();
        addConditionRow($group);
        const $row = $group.find('.condition-row').last();

        // Set up template configurations
        const templateConfig = {
            'atleast-one-cpt': {
                section: 'Charges',
                field: 'CPT/Procedure Code',
                operator: 'Exists'
            },
            'atleast-one-icd': {
                section: 'Charges',
                field: 'Diagnosis/ICD-10 Code',
                operator: 'Exists'
            },
            'multiple-cpt': {
                section: 'Charges',
                field: 'CPT/Procedure Code',
                operator: 'In List'
            },
            'multiple-icd': {
                section: 'Charges',
                field: 'Diagnosis/ICD-10 Code',
                operator: 'In List'
            },
            'date-range': {
                section: 'Charges',
                field: 'DOS From',
                operator: 'Between'
            },
            'amount-range': {
                section: 'Charges',
                field: 'Total Amount',
                operator: 'Between'
            },
            'units-range': {
                section: 'Charges',
                field: 'Units',
                operator: 'Between'
            },
            'missing-modifier': {
                section: 'Charges',
                field: 'Modifier 1',
                operator: 'Is Empty'
            },
            'invalid-zip': {
                section: 'Patient Demographics',
                field: 'Zip Code',
                operator: 'Is Invalid Format'
            },
            'missing-insurance': {
                section: 'Patient Insurance',
                field: 'Insurance Name',
                operator: 'Is Empty'
            }
        };

        const config = templateConfig[template];
        if (config) {
            $row.find('.section-select').val(config.section).trigger('change');
            setTimeout(() => {
                $row.find('.field-select').val(config.field).trigger('change');
                setTimeout(() => {
                    $row.find('.operator-select').val(config.operator).trigger('change');
                    updateRulePreview();
                }, 100);
            }, 100);
        }
    }

    // Bind Quick Rule Template buttons
    $('.quick-rule-templates').on('click', '.quick-rule', function() {
        const template = $(this).data('template');
        insertQuickRule(template);
    });

    // Add drag and drop functionality
    function initDragAndDrop() {
        let draggedItem = null;
        let dropTarget = null;
        
        $(document).on('dragstart', '.condition-row', function(e) {
            draggedItem = this;
            $(this).addClass('dragging');
            e.originalEvent.dataTransfer.effectAllowed = 'move';
        });

        $(document).on('dragend', '.condition-row', function() {
            $(this).removeClass('dragging');
            $('.drop-target-top').removeClass('drop-target-top');
            $('.drop-target-bottom').removeClass('drop-target-bottom');
            draggedItem = null;
        });

        $(document).on('dragover', '.condition-row', function(e) {
            e.preventDefault();
            if (this === draggedItem) return;
            
            const rect = this.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const mouseY = e.clientY;
            
            $(this).removeClass('drop-target-top drop-target-bottom');
            if (mouseY < midY) {
                $(this).addClass('drop-target-top');
                dropTarget = { element: this, position: 'before' };
            } else {
                $(this).addClass('drop-target-bottom');
                dropTarget = { element: this, position: 'after' };
            }
        });

        $(document).on('dragenter', '.conditions-list', function(e) {
            e.preventDefault();
            if ($(this).children('.condition-row').length === 0) {
                $(this).addClass('empty-drop-target');
            }
        });

        $(document).on('dragleave', '.conditions-list', function() {
            $(this).removeClass('empty-drop-target');
        });

        $(document).on('dragover', '.conditions-list', function(e) {
            e.preventDefault();
        });

        $(document).on('drop', '.condition-row, .conditions-list', function(e) {
            e.preventDefault();
            
            if (draggedItem) {
                const $draggedItem = $(draggedItem);
                const $dropArea = $(this);
                const $sourceGroup = $draggedItem.closest('.condition-group');
                let $targetGroup;
                
                if ($dropArea.hasClass('conditions-list')) {
                    // Dropping into an empty conditions list
                    $dropArea.append($draggedItem);
                    $targetGroup = $dropArea.closest('.condition-group');
                } else if (dropTarget) {
                    // Dropping relative to another condition row
                    if (dropTarget.position === 'before') {
                        $draggedItem.insertBefore($(dropTarget.element));
                    } else {
                        $draggedItem.insertAfter($(dropTarget.element));
                    }
                    $targetGroup = $(dropTarget.element).closest('.condition-group');
                }
                
                // Update logic dropdowns for both source and target groups
                if ($sourceGroup.length) updateRowLogicDropdowns($sourceGroup);
                if ($targetGroup && $targetGroup.length) updateRowLogicDropdowns($targetGroup);
                
                // Clean up
                $('.dragging').removeClass('dragging');
                $('.drop-target-top').removeClass('drop-target-top');
                $('.drop-target-bottom').removeClass('drop-target-bottom');
                $('.empty-drop-target').removeClass('empty-drop-target');
                
                // Update rule preview
                updateRulePreview();
            }
        });
    }

    // Initialize with one condition group and action
    addConditionGroup();
    addActionRow();
    initDragAndDrop();

    // ------- Condition Groups --------
    function addConditionGroup() {
        const groupIdx = $('.condition-group').length;
        const groupHtml = `
            <div class="group-header-top-outer">
                <button type="button" class="remove-group" title="Remove Group">&times;</button>
            </div>
            <div class="condition-group" data-group="${groupIdx}">
                <div class="group-header-top">
                </div>
                <div class="conditions-list">
                    <!-- Condition rows go here -->
                </div>
                <button type="button" class="add-condition add-button">+ Add Condition</button>
                <div class="group-footer field-group" style="display:none;">
                    <label>Group Logic:</label>
                    <select class="group-logic" style="width:140px">
                        <option value="AND">AND</option>
                        <option value="OR">OR</option>
                    </select>
                </div>
            </div>`;
        $('#condition-groups').append(groupHtml);
        
        // Add first condition row to the new group
        const $newGroup = $(`.condition-group[data-group="${groupIdx}"]`);
        addConditionRow($newGroup);
        updateGroupLogicVisibility();
    }

    // Show group logic only if there is a next group
    function updateGroupLogicVisibility() {
        const $groups = $('#condition-groups .condition-group');
        $groups.each(function(i) {
            if (i < $groups.length - 1) {
                $(this).find('.group-footer').show();
            } else {
                $(this).find('.group-footer').hide();
            }
        });
    }

    // ------- Action Rows --------
    function addActionRow() {
        const actionOptions = actionTypes.map(a => `<option value="${a}">${a}</option>`).join('');
        const row = `<div class="action-row">
            <select class="action-select">${actionOptions}</select>
            <input type="text" class="action-param" placeholder="Parameter (e.g. message)">
            <button type="button" class="remove-action" title="Remove">&times;</button>
        </div>`;
        $('#actions-list').append(row);
    }

    // Add action row
    $('#add-action').on('click', function() {
        addActionRow();
        updateRulePreview();
    });

    // Remove action row
    $('#actions-list').on('click', '.remove-action', function() {
        $(this).closest('.action-row').remove();
        updateRulePreview();
    });

    // Add condition group
    $('#add-condition-group').on('click', function() {
        addConditionGroup();
        updateGroupLogicVisibility();
        updateRulePreview();
    });

    // Remove condition group
    $('#condition-groups').on('click', '.remove-group', function() {
        const $header = $(this).closest('.group-header-top-outer');
        const $group = $header.next('.condition-group');
        $group.remove();
        $header.remove();
        updateGroupLogicVisibility();
        updateRulePreview();
    });

    // Add condition row
    $('#condition-groups').on('click', '.add-condition', function() {
        const $group = $(this).closest('.condition-group');
        addConditionRow($group);
        updateRowLogicDropdowns($group);
        updateRulePreview();
    });

    // Remove condition row
    $('#condition-groups').on('click', '.remove-condition', function() {
        const $row = $(this).closest('.condition-row');
        const $group = $row.closest('.condition-group');
        $row.remove();
        updateRowLogicDropdowns($group);
        updateRulePreview();
    });

    // Update preview on any change
    $('#rule-form').on('change input', function() {
        updateRulePreview();
    });

    // ------- Rule Preview --------
    function updateRulePreview() {
        const ruleName = $('input[name="ruleName"]').val();
        const desc = $('textarea[name="description"]').val();
        const status = $('input[name="status"]').is(':checked') ? 'Active' : 'Inactive';
        let preview = `Rule Name: ${ruleName || '[Not set]'}\nDescription: ${desc || '[Not set]'}\nStatus: ${status}\n\nIf:`;
        
        // Condition groups
        const groups = [];
        $('#condition-groups .condition-group').each(function(i, groupEl) {
            const groupLogic = $(groupEl).find('.group-logic').val();
            const conds = [];
            $(groupEl).find('.condition-row').each(function(j, rowEl) {
                const field = $(rowEl).find('.field-select').val();
                const op = $(rowEl).find('.operator-select').val();
                var val = $(rowEl).find('.value-input').val();
                const rowLogic = $(rowEl).find('.row-logic').val();

                if (val === undefined) {
                    val = '';
                } else {
                    val = `"${val}"`;
                }

                conds.push(`${field} ${op} ${val}` + (rowLogic ? ` [${rowLogic}]` : ''));
            });

            if (conds.length > 0) {
                groups.push('  (' + conds.join(' ') + ')');
                groups.push(groupLogic); // Store the group logic immediately after the conditions
            }
        });

        if (groups.length > 0) {
            let finalGroupsString = '';
            for (let i = 0; i < groups.length; i += 2) {
                finalGroupsString += groups[i]; // Add the condition group

                // Add the group logic if it's not the last group
                if (i < groups.length - 2 && groups[i + 1]) {
                    finalGroupsString += ` ${groups[i + 1]} `;
                } else if (i < groups.length - 2) {
                    finalGroupsString += ' AND ';
                }
            }
            preview += finalGroupsString;
        } else {
            preview += '[No conditions]';
        }

        // Actions
        const actions = [];
        $('#actions-list .action-row').each(function(i, rowEl) {
            const act = $(rowEl).find('.action-select').val();
            const param = $(rowEl).find('.action-param').val();
            actions.push(`${act}${param ? ': ' + param : ''}`);
        });
        preview += `\n\nThen:\n${actions.length > 0 ? actions.join(' | ') : '[No actions]'}`;
        
        $('#rule-preview-text').text(preview);
    }
});
