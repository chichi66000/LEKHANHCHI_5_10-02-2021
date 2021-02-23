// récupérer les information du serveur

function promiseGet() {
    return new Promise((resolve, reject) => {
        let recupHttp = new XMLHttpRequest();
        recupHttp.open('GET', 'http://localhost:3000/api/teddies');
        recupHttp.send();
        recupHttp.onreadystatechange = function() {
            if(this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                }else{
                    reject(recupHttp);
                }
            }
        }
    })
}

promiseGet()
    .then( data => {
        let ours = data;
        let id = window.location.href.split("=");
        let ref = id[1];
        /* Charegement les informations au page html teddyEnJs*/
        for( let i=0; i<ours.length;i++) {
            //si la référence dans url est le meme que _id du produit ours, on charge les data de cet ours
            if (ref === ours[i]._id) {
                let article = document.querySelector('.article');
                //On ajoute les éléments HTML de façon dynamique
                let col_photo_ours = document.createElement('div');
                    col_photo_ours.setAttribute('class','col-sm-6 text-center');
                    article.appendChild(col_photo_ours);

                let photo = document.createElement('img');
                    photo.setAttribute('class','photo_ours w-75 m-auto img-fluid img-thumbnail');
                    photo.setAttribute('alt', ours.name)
                    photo.src = ours[i].imageUrl;
                    col_photo_ours.appendChild(photo);

                let div = document.createElement('div');
                    div.setAttribute('class', 'col-9 col-sm-5 m-auto');
                    article.appendChild(div);

                let titleNom = document.createElement('h1');
                    titleNom.innerHTML = "Ours " + ours[i].name;
                    div.appendChild(titleNom);

                let price = document.createElement('p');
                    price.setAttribute('class', 'fw-bold fs-2');
                    let prix = parseInt(ours[i].price)/100;

                    price.innerHTML = 'Prix : '+ prix +',00 €';
                    div.appendChild(price);
                // on ajoute label et select avec option couleur
                let select = document.createElement('label');
                    select.setAttribute('class', 'pl-3');
                    select.setAttribute('for', 'color');
                    select.innerHTML = 'Choisir votre couleur';
                    div.appendChild(select);

                let choixColor = document.createElement('select');
                    choixColor.setAttribute('class', 'form-select w-50 mt-2 mb-2');
                    choixColor.setAttribute('id', 'color');
                    choixColor.setAttribute('type', 'checkbox');
                    choixColor.setAttribute('aria-label', 'Default select exemple');
                    div.appendChild(choixColor);

                let j = 0;
                    for ( j= 0 ; j<ours[i].colors.length; j++) {
                        let colorOption = document.createElement('option');
                        colorOption.setAttribute('value', ours[i].colors[j].length);
                        colorOption.innerHTML = ours[i].colors[j];
                        choixColor.append(colorOption);
                    };

                let description = document.createElement('h5');
                    description.setAttribute('class', 'mt-1 mb-1');
                    description.innerHTML = 'Description';
                    div.appendChild(description);

                let ligne = document.createElement('hr');
                    ligne.setAttribute('class', 'text-danger w-25');
                    div.appendChild(ligne);

                let textDescrip = document.createElement('p');
                    textDescrip.setAttribute('class', 'w-md-50 text-justify');
                    textDescrip.innerHTML = ours[i].description;
                    div.appendChild(textDescrip);
                // ajoute un button et et data-* pour récupérer info pour panier
                let button = document.createElement('button');
                    button.setAttribute('class', 'btn btn-primary mt-3 mb-3 add-cart');
                    button.setAttribute('id','btn');
                    button.setAttribute('type','submit');
                    button.setAttribute('data-id', ours[i]._id);
                    button.setAttribute('data-name', ours[i].name);

                    
                    button.setAttribute('data-price', ours[i].price);
                    button.setAttribute('data-url', 'teddyEnJs.html' + '?id=' + ours[i]._id);
                    button.setAttribute('data-photo', ours[i].imageUrl);
                    button.innerHTML = 'Ajouter au panier';
                    div.appendChild(button);
                
            }
            // si la référence n'est pas identique que _id; on les affiche en tant que d'autre droduits
            else {
                let autreArticle = document.querySelector('.autreArticle');
                let autreProduit = document.createElement('a');
                    autreProduit.setAttribute('class', 'card col-5 col-md-3 text-center m-auto mb-2 p-0 choix_en_plus produit pb-2');
                    autreProduit.href = "teddyEnJs.html" + '?id=' + ours[i]._id;
                let autrePhoto = document.createElement('img');
                    autrePhoto.setAttribute('class', 'card-img-top h-75');
                    autrePhoto.setAttribute('src', ours[i].imageUrl);
                    autrePhoto.setAttribute('alt', ours[i].name);
                    autreProduit.appendChild(autrePhoto);
                let autreTitle = document.createElement('h6');
                    autreTitle.setAttribute('class', 'card-title');
                    autreTitle.innerHTML = ours[i].name;
                    autreProduit.appendChild(autreTitle);
                autreArticle.append(autreProduit);

            }
        }

         /* ajouter le fonction pour button au click*/
        
         let panier= document.getElementById('btn');
         // récupérer les informations du produit grâce au data-*
         let product = {
             name: panier.getAttribute('data-name'),
             price: parseInt(panier.getAttribute('data-price')),
             inCart: 0,
             photo: panier.getAttribute('data-photo'),
             id: panier.getAttribute('data-id'),
             total:0,
         }
         
         panier.addEventListener('click', addPanier);//fonction quand on click sur le bouton
         function addPanier (data) {
             data.preventDefault();
             cartNumber(product);// fonction pour ajouter le nombre 
             setItem(product); // fonction pour ajouter le nom du produit
             totalCost(product);// fonction pour calculer le total des articles
             alert('Votre article a été ajouté au panier');
         }
         // function ajouter le nombre de produit, et afficher au panier
         function cartNumber(product) {
            let productNumber = parseInt(localStorage.getItem('cartNumber'));

            if(productNumber) { localStorage.setItem('cartNumber', productNumber +1);
            document.getElementById('in-cart-items-num').innerHTML = productNumber +1;
             } //s'il y a déjà un produit, on ajoute 1 et affiche le nombre total dans panier
             else {localStorage.setItem('cartNumber', 1);
             document.getElementById('in-cart-items-num').innerHTML = 1;} 
             // si c'est la premiere fois, on ajoute dans le localstorage, panier = 1

         }

         function setItem(product) {
             let cartItems = localStorage.getItem('productInCart');
             cartItems = JSON.parse(cartItems);
             
             if (cartItems != null) {// à partir du 2eme click,
                 if (cartItems[product.name] == undefined) { //et il y a d'autre produit
                     cartItems = { // on ajoute notre nouvel produit
                         ...cartItems,
                         [product.name]:product
                     }
                 }
                 cartItems[product.name].inCart +=1 // incrémenter aussi la propriété inCart
             }
                 else { // c'est la première fois, on initilise propriété inCart = 1; et ajoute notre fiche produit ( nom, prix, photo...) dans product.name
                 product.inCart = 1;
                 cartItems = { [product.name]:product};
                 }
             // si c'est la première fois, on ajoute dans localstorage productInCart, la valeur est cartItem
             localStorage.setItem('productInCart', JSON.stringify(cartItems))
         }

         // fonction pour actualiser le nombre article dans le panier
         function onLoadCartNumber() {
             let productNumber = parseInt(localStorage.getItem('cartNumber'));
             // vérifier si productNumber existe déjà dans le localStorage et affiche et résultat dans le panier ( pour en cas de refraîche la page)
             if(productNumber) {document.getElementById('in-cart-items-num').textContent = productNumber;
             }
         }

         // on crée un fonction pour calculer le total des articles dans le panier
         function totalCost(product) {
             // console.log(typeof product.price)
             let cartCost = localStorage.getItem('totalCost');
             
             if (cartCost != null) { //s'il y a déjà du produit, on ajoute le prix du produit dans le total
             cartCost = parseInt(cartCost);

             localStorage.setItem('totalCost', cartCost + product.price)
             }
             else { // si c'est la première fois, le total est le prix de produit
                 localStorage.setItem('totalCost', product.price)
             }
         }
     
         onLoadCartNumber();
         
    })

    .catch((error) => console.log({error}))

    