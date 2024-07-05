import { v4 } from "uuid";

const GAMESHIFT_API = "https://api.gameshift.dev/nx";
const API_KEY = process.env.GAMESHIFT_API_KEY;

/**
 "referenceId": "8a58f0c0-a186-4670-9995-de5a8ae04bf3"
  "email": "suzamaki@gmail.com"
 */

const apiHeader = {
  "x-api-key": API_KEY ?? "",
};
const headers = {
  "Content-Type": "application/json",
  ...apiHeader,
};

export class GameShiftService {
  constructor() {}

  async createUser(email: string) {
    const res = await fetch(`${GAMESHIFT_API}/users`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        referenceId: v4(),
        email,
      }),
    });
    const json = await res.json();

    return json;
  }

  // todo: add filter for just the collection of heroes
  async fetchUserItems(id: string) {
    const res = await fetch(`${GAMESHIFT_API}/users/${id}/items`, {
      method: "GET",
      headers: apiHeader,
    });
    const json = await res.json();

    return json;
  }

  async createHero(userId: string, score: number) {
    const res = await fetch(`${GAMESHIFT_API}/unique-assets`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        details: {
          collectionId: "",
          description: "HERO DESCRIPTION",
          imageUrl: "HERO IMAGE",
          name: "HERO NAME",
          attributes: [
            {
              traitType: "score",
              value: `${score}`,
            },
          ],
        },
        destinationUserReferenceId: userId,
      }),
    });
    const json = await res.json();

    return json;
  }

  async pollMintStatus(itemId: string) {
    const res = await fetch(`${GAMESHIFT_API}/items/${itemId}`, {
      method: "GET",
      headers: apiHeader,
    });
    const json = await res.json();

    if (json.item.status === "Processing") {
      return await new Promise((res) => {
        let cachedItemId = itemId;
        setTimeout(() => {
          res(this.pollMintStatus(cachedItemId));
        }, 1000);
      });
    }

    return json;
  }
}
