for f in *.tif; do  echo "Converting $f"; convert "$f"  "$(basename "$f" .tiff).jpg"; done;
