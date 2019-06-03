SELECT count(type),
        cartodb_id as id,
        type,
        sector,
        iso,
        color,
        type_id
FROM fsp_maps_users_staging
WHERE iso = '{iso}'
GROUP BY  sector, iso, type, color, type_id, cartodb_id
