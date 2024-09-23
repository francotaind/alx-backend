#REDIS

## Redis is an open source (BSD licensed), in-memory data structure store, used
as a database, cache and message broker. It supports data structures such as
strings, hashes, lists, sets, sorted sets with range queries, bitmaps,
hyperloglogs, geospatial indexes with radius queries and streams. Redis has
built-in replication, Lua scripting, LRU eviction, transactions and different
levels of on-disk persistence, and provides high availability via Redis Sentinel
and automatic partitioning with Redis Cluster.

You can run atomic operations on these types, like appending to a string;
incrementing the value in a hash; pushing an element to a list; computing set
intersection, union and difference; or getting the member with highest ranking
in a sorted set.

In order to achieve its outstanding performance, Redis works with an in-memory
dataset. Depending on your use case, you can persist it either by dumping these
datasets to disk every once in a while, or by appending each command to a log.
Persistence can be optionally disabled, if you just need a feature-rich,
networked, in-memory cache.

Redis also supports trivial-to-setup master-slave asynchronous replication, with
very fast non-blocking first synchronization, auto-reconnection on net split
appending the stream of commands in the background.

Other features include:

- Transactions
- Pub/Sub
- Lua scripting
- Keys with a limited time-to-live
- LRU eviction of Keys
- Automatic failover

## How to use this image

You can run a Redis container using the Docker command line:

```bash
$ docker run --name some-redis -d redis
```

This image includes `EXPOSE 6379` (the Redis port), so standard container
linking will make it automatically available to the linked containers.



