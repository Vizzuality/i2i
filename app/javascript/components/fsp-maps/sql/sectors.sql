SELECT count(type_id),
        type_id as id,
        type,
        sector,
        iso,
        type_id
FROM {tableName}
WHERE iso = '{iso}'
GROUP BY  sector, iso, type, type_id
