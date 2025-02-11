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
const apenItem = document.getElementById("openItem");
let cartProduct = [];   

barraCart.addEventListener("click", function(){
    modal.style.display = "flex";
})

modal.addEventListener("click",function(event){
    if(event.target === modal || event.target === closedButton){
         modal.style.display = "none";
    }
})

menu.addEventListener("click",function(event){   
    let selectProd = event.target.closest(".get-item");   
    
    if(selectProd){
        const name = selectProd.getAttribute("dataName");
        const price = selectProd.getAttribute("dataPrice");   
        addProduct(name,price);
    }
})

menuBebidas.addEventListener("click",function(event){   
    let selectProd = event.target.closest(".get-item");
    
    if(selectProd){
        const name = selectProd.getAttribute("dataName");
        const price = selectProd.getAttribute("dataPrice");
        addProduct(name,price);    
    }
})

function addProduct(name,price){
    
    let produtoContem = cartProduct.find(prod => prod.name === name);
    totalCart.innerHTML = (parseFloat(totalCart.innerHTML) + parseFloat(price)).toFixed(2);
    
    if(produtoContem){
        produtoContem.quantity ++;
        upCart();
    }
    else{
        cartProduct.push({
            name,
            price,
            quantity: 1,
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

function handleMenuClick(event) {
    let selectProd = event.target.closest("#item");  
    let notBtn = event.target.closest(".get-item");   
    
    if (selectProd && notBtn == null) {
        const decriptionProd = document.createElement("div");
        decriptionProd.innerHTML = `
            <div id="modItem" class="w-full h-full bg-black/60 top-0 left-0 z-99 fixed flex justify-center items-center">       
                <div class="w-[90%] max-w-xl rounded-xl bg-white flex flex-col gap-3">        
                    <div class="px-4">
                        <div class="flex justify-center items-center">
                            <img class="max-h-96" src="${selectProd.getAttribute("src")}" alt="">
                        </div>
                        <div class="flex flex-col gap-3 mt-3">
                            <p class="font-bold">${selectProd.getAttribute("dataName")}</p>
                            <p class="text-gray-500">${selectProd.getAttribute("description")}</p>
                            <p class="font-bold">R$ ${selectProd.getAttribute("dataPrice")}</p>
                        </div>
                    </div>
                    <div class="w-full bg-gray-500 h-0.5"></div>
                    <div class="p-2 w-full flex items-center justify-center gap-4">
                        <div class="flex gap-6 bg-gray-200 py-2 px-6 text-xl rounded">
                            <button>-</button>
                            <p>0</p>
                            <button>+</button>
                        </div> 
                        <div class="flex justify-between bg-black text-white p-2 rounded w-full">
                            <p>Adicionar</p>
                            <p>R$<span>0.00</span></p>
                        </div>
                    </div>         
                </div>
            </div>`;
        
        apenItem.appendChild(decriptionProd); 
    }   
}

menu.addEventListener("click", handleMenuClick);
menuBebidas.addEventListener("click", handleMenuClick);

document.addEventListener("click", function(event){
    let modalItem = document.getElementById("modItem");
    if (event.target === modalItem) {
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



  
