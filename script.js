document.addEventListener('DOMContentLoaded', () => {
    const procedureTableBody = document.querySelector('#procedureTable tbody');
    const addProcedureBtn = document.getElementById('addProcedureBtn');
    const printBtn = document.getElementById('printBtn');
    
    // Set Date
    const dateElement = document.getElementById('currentDate');
    if(dateElement) {
        const now = new Date();
        dateElement.textContent = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Set Copyright Year
        const yearElement = document.getElementById('year');
        if(yearElement) {
            yearElement.textContent = now.getFullYear();
        }
    }

    // Add initial row
    addProcedureRow();

    // Event Listeners
    addProcedureBtn.addEventListener('click', addProcedureRow);
    
    // Delegate event for removing rows and input changes in the table
    procedureTableBody.addEventListener('click', (e) => {
        // Handle removal via icon click or button click
        const btn = e.target.closest('.remove-btn');
        if (btn) {
            btn.closest('tr').remove();
            calculateTotal();
        }
    });

    procedureTableBody.addEventListener('input', (e) => {
        if (e.target.type === 'number') {
            calculateTotal();
        }
    });

    // Listen for changes in setting inputs
    document.getElementById('taxRate').addEventListener('input', calculateTotal);
    document.getElementById('insuranceRate').addEventListener('input', calculateTotal);
    document.getElementById('discount').addEventListener('input', calculateTotal);

    printBtn.addEventListener('click', () => {
        window.print();
    });

    function addProcedureRow() {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>
                <input type="text" placeholder="e.g. 99213 - Office Visit" class="procedure-code">
            </td>
            <td class="text-right">
                <input type="number" placeholder="0.00" min="0" step="0.01" class="procedure-cost" style="text-align: right;">
            </td>
            <td class="no-print action-col">
                <button class="btn btn-icon-only remove-btn" title="Remove Item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </td>
        `;
        
        procedureTableBody.appendChild(row);
    }

    function calculateTotal() {
        let subtotal = 0;
        
        // Calculate Subtotal
        const costInputs = document.querySelectorAll('.procedure-cost');
        costInputs.forEach(input => {
            const val = parseFloat(input.value) || 0;
            subtotal += val;
        });

        // Get Adjustments
        const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
        const insuranceRate = parseFloat(document.getElementById('insuranceRate').value) || 0;
        const discountVal = parseFloat(document.getElementById('discount').value) || 0;

        // Calculate Tax
        const taxAmount = subtotal * (taxRate / 100);

        // Calculate Insurance Coverage
        // Logic: (Subtotal + Tax) * (InsuranceRate / 100)
        const totalBeforeInsurance = subtotal + taxAmount;
        const insuranceAmount = totalBeforeInsurance * (insuranceRate / 100);

        // Calculate Final Total
        // Logic: Subtotal + Tax - Insurance Coverage - Discounts
        const totalPayable = subtotal + taxAmount - insuranceAmount - discountVal;

        // Update UI
        updateDisplay('subtotalDisplay', subtotal);
        updateDisplay('taxDisplay', taxAmount);
        updateDisplay('insuranceDisplay', -insuranceAmount); // Display as negative
        updateDisplay('discountDisplay', -discountVal); // Display as negative
        updateDisplay('totalDisplay', totalPayable);
    }

    function updateDisplay(elementId, amount) {
        const el = document.getElementById(elementId);
        if(!el) return;
        
        const isNegative = amount < 0;
        const absAmount = Math.abs(amount);
        const formatted = '$' + absAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        
        el.textContent = isNegative ? '-' + formatted : formatted;
    }
});