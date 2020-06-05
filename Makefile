# Utility commands

dev:
	./start.sh dev

kill:
	docker container kill $$(docker container ps -q)

psql:
	docker exec -it i2i_db psql -U postgres

download_sql:
	scp ubuntu@staging.i2ifacility.org:/home/ubuntu/latest.dump .

restore_db:
	cat latest.sql | docker exec -i i2i_db psql -U postgres -Fc

download_assets:
	scp -r ubuntu@staging.i2ifacility.org:/var/www/i2i/current/public/system ./public/
