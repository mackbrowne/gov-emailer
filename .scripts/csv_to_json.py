# Transform the parliment.csv to json in the format that we want

#TODO(Dan): Replace weird dashes in CSV to normal dashes, otherwise the weird dashes introduce \u2014 chars
#TODO(Dan): Look for spaces in email addresses
#TODO(Dan): Look for other data quality issues

import json
import pandas as pd
df = pd.read_csv('../public/parliment.csv', encoding='UTF-8', usecols=["Province / Territory", "Last Name", "First Name", "Constituency", "Political Affiliation"])

df = df.rename(index=str, columns={"Province / Territory": "province", "First Name": "firstName", "Last Name": "lastName", "Political Affiliation": "party", "Constituency": "constituency"})

df["email"] = df["firstName"]+ '.' + df["lastName"] + '@parl.gc.ca'


json_data = df.to_json(orient='records')

## If you want to experiment with the data, load the json from str format to dict
obj = json.loads(json_data)
obj[0]

file = open('../public/parliment.json', 'wb')
file.write(json_data)
file.close()
