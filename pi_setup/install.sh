#!/bin/bash

# install and setup lirc
sudo apt-get install lirc
sudo sed -i '$ a\lirc_dev' /etc/modules
sudo sed -i '$ a\lirc_rpi gpio_out_pin=22' /etc/modules
sudo mv -f hardware.conf /etc/lirc/hardware.conf
sudo mv -f lircd.conf /etc/lirc/lircd.conf

# install nodejs
wget http://nodejs.org/dist/v0.10.17/node-v0.10.17.tar.gz
tar -zxf node-v0.10.17.tar.gz
rm node-v0.10.17.tar.gz
cd node-v0.10.17
./configure && make && sudo make install