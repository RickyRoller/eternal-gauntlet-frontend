import { v4 } from "uuid";
import { Heroes } from "../types/heroes";
import { getHeroImage } from "../utils/getHeroImage";
import { getHeroName } from "../utils/getHeroName";

const SITE_URL = "https://eternal-gauntlet-frontend.vercel.app";
const GAMESHIFT_API = "https://api.gameshift.dev/nx";
const API_KEY = process.env.GAMESHIFT_API_KEY;
const COLLECTION_ID = "b16e1684-4e4f-4291-8a64-b117ba90d709";

const apiHeader = {
  "x-api-key": API_KEY ?? "",
  "cache-control": "no-cache",
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

  async fetchUserItems(id: string) {
    const res = await fetch(
      `${GAMESHIFT_API}/users/${id}/items?collectionId=${COLLECTION_ID}`,
      {
        method: "GET",
        headers: apiHeader,
      },
    );
    const json = await res.json();

    return json;
  }

  async createHero(userId: string, hero: Heroes) {
    const heroImage = getHeroImage(hero);
    const heroName = getHeroName(hero);
    const res = await fetch(`${GAMESHIFT_API}/unique-assets`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        details: {
          collectionId: COLLECTION_ID,
          description: "An epic hero caught in the eternal gauntlet",
          imageUrl: `${SITE_URL}${heroImage}`,
          name: heroName,
          attributes: [
            {
              traitType: "hero",
              value: hero,
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

  async fetchAllUsers() {
    const res = await fetch(`${GAMESHIFT_API}/users`, {
      method: "GET",
      headers: apiHeader,
    });
    const json = await res.json();

    return json;
  }
}
