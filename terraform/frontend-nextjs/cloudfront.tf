resource "aws_cloudfront_origin_access_control" "s3_bucket_oac" {
  name                              = "${var.S3_BUCKET}_oac"
  description                       = "OAC policy for ${var.S3_BUCKET}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_cloudfront_cache_policy" "CachingOptimized" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_response_headers_policy" "CORS_With_Preflight" {
  name = "Managed-CORS-With-Preflight"
}

resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name              = aws_s3_bucket.cdn_bucket.bucket_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.s3_bucket_oac.id
    origin_id                = var.S3_BUCKET
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "frontend-nextjs-cdn"
  price_class         = "PriceClass_All"
  wait_for_deployment = false


  aliases = [var.S3_BUCKET]

  viewer_certificate {
    acm_certificate_arn      = var.CertificateARN
    minimum_protocol_version = "TLSv1.2_2021"
    ssl_support_method       = "sni-only"
  }

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = var.S3_BUCKET
    cache_policy_id  = data.aws_cloudfront_cache_policy.CachingOptimized.id

    viewer_protocol_policy     = "redirect-to-https"
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.CORS_With_Preflight.id
    compress                   = true
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }
}
