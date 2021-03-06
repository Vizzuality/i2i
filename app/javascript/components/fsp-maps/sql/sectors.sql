with a as (SELECT count(type_id), country, iso, sector, color, type, type_id, user_id, year
           FROM {tableName}
          WHERE iso = '{iso}'
          GROUP BY country, iso, sector, color, type, type_id, user_id, year)
SELECT sum(count) as count, country, iso, sector, color, type, type_id, user_id, array_agg(year) as years
FROM a
GROUP BY country, iso, sector, color, type, type_id, user_id
