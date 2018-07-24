SELECT count(type),
         type,
         sector,
         iso,
         cartodb_id
FROM fsp_maps
WHERE iso = '{iso}'
GROUP BY  sector, iso, type
