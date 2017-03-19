from concurrent.futures import ThreadPoolExecutor

thread_pool = ThreadPoolExecutor()


def use_thread_pool(func):
    def wrapper(*args, **kwargs):
        return thread_pool.submit(func, *args, **kwargs)
    return wrapper
