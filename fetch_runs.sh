#!/usr/bin/env bash

set -e -o pipefail

source ./env.sh # sets STRAVA_API_KEY env variable
strava-geojson $STRAVA_API_KEY > runs.geojson
