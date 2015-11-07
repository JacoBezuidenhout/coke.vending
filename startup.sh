#!/bin/bash
sleep 10
((cd ~/coke.vending && sails lift)&)
((xrandr --output HDMI2 --primary --mode 1920x1080)&)
sleep 20
((cd ~/coke.vending/vending.frontend && nw)&)
