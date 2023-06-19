let items = [];

const leftPanel = document.querySelector(".leftBlock");
const notPurchasedItemsList = document.querySelector(".not-purchased");
const purchasedItemsList = document.querySelector(".purchased");

function initializeItems() {
    const initialItems = ["Помідори", "Сир", "Печиво"]; 
    for (const item of initialItems) {
      addItem(item, 1);
      let product = {
        name: item,
        count: 1,
        purchased: false,
      };
      items.push(product);
      localStorage
    }
  }

  initializeItems();


let previousItemName;

function addItem(product, amount){
    const section = document.createElement("section");
    section.appendChild(document.createElement("hr"));
    const sectionElement = document.createElement("section");
    section.appendChild(sectionElement);
    sectionElement.classList.add("item");
    leftPanel.appendChild(section);
    const inputField = document.createElement("input");
    inputField.classList.add("name");
    inputField.value = product;
    inputField.addEventListener('focusin', function(){
        previousItemName = inputField.value;
    });
    
    inputField.addEventListener("focusout", () => {changeItemName(inputField)});
    
    sectionElement.appendChild(inputField);
    const addNewSection = document.createElement("section");
    addNewSection.classList.add("add");
    const decreaseAmountButton = document.createElement("button");
    decreaseAmountButton.classList.add("decreaseButton");
    decreaseAmountButton.textContent = "-";
    decreaseAmountButton.setAttribute("data-tooltip", "Зменшити кількість");
    decreaseAmountButton.addEventListener("click", () => {decreaseItemAmount(sectionElement.querySelector(".add"))});
    if(amount == 1){
        decreaseAmountButton.style.backgroundColor="#ef9f9e";
        decreaseAmountButton.style.borderBottomColor="#ed9392";
        decreaseAmountButton.style.pointerEvents="none";
    }else{
        decreaseAmountButton.style.pointerEvents="all";
    }
    addNewSection.appendChild(decreaseAmountButton);
    const amountLabel = document.createElement("label");
    amountLabel.classList.add("amount");
    amountLabel.textContent = amount;
    addNewSection.appendChild(amountLabel);
    const increaseAmountButton = document.createElement("button");
    increaseAmountButton.classList.add("increaseButton");
    increaseAmountButton.textContent = "+";
    increaseAmountButton.setAttribute("data-tooltip", "Збільшити кількість");
    increaseAmountButton.addEventListener("click", () => {increaseItemAmount(sectionElement.querySelector(".add"))});
    addNewSection.appendChild(increaseAmountButton);
    sectionElement.appendChild(addNewSection);
    const buySection = document.createElement("section");
    buySection.classList.add("purchase");
    const buyButton = document.createElement("button");
    buyButton.classList.add("state");
    buyButton.setAttribute("data-tooltip", "Товар куплено");
    buyButton.textContent = "Куплено";
    buyButton.addEventListener("click", () => {purchaseItem(sectionElement)});
    buySection.appendChild(buyButton);
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.setAttribute("data-tooltip", "Видалити товар");
    deleteButton.textContent = "×";
    deleteButton.addEventListener("click", () => {deleteItem(section)});
    buySection.appendChild(deleteButton);
    sectionElement.appendChild(buySection);
    const item = document.createElement("span");
    item.classList.add("product");
    item.textContent = product;
    const itemAmount = document.createElement("span");
    itemAmount.classList.add("number");
    itemAmount.textContent = amount;
    item.appendChild(itemAmount);
    notPurchasedItemsList.appendChild(item);
    return sectionElement;
}

const submitAddingButton = document.querySelector(".addProduct button");
submitAddingButton.setAttribute("data-tooltip", "Додати товар");
submitAddingButton.addEventListener("click", add);

const input = document.querySelector(".addProduct input");
input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      add();
    }
});


function add() {
    if(input.value.trim().length){
        const name = input.value.trim();
        let exist;
        for(const product of leftPanel.querySelectorAll(".item .name")){
            if(product.value.trim().toLowerCase() === name.toLowerCase()){
                exist = true;
                break;
            }
        }
        if(exist){
            alert("Товар з вже існуючою назвою!")
        }else{
            addItem(name, 1);
            let product = {
                name: name,
                amount: 1,
                purchased: false,
            }
            items.push(product);
        }
    }
    input.value = "";
    input.focus();
}

function changeItemName(field){
    if(field.value.trim().length){
        let exist;
        for(const product of notPurchasedItemsList.querySelectorAll("span")){
            if(product.childNodes[0].textContent.toLowerCase() === field.value.trim().toLowerCase()){
                exist = true;
                break;
            }
        }
        for(const product1 of purchasedItemsList.querySelectorAll("span")){
            if(product1.childNodes[0].textContent.toLowerCase() === field.value.trim().toLowerCase()){
                exist = true;
                break;
            }
        }
        if(exist && field.value.trim().toLowerCase() !== previousItemName.toLowerCase()){
            alert("Товар з вже існуючою назвою!")
            field.value = previousItemName;
        }else{
            for(const product of notPurchasedItemsList.querySelectorAll("span")){
                if(previousItemName === product.childNodes[0].textContent){
                    product.childNodes[0].textContent = field.value;
                    for(const item of items){
                        if(item.name == previousItemName){
                            item.name = field.value.trim();
                        }
                    }
                }
            } 
        }  
    }else{
        field.value = previousItemName;
    }
}

