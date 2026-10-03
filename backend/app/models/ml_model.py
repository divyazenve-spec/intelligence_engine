"""Model load/unload logic for future ML/recommendation models (artifacts live in backend/artifacts).
Not used yet: the current AI brief is rule-based, not a trained model."""
_loaded = {}


def load_model(name, loader):
    if name not in _loaded:
        _loaded[name] = loader()
    return _loaded[name]


def unload_model(name):
    _loaded.pop(name, None)
