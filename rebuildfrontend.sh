#!/bin/bash
docker-compose build frontend && docker-compose down && docker-compose up -d
