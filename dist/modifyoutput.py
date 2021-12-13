 
import collections
import json
from collections import *
import country_converter as coco
cc = coco.CountryConverter()

# Opening JSON file
f = open('graph-from-mortality.json')
 
# returns JSON object as
# a dictionary
data = json.load(f)

barchartData = {}
years = {}

for x in data['mortality']:
    years[x] = {}

for x in data['mortality']:
    for nation in data['mortality'][x]:
        newvaluename = nation['name']
        newvaluev = nation['value']
        years[x][newvaluename] = newvaluev



def get_key(key):
    try:
        return int(key)
    except ValueError:
        return key

ordered = collections.OrderedDict(sorted(years.items(), key=lambda t: get_key(t[0])))

with open('barchart.json', 'w') as fp:
    json.dump(ordered, fp)
