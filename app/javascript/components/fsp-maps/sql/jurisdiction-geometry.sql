SELECT st_asgeojson(the_geom),
       cartodb_id,
       jurisdiction
FROM jurisdictions
WHERE cartodb_id = '{jurisdictionId}'
