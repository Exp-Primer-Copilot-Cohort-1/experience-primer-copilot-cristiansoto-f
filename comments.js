// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const { Comment } = require('./models');

const app = express();
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/comments', (req, res) => {
  Comment.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post('/comments', (req, res) => {
  const { account, content, password } = req.body;
  const comment = new Comment({
    account,
    content,
    password,
  });

  comment.save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  Comment.findOne({ _id: id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { password, content } = req.body;
  Comment.findOne({ _id: id })
    .then((data) => {
      if (data.password === password) {
        data.content = content;
        data.save();
        res.json(data);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  Comment.findOne({ _id: id })
    .then((data) => {
      if (data.password === password) {
        Comment.deleteOne({ _id: id })
          .then(() => {
            res.sendStatus(200);
          });
      }
    })});