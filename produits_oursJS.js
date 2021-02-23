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
    .then(data => {
            let ours = data;
            
            for(let i=0;i<ours.length; i++) {
                // on créer des éléments HTML avec JS
                let containeur = document.querySelector('.containeur');

                let teddy = document.createElement ('div');
                    teddy.setAttribute('class','col-sm-10 col-md-5 flex-column m-auto mb-3 text-center');
                    containeur.appendChild(teddy);

                let link = document.createElement ('a');
                    link.setAttribute('class','card produit bg-light ours');
                    teddy.appendChild(link);
                    link.href='teddyEnJs.html' + '?id=' + ours[i]._id;

                let photoTeddy = document.createElement ('img');
                    photoTeddy.setAttribute('class','card-img-top h-75');
                    photoTeddy.setAttribute('alt', ours[i].name)
                    link.appendChild(photoTeddy);
                    photoTeddy.src=ours[i].imageUrl;
                
                let titre = document.createElement('h4');
                    titre.setAttribute('class','card-title');
                    titre.innerHTML = ours[i].name;
                    link.appendChild(titre);

                let para = document.createElement('p');
                    para.setAttribute('class','card-text ls-2 fw-bold');
                    let price = parseInt(ours[i].price)/100;
                    para.innerHTML = "Prix : " + price + ',00 € ';
                    link.appendChild(para);
            }

        }
    )
    .catch((error) => console.log({error}))
  
    // afficher le nombre d'article dans le panier s'il y en a
let inCart = document.getElementById('in-cart-items-num');
    if( localStorage.getItem('cartNumber')) {
        inCart.innerHTML = localStorage.getItem('cartNumber')
    }
    else {inCart.innerHTML = ""}