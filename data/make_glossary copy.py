 
import json
import string

from spacy import glossary
# Opening JSON file
f = open('data/Pylos.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)

newdata = {}
for k,y in data.items():
    key = k.replace("PY ", "")
    code = k[3:-2].strip()
    series = key[-2:]
    newkey = series+"_"+code
    glossary_lines = []
    for line in y:
        words = line.split(" ")
        j_glossary = ' , '.join(words)
        print(j_glossary) 
        glossary_lines.append(j_glossary)
    newdata[newkey] = glossary_lines
print(newdata['Cn_418'])

with open('result3.json', 'w') as json_file:
  json.dump(newdata, json_file)