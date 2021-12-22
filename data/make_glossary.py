 
import json
import string
# Opening JSON file
f = open('data/result2.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)

glossary = []
for k,y in data.items():
    newtext =  ' '.join(y)
    glossary.append(' '.join([word.strip(string.punctuation) for word in newtext.split()]))

j_glossary = ' '.join(glossary)


linearb = set([word.strip(string.punctuation) for word in j_glossary.split()])

print(linearb)