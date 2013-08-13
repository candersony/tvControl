#!/bin/bash

# install and setup lirc
sudo apt-get install lirc
sudo sed -i '$ a\lirc_dev' /etc/modules
sudo sed -i '$ a\lirc_rpi gpio_out_pin=22' /etc/modules
sudo mv -f hardware.conf /etc/lirc/hardware.conf
sudo mv -f lircd.conf /etc/lirc/lircd.conf
sudo /etc/init.d/lirc stop
sudo /etc/init.d/lirc start

# install nodejs
wget http://nodejs.org/dist/v0.10.17/node-v0.10.17-linux-arm-pi.tar.gz
tar -zxf node-v0.10.17-linux-arm-pi.tar.gz
sudo mkdir /opt/node
sudo cp -r node-v0.10.17-linux-arm-pi/* /opt/node
rm -r node-v0.10.17-linux-arm-pi.tar.gz
rm -r node-v0.10.17-linux-arm-pi

sed -i -e '$a\PATH="/opt/node/bin:$PATH' ~/.profile