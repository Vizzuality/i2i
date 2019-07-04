SELECT count(type_id),
        type_id as id,
        type,
        name,
        sector,
        iso,
        color,
        type_id,
        user_id
FROM {tableName}
WHERE iso = '{iso}'
GROUP BY sector, iso, type, name, color, type_id, user_id
