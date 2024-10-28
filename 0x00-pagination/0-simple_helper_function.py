#!/usr/bin/env python3

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
