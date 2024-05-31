
## Installation

Once you get this repo : 

### Front : 

```bash
cd front/src/
npm run dev
```

Will run front end (localhost 3000)

[Front]("http://localhost:3000")

### Back  :

```bash
cd back
npm install
cd src/prisma
npx prisma generate
npx prisma migrate
cd ../
nodemon index.js
```

Will :
- Download all packages 
- Dreate sqlite dependancies 
- Run server (localhost 8000)

[Back](http://localhost:8000)
## Tech Stack

**Client:** NextJs, TailwindCSS

**Server:** Node, Express, Prisma


## Authors

- [@zypheone](https://www.github.com/zypheone94)

