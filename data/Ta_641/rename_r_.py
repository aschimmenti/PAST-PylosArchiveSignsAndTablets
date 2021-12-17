import os, glob, shutil
from argparse import ArgumentParser 
import re
root_folder = r'./'

for dirpath, dirnames, files in os.walk(root_folder):
        for file in files: 
            if '.jpg' in file: 
                continue
            if '.py' in file: 
                continue
            if '_r' in file: 
    #            tablet = re.findall(r'(LB_[A-Z][a-z]_[\d]{1,4}_)[\d]+', file)[0]
    #            idx = re.findall(r'LB_[A-Z][a-z]_(r[\d]{1})_', file)[0]
                row = re.findall(r'LB_[A-Z][a-z]_[\d]{1,4}_r([\d]+)_.*.png$', file)[0]
    #            rname = tablet+'r'+idx+'_'+sign
    #            os.rename(os.path.join(dirpath, file), os.path.join(dirpath, rname))
                if row:
                    tablet = re.findall(r'(LB_[A-Z][a-z]_[\d]{1,4}_r)', file)[0]
                    sign =  re.findall(r'LB_[A-Z][a-z]_[\d]{1,4}_r[\d]+(_.*.png$)', file)[0]
                    rname = tablet + str(int(row)-1) + sign
                    os.rename(os.path.join(dirpath, file), os.path.join(dirpath, rname))

                     
