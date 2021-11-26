#!/bin/bash

if [[ "$#" -ne 1 ]]; then
	echo "usage: ./resize.sh images_directory"
	exit
fi

IMGPATH="$1"

for filename in "$IMGPATH"/*".jpg"
do
	SIZE=$(python3 getsize.py "$filename")
	convert "$filename" -background white -gravity "center" -extent "$SIZE" "$filename";
        convert "$filename" -resize "600x600" "$filename";
done
