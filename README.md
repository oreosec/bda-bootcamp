# bda-bootcamp

Install
-----

using yarn:
```bash
yarn
```

using npm:
```bash
npm install
```

Run
----
```bash
sudo service mongod start
```
Dev (nodemon): 
```bash
npm run dev
```
None Dev:
```bash
npm start
```


## ex. Login & Register Request "POSY /login" & "POST /register
```json
{
  "username": "admin",
  "password": "admin"
}
```

## ex. Change Password Request "PUT /user/change/password"
```json
{
  "oldPassword": "admin",
  "newPassword": "admin1"
}
```

## ex. Logout "/logout"

## ex. Add & Edit Menu Request "PUT /menu/add" & "PUT /menu/edit"
```json
{
  "menu": "Sushi",
  "price": "50000",
  "photo": "/asset/image",
  "timeestimate": "60", <- seconds
  "categories": "food"
}
```

## ex. Delete Menu Request "DELETE /menu/delete"
```json
{
  "id": "6h24j2k487dhkahdahj" <- id menu
}
```

## ex. Get All List Menu "GET /menu/all"

## ex. Get Specific Menu "GET /menu/:id"

## ex. Search Menu Request "POST /menu/search"
```json
{
  "search": "teh"
}
```

## ex. New Order Request (Mass) "POST /order/in"
don't forget for table query "?table=1" <- table's number
```json
{
  "order": [
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
```
## ex. Deorder Request "GET /order/out"

## ex. Get Queue Request just add table query (?table=number)
