# Server JSON API

JSON API of Server is built according to the requirements described in [JsonAPI.org](https://jsonapi.org/format/)

## Table of contents
- [Basic terms](#basic-terms)
- [Authorization requests](#authorization-requests)
    - [Register a user](#register-a-user)
    - [Log in a user](#log-in-a-user)
    - [Log out a user](#log-out-a-user)

## Basic terms

Any Server's response derives from the basic JSON object:
```json
{
    "jsonapi": {
        "version": "1.0"
    }
}
```
and extends it with its own fields.
To simplify the API description the basic fields (such as `jsonapi`) will be omitted in sections below.

## Authorization requests

### Register a user

To register a new user Client must send the following request to Server:
```
POST /api/v1.0/auth/signup HTTP/1.1

{
    "data": {
        "type": "auth",
        "attributes": {
            "email": "<user e-mail>",
            "password": "<user password>"
        }
    }
}
```

Server must send the following response if the user is registered:
```
HTTP/1.1 201 Created
Content-Type: application/json

{
    <basic JSON fields>,
    "data": {
        "type": "auth",
        "attributes": {
            "token": "<authorization token>"
        },
        "links": {
            "self": "/api/v1.0/auth/signup"
        }
    }
}
```

To continue data exchanging Client must remember `<authorization token>` and pass it with the next requests using HTTP header `Authorization`. For example, to get the authorization status Client must send the following request:
```http
GET /api/v1.0/auth/status
Authorization: Bearer <authorization token>
```
Responses for this request are described in the [Read user authorization status](#read-user-authorization-status) section.

#### Errors

If Server can't register a new user it will return one of the following resposes:
**Case #1 - User with the given email is exists already**
```
HTTP/1.1 409 Conflict
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "UserAlreadyExists",
        "title": "User already exists"
    }]
}
```

**Case #2 - Server has failed to save user record in a database**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "Exception",
        "title": "Request can not be done"
    }]
}
```

### Log in a user

To log in an existing user Client must send the following request to Server:
```http
POST /api/v1.0/auth/login HTTP/1.1

{
    "data": {
        "type": "auth",
        "attributes": {
            "email": "<user e-mail>",
            "password": "<user password>"
        }
    }
}
```

If the given cridentials conform to the existing user Server will send the following response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    <basic JSON fields>,
    "data": {
        "type": "auth",
        "attributes": {
            "token": "<authorization token>"
        },
        "links": {
            "self": "/api/v1.0/auth/signin"
        }
    }
}
```

As it's described in the [Register a user](#register-a-user) section Client must remember `<authorization token>` and pass it to the next requests.

#### Errors

If Server can't log in a user it will return one of the following responses:
**Case #1 - User with the given email does not exist**
```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "UserDoesNotExist",
        "title": "User does not exist"
    }]
}
```

**Case #2 - Given password is wrong**
```
HTTP/1.1 403 Forbidden
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "WrongPassword",
        "title": "Password is wrong"
    }]
}
```

**Case #3 - Server has failed to log in a user**
```
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "Exception",
        "title": "Request can not be done"
    }]
}
```

### Log out a user

To log out a user Client must send the following request to Server:
```
POST /api/v1.0/auth/logout HTTP/1.1
Authorization: Bearer <authorization token>
```

If the user is logged out successfully Server will send the following response:
```
HTTP/1.1 200 OK
Content-Type: application/json

{
    <basic JSON fields>,
    "data": {
        "type": "auth",
        "links": {
            "self": "/api/v1.0/auth/signout"
        }
    }
}
```

#### Errors

If Server can't log out the user it will return the following respose:
```
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "Exception",
        "title": "Request can not be done"
    }]
}
```
or
```
HTTP/1.1 401 Unauthorized
Content-Type: application/json

{
    <basic JSON fields>,
    "errors": [{
        "code": "TokenNotDecoded",
        "title": "Auth token is not decoded"
    }]
}
```

## Index request

To get the top level information Client must send the following request:
```
GET /api/v1.0/ HTTP/1.1
Authorization: Bearer <authorization token>
```
Server will send the following response:
```
HTTP/1.1 200 OK
Content-Type: application/json

{
    <basic JSON fields>,
    "data": {
        "type": "index",
        "relationships": {
            "user": {
                "data": {
                    "type": "users",
                    "id": <user id>,
                    "links": {
                        "self": "/api/v1.0/users/<user id>"
                    }
                }
            }
        },
        "links": {
            "self": "/api/v1.0/"
        }
    }
}
```

The `"user"` relationship contains a link to get information about the logged in user.
