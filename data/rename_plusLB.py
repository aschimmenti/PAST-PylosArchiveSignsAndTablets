import os, glob, shutil
from argparse import ArgumentParser 
import re
root_folder = r'./An/An_1484'

for dirpath, dirnames, files in os.walk(root_folder):
        print(dirpath)
        for file in files: 
            if '.jpg' in file: 
                continue
            if '.py' in file: 
                continue
            if 'LB_' in file: 
                continue
            new_file_name = 'LB_' + file
            os.rename(os.path.join(dirpath, file), os.path.join(dirpath, new_file_name))
