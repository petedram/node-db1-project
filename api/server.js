const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

module.exports = server;

// db.select('*').from('users');
// shortcut for this:
// db('users'); //resolves to array full of users - from promise


server.get('/', (req, res) => {
    console.log('get /')
    console.log(req.query)
    const orderby = req.query.orderby || 'id';
	const limit = req.query.limit || -1;
	const sortdir = req.query.sortdir || 'asc';


        db('accounts')
        .limit(limit)
        .orderBy(orderby, sortdir)
        .then(account => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(400).json({ message: "accounts not found" })
            }
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, ran into an error" });
        });
})


server.get('/:id', (req, res) => {
    console.log('get /', req.params.id)
    db('accounts')
        .where({ id: req.params.id })
        .then(account => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(400).json({ message: "account not found" })
            }
        })
        .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
        });
})

server.post('/', (req, res) => {
    console.log ('post', req.body)
    const postData = req.body;
    db('accounts')
        .insert(postData)
        .then(account => {
            if (account) {
                res.status(201).json({ date: account});
            } else {
                res.status(400).json({ message: "response from server is undefined" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "failed", err });
        });
});

server.put('/:id', (req, res) => {
    console.log ('put', req.params.id, req.body)
    const changes = req.body;
    db('accounts')
        .where({ id: req.params.id })
        .update(changes) //can also just change the specifics i.e. one item
        .then(account => {
            if (account) {
                res.status(200).json({ data: account });
            } else {
                res.status(404).json({ message: "not found", err });;
            }
        })
        .catch(err => {
            res.status(500).json({ message: "failed", err });
    });
});

server.delete('/:id', (req, res) => {
    console.log('delete', req.params.id)
    db('accounts')
        .where({ id: req.params.id })
        .del()
        .then(account => {
            if (account) {
                res.status(200).json({ message: 'deleted successfully' });
            } else {
                res.status(404).json({ message: 'not found'})
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'failed', err})
        });
});


