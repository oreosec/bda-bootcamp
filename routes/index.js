var express = require('express');
var router = express.Router();

const {
  register,
  login,
  logout,
  isAdmin,
  changePassword,
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
  deOrder,
  getQueueNumber
} = require('../controllers/order.cont');

/* 
ex. Login & Register Request
{
  "username": "admin",
  "password": "admin"
}

ex. Change Password Request
{
  "oldPassword": "admin",
  "newPassword": "admin1"
}

*/
router.post('/login', login);
router.post('/register', register);
router.get('/logout', logout);
router.put('/user/change/password', changePassword);
router.get('/.well_known/jwks.json', (req, res) => {
  res.json(
    {
      "keys": [
          {
              "kty": "RSA",
              "use": "sig",
              "kid": "b88f7144a68f7f2f9e0d9befb1c40cff",
              "alg": "RS256",
              "n": "AMVcGPF62MA_lnClN4Z6WNCXZHbPYr-dhkiuE2kBaEPYYclRFDa24a-AqVY5RR2NisEP25wdHqHmGhm3Tde2xFKFzizVTxxTOy0OtoH09SGuyl_uFZI0vQMLXJtHZuy_YRWhxTSzp3bTeFZBHC3bju-UxiJZNPQq3PMMC8oTKQs5o-bjnYGi3tmTgzJrTbFkQJKltWC8XIhc5MAWUGcoI4q9DUnPj_qzsDjMBGoW1N5QtnU91jurva9SJcN0jb7aYo2vlP1JTurNBtwBMBU99CyXZ5iRJLExxgUNsDBF_DswJoOxs7CAVC5FjIqhb1tRTy3afMWsmGqw8HiUA2WFYcs",
              "e": "AQAB"
          }
      ]
    }  
  );
})

// router.get('/.well_known/jwks.json', (req, res) => {
//   res.json({
//     "keys": [
//       {
//         "alg": "RS256",
//         "e": "65537",
//         "kid": "efe1bca5-ec73-4675-a09c-ae40aa25012d",
//         "kty": "RSA",
//         "n": "973996900513662984724040390327524193072958646234697720165706606054638720015316423496573860563043816370503821329324365369724195802747234768446072397507663395658385361244217966816784575120625652846367341201530207520276628933906086819164422215321026348609786047250080054739585941545768073110281738572521938775167964333853819903701815396273680032000431783257348168736012483867867553770216298674987859750400424492683687472931819884675344742337606897313208732461445908895983184339754746567438973721935822215687170869811297246162736423314853915335213383364204907237708152942322562262781829024123517308667898764547272229020748190645306790579347632165571081407784331204022813629635763848969125459130470552286801230894503323924283590976128596751412939977585739551398571973123332328112345184498531349233175449511876850569292772110421322306351588512063937155245125314181429683729772430257243496433717707190107492852825374863457296233464995749739875578591186636395987421009853015724288353987754287547639644222444646530025686280991799157664009052313429693516730953034139682506241707455122831977903237025246953793283352091421028479294220524558013121761698549792655662037290947981548037799517379625565455704667086043736082340139128002046707899799689",
//         "use": "sig"
//       }
//     ]
//   })
// })

/*
ex. Add & Edit Menu Request
{
  "menu": "Sushi",
  "price": "50000",
  "photo": "/asset/image",
  "timeestimate": "60", <- seconds
  "categories": "food"
}
ex. Delete Menu Request
{
  "id": "6h24j2k487dhkahdahj" <- id menu
}

ex. Search Menu Request
{
  "search": "teh"
}
*/

router.post('/menu/add', isAdmin, addMenu);
router.put('/menu/edit', editMenu);
router.delete('/menu/delete', deleteMenu);
router.get('/menu/all', getAllMenu);
router.get('/menu/:menuId', getMenu);
router.post('/menu/search', searchMenu);

/*
ex. New Order Request (Mass)
don't forget for table query "?table=1" <- table's number
{
  order: [
    {
      "order": "61f35bdd98f476da3bf8813d"
      "count": 2,
      "note": "gak pake micin"
    },
    {
      "order": "61f35bdd98f476da3bf88f4"
      "count": 1,
      "note": "gak pake micin"
    },
    {
      "order": "61f35bdd98f476da3bf88cvd"
      "count": 1,
      "note": "gak pake micin"
    }
  ]
}

ex. Get Queue Request just add table query (?table=number)
*/

router.put('/order/in', newOrder);
router.get('/order/out', deOrder);
router.get('/order/queue', getQueueNumber);


// just for testing
router.post('/parser', (req, res) => {
  const orders = req.body.order;
  // for (let i = 0; i < orders.length; i++) {
  //   const element = orders[i];
  //   console.log(element.order);
  // }
  console.log(orders)
  res.end();
});

module.exports = router;