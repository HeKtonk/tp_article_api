const express = require('express');
const app = express();

app.get('/articles', (request, response) => {
    response.json( "Retournera la liste des articles");
})

app.get('/article/1', (request, response) => {
    response.json("Retournera l'article ayant l'id 1");
})

app.post('/article/save-article', (request, response) => {
    response.json("Va créer/mettre à jour un article envoyé");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});