#!/usr/bin/env sh

mv ./service/.smtp.php ./service/smtp.php
find . -not -type d|xargs chmod 644
find . -type d|xargs chmod 755
chown -R www:www .