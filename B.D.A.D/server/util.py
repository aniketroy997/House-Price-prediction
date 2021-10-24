import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None

def get_estimated_price(Location,Area,No_of_Bedrooms,Resale):
    try:
        loc_index = __data_columns.index(Location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = Area
    x[1] = No_of_Bedrooms
    x[2] = Resale
    if loc_index>=0:
        x[loc_index] = 1
    print("Output: -----------------------------------------------------------", round(__model.predict([x])[0],2))
    return round(__model.predict([x])[0],2)


def load_saved_artifacts(State):
    print("On CLick It called the function")
    print("loading saved artifacts...start")
    global  __data_columns
    global __locations

    with open("./artifacts/"+State, "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[15:]  # first 3 columns are sqft, bath, bhk

    global __model
    StateModel = State.split("_");
    print('./artifacts/' + StateModel[0] + '_home_prices_model.pickle')

    StateModel = State.split("_");
    print('./artifacts/'+StateModel[0]+'_home_prices_model.pickle')
    with open('./artifacts/'+StateModel[0]+'_home_prices_model.pickle', 'rb') as f:
        __model = pickle.load(f)
    print("loading saved artifacts...done")

def get_location_names(State):
    load_saved_artifacts(State)
    return __locations

def get_data_columns():
    return __data_columns