WITH v as (SELECT v.*, m.type, m.type_id
             FROM fsp_voronoid as v
        LEFT JOIN fsp_maps as m
               ON v.id = m.id
         ORDER BY v.id)

SELECT the_geom
FROM v
WHERE type_id = {type_id}
