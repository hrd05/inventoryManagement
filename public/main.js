
function saveToDb(event){
    event.preventDefault();
    const itemName = event.target.itemName.value ; 
    const description = event.target.description.value;
    const price = event.target.price.value;
    const quantity = event.target.quantity.value;

    const Inventory = {
        itemName,
        description,
        price,
        quantity
    }

    axios.post("http://localhost:4000/inventory", Inventory)
    .then((item) => {
        //showItem(item);
        console.log(item);
    })
    .catch(err => console.log(err));


}

// Add a data-quantity attribute to the list items to store the current quantity.
function showItem(item) {
    const parentElement = document.getElementById('item-list');
    const childElement = document.createElement('li');
    childElement.className = 'list-group-item';
    childElement.setAttribute('data-quantity', item.quantity); // Add data-quantity attribute
    childElement.innerHTML = `Item Name: <b>${item.itemName}</b>       
     Description: <b>${item.description}</b>  
     Price: <b>Rs ${item.price}</b>  
     Quantity: <b>${item.quantity}</b>`;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');

    btn1.className = 'btn btn-primary btn-sm mr-2';
    btn2.className = 'btn btn-primary btn-sm mr-2';
    btn3.className = 'btn btn-primary btn-sm ';

    btn1.textContent = 'BUY 1';
    btn2.textContent = 'BUY 2';
    btn3.textContent = 'BUY 3';

    // Add click event listeners to the buttons
    btn1.addEventListener('click', () => handleBuyClick(item, 1));
    btn2.addEventListener('click', () => handleBuyClick(item, 2));
    btn3.addEventListener('click', () => handleBuyClick(item, 3));

    childElement.appendChild(btn1);
    childElement.appendChild(btn2);
    childElement.appendChild(btn3);
    parentElement.appendChild(childElement);
}

// Function to handle Buy button clicks
function handleBuyClick(item, quantityToBuy) {
    const currentItem = document.querySelector(`[data-quantity="${item.quantity}"]`);
    if (currentItem) {
        const currentQuantity = currentItem.getAttribute('data-quantity');
        const newQuantity = currentQuantity - quantityToBuy;
        if (newQuantity >= 0) {
            currentItem.setAttribute('data-quantity', newQuantity);
            currentItem.querySelector('b').textContent = newQuantity; // Update the displayed quantity
            // Make a PUT request to update the quantity on the server
            axios.put(`http://localhost:4000/inventory/${item.id}`, { quantity: newQuantity })
                .then(response => {
                    // Handle the response if needed
                })
                .catch(err => console.log(err));
        }
    }
}


window.addEventListener("DOMContentLoaded", () => {
    axios.get("http://localhost:4000/inventory")
    .then((items) => {
        for(var i =0;i<items.data.length;i++) {
            showItem(items.data[i]);
            //console.log(items.data[i]);
        }
    })
    .catch(err => console.log(err));
})

