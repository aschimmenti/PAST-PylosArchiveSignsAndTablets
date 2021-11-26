for folder in ./*; do
    for filename in "$folder"/*".jpg"; do
        SIZE=$(python3 getsize.py "$filename")
	    convert "$filename" -background white -gravity "center" -extent "$SIZE" "$filename";
        convert "$filename" -resize "600x600" "$filename";
    done
done