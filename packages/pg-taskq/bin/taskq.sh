#!/bin/bash

# Resolve symlink https://stackoverflow.com/a/246128/5894687
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

echo $DIR
if [[ $1 == 'up' ]]
then
    $DIR/up.js $@
elif [[ $1 == 'clear' ]]
then
    $DIR/clear.js $@
else
    echo '\nYou must supply a command:\n'
    echo '  taskq up      Sets up taskq tables/functions/triggers\n'
    echo '  taskq clear   Permanently removes all tasks\n'
    echo 'Options:\n'
    echo '  --schema, -s         A Postgres schema. Will be created if does not already exist\n'
    echo '  --connection, -c     A Postgres connection string\n'
fi
