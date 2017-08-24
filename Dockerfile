FROM ruby:2.3.3-alpine
MAINTAINER David Inga <david.inga@vizzuality.com>

ENV RAILS_ENV production
ENV RACK_ENV production

# Install dependencies
RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache \
      build-base \
      imagemagick \
      bash \
      git \
      nodejs \
      tzdata \
      libxml2-dev \
      libxslt-dev \
      postgresql-dev \
    && rm -rf /var/cache/apk/* \
    && bundle config build.nokogiri --use-system-libraries \
    && gem install bundler --no-ri --no-rdoc \
    && mkdir -p /usr/src/i2i

WORKDIR /usr/src/i2i
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs 20 --retry 5 --without development test
ADD . /usr/src/i2i

# Run rake tasks
# RUN bundle exec rake db:migrate

# Precompile Rails assets
RUN bundle exec rake assets:precompile

# Setting port
# EXPOSE 3000

# Start puma
# CMD bundle exec puma -C config/puma.rb
