"""Encode the generated SVG frames as a small, self-contained GIF."""
import json
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
timeline = json.loads((root / '.build/timeline.json').read_text())
source_frames = [Image.open(root / '.build/frames' / item['file']).convert('RGB') for item in timeline]
# One palette across every frame avoids color flicker between still and moving art.
palette = source_frames[-1].quantize(colors=64, method=Image.Quantize.MEDIANCUT)
frames = [frame.quantize(palette=palette, dither=Image.Dither.NONE) for frame in source_frames]
output = root / 'assets/rebel/hero.gif'
frames[0].save(output, save_all=True, append_images=frames[1:],
               duration=[item['duration'] for item in timeline], loop=0,
               optimize=True, disposal=1)
print(f'Animated hero: {output.stat().st_size / 1024:.0f} KiB, {sum(item["duration"] for item in timeline) / 1000:.2f}s loop')
