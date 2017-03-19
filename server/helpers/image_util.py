from io import BytesIO

import numpy as np
from PIL import Image


def png_to_jpeg(image_bytes):
    img = Image.open(BytesIO(image_bytes))
    return np.array(img)[:, :, 0:3]
