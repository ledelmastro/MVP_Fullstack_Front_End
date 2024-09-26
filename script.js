document.addEventListener('DOMContentLoaded', () => {
    const productSelect = document.getElementById('product-select');
    const selectedProducts = document.getElementById('selected-products');

    // Lista de produtos definida no próprio código
    const products = [
        { id: 1, name: "Hamburguer Vegano", price: 18.99, image: "https://images.unsplash.com/photo-1664232802830-592394491fd2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 2, name: "Salada de Quinoa", price: 17.50, image: "https://plus.unsplash.com/premium_photo-1704989937441-68b6536e6cf4?q=80&w=1926&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 3, name: "Tacos Veganos", price: 9.99, image: "https://images.unsplash.com/photo-1703073185774-a38e4e68c205?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 4, name: "Snack de Grão de Bico", price: 10.50, image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 5, name: "Pizza Vegana", price: 11.99, image: "https://images.unsplash.com/photo-1695383734051-14c559dce24f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmVnYW4lMjBwaXp6YXxlbnwwfHwwfHx8MA%3D%3D" }
    ];

    // Objeto para armazenar a quantidade de cada produto selecionado
    const selectedProductsCount = {};

    // Função para selecionar produto
    function selectProduct(product) {
        // Verifica se o produto já foi selecionado
        if (selectedProductsCount[product.id]) {
            // Se sim, incrementa a quantidade
            selectedProductsCount[product.id]++;
            // Atualiza a quantidade no elemento HTML
            const productDiv = document.querySelector(`.selected-product[data-product-id="${product.id}"]`);
            const quantitySpan = productDiv.querySelector('.quantity');
            quantitySpan.textContent = selectedProductsCount[product.id];
            // Atualiza o preço total do produto
            updateProductTotalPrice(productDiv, product);
        } else {
            // Se não, adiciona o produto à lista de selecionados
            selectedProductsCount[product.id] = 1;

            const selectedProductDiv = document.createElement('div');
            selectedProductDiv.className = 'selected-product';
            selectedProductDiv.setAttribute('data-product-id', product.id);

            // Adicione o nome do produto
            const productName = document.createElement('h4');
            productName.textContent = product.name;
            selectedProductDiv.appendChild(productName);

            // Adicione o preço do produto
            const productPrice = document.createElement('p');
            productPrice.className = 'product-price'; // Adiciona uma classe para facilitar a atualização
            productPrice.textContent = `Preço: R$ ${product.price.toFixed(2)}`;
            selectedProductDiv.appendChild(productPrice);

            // Adicione a quantidade do produto
            const productQuantity = document.createElement('qtd-');
            productQuantity.className = 'quantity-container'; // Adicione uma classe para estilização, se necessário
            const decreaseButton = document.createElement('button');
            decreaseButton.textContent = '-';
            decreaseButton.addEventListener('click', () => {
                changeQuantity(product, -1, selectedProductDiv);
            });
            const quantitySpan = document.createElement('span');
            quantitySpan.className = 'quantity';
            quantitySpan.textContent = selectedProductsCount[product.id];
            const increaseButton = document.createElement('button');
            increaseButton.textContent = '+';
            increaseButton.addEventListener('click', () => {
                changeQuantity(product, 1, selectedProductDiv);
            });
            productQuantity.appendChild(decreaseButton);
            productQuantity.appendChild(quantitySpan);
            productQuantity.appendChild(increaseButton);
            selectedProductDiv.appendChild(productQuantity);


            // Adicione a imagem do produto
            const productImage = document.createElement('img');
            productImage.src = product.image;
            productImage.alt = product.name;
            selectedProductDiv.appendChild(productImage);

            // Adicione o botão para remover o produto
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => removeProduct(selectedProductDiv, product.id));
            selectedProductDiv.appendChild(removeButton);

            selectedProducts.appendChild(selectedProductDiv);
        }

        // Adiciona o produto selecionado (simulação de POST)
        fetch('https://127.0.0.1/5000/selected-products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product, "Produto adicionado com sucesso.")
        }).catch(error => console.error('Erro ao adicionar produto:', error));
    }

    // Função para alterar a quantidade do produto
    function changeQuantity(product, amount, productDiv) {
        // Atualiza a quantidade no objeto
        selectedProductsCount[product.id] += amount;

        // Remove o produto se a quantidade for zero
        if (selectedProductsCount[product.id] <= 0) {
            removeProduct(productDiv, product.id);
            return;
        }
        // Atualiza a quantidade no elemento HTML
        const quantitySpan = productDiv.querySelector('.quantity');
        quantitySpan.textContent = selectedProductsCount[product.id];

        // Atualiza o preço total do produto
        updateProductTotalPrice(productDiv, product);
    }

    // Função para atualizar o preço total do produto
    function updateProductTotalPrice(productDiv, product) {
        const productPriceElement = productDiv.querySelector('.product-price');
        const totalPrice = product.price * selectedProductsCount[product.id];
        productPriceElement.textContent = `Preço: R$ ${totalPrice.toFixed(2)}`;
    }

    // Função para remover produto
    function removeProduct(element, productId) {
        // Remove o produto da lista de selecionados
        delete selectedProductsCount[productId];
        // Remove o elemento HTML
        selectedProducts.removeChild(element);

        // Remove o produto selecionado (simulação de DELETE)
        fetch(`https://api.exemplo.com/selected-products/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error('Erro ao remover produto:', error));
    }

    // Adiciona evento de mudança na caixa de seleção
    productSelect.addEventListener('change', () => {
        const selectedProduct = products.find(product => product.id == productSelect.value);
        if (selectedProduct) {
            selectProduct(selectedProduct);
        }
    });
});
