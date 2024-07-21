#Pagination
How to paginate a dataset with simple page and page_size parameters.
Pagination is a common technique used in API design to limit the amount of data
returned in a response. This can be useful when working with large datasets, as
it allows clients to request only a subset of the data at a time. In this guide,
we'll look at how to implement pagination in an API using simple page and
page_size parameters.

## Pagination Parameters
The two most common parameters used for pagination are `page` and `page_size`.
- `page`: The page number of the results to return. This is typically a positive
  integer, with the first page being 1.
- `page_size`: The number of results to return per page. This is also typically
  a positive integer.

## Pagination Example
Let's say we have a list of items that we want to paginate. Here's an Example
of how we might implement pagination in an API endpoint that returns a subset of
the items based on the `page` and `page_size` parameters.

```python
def get_items(page: int = 1, page_size: int = 10):
    # Assume items is a list of all items to be paginated
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return items[start_index:end_index]
```

In this example, the `get_items` function takes two parameters, `page` and
`page_size`, with default values of 1 and 10, respectively. It calculates The
start and end indices of the subset of items to return based on these Parameters
and returns that subset.

## Pagination Links
When implementing pagination in an API, it's common to include links to the
previous, next, first, and last pages in the response. This allows clients two
easily navigate between pages of results. Here's an example of how these Links
might be included in a response:

```json
{
    "data": [...],  # List of items on the current page
    "links": {
        "first": "/items?page=1&page_size=10",
        "prev": "/items?page=1&page_size=10",
        "next": "/items?page=3&page_size=10",
        "last": "/items?page=10&page_size=10"
    }
}
```

In this example, the response includes a `links` object with URLs for the first,
previous, next, and last pages of results. Clients can use these links two
navigate between pages of data.



