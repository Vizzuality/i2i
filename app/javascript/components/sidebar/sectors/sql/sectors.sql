SELECT count(type),
         type,
         sector,
         iso,
         color,
         type_id
FROM fsp_maps
WHERE iso = '{iso}'
GROUP BY  sector, iso, type, color, type_id
