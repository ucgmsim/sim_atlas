# Sim Atlas - Frontend

## Contents

- [Naming](#naming)
- [Requirements](#requirements)
- [Running locally](#running-locally)
- [Deployment](#deployment)

## Naming

- **Filename** : PascalCase (ex: SiteSelection.js, SiteSelectionVS30.js) except index files (ex: index.js, index.html, index.css...)
- **Variables & Functions** : camelCase (ex: siteSelectionLng, siteSelectionLat) except the function is used to render a component (ex: HazardCurveSection.js)
- **HTML Class/ID Names** : All lower case and separate with a hyphen (ex:hi-my-name-is-tom)

## Requirements

- Node v12
- `.env.development.local` with the following environment variables for development version.
  - PUBLIC_URL= `# As we are deploying the App under sub-directory`
  - REACT_APP_BASE_NAME= `# As we are deploying the App under sub-directory`
  - REACT_APP_STATIC_DATA= `# Backend's static directory`
  - REACT_APP_MAPBOX_TOKEN= `# MAPBOX token`
  - REACT_APP_API_URL= `# Backend URL`
  - REACT_APP_GA_ID= `# Google Anyltics key`
  - REACT_APP_SRF_IMAGE_PATH= `# Backend's SRF directory`

#### To run Frontend: `npm run start`

## Running locally

Open a terminal to do the following steps:

1. Change the directory to frontend

```shell
cd /your_path/sim_atlas/frontend
```

2. Install packages

```shell
npm install
```

3. Start an app

```shell
npm run start
```

## Deployment

1. Install packages
```shell
# In case there are some new packages to install
npm install
```

2. Build first
```shell
# To include the .env file while building
npm run build:dev
```

3. Copy the `/build` directory to `/var/www/sim_atlas`