# PedroTech - 01 - Prisma ORM Tutorial for Beginners

## [Tutorial video on Youtube](https://www.youtube.com/watch?v=E37-33M6Ypk)

## How to run:

    - Clone repository
        -   `git clone  https://github.com/ArpadGBondor/PedroTech_-_01_-_Prisma_ORM_Tutorial.git`
    - Enter folder:
        -   `cd PedroTech_-_01_-_Prisma_ORM_Tutorial`
    - Install npm packages
        -   `npm i`
    - Generate Database
        - `npx prisma migrate dev`
    - Run app
        - `npm run dev`

## Project is not Deployed

## Environment variables

    - .env file is included

## Changes

    - Database
        - I'm using `sqlite` instead of `mysql` to simplify the database connection of the project.
            - `prisma\dev.db` file contains the database.
    - Postman collection added:
        [PedroTech_-_Prisma](./PedroTech_-_Prisma.postman_collection)
