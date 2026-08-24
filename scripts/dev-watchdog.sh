#!/bin/bash
# Watchdog: автоматически перезапускает Next.js dev-сервер при падении
cd /home/z/my-project

LOG=/home/z/my-project/dev.log
PORT=3000

while true; do
  echo "[$(date '+%H:%M:%S')] Starting next dev (webpack) on port $PORT..." >> "$LOG"
  ./node_modules/.bin/next dev -p "$PORT" --webpack >> "$LOG" 2>&1
  EXIT_CODE=$?
  echo "[$(date '+%H:%M:%S')] next dev exited with code $EXIT_CODE. Restarting in 3s..." >> "$LOG"
  sleep 3
done
