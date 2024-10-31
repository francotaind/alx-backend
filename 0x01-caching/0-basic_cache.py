#!/usr/bin/python3
""" BasicCache module
"""


from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    BasicCache defines a basic caching system with no limit
    Inherits from BaseCaching
    """
    def put(self, key, item):
        """
        Add an item to the cache_data
        Args:
            Key: Key to the item
            Item: The value to associate with the key
        """
        if key is not None and item is not None:
            self.cache_data[key] = item

    def get(self, key):
        """
        Get an item by key
        Args:
            Key: The key to lookup
        Returns:
            The value associated with the key, or None if not found
        """
        if key is not None:
            return self.cache_data.get(key)
        return None
