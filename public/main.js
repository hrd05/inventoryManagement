
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
        showItem(item.data);
        //console.log(item);
    })
    .catch(err => console.log(err));


}

// Add a data-quantity attribute to the list items to store the current quantity.
function showItem(item) {
    const parentElement = document.getElementById('item-list');
    const childElement = document.createElement('li');
    childElement.className = 'list-group-item';
    //childElement.setAttribute('data-quantity', item.quantity); // Add data-quantity attribute
    childElement.innerHTML = `Item Name: <b>${item.itemName}</b>       
     Description: <b>${item.description}</b>  
     Price: <b>Rs ${item.price}</b>  
     Quantity: <strong id="item-quantity-${item.id}">${item.quantity}</strong>`;

    const btn1 = document.createElement('button');
    const btn2 = document.createElement('button');
    const btn3 = document.createElement('button');

    btn1.className = 'btn btn-sm btn-primary float-end';
    btn2.className = 'btn btn-sm btn-primary float-end mx-2';
    btn3.className = 'btn btn-sm btn-primary float-end';

    btn1.textContent = 'BUY 1';
    btn2.textContent = 'BUY 2';
    btn3.textContent = 'BUY 3';

    // Add click event listeners to the buttons
    btn1.addEventListener('click', () => handleQuantity(item, 1));
    btn2.addEventListener('click', () => handleQuantity(item, 2));
    btn3.addEventListener('click', () => handleQuantity(item, 3));

    childElement.appendChild(btn3);
    childElement.appendChild(btn2);
    childElement.appendChild(btn1);    
    
    parentElement.appendChild(childElement);
}

// function handling quantity

function handleQuantity(item, quantityToBuy) {
    const id = item.id;
    let newQuantity;

    newQuantity = item.quantity - quantityToBuy;
    //console.log(item.quantity , newQuantity);    
  
    axios.put(`http://localhost:4000/inventory/${id}`, {quantity: newQuantity})
    .then((response) => {
        //console.log(item.data.id);
        item.quantity = response.data.quantity;
        document.querySelector(`#item-quantity-${id}`).textContent = `${response.data.quantity}`;
        
        //console.log(res);
    })  
    .catch(err => console.log(err));
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
});
