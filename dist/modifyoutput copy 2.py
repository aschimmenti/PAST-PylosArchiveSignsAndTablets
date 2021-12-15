 
import collections
import json
from collections import *
import country_converter as coco
cc = coco.CountryConverter()

# Opening JSON file
cardio = open('dist/barchart-jsons/cardiovascular-chart.json')
asthma = open('dist/barchart-jsons/asthma-chart.json')
diabetes = open('dist/barchart-jsons/diabetes-mellitus-chart.json')
iodine = open('dist/barchart-jsons/iodine-chart.json')
iron = open('dist/barchart-jsons/iron-chart.json')
liver = open('dist/barchart-jsons/liver-cancer-chart.json')
protein = open('dist/barchart-jsons/protein-chart.json')
vitamina = open('dist/barchart-jsons/vitamina-chart.json')

cardiodata = json.load(cardio)
asthmadata = json.load(asthma)
diabedata = json.load(diabetes)
iodinedata = json.load(iodine)
irondata = json.load(iron)
liverdata = json.load(liver)
proteindata = json.load(protein)
vitaminadata = json.load(vitamina)


# returns JSON object as
# a dictionary
barchartData = {}
set_nations = set()

for x, y in asthmadata.items():
    for x2 in y:
        set_nations.add(x2)

list_nations = list(set_nations)
def num(s):
    try:
        return int(s)
    except ValueError:
        return float(s)
for nation in list_nations:
    for year, year_dict in asthmadata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                if nation not in barchartData.keys():
                    barchartData[nation] = {}
                    barchartData[nation][year] = {'asthma' : num(year_dict[nation])}
                else:
                    barchartData[nation][year] = {'asthma' : num(year_dict[nation])}

for nation in list_nations:
    for year, year_dict in diabedata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['diabetes'] = num(year_dict[nation])
                    
for nation in list_nations:
    for year, year_dict in iodinedata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['iodine'] = num(year_dict[nation])
                    
for nation in list_nations:
    for year, year_dict in irondata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['iron'] = num(year_dict[nation])
                    
for nation in list_nations:
    for year, year_dict in liverdata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['liver'] = num(year_dict[nation])
                    
for nation in list_nations:
    for year, year_dict in proteindata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['protein'] = num(year_dict[nation])
                    
for nation in list_nations:
    for year, year_dict in vitaminadata.items():
        for nation2 in year_dict:
            if nation2 == nation:
                barchartData[nation][year]['vitamina'] = num(year_dict[nation])
                    



print(barchartData)


with open('dist/barchart-jsons/barchart-new-merge.json', 'w') as fp:
    json.dump(barchartData, fp)
