// Dados de refeições veganas de exemplo com imagens do Pexels
const meals = [
    { id: 1, name: "Vegan Burger", price: 8.99, image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg" },
    { id: 2, name: "Quinoa Salad", price: 7.49, image: "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg" },
    { id: 3, name: "Vegan Tacos", price: 9.99, image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg" },
    { id: 4, name: "Chickpea Curry", price: 10.49, image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
    { id: 5, name: "Vegan Pizza", price: 11.99, image: "https://images.pexels.com/photos/1640776/pexels-photo-1640776.jpeg" } //
];

const cart = [];

// Função para exibir produtos
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpar produtos existentes

    meals.forEach(meal => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <span>${meal.name} - R$${meal.price.toFixed(2)}</span>
            <img src="${meal.image}" alt="${meal.name}">
            <button onclick="addToCart(${meal.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productDiv);
    });
}

// Função para adicionar produto ao carrinho
function addToCart(mealId) {
    const meal = meals.find(m => m.id === mealId);
    const existingMeal = cart.find(m => m.id === mealId);
    if (existingMeal) {
        existingMeal.quantity += 1; // Aumentar quantidade se já estiver no carrinho
    } else {
        cart.push({ ...meal, quantity: 1 }); // Adicionar nova refeição com quantidade
    }
    updateCart();
    showSuccessMessage(meal.name); // Mostrar mensagem de sucesso
}

// Função para mostrar mensagem de sucesso
function showSuccessMessage(productName) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = `${productName} adicionado com sucesso!`;
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.style.display = 'none'; // Ocultar após 3 segundos
    }, 3000);
}

// Função para atualizar a exibição do carrinho
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = ''; // Limpar itens existentes no carrinho

    let total = 0;
    cart.forEach(meal => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${meal.name} - R$${meal.price.toFixed(2)} 
            <img src="${meal.image}" alt="${meal.name}" width="50">
            <input type="number" value="${meal.quantity}" min="1" onchange="updateQuantity(${meal.id}, this.value)">
            <button onclick="removeFromCart(${meal.id})">Remover</button>
        `;
        cartItems.appendChild(li);
        total += meal.price * meal.quantity; // Calcular total com base na quantidade
    });

    totalPrice.textContent = total.toFixed(2);
}

// Função para atualizar quantidade
function updateQuantity(mealId, quantity) {
    const meal = cart.find(m => m.id === mealId);
    if (meal) {
        meal.quantity = parseInt(quantity); // Atualizar quantidade
    }
    updateCart(); // Atualizar exibição do carrinho
}

// Função para remover produto do carrinho
function removeFromCart(mealId) {
    const index = cart.findIndex(m => m.id === mealId);
    if (index !== -1) {
        cart.splice(index, 1); // Remover item do carrinho
    }
    updateCart(); // Atualizar exibição do carrinho
}

// Funções do modal
function openModal() {
    document.getElementById('paymentModal').style.display = "block";
}

function closeModal() {
    document.getElementById('paymentModal').style.display = "none";
}

// Lidar com o envio do formulário de pagamento
document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedir o envio normal do formulário
    alert("Pagamento bem-sucedido! Obrigado pela sua compra.");
    closeModal();
    cart.length = 0; // Limpar o carrinho
    updateCart(); // Atualizar exibição do carrinho
    showHome();
});

// Funções de navegação
function showHome() {
    document.getElementById('productList').style.display = 'block';
    document.getElementById('cart').style.display = 'none';
    displayProducts(); // Atualizar lista de produtos
}

function showCart() {
    document.getElementById('productList').style.display = 'none';
    document.getElementById('cart').style.display = 'block';
}

// Chamada inicial para exibir produtos
showHome();