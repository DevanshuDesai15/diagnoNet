import json
import os
import re

def get_factors(list_of_primary_diagnosis, database_file):

    if database_file == 'database1':
        database_file = 'biobert_result_database.json'
    elif database_file == 'database2':
        database_file = 'database2.json'
    elif database_file == 'database3':
        database_file = 'database3.json'

    database_file = os.path.join(os.path.dirname(__file__)+"\JSON\\", database_file)
    # print(database_file)
    try:
        # print("Inside try")
        with open(database_file, 'r') as file:
            # Load the JSON data from the file into a Python dictionary
            database_dict = json.load(file)
            # print(database_dict)
    except FileNotFoundError:
        # print("Inside except")
        database_dict = {}

    underlying_factors = [database_dict.get(pri_diag, ['No factors in our database']) for pri_diag in list_of_primary_diagnosis]

    # testing
    if not underlying_factors:
        underlying_factors = [['f11', 'f12'], ['f21'], ['f31', 'f32', 'f33', 'f34']]

    return list_of_primary_diagnosis, underlying_factors


def get_list_of_primary_diagnosis(content):
    pattern = r"Discharge Diagnosis:\n([\s\S]*?)(?=\n\n)"
    primary_pattern = r'Primary:\n(.*?)\n\.'

    try:
        text_found = re.search(pattern, content, re.DOTALL).group(1)
    except AttributeError:
        text_found = ""

    try:
        primary_diagnosis = re.search(primary_pattern, text_found, re.DOTALL).group(1)
    except AttributeError:
        primary_diagnosis = text_found

    primary_diagnosis = primary_diagnosis.split('\n')
    if primary_diagnosis[0] in ['Primary:', 'Primary Diagnosis:']:
        primary_diagnosis = primary_diagnosis[1:]

    # remove_non_alphabet_prefix
    primary_diagnosis = [re.sub(r'^[^a-zA-Z]*', '', s) for s in primary_diagnosis]

    # testing
    if not primary_diagnosis:
        primary_diagnosis = ['a', 'b', 'c']

    return primary_diagnosis