SELECT count(type_id),
        type as id,
        type,
        sector,
        color,
        iso,
        user_id,
        type_id
FROM {tableName}
WHERE iso = '{iso}'
GROUP BY sector, iso, type, user_id, color, type_id
