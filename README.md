# Insight 2 Impact (i2i)

## Requirements
* `ruby 2.5.3`
* `postgresql 10`
* `nodejs`

## Installation from scratch using Makefile and Docker (Strongly recommended)

1. Ask for access to staging server. In case you don't have permission jump to step 4.
2. Download assets from stagin server. Run: `make download_assets`
3. Download SQL backup from staging server. Run `make download_sql`
4. Add `.env` file to the root path. (Lastpass)
5. Create build using Docker. Run: `make dev`
6. Populate database. Run: `make restore_db`
7. Open [http://localhost:3000](http://localhost:3000)

Notes:

* Docker automatically will run `db:migrate`.

## Application summary

The application is a rails project including an admin, the front originally built with backbone and react for the latest part (fsp maps).

The site could be divided in two parts, the insights and the datasets.

`Insights` are managed on the admin.

There are three types of dataset:

- National surveys
    - Data is posted and read from [this API](https://github.com/Vizzuality/i2i-api).
    - Display the data through widgets using the backbone views.
- Financial diaries
    - It's stored on the db from a csv import.
    - Displays data using vega and consumes data from the internal `fdapi` endpoints.
- Fsp maps
    - Shows layers on a map using react and redux.

Staging: staging.i2ifacility.org
Production: i2ifacility.org

`i2i` -> Rails app (Docker name: `i2i_web`)
`i2i-api` -> Node api for the national surveys (Docker name: `i2i-api_prod`)

You can access the docker containers by using `docker ps` to get the id and then `docker exec -it ID bash`.

## Adding new national surveys

- Post the data to the node api
- Create the country on the application if the country doesn't exist, it can be created from the admin
- Add the country flag as a `svg` to `public/images/flags/ISO.svg`

## Importing financial diaries data (csv)

The csvs must be properly formatted with the columns containing descriptive data (eg: `category_name`, `subcategory`), these columns will vary depending on the type of data being imported (`houshold_transactions` or `household_member_transactions`). The values must have a date header (eg: `2017-12`) and it's content must be 10 values separated by a colon: `160:40:0:160:null:0:null:null:null:null`.

Values can be `0`, `null`, or a `float`.

The 10 values correspond respectively to:

    total_transaction_value
    avg_value
    min_value
    max_value
    rolling_balance
    business_expenses
    withdrawals
    deposits
    new_borrowing
    repayment

Everything is imported locally using rake tasks, the tasks that read from files read them from `db/data/...` so you just want to replace/rename your file or the path.

Another important thing to change on the tasks is to look for the places accessing the values columns by index (eg: `row[10..74]`), this changes from dataset to dataset so just set the indexes to match the first column with a date to the last one.

The tasks are all in a single filed named `import_financial_diaries`, the commented tasks at the bottom were originally created to address specific problems with the first ever dataset, so it shouldn't be part of the flow, the csv should be properlly populated to begin with.

The import is made locally against a backup of the production database to test if it all works, and then you can restore the whole database or just the financial diaries tables.

##  FSP maps

These are geospatial data layers, they are separated in `Sector` and `Contextual` layers, on the site you can find the contextual under Additional Data.

Sector layers are served from Carto, while Contextual layers come from both Carto and the Resource Watch api.

Be sure to have the `wri-api-components` on version `wri-api-components@2.2.7-alpha.2` because it's the version that has specific configurations for internet explorer. Otherwise the map won't appear.

##### Adding custom descriptions

Follow the instructions on `app/javascript/components/fsp-maps/constants.js`, this will enable an `i` button on the layers list that will trigger a modal with the layer's description and an url.

## Deploy

Deploying requires SSH access to the server. It's highly recommended that you use RSA keys instead of username+password access.

Deployment is handled by [Capistrano](https://capistranorb.com/), and requires you to have `ruby` configured on your local machine. 

To deploy to a server, use the following command from your local terminal:

```
cap <production|staging> deploy
```

