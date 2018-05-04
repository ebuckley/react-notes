#!/bin/bash
set -e
rsync --exclude ".git" --progress -avzh build/ root@ersin.nz:/var/www/html/draft

