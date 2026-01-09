import shutil
import glob
import os

# Source directory (Artifacts)
source_dir = r"C:\Users\gunap\.gemini\antigravity\brain\d3c05ed5-1d0c-408c-ab98-7488749f3c43"
# Destination directory
dest_dir = r"C:\Users\gunap\OneDrive\Desktop\AI Fullstack\backend\media\watches"

# Ensure destination exists
os.makedirs(dest_dir, exist_ok=True)

# Map patterns to filenames
mapping = {
    "rolex_submariner_style_*.png": "rolex.png",
    "patek_philippe_style_*.png": "patek.png",
    "omega_speedmaster_style_*.png": "omega.png",
    "audemars_piguet_style_*.png": "ap.png"
}

for pattern, dest_name in mapping.items():
    search_path = os.path.join(source_dir, pattern)
    files = glob.glob(search_path)
    if files:
        # Take the most recent if multiple (though likely one)
        latest_file = max(files, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, dest_name)
        shutil.copy2(latest_file, dest_path)
        print(f"Copied {latest_file} to {dest_path}")
    else:
        print(f"No file found for pattern {pattern}")
