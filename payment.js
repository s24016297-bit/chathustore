// Payment option selection
        const cardOption = document.getElementById('cardOption');
        const bankOption = document.getElementById('bankOption');
        const mobileOption = document.getElementById('mobileOption');
        
        const cardForm = document.getElementById('cardForm');
        const bankForm = document.getElementById('bankForm');
        const mobileForm = document.getElementById('mobileForm');
        
        const payButton = document.getElementById('payButton');
        
        // Set active payment option
        function setActiveOption(option, form) {
            // Remove active class from all options
            [cardOption, bankOption, mobileOption].forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Hide all forms
            [cardForm, bankForm, mobileForm].forEach(frm => {
                frm.style.display = 'none';
            });
            
            // Set active option and show corresponding form
            option.classList.add('active');
            form.style.display = 'block';
        }
        
        // Event listeners for payment options
        cardOption.addEventListener('click', () => {
            setActiveOption(cardOption, cardForm);
        });
        
        bankOption.addEventListener('click', () => {
            setActiveOption(bankOption, bankForm);
        });
        
        mobileOption.addEventListener('click', () => {
            setActiveOption(mobileOption, mobileForm);
        });
        
        // Bank option selection
        const bankOptions = document.querySelectorAll('.bank-option');
        bankOptions.forEach(option => {
            option.addEventListener('click', () => {
                bankOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
        
        // Format card number input
        const cardNumberInput = document.getElementById('cardNumber');
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 16) {
                value = value.slice(0, 16);
            }
            
            // Format with spaces every 4 digits
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            
            e.target.value = formattedValue;
        });
        
        // Format expiry date input
        const expiryInput = document.getElementById('expiryDate');
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 4) {
                value = value.slice(0, 4);
            }
            
            if (value.length > 2) {
                e.target.value = value.slice(0, 2) + '/' + value.slice(2);
            } else {
                e.target.value = value;
            }
        });
        
        // Pay button event
        payButton.addEventListener('click', function() {
            // Validate form based on active payment method
            let isValid = true;
            let errorMessage = '';
            
            if (cardOption.classList.contains('active')) {
                if (cardNumberInput.value.replace(/\s/g, '').length !== 16) {
                    isValid = false;
                    errorMessage = 'Please enter a valid 16-digit card number';
                } else if (!expiryInput.value.includes('/') || expiryInput.value.length !== 5) {
                    isValid = false;
                    errorMessage = 'Please enter a valid expiry date (MM/YY)';
                }
            }
            
            if (isValid) {
                // In a real implementation, this would process the payment
                alert('Payment processed successfully!\n\nThank you for your purchase. Your order will be delivered within 3-5 business days.');
                
                // Redirect to confirmation page
                window.location.href = "order-confirmation.html";
            } else {
                alert('Error: ' + errorMessage);
            }
        });