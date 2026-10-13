import re
import os
import base64

with open('public/images/king-crest.svg', 'r', encoding='utf-8') as f:
    svg_data = f.read()

svg_b64 = base64.b64encode(svg_data.encode('utf-8')).decode('utf-8')
data_uri = f"data:image/svg+xml;base64,{svg_b64}"

targets = [
    'C:/Users/HAROON TRADERS/OneDrive/Desktop/Import Duty Calculator.html',
    'C:/Users/HAROON TRADERS/OneDrive/Desktop/king web/import-duty-calculator.html'
]

for path in targets:
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace base64 png with vector svg data uri
        new_content = re.sub(r'src="data:image/[^;]+;base64,[^"]+"', f'src="{data_uri}"', content, count=1)
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {path} with crisp SVG logo")
        else:
            print(f"Pattern did not match in {path}")
    else:
        print(f"File not found: {path}")
