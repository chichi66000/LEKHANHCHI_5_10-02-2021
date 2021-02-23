
/* récuperer le montant total dans locastorage pour afficher dans 1er partie du tableau*/

let TOTAL = localStorage.getItem('TOTAL');
TOTAL = parseInt(TOTAL);

let fraisLivraison = localStorage.getItem('livraison');
fraisLivraison = parseInt(fraisLivraison);

let recapitulatif = document.getElementById('recapitulatif'); 

let tr1 = document.createElement('tr');

let td1 = document.createElement('td');
    td1.innerHTML = "N° commande";
    tr1.append(td1);

let nCommande = document.createElement('td');
    nCommande.setAttribute('class', 'text-right');
    let orderId = localStorage.getItem('orderId');
    nCommande.innerHTML = orderId;
    tr1.append(nCommande);

let tr2 = document.createElement('tr');

let td2 = document.createElement('td');
    td2.innerHTML = "Montant";
    tr2.append(td2);

let montant = document.createElement('td'); // recuperer le montant total du commande
    montant.setAttribute('class', 'text-right');
    montant.innerHTML = TOTAL/100 + ',00€';
    tr2.append(montant);

let tr3 = document.createElement('tr');// récuperer le mode de paiement

let td3 = document.createElement('td');
    td3.innerHTML = "Payé avec: ";
    tr3.append(td3);

let carte = document.createElement('td'); // recuperer le montant total du commande
    carte.setAttribute('class', 'text-right');
    let cc= localStorage.getItem('choixpaiement')
    carte.innerHTML = cc;
    tr3.append(carte);

let date = document.createElement('tr') // récupérer date de commande

let td4 = document.createElement('td');
    td4.innerHTML = "Commande passé le: ";
    date.append(td4);

let date1 = document.createElement('td'); 
    date1.setAttribute('class', 'text-right');
    let date2= localStorage.getItem('datecommande')
    date1.innerHTML = date2;
    date.append(date1);

recapitulatif.append(tr1)
recapitulatif.append(tr2)
recapitulatif.append(tr3)
recapitulatif.append(date)

// Récupérer info du produit, prix, date livraison... our 2eme tableau 
let productInCart = JSON.parse(localStorage.getItem('productInCart'));


let info_product = document.getElementById('info_product');

if (productInCart && info_product ) {
    Object.values(productInCart).map(item => {
        let tr4 = document.createElement('tr');
            let photo = document.createElement('td');
                photo.setAttribute('class', 'produit_paiement col-md-2');
                    let img = document.createElement('img');
                        img.setAttribute('class', 'img-fluid img-thumbnail');
                        img.src= item.photo;
                        img.setAttribute('alt', item.name);
                
                photo.append(img);

            let quantity = document.createElement('td');
                quantity.innerHTML= item.inCart;
            
            
            let prix = document.createElement('td');
                prix.innerHTML= parseInt(item.price)/100 +',00€';

            let total = document.createElement('td');
                total.setAttribute('class','text-right');
                total.innerHTML= item.price * item.inCart/100 +',00€';
             
            tr4.append(photo);
            tr4.append(quantity);
            tr4.append(prix);
            tr4.append(total);

            info_product.append(tr4);
    })
}

let info_TOTAL = document.getElementById("info_TOTAL");
let tr5 = document.createElement('tr');
    tr5.setAttribute('class', '');

    let livraison = document.createElement('td');
        // livraison.setAttribute('class', '')
        livraison.innerHTML = "Frais de livraison";
        tr5.append(livraison)
    let livraison1 = document.createElement('td');
        livraison1.setAttribute('colspan', '3');
        livraison1.setAttribute('class', 'text-right');
        livraison1.innerHTML = fraisLivraison/100 +',00€' ;
        tr5.append(livraison1);

let tr6 = document.createElement('tr');
    tr6.setAttribute('class', 'fw-bold');

    let soustotal = document.createElement('td');
        soustotal.setAttribute('class', 'fw-bold');
        soustotal.innerHTML = "TOTAL";
        tr6.append(soustotal);

    let soustotal1 = document.createElement('td');
        soustotal1.setAttribute('colspan', '3');
        soustotal1.setAttribute('class', 'text-right');
        soustotal1.innerHTML = TOTAL/100 +',00€';
        tr6.append(soustotal1);
info_TOTAL.append(tr5)
info_TOTAL.append(tr6)

// empêcher accéder au panier et afficher message
let panier = document.querySelector('.fa-shopping-cart');
panier.addEventListener('click', (e) =>{
    e.preventDefault();
    alert("Votre commande a été enregistrée")
})
// effacer le localStorage qu'une fois on a fini.
localStorage.clear();







