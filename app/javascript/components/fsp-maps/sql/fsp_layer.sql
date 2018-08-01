SELECT st_asgeojson(the_geom),
       the_geom_webmercator,
       iso,
       sector,
       type,
       cartodb_id
FROM fsp_maps
WHERE iso = '{iso}'
       AND sector IN ('{sector}')
       AND type IN ('{type}')
ORDER BY  sector,
          type
