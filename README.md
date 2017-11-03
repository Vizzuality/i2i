# Insight 2 Impact (i2i)


## Requirements
* `ruby 2.3.3`
* `postgresql 9.6`

## Installation
To install the required `ruby` version is recommended to use a ruby version manager like [RVM](https://rvm.io/) or [rbenv](https://github.com/rbenv/rbenv).

Once `ruby` is installed, run `gem install bundler` if you don't have `bundler` already installed and `bundle install` to install the required dependencies.

Finally, install node packages by running `npm install`.

### Database setup
Having `postgresql` already installed, run `rails db:create` if you haven't created the database.

Run `rails db:migrate`, `rails db:seed`, and `rails db:sample`.

## Configuration :floppy_disk:
Copy the file *.env.sample* as *.env* and change it according to your database configuration

## Code Quality :white_check_mark:
For the time being, we are using the next tools to keep quaity and consistency of the code:

* [sass-lint](https://github.com/brigade/scss-lint)

To install `sass-lint` run `npm install -g sass-lint`. This is a **editor-based** tool, you will need to setup your editor with the proper linter.

## Development
Start `postgresql` server.

Run `rails s` to start the server.

Go to [localhost](http://localhost:3000) and have fun :collision: :tada:

## Troubleshooting :interrobang:
If you have `postgresql` installed via [Homebrew](http://brew.sh/) probably the user setted is your account name. `rails db:create` command asks for a `postgres` user.

To check this, enter in a `postgresql` console and type `\du` you will see the list of roles/users. If `postgres` is already there you have nothing to do, otherwise, you will need to create a new `postgres` role running the next command:

	createuser -sPE postgres

Set a password for this role/user. Once you are done, you should be able to create the database with `postgres` role.

## Shareable components

Because we need to be able to share some components outside the project, there is a new Rails environment called `assets_compilation`. This environment is a duplicated of the `production` one with other rules added.

In order to compile those assets, run `RAILS_ENV=assets_compilation SECRET_KEY_BASE=secret rake assets:precompile`. This will place all precompiled asssets in `public` folder. Once done, run `rake non_digested RAILS_ENV=assets_compilation SECRET_KEY_BASE=secret`. This task will create duplicate of current compiled files but removing its hash, making it easier to manage. For example: `exported_componentes#mfnhf21378kjashjads1234.js` would be `exported_componentes.js`

# Using docker in development

```
docker-compose -f docker-compose-dev.yml up --build`
```

It will fails because database has not been creted. So you have to run:

```
docker-compose -f docker-compose-dev.yml run web rake db:create db:migrate
```

and repeat first command:

```
docker-compose -f docker-compose-dev.yml up --build
```

## Importing financial diaries data (csv)

Financial diaries data will be sent in four individual `.csv` files, if the names in the files don't match the ones shown beneath, please change accordingly:

`Household Transactions.csv`

`Household Member Transactions.csv`

`Projects Meta Data.csv`

`Category Statistics and Usage.csv`

These files must then be uploaded to the server on the `db` folder manually to maintain them private. For each file, a single rake task should be run respectively, order doesn't matter:

`rake db:import_household_transactions`

`import_household_member_transactions`

`import_project_metadata`

`import_category_usage`

The imports don't update the data, it creates completely new records based on the new `.csv` files, if there's and already existing set of records for these entities, then please be sure to remove the old ones otherwise the data will be partially duplicated and/or completely mixed. This cleanup should be included in the tasks once the financial diaries data structure is settled.
