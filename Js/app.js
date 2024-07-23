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

// parses incoming requests with JSON payloads
app.use(express.json());
app.post('/article/save-article', (request, response) => {
    response.json("Va créer/mettre à jour un article envoyé");
    console.log(request.body);
    articles.push(request.body);
})

app.delete('/article/:id', (request, response) => {
    response.json(`Supprimera l\'article ${JSON.stringify(articles[request.params.id])}`);
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});