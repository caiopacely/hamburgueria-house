const modal = document.getElementById("modal-cart");
const openClosed = document.getElementById("open-closed");
const menu = document.getElementById("menu");
const menuBebidas = document.getElementById("menu-bebidas");
const barraCart = document.getElementById("bar-fixed");
const closedButton = document.getElementById("closed-button");
const conteudoCart = document.getElementById("conteudo");
const totalCart = document.getElementById("total-cart");   
const quantityCart = document.getElementById("quantity-cart");      
const remove = document.getElementById("remove");
const warning = document.getElementById("warning");
const finalizeOrder = document.getElementById("finalize-order");
const inputEddress = document.getElementById("inputEddress");
const openItem = document.getElementById("openItem");
let cartProduct = [];   

barraCart.addEventListener("click", function(){
    modal.style.display = "flex";
})

modal.addEventListener("click",function(event){
    if(event.target === modal || event.target === closedButton){
         modal.style.display = "none";
    }
})

function add(event){   
    let selectProd = event.target.closest(".get-item"); 
   
    if(selectProd){       
        selectProd.innerHTML= '<i class="fa-solid fa-plus"></i>'
        selectProd.classList.add("atualizar")
        const name = selectProd.getAttribute("dataName");
        const price = selectProd.getAttribute("dataPrice");   
        addProduct(name,price,1);
    }
}

menu.addEventListener("click",add)
menuBebidas.addEventListener("click",add)

function addProduct(name,price,quantity){
    
    let produtoContem = cartProduct.find(prod => prod.name === name);
    totalCart.innerHTML = (parseFloat(totalCart.innerHTML) + parseFloat(price)*quantity).toFixed(2);
    
    if(produtoContem){
        produtoContem.quantity += quantity;
        upCart();
    }
    else{
        cartProduct.push({
            name,
            price,
            quantity: quantity,
        });    
        upCart();
    }  
}

function upCart(){
    conteudoCart.innerHTML=""
    cartProduct.forEach(produto => {
        
        const decriptionProd = document.createElement("div")
        decriptionProd.innerHTML = 
        
        `<div class=" px-2 py-1 border-1">
            <p  class="font-bold">${produto.name}</p>
            <div class="flex justify-between">
                <p>(Quantidade: ${produto.quantity})</p>
                <button class="cursor-pointer" prodName="${produto.name}" id="remove" >Remover</button>
            </div>
            <p>R$ ${produto.price}</p>
        </div>`;

        conteudoCart.appendChild(decriptionProd); 

    });
    quantityCart.innerHTML=cartProduct.length;
}

conteudoCart.addEventListener("click",function(action){
    const remover = action.target.closest("#remove")
    if(remover){
        const prodName = remover.getAttribute("prodName");
        removerProduto(prodName);
    }  
})

function removerProduto(name){
    cartProduct.forEach(produto => {
        if(produto.name===name){
            totalCart.innerHTML = (parseFloat(totalCart.innerHTML) - parseFloat(produto.price)).toFixed(2);
            if(produto.quantity>1){
                produto.quantity--;
                upCart()
            }
            else{
                cartProduct.splice(cartProduct.indexOf(produto),1)
                upCart()
            }
        }
    });
}

inputEddress.addEventListener("input",function(action){
    let value = action.target.value;

    if(value != ""){
        warning.classList.add("hidden")
        inputEddress.classList.remove("border-red-500")
    }
})

