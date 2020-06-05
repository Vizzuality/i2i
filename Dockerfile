FROM ruby:2.5.3
LABEL maintainer="hello@vizzuality.com"

ARG env

ENV RAILS_ENV $env
ENV RACK_ENV $env

# Install dependencies
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && apt-get install -y \
      build-essential \
      imagemagick \
      bash \
      git \
      nodejs \
      yarn \
      tzdata \
      libxml2-dev \
      libxslt-dev \
      postgresql postgresql-contrib \
      --no-install-recommends \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && bundle config build.nokogiri --use-system-libraries \
    && gem install bundler

WORKDIR /usr/src/i2i
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install --jobs 20 --retry 5
ADD . /usr/src/i2i

# Precompile Rails assets
# RUN bundle exec rake assets:precompile

EXPOSE 3000
CMD bundle exec puma -C config/puma.rb
ENTRYPOINT [ "./entrypoint.sh" ]
