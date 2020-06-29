# Resolve symlink https://stackoverflow.com/a/246128/5894687
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

echo $DIR
if [[ $1 == 'migrate' ]]
then
    $DIR/migrate.js $@
elif [[ $1 == 'drop-schema' ]]
then
    $DIR/drop-schema.sh
elif [[ $1 == 'recreate-schema' ]]
then
    $DIR/drop-schema.sh 
    $DIR/migrate.js $DIR $@
else
    echo 'You need to pass a command to taskq!'
    echo ' - taskq migrate - on first run, creates a taskq schema in your database; thereafter applies database migrations to current version'
    echo ' - taskq drop-schema - drops the taskq schema from your database'
    echo ' - taskq recreate-schema - runs `drop-schema` then `migrate`'
fi