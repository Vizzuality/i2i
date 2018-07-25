SELECT count(type),
         type,
         sector,
         iso,
         type_id
FROM fsp_maps
WHERE iso = '{iso}'
GROUP BY  sector, iso, type, type_id
