# Sim Atlas - Backend

## Contents

- [Requirements](#requirements)
- [Running locally](#running-locally)

## Requirements

- Python 3.8+
- `qcore` package is needed while creating a database
- `.env` with the following environment variables for development version.
  - type= `# Required to access Google Sheet to pull some data`
  - project_id= `# Required to access Google Sheet to pull some data`
  - private_key_id= `# Required to access Google Sheet to pull some data`
  - private_key= `# Required to access Google Sheet to pull some data`
  - client_email= `# Required to access Google Sheet to pull some data`
  - client_id= `# Required to access Google Sheet to pull some data`
  - auth_uri= `# Required to access Google Sheet to pull some data`
  - token_uri= `# Required to access Google Sheet to pull some data`
  - auth_provider_x509_cert_url= `# Required to access Google Sheet to pull some data`
  - client_x509_cert_url= `# Required to access Google Sheet to pull some data`
  - pga_pgv_images_path= `# To check if the image exists so the frontend can decide to display an option`

#### To run Backend:

## Running locally

Open a terminal to do the following steps

1. Change the directory to backend

```shell
cd /your_path/sim_atlas/back
```

2. Install packages - if it's your first time running

```shell
pip install -r requirements.txt
```

3. Start an app

```shell
python app.py
```