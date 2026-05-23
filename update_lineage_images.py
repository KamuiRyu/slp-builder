import re

file_path = 'src/config/skills.ts'
with open(file_path, 'r') as f:
    content = f.read()

# Pattern for lineage image source
pattern = r"imageSrc: '/images/lineages/([^']+)\.webp'"

def replace_ext(match):
    name = match.group(1)
    # List of files we know were converted to webp
    # uchiha-1, uchiha-2, uchiha-3 etc.
    return f"imageSrc: '/images/lineages/{name}.webp'"

# Actually they are already .webp in the file if my previous sed worked,
# but let's check one to be sure.
