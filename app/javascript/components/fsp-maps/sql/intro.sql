WITH b AS
    (SELECT the_geom
    FROM world_borders_hd AS b
    WHERE b.iso_a3 = '{iso}'), u AS
    (SELECT u.the_geom
    FROM urban_areas AS u
    JOIN world_borders_hd AS b
        ON ST_Intersects(b.the_geom, u.the_geom)
    WHERE b.iso_a3 = '{iso}')
SELECT tot.pop AS total_population,
         urb.pop AS urban_population,
         round(((urb.pop/tot.pop)*100)::numeric,
         1) AS urban_population_percentage,
         (tot.pop - urb.pop) AS rural_population,
         round((((tot.pop - urb.pop)/tot.pop)*100)::numeric,
        1) AS rural_population_percentage,
         round(pop_km.tot_pop_km::numeric) AS population_5km,
         round(((round(pop_km.tot_pop_km::numeric)/tot.pop)*100)::numeric,
         1) AS population_5km_percentage,
         2015 AS year
FROM
    (SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator,
         b.the_geom),
        1,
        True)).sum) AS pop
    FROM population_count_2015, b
    WHERE ST_Intersects(the_raster_webmercator, b.the_geom) ) AS tot,
    (SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator,
         u.the_geom),
        1,
        True)).sum) AS pop
    FROM population_count_2015, u
    WHERE ST_Intersects(the_raster_webmercator, u.the_geom) ) AS urb,
    (SELECT total_population AS tot_pop_km
    FROM population_within_5km
    WHERE iso = '{iso}' ) AS pop_km
