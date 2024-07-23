const express = require('express');
const app = express();

let articles = [
    { id: 1, title: 'Premier article', content: 'Contenu du premier article', author: 'Isaac' },
    { id: 2, title: 'Deuxième article', content: 'Contenu du deuxième article', author: 'Sanchez' },
    { id: 3, title: 'Troisième article', content: 'Contenu du troisième article', author: 'Toto' }
];

app.get('/articles', (request, response) => {
    response.json(articles);
})

app.get('/article/:id', (request, response) => {
    response.json(JSON.stringify(articles[request.params.id]));
})

// parses incoming requests with JSON payloads(body)
app.use(express.json());
app.post('/article/save-article', (request, response) => {
    /*
    response.json("Va créer/mettre à jour un article envoyé");
    articles.push(request.body);
    */

    // On récupère le JSON
    const articleJSON = request.body;

    let foundArticle = null;

    // Est-ce qu'on a un id envoyé dans le JSON
    if(articleJSON.id != undefined || articleJSON.id ){
        // Essayer de trouver un article existant
        foundArticle = articles.find(article => article.id === articleJSON.id);
    }

    // Si je trouve je modifie
    if(foundArticle){
        foundArticle.title = articleJSON.title;
        foundArticle.content = articleJSON.content;
        foundArticle.author = articleJSON.author;

        return response.json(`L'article à été modifié avec succès`);
    }

    // Sinon par défaut je crée
    articles.push(articleJSON);
    return response.json(`Article créé avec succès`)
})

app.delete('/article/:id', (request, response) => {

    /*
    if(request.params.id > articles.length){
        response.json("Article inexistant");
    } else {
        response.json(`Supprime l\'article ${request.params.id}`);
        delete articles[request.params.id];
    }
    */

    // Il faut l'id en entier
    const id = parseInt(request.params.id);

    // Trouver l'index
    const foundArticleIndex = articles.findIndex(article => article.id === id);

    if(foundArticleIndex < 0){
        return response.json(`Impossible de supprimer un article inexistant`)
    }

    // Supprimer grace à  l'index
    articles.slice(foundArticleIndex, 1);

})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});