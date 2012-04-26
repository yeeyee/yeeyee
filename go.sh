#!/usr/bin/env sh

cp -f ./service/.smtp.php ./service/smtp.php
cp -f ./service/.dbconnect.php ./service/dbconnect.php
find . -not -type d|xargs chmod 644
find . -type d|xargs chmod 755
chown -R www:www .