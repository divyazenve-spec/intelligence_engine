"""Number formatting helpers matching the JS toLocaleString output used in the AI brief."""


def num(value):
    """int for whole numbers, float otherwise (matches JSON numbers from the original API)."""
    if value is None:
        return 0
    f = float(value)
    return int(f) if f == int(f) else f


def format_indian(n):
    """JS `toLocaleString('en-IN')` equivalent (lakh/crore grouping)."""
    neg = n < 0
    n = abs(n)
    whole = int(n)
    frac = ""
    if n != whole:
        frac = ("%.3f" % (n - whole)).rstrip("0")[1:]
        if frac == ".":
            frac = ""
    s = str(whole)
    if len(s) > 3:
        head, tail = s[:-3], s[-3:]
        parts = []
        while len(head) > 2:
            parts.insert(0, head[-2:])
            head = head[:-2]
        if head:
            parts.insert(0, head)
        s = ",".join(parts) + "," + tail
    return ("-" if neg else "") + s + frac


def format_int(n):
    """JS `toLocaleString()` (en-US) for integers."""
    return f"{int(n):,}"
