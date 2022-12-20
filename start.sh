#!/bin/sh

while true
do
    echo "Starting."
    sleep 0.2
    echo "Starting.."
    sleep 0.2
    
    echo "Starting..."
    sleep 0.2

    echo "\n[ Log file ./logs/$(date -I)_$(date +%T).log ]\n[ Errors file ./logs/$(date -I)_$(date +%T)-errors.log ]"
    node index.js > logs/$(date -I)_$(date +%T).log 2> logs/$(date -I)_$(date +%T)-errors.log
    
    echo "\n------------------------"
    echo "Oops.. May app crashed"
    echo "It will restart in 5 sec."
    echo "------------------------\n"
    echo "[ To cancel press Ctrl+C ]"
    sleep 5
done