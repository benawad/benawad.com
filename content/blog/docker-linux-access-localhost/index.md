---
title: How to access localhost from inside a Docker Container in Linux
description: "Steps to access allow a docker container to access stuff on the host"
---

1. Enable `route_localnet` for `docker0` interface:

```
sysctl -w net.ipv4.conf.docker0.route_localnet=1
```

2. Add this rules to iptables:

```
iptables -t nat -I PREROUTING -i docker0 -d 172.17.0.1 -p all -j DNAT --to 127.0.0.1
iptables -t filter -I INPUT -i docker0 -d 127.0.0.1 -p all -j ACCEPT
```

3. You can now use `172.17.0.1` to access localhost on the host.

reference https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach
