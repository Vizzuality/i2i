SELECT st_asgeojson(the_geom),
       the_geom_webmercator,
       iso,
       sector,
       type,
       color,
       cartodb_id,
       name
FROM {tableName}
WHERE iso = '{iso}'
ORDER BY  sector,
          type
