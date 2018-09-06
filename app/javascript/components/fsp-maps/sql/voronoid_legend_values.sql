SELECT round(unnest(CDB_JenksBins(array_agg(area_km2::numeric),5)),1) as bucket
FROM fsp_voronoid
WHERE type_id = {type_id}
