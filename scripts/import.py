"""
script to convert csv to geojson
"""

# import modules
import pandas as pd
import geopandas as gpd
from shapely import geometry

# import csv file
df = pd.read_csv('./data/places.csv')

# convert csv to geojson
gdf = gpd.GeoDataFrame(df, geometry=gpd.points_from_xy(df.Longitude, df.Latitude))

# export to geojson
gdf.to_file('./data/places.geojson', driver='GeoJSON')
