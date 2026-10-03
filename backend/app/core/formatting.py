"""Indian number formatting utilities."""


def format_indian(n: int | float) -> str:
    """Format a number in Indian numbering system (lakhs, crores)."""
    n = int(round(n))
    if n < 0:
        return "-" + format_indian(-n)
    if n < 1000:
        return str(n)
    s = str(n)
    # Last 3 digits, then groups of 2
    result = s[-3:]
    s = s[:-3]
    while s:
        result = s[-2:] + "," + result
        s = s[:-2]
    return result


def format_int(n: int | float) -> str:
    """Format integer with Indian comma style."""
    return format_indian(int(round(n)))
