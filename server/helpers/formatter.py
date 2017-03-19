def to_json_result(label, score):
    return {'label': label, 'score': '{:04.2f}%'.format(score * 100)}
