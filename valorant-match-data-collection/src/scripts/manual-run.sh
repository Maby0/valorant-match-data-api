#!/bin/bash
if [ $# -ne 1 ]; then
    echo "Usage: $0 <queryingPlayerName>"
    exit 1
fi

echo "Manually invoking lambda with player: $1" > outputfile.txt
echo "-------------------" >> outputfile.txt
echo -e "\nFirst dynamodb object count pre lambda invoke:\n" >> outputfile.txt
aws dynamodb scan --table-name valorant-match-data-table --select COUNT >> outputfile.txt
echo "-------------------" >> outputfile.txt

echo -e "\nInvoked lambda output:\n" >> outputfile.txt
aws lambda invoke --function-name valorant-match-data-collection-function \
    --payload "{ \"customQueryingPlayer\": \"$1\"}" \
    --cli-binary-format raw-in-base64-out /dev/stdout >> outputfile.txt
echo "-------------------" >> outputfile.txt

echo -e "\nSecond dynamodb object count post lambda invoke:\n" >> outputfile.txt
aws dynamodb scan --table-name valorant-match-data-table --select COUNT >> outputfile.txt

cat outputfile.txt