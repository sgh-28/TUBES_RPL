# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Technologies Used
- React + Vite
- Express
- Mongodb
- Node js
- Sweetalert2

# How To Use

### Clone this github

 You can use gitbash

 ```bash
git clone https://github.com/sgh-28/TUBES_RPL.git
```

### Install dependencies backend

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
cd ./backend/

npm install
```

### Install dependencies frontend

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
cd ./frontend/crm-app

npm install
```

### Run the mongodb server
```bash
cd ./backend/

npm run dev
```

### Run the vite server
```bash
cd ./frontend/crm-app/

npm run dev
```

### Insert Data To Mongodb

After run the server, insert datasets to mongodb:

#### Table Meja

./datasets/tubes-rpl.meja.csv

#### Table Users

./datasets/tubes-rpl.users.csv

#### Table Pesanan

./datasets/tubes-rpl.pesanan.csv

#### Table Menu

./datasets/tubes-rpl.menu.csv

### Insert Data to Mongodb with Mongoimport

if your path /TUBES_RPL/
```bash
mongoimport --db tubes-rpl --collection users --type csv --headerline --file .\datasets\tubes-rpl.users.csv
mongoimport --db tubes-rpl --collection meja --type csv --headerline --file .\datasets\tubes-rpl.meja.csv
mongoimport --db tubes-rpl --collection pesanan --type csv --headerline --file .\datasets\tubes-rpl.pesanan.csv
mongoimport --db tubes-rpl --collection menu --type csv --headerline --file .\datasets\tubes-rpl.menu.csv
```
if your path /TUBES_RPL/backend/
```bash
mongoimport --db tubes-rpl --collection users --type csv --headerline --file ..\datasets\tubes-rpl.users.csv
mongoimport --db tubes-rpl --collection meja --type csv --headerline --file ..\datasets\tubes-rpl.meja.csv
mongoimport --db tubes-rpl --collection pesanan --type csv --headerline --file ..\datasets\tubes-rpl.pesanan.csv
mongoimport --db tubes-rpl --collection menu --type csv --headerline --file ..\datasets\tubes-rpl.menu.csv
```

# Account
### Admin
- NIP : 100001
- Password : password

  ### Koki
- NIP : 100002
- Password :  password

### Kasir
- NIP : 100003
- Password : password

### Pelayan
- NIP : 100004
- Password : password
