import os
from flask_cors import CORS
from flask import Flask, request, jsonify
from python_utility_code import get_list_of_primary_diagnosis, get_factors

app = Flask(__name__)
cors = CORS(app)

# POST API endpoint


@app.route('/api/post', methods=['POST'])
def post_data():
    # Check if a file or text input is present in the request
    if 'file' in request.files:
        # Get the uploaded file from the frontend
        file = request.files['file']

        # Save the file to the 'uploads' folder
        file.save(os.path.join('uploads', file.filename))

        # Read the contents of the file
        with open(os.path.join('uploads', file.filename), 'r') as f:
            text = f.read()

        # Get the selected option from the frontend
        selected_option = request.form['option']
        # print(selected_option)

        # Process the data using the get_list_of_primary_diagnosis() and get_factors() functions
        discharge_diagnosis = get_list_of_primary_diagnosis(text)
        list_of_primary_diagnosis, underlying_factors = get_factors(
            discharge_diagnosis, selected_option)

        # Return the processed data as a JSON response
        processed_data = {'list_of_primary_diagnosis': list_of_primary_diagnosis,
                          'underlying_factors': underlying_factors}
        return jsonify(processed_data)

    elif 'text' in request.form:
        # Get the text input from the frontend
        text = request.form['text']
        text = text.replace('\r\n', '\n')
        
        # Get the selected option from the frontend
        selected_option = request.form['option']

        # Process the data using the get_list_of_primary_diagnosis() and get_factors() functions
        discharge_diagnosis = get_list_of_primary_diagnosis(text)
        list_of_primary_diagnosis, underlying_factors = get_factors(
            discharge_diagnosis, selected_option)

        # Return the processed data as a JSON response
        processed_data = {'list_of_primary_diagnosis': list_of_primary_diagnosis,
                          'underlying_factors': underlying_factors}
        return jsonify(processed_data)
    else:
        # Return an error response if neither a file nor text input is present
        error_response = {'error': 'No file or text input found in request'}
        return jsonify(error_response), 400


if __name__ == '__main__':
    app.run(debug=True)
