"""Check publishable assets, link targets and the actual GIF timing."""
import re
import xml.etree.ElementTree as ET
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
readme = (root / 'README.md').read_text()
images = re.findall(r'<img\b[^>]*>', readme)
assert images, 'README has no artwork'
for tag in images:
    assert re.search(r'alt="[^"]+"', tag), f'Missing image description: {tag}'
    source = re.search(r'src="([^"]+)"', tag).group(1)
    assert source.startswith('./assets/rebel/'), f'Unexpected external image: {source}'
    with Image.open(root / source) as image:
        image.verify()
for svg in (root / 'assets/rebel').glob('*.svg'):
    tree = ET.parse(svg)
    assert tree.find('{http://www.w3.org/2000/svg}title') is not None, f'Missing title: {svg}'
for project in ['spark-app', 'pocket-notes']:
    assert f'https://github.com/arslaan07/{project}' in readme
assert '<details>' in readme and 'View the still version' in readme
with Image.open(root / 'assets/rebel/hero.gif') as animation:
    assert animation.size == (1120, 500)
    assert animation.n_frames > 10 and animation.info['loop'] == 0
    duration = 0
    for frame in range(animation.n_frames):
        animation.seek(frame)
        duration += animation.info['duration']
    assert duration == 6160, f'Unexpected loop duration: {duration}'
assert (root / 'assets/rebel/hero.gif').stat().st_size < 1024 * 1024, 'Hero exceeds 1 MiB'
print(f'Validated {len(images)} README images, SVG titles, project links, and the 6.16-second GIF loop.')
