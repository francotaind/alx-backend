#!/usr/bin/env python3
"""pagination using indexes"""


from typing import List
import csv
import math


def index_range(page: int, page_size: int) -> tuple:
    """
    Return a tuple containing start and end indexes for pagination

    Args:
    page(int): page number (1-indexed)
    page_size(int): number of items per page

    Returns:
    tuple: A tuple with the start and end index for the specified page
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """
        server class to paginate of popular baby names
    """
    DATA_FILE = "/francota/alx-backend/0x00-pagination/Popular_Baby_Names.csv"

    def __init__(self):
        """initialize the server"""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieves a page of data from the dataset.

        Args:
            page(int): The page number (1-indexed)
            page_size(int): The number of items per page

        Returrns:
            List[list]: A list of rows from the dataset  the page
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = index_range(page, page_size)

        dataset = self.dataset()

        if start_index >= len(dataset):
            return []
        return dataset[start_index:end_index]
