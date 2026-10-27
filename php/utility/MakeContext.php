<?php
declare(strict_types=1);

// WorkforceIntelligence SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WorkforceIntelligenceMakeContext
{
    public static function call(array $ctxmap, ?WorkforceIntelligenceContext $basectx): WorkforceIntelligenceContext
    {
        return new WorkforceIntelligenceContext($ctxmap, $basectx);
    }
}
