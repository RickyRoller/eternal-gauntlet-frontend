import { GameShiftService } from "@/app/_services/gameShift";

const service = new GameShiftService();

interface Params {
  id: string;
}

export async function POST(request: Request, context: { params: Params }) {
  const userId = context.params.id;
  const body = await request.json();
  const hero = body.hero;

  const data = await service.createHero(userId, hero);
  const pollingData = await service.pollMintStatus(data.id);

  return Response.json(pollingData, {
    status: 200,
  });
}
