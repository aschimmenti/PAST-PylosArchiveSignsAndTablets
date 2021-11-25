import os
import json
import re 
import cv2
import numpy as np
import time
import glob
root_folder = r'./'
series = []
for root, dirnames, filenames in os.walk('./'):
    for d in dirnames: 
        series.append(d)
    break
print(series)

content = {}

for s in series: 
    root_folder = './' + s
    print(root_folder)
    series_key = root_folder.replace('./','')


    content[series_key] = {}
    
    
    for dirpath, dirnames, files in os.walk(root_folder):
        if '.py' in ''.join(files): 
            continue

        else:
            key = dirpath.replace(root_folder + '\\','')
            file_map_list = []
            for file in files: 
                if '.jpg' in file: 
                    continue
                #print(file)
                print(file)
                tablet = re.findall(r'LB_([A-Z][a-z]_[\d]{1,4}[a-z]?)_', file)[0]
                #print(tablet)
                row = re.findall(r'_r([\d]{1,2})_', file)[0]
                #print(row)
                index = re.findall(r'_r[\d]{1,2}_([\d]{1,2})_', file)[0]
                #print(index)
                sign = re.findall(r"_r[\d]{1,2}_[\d]{1,2}_(.*).png$", file)[0]
                file_map = (tablet, int(row), int(index), sign)
                file_map_list.append(file_map)
                print(dirpath, file_map)
            list_of_filenames = []
            for file in files: 
                if '.jpg' in file:
                    continue
                else: 
                    list_of_filenames.append(file)
            content[series_key][key] = {'filenames' : list_of_filenames, 'file_maps' : file_map_list}

print(content['Aa'])

with open('index.json', 'w') as json_file:
  json.dump(content, json_file)