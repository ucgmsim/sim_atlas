import pathlib
import os

from dotenv import load_dotenv

load_dotenv()


def exist_pga_pgv_image(im: str, fault: str):
    return (
        True
        if (
            pathlib.Path(os.environ.get("pga_pgv_images_path"))
            / f"{im}/{fault}_{im.upper()}.png"
        ).exists()
        else False
    )
