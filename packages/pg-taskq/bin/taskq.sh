# Resolve symlink https://stackoverflow.com/a/246128/5894687
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )"

if [[ $1 == 'schema:create' ]]
then
    $DIR/create-schema.sh
elif [[ $1 == 'schema:drop' ]]
then
    $DIR/drop-schema.sh
elif [[ $1 == 'schema:recreate' ]]
then
    $DIR/drop-schema.sh
    $DIR/create-schema.sh
else
    echo 'You need to pass a command to taskq!'
    echo ' - taskq schema:create - create a taskq schema in your database'
    echo ' - taskq schema:drop - drop the taskq schema from your database'
    echo ' - taskq schema:recreate - runs schema:down then schema:up'
fi