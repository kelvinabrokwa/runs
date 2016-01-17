#!/usr/bin/env bash

set -e -o pipefail

strava-geojson $STRAVA_API_KEY > runs.geojson
