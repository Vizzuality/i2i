SELECT count(type),
         type,
         sector,
         iso
FROM fsp_maps
WHERE iso = '{iso}'
GROUP BY  sector, iso, type
