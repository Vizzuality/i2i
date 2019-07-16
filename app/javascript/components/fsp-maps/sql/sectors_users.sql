SELECT count(type_id),
        type_id as id,
<<<<<<< HEAD
        type_id,
        color,
=======
>>>>>>> fab65025... sql for user sectos
        type,
        name,
        sector,
        iso,
        user_id
FROM {tableName}
WHERE iso = '{iso}'
<<<<<<< HEAD
GROUP BY sector, iso, type, name, user_id, type_id, color
=======
GROUP BY sector, iso, type, name, user_id, type_id
>>>>>>> fab65025... sql for user sectos
