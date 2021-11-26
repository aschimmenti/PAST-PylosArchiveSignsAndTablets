from PIL import Image
from glob import glob
import sys 

img = sys.argv[-1]
w,h = Image.open(img).size
maxsize = max(w,h)

print("{}x{}".format(maxsize, maxsize))
