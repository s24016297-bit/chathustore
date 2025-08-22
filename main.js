 // Cart functionality
        let cart = [];
        const cartIcon = document.getElementById('cartIcon');
        const cartModal = document.getElementById('cartModal');
        const closeCart = document.getElementById('closeCart');
        const cartItems = document.getElementById('cartItems');
        const emptyCart = document.getElementById('emptyCart');
        const cartTotal = document.getElementById('cartTotal');
        const cartCount = document.getElementById('cartCount');
        const checkoutBtn = document.getElementById('checkoutBtn');
        
        // Add to cart buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        
        // Event listeners
        cartIcon.addEventListener('click', openCart);
        closeCart.addEventListener('click', closeCartModal);
        checkoutBtn.addEventListener('click', checkout);
        
        // Add event listeners to all "Add to Cart" buttons
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
        
        // Add to cart function
        function addToCart(e) {
            const button = e.target;
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            const image = button.getAttribute('data-image');
            
            // Check if product already in cart
            const existingItem = cart.find(item => item.id === id);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show confirmation
            button.textContent = 'Added to Cart!';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
            }, 1500);
        }
        
        // Update cart UI
        function updateCart() {
            // Update cart count
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Clear cart items
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.appendChild(emptyCart);
                cartTotal.textContent = '0.00';
                return;
            }
            
            emptyCart.style.display = 'none';
            
            // Add items to cart
            let total = 0;
            
            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" width="50">
                    <div class="item-details">
                        <div class="item-title">${item.name}</div>
                        <div class="item-price">$${item.price.toFixed(2)}</div>
                    </div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <div class="remove-item" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
            
            // Add event listeners to quantity buttons
            const minusButtons = document.querySelectorAll('.minus');
            const plusButtons = document.querySelectorAll('.plus');
            const removeButtons = document.querySelectorAll('.remove-item');
            
            minusButtons.forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });
            
            plusButtons.forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });
            
            removeButtons.forEach(button => {
                button.addEventListener('click', removeItem);
            });
            
            // Update total
            cartTotal.textContent = total.toFixed(2);
        }
        
        // Quantity functions
        function decreaseQuantity(e) {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            if (item.quantity > 1) {
                item.quantity--;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            
            updateCart();
        }
        
        function increaseQuantity(e) {
            const id = e.target.getAttribute('data-id');
            const item = cart.find(item => item.id === id);
            
            item.quantity++;
            updateCart();
        }
        
        function removeItem(e) {
            const id = e.target.closest('.remove-item').getAttribute('data-id');
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
        
        // Cart modal functions
        function openCart() {
            cartModal.style.display = 'flex';
        }
        
        function closeCartModal() {
            cartModal.style.display = 'none';
        }
        
        // Checkout function
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            // In a real implementation, this would redirect to a payment gateway
            alert(`Thank you for your order! Total: $${cartTotal.textContent}\n\nIn a real implementation, you would now be redirected to a secure payment gateway.`);
            
            // Clear cart
            cart = [];
            updateCart();
            closeCartModal();
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                closeCartModal();
            }
        });