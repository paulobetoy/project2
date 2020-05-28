from flask import Flask, jsonify, request
import requests
import json
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route('/BTC')
def getCoin():
    # url = 'https://rest.coinapi.io/v1/exchanges'
    url = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD'
    headers = {'X-CoinAPI-Key' : '78FA3461-7719-43C7-B5C2-D4F1BEC92B1D'}
    response = requests.get(url, headers=headers)
    content= response.content.decode("utf-8")
    diccionario=json.loads(content)
    print(type(diccionario))
        # decoded = content.decode('utf8')
    # loads = jsonify(json.loads(content))
        # tojson= json.dumps(decoded)
        # replaced=tojson.replace("\n","")
    # raw = {
    # "asset_id_base": "BTC", 
    # "asset_id_quote": "USD", 
    # "rate": 9746.488873822018, 
    # "time": "2020-05-19T12:00:00.7999068Z"
    # }
    # x = loads["time"]
    # print (x)
    # print (replaced)
    # return  replaced
    return (content)



if __name__ == '__main__':
    app.run(debug=True, port=4000)