dias = []
c= 0
while c < 31:
    c+=1
    if (c<10):
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-03-0"+str(c)+"T12:00:01.0000000Z"]
    else:
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-03-"+str(c)+"T12:00:01.0000000Z"]

d= 0
while d < 30:
    d+=1
    if (c<10):
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-04-0"+str(d)+"T12:00:01.0000000Z"]
    else:
        dias += ["https://rest.coinapi.io/v1/exchangerate/BTC/USD?time=2020-04-"+str(d)+"T12:00:01.0000000Z"]

print (dias)