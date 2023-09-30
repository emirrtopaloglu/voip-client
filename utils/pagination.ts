import { NextRequest } from "next/server";

export default function getOffsetLimitParams(request: NextRequest): {
  offset: number;
  limit: number;
} {
  const searchParams = request.nextUrl.searchParams;
  const page = +searchParams.get("page") || 1;
  const limit = +searchParams.get("limit") || 10;

  return {
    offset: (page - 1) * limit,
    limit: limit,
  };
}
