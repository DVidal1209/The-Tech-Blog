const router = require('express').Router();
const { User } = require('../../models');

// Create new user
router.post('/', async (req, res) => {
  try {
    let userData = await User.create(req.body);
    const user = userData.get({plain: true})
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User log in
router.post('/login', async (req, res) => {
  try {
    let userData = await User.findOne({ where: { username: req.body.username } });
  
    // Checks if username exists
    if (!userData) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    // Checks if password is correct
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect username or password, please try again' });
      return;
    }
    const user = userData.get({plain: true})
    // saves user session once log in is successful
    req.session.save(() => {
      req.session.user_id = user.id;
      req.session.logged_in = true;
      res.status(200).json({ user: user, message: 'You are now logged in!' });
    });

  }
  // Error handler
  catch (err) {
    res.status(400).json(err);
  }
});

//User log out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
