const express = require('express');
const router = express.Router();
const User = require('../models/users.js');


router.get('/json', (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) {
      res.send(err)
    } else {
      res.send(allUsers)
    }
  })
})

router.get('/:id/edit', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    res.render('edit.ejs', {
      user: foundUser
    });
  });
});

router.get('/new', (req, res) => {
  res.render('new.ejs');
});

router.get('/', (req, res) => {
  User.find({}, (error, allUsers) => {
    res.render('index.ejs', {
      users: allUsers
    });
  });
});

router.delete('/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id, (error, users) => {
    res.redirect('/users');
  });
});

router.get('/:id', (req, res) => {
  User.findById(req.params.id, (error, foundUser) => {
    console.log(foundUser);
    res.render('show.ejs', {
      users: foundUser
    });
  });
});

router.put('/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (error, updatedModel) => {
    res.redirect('/users');
  });
});

router.post('/', (req, res) => {
  User.create(req.body, (error, createdUser) => {
    res.redirect('/users/' + createdUser.id);
  });
});

router.get('/seed/newusers', (req, res) => {
  const newUsers =
  [{
    username: 'exampleusername',
    password: "examplepassword",
    first_name: 'examplefirstname',
    last_name: 'examplelastname',
    item_description: 'exampleitemdescription',
    item_title:  'exampletitle',
    item_image: 'http://hanabi.autoweek.com/sites/default/files/styles/gen-1200-675/public/2018-nissan-gt-r-photo-1.jpg?itok=49OBUjn8'
  }, {
    username: 'bsanders',
    password: '12',
    first_name: 'barry',
    last_name: 'sanders',
    item_description: 'football player',
    item_title:  'Barry Sanders',
    item_image: 'http://cdn2.bigcommerce.com/server3100/fmv7lp7t/products/31578/images/122359/barry-sanders-signed-16x20-white-js-photo-jsasi__19647.1523548775.1280.1280.jpg?c=2'
  }, {
    username: 'peter',
    password: "pete",
    first_name: 'peter',
    last_name: 'piper',
    item_description: 'doll',
    item_title:  'peter piper doll',
    item_image: 'https://i.pinimg.com/736x/63/8e/22/638e228a80dbd63df5623831a45aad9d--shrek-costume-costume-ideas.jpg'
  }, {
  username: "fewtch",
  password: "123",
  first_name: "future",
  last_name: "hendrick",
  item_description: "rapper mixtape",
  item_title: "Beast Mode 2 Mixtape",
  item_image: "http://www.rap-up.com/app/uploads/2018/07/future-beastmode-2.jpg"
  }, {

  username: "jchicken",
  password: "1234",
  first_name: "jerk",
  last_name: "chicken",
  item_description: "food",
  item_title: "Jamaican Jerk Chicken",
  item_image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/8/17/0/HK0105H_jamaican-jerk-chicken_s4x3.jpg.rend.hgtvcom.616.462.suffix/1371600115548.jpeg"
  }, {

  username: 'MJ',
  password: "23",
  first_name: "Michael",
  last_name: "Jordan",
  item_description: "Bastball Player",
  item_title: "GOAT",
  item_image: "https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fpippenainteasy.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F10%2F521181842-chicago-bulls-v-portland-trailblazers.jpg.jpg&w=850&h=560&c=sc"
  }
  ]

    User.create(newUsers, (error, user) => {
      if(error) {
        console.log(error);
        res.redirect('/users')
      }
      const userSeeds = require('../models/seed.js')
      router.get('/seed/newusers/viaseedfile', (req, res) => {
        User.insertMany(userSeeds, (error, users) => {
          if(error) {
            console.log(error);
          } else {
            res.send(users);
          }
        });
      });
    });
});

router.get('/dropdatabase', (req, res) => {
  User.collection.drop()
  res.send('You did it! You dropped the database!')
});

module.exports = router;
