# Simulation Atlas

Simple web application using React and Flask that shows all NZ faults.

## Requirements

- Node.js 12+
- Python 3.8+

## 1. Download srf plots and extract under backend/data folder:

`https://www.dropbox.com/s/r6m85chswlrj3mf/v18p6_rerun_srf_plots.zip?dl=0`

## 2. Create DB

Run `database.py` and it will create a sqlite DB with data from `data/GeoNet_CMT_solutions_July_2022.csv`.
(Data can be found from [here](https://github.com/GeoNet/data/blob/main/moment-tensor/GeoNet_CMT_solutions.csv))

## 3. Run the app

1. Frontend
  - Require an `.env.development.local` file with the following variables:
    - PUBLIC_URL - To be deployed under sub-directory
    - REACT_APP_BASE_NAME - Router with sub-directory
    - REACT_APP_STATIC_DATA - Static data path
    - REACT_APP_MAPBOX_TOKEN - MapBox token
    - REACT_APP_API_URL - Backend server URL
    - REACT_APP_GA_ID - Google Analytics unique ID
    - REACT_APP_SRF_IMAGE_PATH - SRF directory path
  - `npm install` - if it is the first time running.
  - `npm start`

2. Backend
  - Require an `.env` file with the following variables:
    - type - Those are for `database.py`
    - project_id
    - private_key_id
    - private_key
    - client_email
    - client_id
    - auth_uri
    - token_uri
    - auth_provider_x509_cert_url
    - client_x509_cert_url
    - pga_pgv_images_path - Only variable for backend itself
  - `pip install -r requirements.txt` - to install any necessary packages
  - `python app.py` (Development server)

## Notes about Data

- ### v18p6_rerun_srf_plots:

  All srf images needed to shown on interactive fault map;