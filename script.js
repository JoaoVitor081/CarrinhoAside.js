const egg = [
    {   name: "Ovo de pascoa kinder ovo", 
        price: 129.99, 
        img: "./download.jfif" 
    },
    {   name: "Ovo de pascoa kikat", 
        price: 44.99, 
        img: "./download.png" 
    },
    {   name: "Ovo de pascoa pistache", 
        price: 69.99, 
        img: "./images.jfif" 
    },
    {   name: "Ovo de pascoa ben 10", 
        price: 49.99, 
        img: "./download (1).jfif" 
    },
    
];

let cart = [];
const list = document.getElementById("list");
const cartAside = document.getElementById("cart");
const totalPrice = document.getElementById("total");
const aside = document.querySelector("aside");
const BtnFinish = document.getElementById("Finish");
const OpenandcloseCartButton = document.getElementById("OpenandcloseCart");

function updateTotal() {
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    totalPrice.textContent = total.toFixed(2);
}

function renderCart() {
    cartAside.innerHTML = '';
    if (cart.length === 0) {
        cartAside.innerHTML = '<li id="empty">Your cart is empty</li>';
    } else {
        cart.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <div class="details">
                    <span>${item.name}</span>
                    <div class="quantity">
                        <button onclick="changeQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="changeQuantity('${item.name}', 1)">+</button>
                    </div>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
                <button onclick="removeItem('${item.name}')">Remove</button>
            `;
            cartAside.appendChild(li);
        });
    }
    updateTotal();
}

function addToCart(item) {

    cart.push({ ...item, quantity: 1 });
    renderCart();
    aside.classList.add("open");

    updateAddButtonState(item.name, true);
}

function removeItem(name) {
    cart = cart.filter(item => item.name !== name);
    renderCart();
    if (cart.length === 0) {
        aside.classList.remove("open");
        OpenandcloseCartButton.style.transform = 'translateX(0)';
    }

    
    updateAddButtonState(name, false);
}

function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            renderCart();
        }
    }
}

function updateAddButtonState(itemName, isAdded) {
    const button = document.querySelector(`button[data-item-name='${itemName}']`);
    if (button) {
        button.disabled = isAdded;
    }
}

egg.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("box");
    li.innerHTML = `
        <img class="img1" src="${item.img}" alt=""/>
        <p class="text1">${item.name}</p>
        <p class="preco">$${item.price.toFixed(2)}</p>
        <button data-item-name="${item.name}" onclick="addToCart({ name: '${item.name}', price: ${item.price}, img: '${item.img}' })">Add to Cart</button>
    `;
    list.appendChild(li);
});

OpenandcloseCartButton.addEventListener("click", () => {
    aside.classList.toggle("open");
    OpenandcloseCartButton.style.transform = aside.classList.contains("open") ? 'translateX(-20px)' : 'translateX(0)';
});

BtnFinish.addEventListener("click", () => {
    alert("Going to checkout!");
});

