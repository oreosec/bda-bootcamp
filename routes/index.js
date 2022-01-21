var express = require('express');
var router = express.Router();

const {
  register,
  login,
  logout,
} = require('../controllers/auth.cont');

const {
  addMenu,
  editMenu,
  deleteMenu,
  getAllMenu,
  getMenu,
  searchMenu,
} = require('../controllers/menu.cont');

const {
  newOrder,
  deOrder
} = require('../controllers/order.cont');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);

router.post('/addMenu', addMenu);
router.put('/editMenu', editMenu);
router.delete('/deleteMenu', deleteMenu);
router.get('/getAllMenu', getAllMenu);
router.get('/getMenu/:menuId', getMenu);
router.post('/searchMenu', searchMenu);

router.post('/newOrder', newOrder);
router.get('/deOrder', deOrder);

module.exports = router;
