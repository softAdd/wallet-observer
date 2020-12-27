POST `/login`

Request:
```json
{
  "name": "string",
  "password": "string"
}
```

POST `/logout`

Request:
```json
{
  "refreshToken": "string"
}
```

Response:
```json
{
  "token": "string",
  "refreshToken": "string"
}
```

POST `/register`

Request:
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response:
```json
{
  "token": "string",
  "refreshToken": "string"
}
```

POST `/whoami`

Request:
```json
{
  "refreshToken": "string"
}
```

Response:
```json
{
  "name": "string",
  "token": "string",
  "refreshToken": "string"
}
```