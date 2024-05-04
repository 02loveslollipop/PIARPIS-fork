from pymongo import MongoClient
import certifi

MONGO_URY='mongodb+srv://Admin:1234@cluster0.hdnfyfa.mongodb.net/'
ca = certifi.where()

def dbConnection():
    try:
        client = MongoClient.connect(MONGO_URY, tlsCAFILE=ca)
        db= client["db_Piarpis"]
    except ConnectionError:
        print('Error de conexión con la bdd')
    return db
