document.addEventListener('DOMContentLoaded', () => {
    // Input Elements
    const paymentIdInput = document.getElementById('payment-id');
    const paymentTimeInput = document.getElementById('payment-time');
    const paymentMethodInput = document.getElementById('payment-method');
    const amountSentInput = document.getElementById('amount-sent');
    const senderNameInput = document.getElementById('sender-name');

    // Output Elements (Receipt)
    const outPaymentId = document.getElementById('out-payment-id');
    const outPaymentTime = document.getElementById('out-payment-time');
    const outPaymentMethod = document.getElementById('out-payment-method');
    const outAmountSent = document.getElementById('out-amount-sent');
    const outSenderName = document.getElementById('out-sender-name');

    // Buttons
    const generateBtn = document.getElementById('generate-btn');
    const printBtn = document.getElementById('print-btn');

    // Current ID State
    let currentIdNum = 1001;

    // Initialize formatting options for dates
    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    // Initialize formatting options for currency
    const currencyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    // Generate a new ID
    function generateNewId() {
        const prefix = "TXN-";
        // Simple random element + incrementing number
        const randomHex = Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
        const id = `${prefix}${currentIdNum}-${randomHex}`;
        currentIdNum++;
        
        paymentIdInput.value = id;
        outPaymentId.textContent = id;
    }

    // Initialize Current Datetime
    function initDateTime() {
        const now = new Date();
        // Format for input: YYYY-MM-DDThh:mm
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        
        const datetimeLocal = `${year}-${month}-${day}T${hours}:${minutes}`;
        paymentTimeInput.value = datetimeLocal;
        
        updateReceiptTime();
    }

    function updateReceiptTime() {
        if (paymentTimeInput.value) {
            const dateObj = new Date(paymentTimeInput.value);
            outPaymentTime.textContent = dateFormatter.format(dateObj);
        } else {
            outPaymentTime.textContent = '-';
        }
    }

    function updateReceipt() {
        // Payment Method
        outPaymentMethod.textContent = paymentMethodInput.value || '-';
        
        // Sender Name
        outSenderName.textContent = senderNameInput.value || '-';
        
        // Amount
        if (amountSentInput.value) {
            const amount = parseFloat(amountSentInput.value);
            outAmountSent.textContent = currencyFormatter.format(amount);
        } else {
            outAmountSent.textContent = '$0.00';
        }
    }

    // Event Listeners for Live Update
    paymentTimeInput.addEventListener('input', updateReceiptTime);
    paymentMethodInput.addEventListener('input', updateReceipt);
    amountSentInput.addEventListener('input', updateReceipt);
    senderNameInput.addEventListener('input', updateReceipt);

    // Generate New Receipt Button
    generateBtn.addEventListener('click', () => {
        // Generate new ID
        generateNewId();
        
        // Reset Time to current
        initDateTime();
        
        // Clear other fields
        amountSentInput.value = '';
        senderNameInput.value = '';
        paymentMethodInput.selectedIndex = 0; // Reset to first option
        
        updateReceipt();
        
        // Add a small animation effect
        const receipt = document.getElementById('receipt-container');
        receipt.style.transform = 'scale(0.95)';
        setTimeout(() => {
            receipt.style.transform = '';
        }, 150);
    });

    // Print Button
    printBtn.addEventListener('click', () => {
        window.print();
    });

    // Initial Setup
    generateNewId();
    initDateTime();
    updateReceipt();
});
