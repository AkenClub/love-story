#!/bin/sh
set -eu

node /app/api/dist/node.js &
api_pid=$!
nginx -g 'daemon off;' &
web_pid=$!

shutdown() {
  trap - INT TERM EXIT
  kill -TERM "$api_pid" "$web_pid" 2>/dev/null || true
  wait "$api_pid" "$web_pid" 2>/dev/null || true
}

trap shutdown INT TERM EXIT

while kill -0 "$api_pid" 2>/dev/null && kill -0 "$web_pid" 2>/dev/null; do
  sleep 1
done

exit 1
