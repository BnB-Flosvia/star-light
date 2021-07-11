#!/bin/bash
#
# Prevent installing or rebuilding like Elastic Beanstalk tries to do by
# default.
#
# Note that this *overwrites* Elastic Beanstalk's default 50npm.sh script
# (https://gist.github.com/wearhere/de51bb799f5099cec0ed28b9d0eb3663).
mv /var/app/staging/package.json.tmp /var/app/staging/package.json
mv /var/app/staging/package-lock.json.tmp /var/app/staging/package-lock.json