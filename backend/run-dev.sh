#!/usr/bin/env bash
set -a
source "$(dirname "$0")/.env"
set +a
export JAVA_HOME=/Library/Java/JavaVirtualMachines/amazon-corretto-21.jdk/Contents/Home
exec "$(dirname "$0")/mvnw" spring-boot:run "$@"
