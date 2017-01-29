# Insight 2 Impact (i2i)


## Requirements
* `ruby 2.3.1`
* `postgresql 9.6`

## Installation
To install the required `ruby` version is recommended to use a ruby version manager like [RVM](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv).

Once `ruby` is installed, run `gem install bundler` if you don't have `bundler` already installed and `bundle install` to install the required dependencies.

### Database setup
Having `postgresql` already installed, run `rails db:create` if you haven't created the database.

Run `rails db:migrate` and `rails db:sample`.

## Configuration :floppy_disk:	
Copy the file *.env.sample* as *.env* and change it according to your database configuration

## Code Quality :white_check_mark:
For the time being, we are using the next tools to keep quaity and consistency of the code:

* [sass-lint](https://github.com/brigade/scss-lint)

To install `sass-lint` run `npm install -g sass-lint`. This is a **editor-based** tool, you will need to setup your editor with the proper linter.

## Development
Start `postgresql` server.

Run `rail s` to start the server.

Go to [localhost](http://localhost:3000) and have fun :collision: :tada:

## Troubleshooting :interrobang:
If you have `postgresql` installed via [Homebrew](http://brew.sh/) probably the user setted is your account name. `rails db:create` command asks for a `postgres` user.

To check this, enter in a `postgresql` console and type `\du` you will see the list of roles/users. If `postgres` is already there you have nothing to do, otherwise, you will need to create a new `postgres` role running the next command:

	createuser -sPE postgres

Set a password for this role/user. Once you are done, you should be able to create the database with `postgres` role.
