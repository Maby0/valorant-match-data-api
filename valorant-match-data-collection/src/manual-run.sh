#!/bin/bash
if [ $# -ne 1 ]; then
    echo "Usage: $0 <queryingPlayerName>"
    exit 1
fi

echo "Manually invoking lambda with player: $1"
echo "First dynamodb object count pre lambda invoke:\n" > outputfile.txt
aws dynamodb scan --table-name valorant-match-data-table --select COUNT >> outputfile.txt
echo "-------------------" >> outputfile.txt

echo "\nInvoked lambda output:\n" >> outputfile.txt
aws lambda invoke --function-name valorant-match-data-collection-function --payload "{ \"customQueryingPlayer\": \"$1\"}" /dev/stdout >> outputfile.txt
echo "-------------------" >> outputfile.txt

echo "\nSecond dynamodb object count post lambda invoke:\n" >> outputfile.txt
aws dynamodb scan --table-name valorant-match-data-table --select COUNT >> outputfile.txt

cat outputfile.txt