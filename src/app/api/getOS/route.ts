import { userAgent, type NextRequest } from "next/server";

export function GET(request: NextRequest) {
  const { os } = userAgent(request);

  return Response.json(os);
}
