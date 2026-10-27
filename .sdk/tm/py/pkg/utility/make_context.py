# WorkforceIntelligence SDK utility: make_context

from projectname_sdk.core.context import WorkforceIntelligenceContext


def make_context_util(ctxmap, basectx):
    return WorkforceIntelligenceContext(ctxmap, basectx)
