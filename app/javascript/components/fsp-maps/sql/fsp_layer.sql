SELECT st_asgeojson(the_geom),
       the_geom_webmercator,
       iso,
       sector,
       type,
       cartodb_id,
       name
FROM fsp_maps
WHERE iso = '{iso}'
       AND type_id = {type_id}
ORDER BY  sector,
          type
