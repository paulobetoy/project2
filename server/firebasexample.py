# from firebase import Firebase
# firebase = Firebase.FirebaseApplication('https://python-crypto-24680.firebaseio.com/', None)
# db = Firebase.database()

# data = {
#     "name": "Joe Tilsed"
# }
# db.child("users").push(data)


from firebase import Firebase

config = {
  "apiKey": "AIzaSyBKIExKnB074D7rlDnTZhA0r_yLApEvuFY",
  "authDomain": "python-crypto-24680.firebaseapp.com",
  "databaseURL": "https://python-crypto-24680.firebaseio.com",
  "projectId": "python-crypto-24680",
  "storageBucket": "python-crypto-24680.appspot.com",
  "messagingSenderId": "437100423401",
  "appId": "1:437100423401:web:f285c8d4d10d852fe0a878",
  "measurementId": "G-BZQDYQBTYN"
}

firebase = Firebase(config)
db = firebase.database()

data = {
    "name": "Joe Tilsed"
}
db.child("users").child("Joe").set(data)