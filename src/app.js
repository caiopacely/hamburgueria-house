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



finalizeOrder.addEventListener("click",function(){
    
    if(inputEddress.value === ""){
        warning.classList.remove("hidden")
        inputEddress.classList.add("border-red-500")
        return;
    }
    
    const cartItens = cartProduct.map((item) => {
        return (`* ${item.name} - Quantidade(${item.quantity}) - Preço R$ ${item.price} |\n
`)
    }).join("")

    let phone = 85996652060;
    let mensagem = encodeURIComponent(cartItens);
    window.open(`https://wa.me/${phone}?text=${mensagem}\n Endereço:  ${inputEddress.value} \n Total: ${totalCart.innerText}`, "_blank");



        
})


function upTime(){  
    let date = new Date()
    if(date.getHours() < 18 || date.getHours()>23 ){
        openClosed.style.backgroundColor = "red";
    }  
}

upTime()



  
