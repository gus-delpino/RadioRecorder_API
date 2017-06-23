# To build:
# cd RadioRecorder
# docker build --rm -t radiorecorder_api .
#
# Run container
# docker run -itd -p 7000:8080 -p 5858:5858 -v $PWD:/usr/src --network=radiorecorder --ip=192.168.0.10 --name radiorecorder_api radiorecorder_api

FROM node:8.1.2

# Use nodemon
RUN npm install --global nodemon

# Cache package.json
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src && cp -a /tmp/node_modules /usr/src/

# Map volume
WORKDIR /usr/src

#CMD ["nodemon", "--watch", "./", "index"]