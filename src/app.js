const modal = document.getElementById("modal-cart");
const openClosed = document.getElementById("open-closed");
const menu = document.getElementById("menu");
const menuBebidas = document.getElementById("menu-bebidas");
const barraCart = document.getElementById("bar-fixed");
const closedButton = document.getElementById("closed-button");
const conteudoCart = document.getElementById("conteudo");
const totalCart = document.getElementById("total-cart");   
const quantityCart = document.getElementById("quantity-cart");      
let cartProduct = []

barraCart.addEventListener("click", function(){
    modal.style.display = "flex"
})

modal.addEventListener("click",function(event){
    if(event.target === modal || event.target === closedButton){
         modal.style.display = "none"
    }
})

menu.addEventListener("click",function(event){   
    let selectProd = event.target.closest(".get-item")   
    
    if(selectProd){
        const name = selectProd.getAttribute("dataName")
        const price = selectProd.getAttribute("dataPrice")      
        addProduct(name,price)
    }
})

menuBebidas.addEventListener("click",function(event){   
    let selectProd = event.target.closest(".get-item")
    
    if(selectProd){
        const name = selectProd.getAttribute("dataName")
        const price = selectProd.getAttribute("dataPrice")
        addProduct(name,price)    
    }
})

function addProduct(name,price){
    
    let produtoContem = cartProduct.find(prod => prod.name === name);
    totalCart.innerHTML = (parseFloat(totalCart.innerHTML) + parseFloat(price)).toFixed(2)
    
    if(produtoContem){
        produtoContem.quantity ++;
        produtoContem.price = parseFloat(produtoContem.price) + parseFloat(price);
        upCart()
    }
    else{
        cartProduct.push({
            name,
            price,
            quantity: 1,
        })       
        upCart()
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
                <p>Remover</p>
            </div>
            <p>R$ ${produto.price}</p>
        </div>`;

        conteudoCart.appendChild(decriptionProd); 

    });
    quantityCart.innerHTML=cartProduct.length
}














function upTime(){  
    let date = new Date()
    if(date.getHours() < 18 || date.getHours()>23 ){
        openClosed.style.backgroundColor = "red";
    }  
}

upTime()



  
