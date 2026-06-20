import pandas as pd

df1 = pd.read_csv('/Users/mukesh/Documents/FLIPKART/backend/data/cleaned_event_dataset.csv')
df2 = pd.read_csv('/Users/mukesh/Documents/FLIPKART/backend/data/cluster_centers.csv')
df3 = pd.read_csv('/Users/mukesh/Documents/FLIPKART/backend/data/traffic_events_clustered.csv')
df4 = pd.read_csv('/Users/mukesh/Documents/FLIPKART/backend/data/traffic_events_ml.csv')

print("df1 columns:", df1.columns.tolist())
print("df2 columns:", df2.columns.tolist())
print("df3 columns:", df3.columns.tolist())
print("df4 columns:", df4.columns.tolist())