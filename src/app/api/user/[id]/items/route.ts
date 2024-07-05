import { GameShiftService } from "@/app/_services/gameShift";

const service = new GameShiftService();

interface Params {
  id: string;
}

export async function GET(request: Request, context: { params: Params }) {
  const userId = context.params.id;

  const data = await service.fetchUserItems(userId);

  return Response.json(data, {
    status: 200,
  });
}
