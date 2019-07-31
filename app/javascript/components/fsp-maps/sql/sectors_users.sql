SELECT count(type_id),
        type_id as id,
        type_id,
        color,
        type,
        name,
        sector,
        iso,
        user_id
FROM {tableName}
WHERE iso = '{iso}'
GROUP BY sector, iso, type, name, user_id, type_id, color
