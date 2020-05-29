from flask import Flask, jsonify, request
import requests
import json
import csv
from flask_cors import CORS
from firebase import Firebase


# CREDENCIAL DE FIREBASE
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

# INICIALIZA LA CONEXION CON BASE DE DATOS DE FIREBASE
firebase = Firebase(config)

# NOMBRE A LA CONEXION DE LA BASE DE DATOS COMO db
db = firebase.database()


# SE INICIALIZA FLASK
app = Flask(__name__)

# DA PERMISO DE CORS PARA INTERACCIÓN CON FRONTEND
CORS(app)

# SE CREA EL ARREGLO DONDE SE GUARDARAN LOS DIAS QUE SE VAN A REQUERIR COMO DATOS INICIALES
dias = []
diasEth= []

# SE INGRESAN LOS FORMATOS DE LINKS PARA LA PETCION DEL MES DE MARZO AL ARREGLO dias
c= 0
while c < 31:
    c+=1
    if (c<10):
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-03-0"+str(c)+"T12:00:01.0000000Z"]
    else:
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-03-"+str(c)+"T12:00:01.0000000Z"]
# print(dias)

# SE INGRESAN LOS FORMATOS DE LINKS PARA LA PERICION DEL MES DE ABRIL AL ARREGLO dias
d= 0
while d < 30:
    d+=1
    if (d<10):
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-04-0"+str(d)+"T12:00:01.0000000Z"]
    else:
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-04-"+str(d)+"T12:00:01.0000000Z"]

c= 0
while c < 31:
    c+=1
    if (c<10):
        diasEth += ["https://rest.coinapi.io/v1/exchangerate/ETH/USD?time=2020-03-0"+str(c)+"T12:00:01.0000000Z"]
    else:
        diasEth += ["https://rest.coinapi.io/v1/exchangerate/ETH/USD?time=2020-03-"+str(c)+"T12:00:01.0000000Z"]
# print(dias)

# SE INGRESAN LOS FORMATOS DE LINKS PARA LA PERICION DEL MES DE ABRIL AL ARREGLO dias
d= 0
while d < 30:
    d+=1
    if (d<10):
        diasEth += ["https://rest.coinapi.io/v1/exchangerate/ETH/USD?time=2020-04-0"+str(d)+"T12:00:01.0000000Z"]
    else:
        diasEth += ["https://rest.coinapi.io/v1/exchangerate/ETH/USD?time=2020-04-"+str(d)+"T12:00:01.0000000Z"]


# RUTA PARA INICIALIZAR LA BASE DE DATOS Y HACER LAS PETICIONES A LA API Y PASAR LOS DATOS A FIREBASE
@app.route('/llenar-btc')
def llenar():

    # SE TRAE DE LA BASE DE DATOS EL VALOR DE "INICIADA" EN SETTINGS
    iniciada = db.child("settings").child("iniciada").get()

    # REVISA SI ES TRUE, EN CASO DE SERLO SOLO REGRESA EL TEXTO DEL RETURN
    if(iniciada.val()=="true"):
        return("BASE DE DATOS INICIALIZADA ANTERIORMENTE")

    # EN CASO DE NO SER TRUE (PUEDE QUE SIMPLEMENTE NO EXISTA, REALIZA EL LLENADO DE LA BASE DE DATOS)
    else:
        for dia in dias:
            url = dia
            headers = {'X-CoinAPI-Key' : '78FA3461-7719-43C7-B5C2-D4F1BEC92B1D'}
            response = requests.get(url, headers=headers)
            content= response.content.decode("utf-8")
            diccionario=json.loads(content)
            time=diccionario["time"]
            db.child("btc").child(time[ 0 : 10 ]).set(diccionario)
            print(dia)

        # AL TERMINAR CREA EL VALOR DE "INICIADA" EN TRUE EN SETTINGS DE LA BASE DE DATOS, PARA QUE NO SE VUELVA A LLENAR SI SE VUELVE A PEDIR LA INFORMACIÓN
        db.child("settings").child("iniciada").set("true")

    return ("LISTO")

@app.route('/llenar-eth')
def llenarEth():

    # SE TRAE DE LA BASE DE DATOS EL VALOR DE "INICIADA" EN SETTINGS
    iniciadaEth = db.child("settings").child("iniciadaEth").get()

    # REVISA SI ES TRUE, EN CASO DE SERLO SOLO REGRESA EL TEXTO DEL RETURN
    if(iniciadaEth.val()=="true"):
        return("BASE DE DATOS INICIALIZADA ANTERIORMENTE")

    # EN CASO DE NO SER TRUE (PUEDE QUE SIMPLEMENTE NO EXISTA, REALIZA EL LLENADO DE LA BASE DE DATOS)
    else:
        for dia in diasEth:
            url = dia
            headers = {'X-CoinAPI-Key' : '78FA3461-7719-43C7-B5C2-D4F1BEC92B1D'}
            response = requests.get(url, headers=headers)
            content= response.content.decode("utf-8")
            diccionario=json.loads(content)
            time=diccionario["time"]
            db.child("eth").child(time[ 0 : 10 ]).set(diccionario)
            print(dia)

        # AL TERMINAR CREA EL VALOR DE "INICIADA" EN TRUE EN SETTINGS DE LA BASE DE DATOS, PARA QUE NO SE VUELVA A LLENAR SI SE VUELVE A PEDIR LA INFORMACIÓN
        db.child("settings").child("iniciadaEth").set("true")

    return ("LISTO")

@app.route('/llenar-brent')
def llenarBrent():
    f = open('brent.csv','r')
    reader = csv.reader(f)
    

    for row in reader:
        diccionario = {
            'asset_id_base':row[2],
            'asset_id_quote': "USD",
            'rate': float(row[1]),
            'time':row[0]
        }
        db.child("brentoil").child(row[0][ 0 : 10 ]).set(diccionario)
        print(diccionario)
    # for item in brent:
    #     print(brent)

    return ("OK")



@app.route('/get-btc')
def getbtc():

    # SE TRAE DE LA BASE DE DATOS EL VALOR DE "INICIADA" EN SETTINGS
    iniciada = db.child("btc").get()


    return (iniciada.val())

@app.route('/get-eth')
def getrth():

    # SE TRAE DE LA BASE DE DATOS EL VALOR DE "INICIADA" EN SETTINGS
    iniciada = db.child("eth").get()


    return (iniciada.val())

@app.route('/get-brent')
def getbrent():

    # SE TRAE DE LA BASE DE DATOS EL VALOR DE "INICIADA" EN SETTINGS
    iniciada = db.child("brentoil").get()


    return (iniciada.val())

if __name__ == '__main__':
    app.run(debug=True, port=4000)