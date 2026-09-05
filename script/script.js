const buttons = document.querySelectorAll(".filter-btn");

const products = document.querySelectorAll("#produtos article");

// detector de clique
buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const category = button.dataset.category;

            // Remove o active de todos os botões
            buttons.forEach((button) => {
                button.classList.remove("active");
            });

            // Adiciona active no botão clicado
            button.classList.add("active");

            // filtrar produtos
            products.forEach((product) => {

                const productCategory = product.dataset.category;

                if (
                    category === "todos" ||
                    category === productCategory
                ) {
                    product.style.display = "block";
                } else {
                    product.style.display = "none";
                }

        });

    });

});


// adicionador de carinho
const cart = [];

const finishButton = document.querySelector("#finalizar-pedido");

const cartItems = document.querySelector("#itens-carrinho");
const cartTotal = document.querySelector("#total-carrinho");

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach((button) => {

    button.addEventListener("click", (event) => {

        event.preventDefault();

        const product = button.parentElement;

        const name = product.dataset.name;
        const price = Number(product.dataset.price);

        const existingItem = cart.find((item) => item.name === name);

        if (existingItem){

            existingItem.quantity++;
        } else{

            const item = {
                name: name,
                price: price,
                quantity: 1
            };

            cart.push(item);
       };

        renderCart();

        console.log(cart);
        console.log("Total:", calculateTotal());

    });

});

// calculando o valor total
function calculateTotal() {

    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    return total;
}

// para mostrar os pedidos selecionados no carrinho
function renderCart() {

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {

        const itemElement = document.createElement("div");

        itemElement.innerHTML = `
            <p>${item.name}</p>

            <p>
                R$ ${item.price.toFixed(2).replace(".", ",")}
            </p>

            <button class="decrease" data-index="${index}">
                -
            </button>

            <span>${item.quantity}</span>

            <button class="increase" data-index="${index}">
                +
            </button>

            <p>
                Subtotal:
                R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}
            </p>
        `;

        cartItems.appendChild(itemElement);

    });

    cartTotal.textContent =
        calculateTotal().toFixed(2).replace(".", ",");


    // Botão diminuir
    const decreaseButtons = document.querySelectorAll(".decrease");

    decreaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity--;

            if (cart[index].quantity === 0) {
                cart.splice(index, 1);
            }

            renderCart();

        });

    });


    // Botão aumentar
    const increaseButtons = document.querySelectorAll(".increase");

    increaseButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);

            cart[index].quantity++;

            renderCart();

        });

    });

}

// Para direcionar o pedido para whatsapp
finishButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Seu carrinho está vazio.");
        return;
    }

    let message = "Olá! Gostaria de fazer um pedido:%0A%0A";

    cart.forEach((item) => {

        const subtotal = item.price * item.quantity;

        message += `*${item.name}*%0A`;
        message += `Quantidade: ${item.quantity}%0A`;
        message += `Subtotal: R$ ${subtotal.toFixed(2).replace(".", ",")}%0A%0A`;

    });

    const total = calculateTotal();

    message += `*Total: R$ ${total.toFixed(2).replace(".", ",")}*`;

    const phone = "5571992921723";

    const whatsappURL =
        `https://wa.me/${phone}?text=${message}`;

    window.open(whatsappURL, "_blank");

});