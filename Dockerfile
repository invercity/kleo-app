FROM dockerfile/nodejs

MAINTAINER Matthias Luebken, matthias@catalyst-zero.com

WORKDIR /home/kleo

# Install Kleo Prerequisites
RUN npm install -g grunt-cli
RUN npm install -g bower

# Install Kleo packages
ADD package.json /home/kleo/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD .bowerrc /home/kleo/.bowerrc
ADD bower.json /home/kleo/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/kleo

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["grunt"]