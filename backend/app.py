import os

from dotenv import load_dotenv

from server import app

if __name__ == "__main__":
    load_dotenv()
    app.run(
        threaded=False, host="0.0.0.0", processes=4, port=os.environ.get("port", 5080),
    )
