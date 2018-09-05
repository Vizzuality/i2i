WITH b as (SELECT the_geom FROM world_borders_hd as b
            WHERE b.iso_a3 = '{iso}'),
     u as (SELECT ST_Intersection(u.the_geom,b.the_geom) as the_geom FROM urban_areas as u
             JOIN world_borders_hd as b
               ON ST_Intersects(b.the_geom, u.the_geom)
            WHERE b.iso_a3 = '{iso}')

SELECT tot.pop as total_population, urb.pop as urban_population,
  round(((urb.pop/tot.pop)*100)::numeric, 1) as urban_population_percentage, (tot.pop - urb.pop) as
  rural_population, round((((tot.pop - urb.pop)/tot.pop)*100)::numeric,1) as
  rural_population_percentage, round(pop_km.tot_pop_km::numeric) as population_5km,
  round(((round(pop_km.tot_pop_km::numeric)/tot.pop)*100)::numeric, 1) as population_5km_percentage,
  2015 as year
FROM (SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator, b.the_geom),1,True)).sum) as pop
        FROM population_count_2015, b
       WHERE ST_Intersects(the_raster_webmercator, b.the_geom)
      ) as tot,
     (SELECT round((ST_SummaryStatsAgg(ST_Clip(the_raster_webmercator, u.the_geom),1,True)).sum) as pop
        FROM population_count_2015, u
       WHERE ST_Intersects(the_raster_webmercator, u.the_geom)
      ) as urb,
     (SELECT total_population as tot_pop_km
        FROM population_within_5km
       WHERE iso = '{iso}'
      ) as pop_km
