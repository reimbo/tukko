![IoTitude logo](logo-iotitude.png)

# IoTitude 2023

* We are a virtual company operating under WIMMA Lab of Jyväskylä University of Applied Sciences.
* [Tukko Core - Documentation](https://wimma-lab-2023.pages.labranet.jamk.fi/iotitude/core-traffic-visualizer/)

## WIMMA Lab

<img style="width: 150px;" src="logo_round.png" alt="wimma lab logo">

* WIMMA Lab is a learning environment where students solve assignments in multidisciplinary project teams.
* Read more at [wimmalab.org](https://www.wimmalab.org/)
* Is a part of Jyväskylä University of Applied Sciences [jamk.fi](https://www.jamk.fi)

# Team Members

| Name | Description | Company / entity Task Responsibilities | LinkedIn |
|:-:|:-:|:-:|:-:|
| [Reima Parviainen](https://gitlab.labranet.jamk.fi/AA6135) | Team Leader | IoTitude /  Lead the project and handle test planning | [LinkedIn](https://www.linkedin.com/in/reima-parviainen) |
| [Justus Hänninen](https://gitlab.labranet.jamk.fi/AB6225) | Junior Developer | IoTitude /  Backend, TypeScript, SKILL-db API | [LinkedIn](https://www.linkedin.com/in/justus-hanninen/) |
| [Hai Nguyen](https://gitlab.labranet.jamk.fi/AA7776) | Junior Developer | IoTitude /  Backend, API, Data visualization, Gitlab Pipeline | [LinkedIn](https://www.linkedin.com/in/hainnp/) |
| [Ilia Chichkanov](https://gitlab.labranet.jamk.fi/AB0189) | Junior Developer | IoTitude /  Backend, SKILL-db API | [LinkedIn](https://www.linkedin.com/in/ilia-chichkanov/) |
| [Olli Kainu](https://gitlab.labranet.jamk.fi/AA4157) | Junior Developer | IoTitude /  Frontend | [LinkedIn](https://www.linkedin.com/in/olli-kainu-930371235) |
| [Otto Nordling](https://gitlab.labranet.jamk.fi/AA4431) | Junior Developer / Tester | IoTitude /  Testing | [LinkedIn](https://www.linkedin.com/in/otto-nordling-67901b277/) |
| [Alan Ousi](https://gitlab.labranet.jamk.fi/AB8823) | Junior Developer / Tester | IoTitude /  Testing | [LinkedIn](https://www.linkedin.com/in/alan-ousi-241218277/) |

![Team](iotitude.png)

# Tukko

Tukko ([*"clog"*](https://en.wiktionary.org/wiki/tukko)) is a traffic visualizer web application built with [React](https://react.dev/)

WIMMA Lab 2023 IoTitude created Tukko - Traffic Visualizer, an assigment given by Combitech. Tukko utilizes data from digitraffic API, and improves upon it by unifying the scattered info across multiple endpoints into our own much simpler API. We also gather data long term, which can later be shown to users to check for recent anomalies.

This data is then shown in a React based user interface, with mapping tools by Leaflet utilizing multiple plugins such as Geoman and Cluster markers. Utilizing custom icons, popups and tooltips, Tukko strives to convey information intuitively. For the more interested users, more in depth information is available. Development for Tukko followed best practices by utilizing a very strict ruleset maintained by Typescript and ESLint. Tukko is a complete product, but our team had many ideas left unfulfilled due to time constraints.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)[![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?&style=for-the-badge&logo=redis&logoColor=white)](https://redis.io/)[![Expess.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)[![REST API](https://img.shields.io/badge/REST%20API-blue?style=for-the-badge&logo=rest)](https://restfulapi.net/)[![Vite](https://img.shields.io/badge/Vite-orange?style=for-the-badge&logo=vite)](https://vitejs.dev)

## Installation

For development environment you will need:
- Your favorite code editor ([vim](https://www.vim.org/), [vscode](https://code.visualstudio.com/), [nano](https://nano-editor.org/))
- Node.js ([v18.16.0 or higher](https://nodejs.org/en/about))
- Node Package Manager ([npm](https://www.npmjs.com/))
    -  **Install:**
        - [Node Version Manager (Recommended)](https://github.com/nvm-sh/nvm)
        - [Download for Windows, macOS, Linux](https://nodejs.org/en/download)
- Git 
    - [Download](https://git-scm.com/download)
- Tukko's backend ([Github](https://github.com/reimbo/tukko-backend))
- Docker for production version ([Docker](https://www.docker.com/))

## Development

```bash
# Use SSH to pull from Github
git pull git@github.com:reimbo/tukko.git
git pull git@github.com:reimbo/tukko-backend.git

# Change working directory to tukkos folder
cd traffic-visualizer
cd traffic-visualizer-backend

# Install node dependencies with npm for both
npm install

# Run frontend development environment with vite
# For backend the same and it runs "npm-run-all -p compose:dev debug"
npm run dev
```

## Production (Docker)

```bash
# For backend install npm-run-all
sudo npm install -g npm-run-all

# Build and run backend containers
# "npm-run-all -p build compose:prod"
npm run prod

# Does the build and makes a Docker image for the frontend and runs it
# localhost:5173
# "docker stop container_name 2>/dev/null || true && docker rm travis --force 2>/dev/null || true && docker build -t travis:latest . && docker run -d --name travis -p 5173:80 travis:latest"
npm run prod
```

### Redis need initialization
* Open Redis UI [http://localhost:8001](http://localhost:8001)

![Check "I have read and understood the Terms" and Submit](redis2.png)

* Check "I have read and understood the Terms" and **Submit**

![Redis](redis1.png)

* Username: **default**
* Password: **travis_is_the_best**
* Click **Apply changes** (a couple of times)

### Access token on the .env 

If you want to connect your Github/Gitlab ticketing system to the feedback form, create an access token with api-rights and add the token to the .env of the backend folder.

```bash
# Redis variables
REDIS_OM_URL=redis://redis-stack:6379
REDIS_OM_PASSW=tukko_is_the_best

#mongoDB variables
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=admin
DB_NAME=tukko
COLLECTION_NAME=tms
DB_CONN_STRING=mongodb://admin:admin@mongo:27017

# Node variables
TUKKO_DOMAIN=http://localhost:3001
PORT=3001
TMS_API_URL=https://tie.digitraffic.fi/api/tms/v1
TM_API_URL=https://tie.digitraffic.fi/api/traffic-message/v1
TMS_STATIONS_DATA_URL=https://tie.digitraffic.fi/api/tms/v1/stations/data
TMS_STATION_LIST_URL=https://tie.digitraffic.fi/api/tms/v1/stations

# Access token is used by the feedback form to insert 'customer feedback' labeled tickets
# straight into GitLab. You will need to generate a new one.
ACCESS_TOKEN=your_github_or_gitlab_access_token_here
```



## Usage

* [http://localhost:5173/](http://localhost:5173/)
* Frontend should be running on port 5173. Go and enjoy!
![Tukko UI](tukko-ui.png)
* Click around! Go crazy!

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
