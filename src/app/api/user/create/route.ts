import { GameShiftService } from "@/services/gameShift";

export const runtime = "edge";

const service = new GameShiftService();

export async function POST(request: Request) {
  const body = await request.json();
  const userEmail = body.email;
  console.log(userEmail);

  try {
    const data = await service.createUser(userEmail);

    return Response.json(data, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return Response.error();
  }
}
