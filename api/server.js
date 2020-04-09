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
    db('accounts')
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



// db('users').where({ id: 3 });
// // resolves to array containing any users that match the where

// db('users').insert({ name: 'amanda', age: 76 });
// // resolves to array containing the id of the new user

// db('user').where({ id: 5 }).update({ age: 77 });
//  where comes before the update in knex which is different from sql
// resolves to the count of the records updated





//from lecture
// router.get('/:id', (req, res) => {
//     db('posts')
//       .where({ id: req.params.id })
//       .first() 
//       .then(post => {
//         if(post) {
//           res.status(200).json({ data: post });
//         } else {
//           res.status(400).json({ message: "Post not found" }) // worked on postman
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: "sorry, ran into an error" });
//       });
//   });

// router.get("/:id", (req, res) => {
//     const { id } = req.params;
//     db.select()
//       .from("posts")
//       .where({ id })
//       .then((post) => res.status(200).json(post))
//       .catch((err) =>
//         res.status(500).json({ message: "error retrieving post with id", err })
//       );
//   });


// router.post('/', (req, res) => {
//     const postData = req.body;

//     db('posts')
//         .insert(postData)
//         .then(post => {
//             res.status(201).json(post);
//         })
//         .catch(err => {
//             res.status(500).json({ message: "failed", err });
//         });
// });

// router.put('/:id', (req, res) => {
//     const {id} = req.params;
//     const changes = req.body;

//     db('posts')
//         .where({id})
//         .update(changes)
//         .then(count => {
//             if (count) {
//                 res.json({ updated: count });
//             } else {
//                 res.status(404).json({ message: "not found", err });;
//             }
//         })
//         .catch(err => {
//             res.status(500).json({ message: "failed", err });
//     });


//     router.delete('/:id', (req, res) => {
//         const { id } = req.params;
//         db('posts')
//             .where({id})
//             .del()
//             .then(deleted => {
//                 res.status(200).json(deleted)
//             })
//             .catch(err => {
//                 res.status(500).json({message: 'post deleted'})
//             })
//     });

//     db("posts")
//     .where({ id })
//     .del()
//     .then((deleted) =>
//       deleted
//         ? res.status(204).end()
//         : res.status(404).json({ message: "id not found" })
//     )
//     .catch((err) => res.status(404).json({ message: "error deleting", err }));

// router.delete('/:id', (req, res) => {
//     db("posts")
//     .where({id: req.params.id})
//     .del()
//     .then(count => {
//         if (count > 0) {
//             res.status(200).json({message: "Post deleted successfully."});
//         } else {
//             res.status(404).json({message: "Post cannot be found."});
//         }
//     })
//     .catch(err => {
//         res.status(500).json({message: "Sorry, ran into an error."})
//     })
// })