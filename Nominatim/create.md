# Create Nominatim service

## Configure postgres
```
RUN echo "host nominatim  nominatim    127.0.0.1/32  md5" >> /etc/postgresql/9.3/main/pg_hba.conf && \
    echo "host    all	postgres	127.0.0.1/32	trust" >> /etc/postgresql/9.3/main/pg_hba.conf && \
    echo "listen_addresses='localhost,127.0.0.1'" >> /etc/postgresql/9.3/main/postgresql.conf
```

## Dockerfile

```
FROM ubuntu:trusty
MAINTAINER Hugo BALTZ <hugobaltz@gmail.com>

ENV DEBIAN_FRONTEND noninteractive
ENV LANG C.UTF-8
RUN locale-gen en_US.UTF-8
RUN update-locale LANG=en_US.UTF-8

# ENSG's Proxy
ENV http_proxy http://10.0.4.2:3128
ENV https_proxy https://10.0.4.2:3128

# Install packages http://wiki.openstreetmap.org/wiki/Nominatim/Installation#Ubuntu.2FDebian
RUN apt-get -y update --fix-missing && \
    apt-get install -y build-essential libxml2-dev libpq-dev libbz2-dev libtool automake \
    libproj-dev libboost-dev libboost-system-dev libboost-filesystem-dev \
    libboost-thread-dev libexpat-dev gcc proj-bin libgeos-c1 libgeos++-dev \
    libexpat-dev php5 php-pear php5-pgsql php5-json php-db libapache2-mod-php5 \
    postgresql-client postgresql-server-dev-9.3 wget autoconf-archive cmake python \
    lua5.1 liblua5.1-dev libluabind-dev \
    osmosis && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/* /var/tmp/*

WORKDIR /app

# Nominatim install
ENV NOMINATIM_VERSION v.2.5.0
RUN mkdir -p src/Nominatim/
RUN cd ./src && \
        wget --quiet http://www.nominatim.org/release/Nominatim-2.5.1.tar.bz2 && \
        tar xvf Nominatim-2.5.1.tar.bz2 && \
        cd ./Nominatim-2.5.1/ && \
        sed -i 's/pgsql:\/\/@\/nominatim/pgsql:\/\/docker:docker@127.0.0.1:5432\/nominatim/g' ./settings/settings.php
RUN cd /app/src/Nominatim-2.5.1/ && \
        ./configure
RUN cd /app/src/Nominatim-2.5.1/ && \
        make

# Nominatim create site
COPY local.php /app/src/Nominatim-2.5.1/settings/local.php
RUN rm -rf /var/www/html/* && /app/src/Nominatim-2.5.1/utils/setup.php --create-website /var/www/html

# Apache configure
COPY nominatim.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 8080
```

## Image building

```bash
docker build -t img_nominatim ./
```