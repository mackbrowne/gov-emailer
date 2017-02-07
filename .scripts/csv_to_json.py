# Transform the parliment.csv to json in the format that we want
#
# parliment.csv comes from: http://www.parl.gc.ca/Parliamentarians/en/members

#TODO(Dan): Replace weird dashes in CSV to normal dashes, otherwise the weird dashes introduce \u2014 chars
#TODO(Dan): Look for other data quality issues

import json
import pandas as pd
df = pd.read_csv('../public/parliment.csv', encoding='UTF-8', usecols=["Province / Territory", "Last Name", "First Name", "Constituency", "Political Affiliation"])

df = df.rename(index=str, columns={"Province / Territory": "province", "First Name": "firstName", "Last Name": "lastName", "Political Affiliation": "party", "Constituency": "constituency"})

df["email"] = df["firstName"]+ '.' + df["lastName"] + '@parl.gc.ca'

# Find courner cases (for experimenting)
# df[df['email'].str.contains('.\..\.')] # T.J. Harvey, you bastard

# Fix courner cases
df['email'] = df['email'].str.replace(' ', '') # Remove spaces in names
df['email'] = df['email'].str.replace('(.)(\.)(.)(\.)', '\\1\\3') # Fix first names that look like T.J. (change to TJ)
df['email'] = df['email'].str.replace('.\.\.', '.') # Remove abbreviation in name such as 'A.'

json_data = df.to_json(orient='records')

## If you want to experiment with the data, load the json from str format to dict
# obj = json.loads(json_data)
# obj[0]

file = open('../public/parliment.json', 'wb')
file.write(json_data)
file.close()