function deleteItem(item){
    item.remove();
    let name = item.querySelector(".name").value;
    const index = items.findIndex((i) => i.name === name);
    items.splice(index, 1); 
    for(const product of notPurchasedItemsList.querySelectorAll("span")){
        if(name === product.childNodes[0].textContent){
            product.remove();
        }
    }   
}


function decreaseItemAmount(amount){ 
    amount.querySelector(".amount").textContent = +amount.querySelector(".amount").textContent - 1;
    if(+amount.querySelector(".amount").textContent === 1){
        amount.querySelector(".decreaseButton").style.backgroundColor="#ef9f9e";
        amount.querySelector(".decreaseButton").style.borderBottomColor="#ed9392";
        amount.querySelector(".decreaseButton").style.pointerEvents="none";
    }
    let name = amount.parentElement.querySelector(".name").value;
    for(const item of items){
        if(item.name === name){
            item.count = amount.querySelector(".amount").textContent;
        }
    }
    for(const product of notPurchasedItemsList.querySelectorAll("span")){
        if(name === product.childNodes[0].textContent){
            product.childNodes[1].textContent = +product.childNodes[1].textContent-1;
        }
    }   
    
}

function increaseItemAmount(amount){
    amount.querySelector(".amount").textContent = +amount.querySelector(".amount").textContent + 1;
    if(+amount.querySelector(".amount").textContent === 2){
        amount.querySelector(".decreaseButton").removeAttribute("style");
    }
    let name = amount.parentElement.querySelector(".name").value;
    for(const item of items){
        if(item.name === name){
            item.count = amount.querySelector(".amount").textContent;
        }
    }
    for(const product of notPurchasedItemsList.querySelectorAll("span")){
        if(name === product.childNodes[0].textContent){
            product.childNodes[1].textContent = +product.childNodes[1].textContent+1;
        }
    } 
}

function purchaseItem(section){
    section.querySelector(".purchase .state").remove();
    const button = document.createElement("button");
    button.classList.add("state");
    button.classList.add("tooltip");
    button.setAttribute("data-tooltip", "Товар не куплено");
    button.textContent = "Не куплено";
    button.addEventListener("click", () => {doNotPurchaseItem(section)});
    section.querySelector(".purchase").appendChild(button);
    section.querySelector(".purchase .deleteButton").style.display="none";
    section.querySelector(".name").style.textDecoration="line-through";
    section.querySelector(".name").style.pointerEvents="none";
    section.querySelector(".add .decreaseButton").style.visibility="hidden";
    section.querySelector(".add .increaseButton").style.visibility="hidden";
    let name = section.querySelector(".name").value;
    for(const product of items){
        if(product.name === name){
            product.purchased = true;
        }
    }
    let item;
    for(const product of notPurchasedItemsList.querySelectorAll("span")){
        if(name === product.childNodes[0].textContent){
            item = product;
            product.remove();
        }
    } 
    purchasedItemsList.appendChild(item);
    item.style.textDecoration="line-through";
    item.querySelector("span").style.textDecoration="line-through";
}

function doNotPurchaseItem(section){
    section.querySelector(".purchase .state").remove();
    const button = document.createElement("button");
    button.classList.add("state");
    button.setAttribute("data-tooltip", "Товар куплено");
    button.textContent = "Куплено";
    button.addEventListener("click", () => {purchaseItem(section)});
    section.querySelector(".purchase").insertBefore(button, section.querySelector(".purchase .deleteButton"));
    section.querySelector(".purchase .deleteButton").removeAttribute("style");
    section.querySelector(".name").setAttribute("style", "pointer-events:all");
    if(+section.querySelector(".add .amount").textContent === 1){
        section.querySelector(".add .decreaseButton").setAttribute("style", "background-color:#ef9f9e; border-bottom-color: #ed9392; pointer-events:none");
    }else{
        section.querySelector(".add .decreaseButton").removeAttribute("style");
    }
    section.querySelector(".add .increaseButton").removeAttribute("style");
    let name = section.querySelector(".name").value;
    for(const product of items){
        if(product.name === name){
            product.purchased = false;
        }
    }
    let item;
    for(const product of purchasedItemsList.querySelectorAll("span")){
        if(name === product.childNodes[0].textContent){
            item = product;
            product.remove();
        }
    } 
    notPurchasedItemsList.appendChild(item);
    item.removeAttribute("style");
    item.querySelector("span").removeAttribute("style");
}
