import { GameShiftService } from "@/app/_services/gameShift";

export const runtime = "edge";

const service = new GameShiftService();

export async function POST(request: Request) {
  const body = await request.json();
  const userEmail = body.email;

  const allUsers = await service.fetchAllUsers();

  const userExists = allUsers.data.find(
    (user: any) => user.email === userEmail,
  );
  if (userExists) {
    return Response.json(userExists, {
      status: 200,
    });
  }

  try {
    const data = await service.createUser(userEmail);

    return Response.json(data, {
      status: 200,
    });
  } catch (e) {
    return Response.error();
  }
}
