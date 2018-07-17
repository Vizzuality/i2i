SELECT tot.pop AS total_population,
         urb.pop AS urban_population,
         (urb.pop/tot.pop)*100 AS urban_population_percentage,
         (tot.pop - urb.pop) AS rural_population,
         ((tot.pop - urb.pop)/tot.pop)*100 AS rural_population_percentage
FROM (
WITH v AS
    (SELECT the_geom
    FROM world_borders_hd AS b
    WHERE b.iso_a3 = '{iso}' )
    SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator,
         v.the_geom),
        1,
        True)).sum) AS pop
    FROM population_count_2015, v
    WHERE ST_Intersects(the_raster_webmercator, v.the_geom) ) AS tot, (
    WITH u AS
        (SELECT u.the_geom
        FROM urban_areas AS u
        JOIN world_borders_hd AS b
            ON ST_Intersects(b.the_geom, u.the_geom)
        WHERE b.iso_a3 = '{iso}' )
        SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator,
         u.the_geom),
        1,
        True)).sum) AS pop
        FROM population_count_2015, u
        WHERE ST_Intersects(the_raster_webmercator, u.the_geom) ) AS urb
