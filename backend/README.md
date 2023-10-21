# ExpressJS

This folder contain backend app of ExpressJS.

### Features

##### User management
> Contain CRUD operation with role based authentication (Admin, Viewer, and Editor)

- Admin can do anything
- Viewer can only view
- Editor can create and update on the role with the same level or below

##### Role management
> Contain listing role data

##### File management
> Contain CRUD operation that will simulate how upload file works on ExpressJS.


### Project structure

We are using class based typescript. The project contains mixed file between Typescript and Javascript. Sequelize part is still using Javascript.

```
|- db
|- src
|--- config
|--- constants
|--- controllers
|--- helpers
|--- middleware
|--- models
|--- services
|--- types
|--- utils
```

##### .env
```
DB_HOST='127.0.0.1'
DB_USER='root'
DB_PASSWORD='12345'
DB_NAME=''
MAILTRAP_TOKEN=
MAILTRAP_SENDER_EMAIL=
MAILTRAP_SENDER_NAME=

PORT=3000

BASE_URL=localhost:3000

```

##### Data migration
Database migration files are located in `/db` directory.

```
|- db
|--- migrations
|--- seeders
```


### How can I contribute?
You can make contribution by opening a pull request or opening an issues.

- [ ] Unit testing
- [ ] Typescript enhancement