function creatModalItem(selectProd) {
    const modalProductHtml = document.createElement("div");
    modalProductHtml.innerHTML = `
    <div id="modItem" class="w-full h-full bg-black/60 top-0 left-0 z-99 fixed flex justify-center items-center" dataName = "${selectProd.getAttribute("dataName")}" dataPrice = "${selectProd.getAttribute("dataPrice")}">       
        <div class="w-[90%] max-w-xl rounded-xl bg-white flex flex-col gap-3">        
            <div class="px-4">
                <div class=" relative flex justify-center items-center ">
                    <img class="max-h-96" src="${selectProd.getAttribute("src")}" alt="">
                    <button id="closedBtnModal" class="bg-gray-200 w-10 h-10 text-gray-600 rounded-full absolute top-3 right-0 " ><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="flex flex-col gap-3 mt-3">
                    <p class="font-bold">${selectProd.getAttribute("dataName")}</p>
                    <p class="text-gray-500">${selectProd.getAttribute("description")}</p>
                    <p class="font-bold">R$ ${selectProd.getAttribute("dataPrice")}</p>
                </div>
            </div>
            <div class="w-full bg-gray-500 h-0.5"></div>
            <div class="p-2 w-full flex items-center justify-center gap-4">
                <div id="boxQtd" class="flex gap-6 bg-gray-200 py-2 px-6 text-xl rounded">
                    <button id="decrease">-</button>
                    <p id="quantity">1</p>
                    <button id="increase">+</button>
                </div> 
                <div id="addForModalItem" class="flex justify-between bg-black text-white p-2 rounded w-full">
                    <p >Adicionar</p>
                    <p>R$<span id="totalItem">${selectProd.getAttribute("dataPrice")}</span></p>
                </div>
            </div>         
        </div>
    </div>`;

    return modalProductHtml;
}   

function itemClick(event) {
    let selectProd = event.target.closest("#item");  
    let notBtn = event.target.closest(".get-item");   
    
    if (selectProd && notBtn == null) {
        const estructItem = creatModalItem(selectProd)

        openItem.appendChild(estructItem);

    }   
}

menu.addEventListener("click", itemClick);
menuBebidas.addEventListener("click", itemClick);



document.addEventListener("click", function(event){
    let increase = document.getElementById("increase")
    let decrease = document.getElementById("decrease")
    let quantity = document.getElementById("quantity")
    let total = document.getElementById("totalItem")
    let modItem = document.getElementById("modItem")
    let price = modItem.getAttribute("dataPrice")

    if(event.target === increase){
        quantity.innerHTML = Number(quantity.innerHTML) + 1
        total.innerHTML = (Number(total.innerHTML) + Number(price)).toFixed(2)
        
    }
    else if(event.target === decrease && Number(total.innerHTML)>price){
        quantity.innerHTML = Number(quantity.innerHTML) - 1
        total.innerHTML = (Number(total.innerHTML) - Number(price)).toFixed(2)
    } 
})


document.addEventListener("click", function(event){
    let addForModalItem = event.target.closest("#addForModalItem")
    let quantity = document.getElementById("quantity")
    
    if(addForModalItem){
        let modItem = document.getElementById("modItem")
        const name = modItem.getAttribute("dataName")
        const price = modItem.getAttribute("dataPrice")
        addProduct(name,price,Number(quantity.innerHTML))
        modItem.remove()
    } 
   
})
  

document.addEventListener("click", function(event){
    let modalItem = document.getElementById("modItem");
    let cloasedModalItem = document.getElementById("closedBtnModal");
    if (event.target === modalItem || event.target=== cloasedModalItem ) {
        modalItem.remove(); 
    }
});


finalizeOrder.addEventListener("click",function(){
    
    if(inputEddress.value === ""){
        warning.classList.remove("hidden")
        inputEddress.classList.add("border-red-500")
        return;
    }
    
    const cartItens = cartProduct.map((item) => {
        return `* *${item.name}* - Quantidade: ${item.quantity} - Preço: R$ ${item.price}`;
    }).join("\n");
    
    const message = ` *Pedido realizado*\n\n${cartItens}\n\n *Endereço:* ${inputEddress.value} \n *Total:* R$ ${totalCart.innerText}\n\n *Por favor, confirme o pedido e o tempo de entrega.*`;
    
    
    const encodedMessage = encodeURIComponent(message);
    
    let phone = "5585988907313"; 
    
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
    
    
})


function upTime(){  
    let date = new Date()
    if(date.getHours() < 18 || date.getHours()>23 ){
        openClosed.style.backgroundColor = "red";
    }  
}

upTime()



  
