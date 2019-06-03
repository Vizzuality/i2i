SELECT st_asgeojson(the_geom),
       the_geom_webmercator,
       iso,
       sector,
       type,
       cartodb_id,
       name
FROM {table_name}
WHERE iso = '{iso}'
       AND type_id = {type_id}
ORDER BY  sector,
          type
