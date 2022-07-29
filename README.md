# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Download

```
git clone https://github.com/Egorius1979/nodejs2022Q2-service.git
```

or

```
git clone git@github.com:Egorius1979/nodejs2022Q2-service.git
```

## Run application + PostgreSQL DB + Adminer (by [docker](https://docs.docker.com/engine/install/) & [docker-compose](https://docs.docker.com/compose/install/compose-plugin/))

```
docker-compose up
```

or

```
sudo docker-compose up
```

**after everything is loaded and running open an additional terminal console and:**

- use `docker ps` to get the name of the existing container (you need name or ID of the `app` container)
- use the command `docker exec -it <container name> /bin/sh` to get a bash shell in the container

after that, you should get to the terminal in the container, where you need to run the following command (the execution of which will launch the migration file to create empty database tables to work with the application)):

```
npm run typeorm:run

```

That's all!
Now you can run tests, directly interact with the database via Swagger:

```
localhost:4000/doc/
```

or via Adminer:

```
localhost:8080
```

**_Good Luck!_**
