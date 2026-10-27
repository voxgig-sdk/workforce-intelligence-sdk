<?php
declare(strict_types=1);

// WorkforceIntelligence SDK utility: result_headers

class WorkforceIntelligenceResultHeaders
{
    public static function call(WorkforceIntelligenceContext $ctx): ?WorkforceIntelligenceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
