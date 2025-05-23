#!/usr/bin/python3
"""FIFO caching"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """FIFO cache class"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.order = []

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return
        if key in self.cache_data:
            self.cache_data[key] = item

        else:
            self.cache_data[key] = item
            self.order.append(key)

            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                oldest_key = self.order.pop(0)
                del self.cache_data[oldest_key]
                print(f"DISCARD: {oldest_key}")

    def get(self, key):
        """Get an item by key"""
        return self.cache_data.get(key, None)

    def print_cache(self):
        """Print the cache"""
        print("Current cache:")
        for key, value in self.cache_data.items():
            print(f"{key}: {value}")
