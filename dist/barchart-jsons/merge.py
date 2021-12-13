import collections
import json

cardio = open('barchart-jsons/cardiovascular-chart.json')
asthma = open('barchart-jsons/asthma-chart.json')
diabetes = open('barchart-jsons/diabetes-mellitus-chart.json')
iodine = open('barchart-jsons/iodine-chart.json')
iron = open('barchart-jsons/iron-chart.json')
liver = open('barchart-jsons/liver-cancer-chart.json')
protein = open('barchart-jsons/protein-chart.json')
vitamina = open('barchart-jsons/vitamina-chart.json')

cardiodata = json.load(cardio)
asthmadata = json.load(asthma)
diabedata = json.load(diabetes)
iodinedata = json.load(iodine)
irondata = json.load(iron)
liverdata = json.load(liver)
proteindata = json.load(protein)
vitaminadata = json.load(vitamina)
merged = {}

def num(s):
    try:
        return int(s)
    except ValueError:
        return float(s)

def fixString(dict):
    newDict = {}
    for x, y in dict.items():
        newDict[x] = y
        for x2, y2 in y.items(): 
            newDict[x][x2] = num(y2)
    return newDict





merged['Cardio'] = fixString(cardiodata)
merged['Asthma'] = fixString(asthmadata)
merged['Diabetes'] = fixString(diabedata)
merged['Iodine'] = fixString(iodinedata)
merged['Iron'] = fixString(irondata)
merged['Liver'] = fixString(liverdata)
merged['Protein'] = fixString(proteindata)
merged['VitaminA'] = fixString(vitaminadata)


with open('merged.json', 'w') as fp:
    json.dump(merged, fp)
