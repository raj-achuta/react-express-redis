# How to run

```bash
$ docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
$ cd be
$ npm i
$ npm start

In another terminal

$ cd fe
$ npm i
$ npm start
```
