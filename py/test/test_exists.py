# WorkforceIntelligence SDK exists test

import pytest
from workforceintelligence_sdk import WorkforceIntelligenceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WorkforceIntelligenceSDK.test(None, None)
        assert testsdk is not None
