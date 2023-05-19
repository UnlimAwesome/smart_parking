import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(req.body);

    if(req.method != "POST"){
        res.status(500).json({error: "forbidden request method"});
        return;
    }

    const {id, occupated} =  req.body;


    res.status(200).json({ success: true });
}
