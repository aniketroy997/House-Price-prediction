from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route('/get_location_names', methods=['POST'])
def get_location_names():
    State = request.form['State']
    response = jsonify({
        'locations': util.get_location_names(State)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    Location = request.form['Location']
    Area = float(request.form['Area'])
    No_of_Bedrooms = int(request.form['No_of_Bedrooms'])
    Resale = int(request.form['Resale'])

    response = jsonify({
        'estimated_price': util.get_estimated_price(Location,Area,No_of_Bedrooms,Resale)
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == "__main__":
    print("Starting Python Flask Server For Home Price Prediction...")
    util.load_saved_artifacts("mumbai_columns.json")
    app.run()