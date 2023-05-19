import parkingController from "@/lib/controllers/parkingController";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != "POST") {
        res.status(500).json({ error: "forbidden request method" });
        return;
    }

    const { id, occupated } = req.body;

    let data;
    try {
        const place = await parkingController.refreshPlace(id, occupated);
        data = JSON.stringify(place);
        res.status(200).json(data);
    } catch (e) {
        data = JSON.stringify({message: (e as Error).message});
        res.status(500).json(data);
    }

}
