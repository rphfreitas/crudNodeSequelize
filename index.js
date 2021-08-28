const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const { User } = require('./app/models');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}); //Listar todos

app.post('/users', async (req, res) => {
    const user = await User.create(req.body);
    console.log(user);
    res.json(user);
}); // Criar

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
        console.log('Not found!');
    } else {
        res.json(user);
    }
}); //Buscar

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    await User.update(req.body, {
        where: {
            id: id
        }
    }).then(res.json('Usuário alterado com sucesso!!!')).catch(err => res.json(err));
}); //Editar
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    await User.destroy({
        where: {
            id: id
        }
    }).then(res.json('Usuário deletado com sucesso!!!')).catch(err => res.json(err));
}); //Deletar

app.listen(3000);