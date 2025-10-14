// Simple frontend using FakeStoreAPI
const API = 'https://fakestoreapi.com/products';
const productsEl = document.getElementById('products');
const cartItemsEl = document.getElementById('cart-items');
const totalEl = document.getElementById('total');
const checkoutBtn = document.getElementById('checkout');
const messageEl = document.getElementById('message');

let cart = JSON.parse(localStorage.getItem('cart')||'[]');

function renderProducts(list){
  productsEl.innerHTML = '';
  list.forEach(p=>{
    const div = document.createElement('div');
    div.className='card';
    div.innerHTML = `<h3>${p.title}</h3><p>$${p.price}</p><button data-id="${p.id}" class="add">Ajouter</button>`;
    productsEl.appendChild(div);
  });
  document.querySelectorAll('.add').forEach(b=>{
    b.addEventListener('click', e=>{
      const id = +b.dataset.id;
      const prod = list.find(x=>x.id===id);
      addToCart(prod);
    });
  });
}

function addToCart(prod){
  const exist = cart.find(c=>c.id===prod.id);
  if (exist){ exist.qty++; } else { cart.push({id:prod.id,title:prod.title,price:prod.price,qty:1}); }
  saveCart();
  renderCart();
}

function removeFromCart(id){
  cart = cart.filter(c=>c.id!==id);
  saveCart(); renderCart();
}

function saveCart(){ localStorage.setItem('cart', JSON.stringify(cart)); }

function renderCart(){
  cartItemsEl.innerHTML='';
  let total=0;
  cart.forEach(item=>{
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `${item.title} x${item.qty} - $${(item.price*item.qty).toFixed(2)} <button data-id="${item.id}" class="del">Suppr</button>`;
    cartItemsEl.appendChild(li);
  });
  totalEl.textContent = 'Total: $' + total.toFixed(2);
  document.querySelectorAll('.del').forEach(b=> b.addEventListener('click', e=> removeFromCart(+b.dataset.id)));
}

checkoutBtn.addEventListener('click', async ()=>{
  if (cart.length===0){ showMessage('Le panier est vide','error'); return; }
  // Simulate payment by calling FakeStoreAPI carts POST
  try{
    const res = await fetch('https://fakestoreapi.com/carts', {
      method:'POST',
      body: JSON.stringify({
        userId:1,
        date: new Date().toISOString(),
        products: cart.map(c=>({productId:c.id,quantity:c.qty}))
      })
    });
    const data = await res.json();
    showMessage('Commande créée (id:'+data.id+')','success');
    cart = []; saveCart(); renderCart();
  }catch(err){
    showMessage('Erreur lors du paiement','error');
  }
});

function showMessage(text,cls){
  messageEl.textContent = text; messageEl.className=''; messageEl.classList.add(cls);
  setTimeout(()=>{ messageEl.className='hidden'; }, 4000);
}

async function init(){
  try{
    const r = await fetch(API);
    const list = await r.json();
    renderProducts(list);
    renderCart();
  }catch(e){
    showMessage('Impossible de charger les produits','error');
  }
}
init();
