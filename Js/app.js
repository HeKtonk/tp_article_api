const express = require('express');
const app = express();

app.get('/articles', (request, response) => {
    response.json( "Retournera la liste des articles");
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});