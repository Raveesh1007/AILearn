import { NextApiRequest, NextApiResponse } from "next"; 
import axios from "axios";


type Data = {
    success: boolean;
    error?: string;
};

interface KnowledgeEntrySchema{
    class: string,
    description: string,
    properties: {
        name: string,
        datatype: string[];
        description?: string;
    }[];
}

export default async function handler (
    res: NextApiResponse,
    req: NextApiRequest,
)
{
    const schema: KnowledgeEntrySchema = {
        class: 'KnowledgeEntry',
        description: "Data by the user fed to the AI",
        properties: [
            {
                name: 'statement',
                datatype: ["text"],
                description: 'provided by the user',
            },
            {
                name: 'source',
                datatype: ['string'],
                description: 'source of the information'
            },
            {
                name:'Image',
                datatype: ['blob'],
                description: 'Base64-encoded image data',
            },
            {
                name:'timestamp',
                datatype: ['data'],
                description:'Time when the data was submitted'
            }
        ]
    };

    try{
        await axios.post(`${process.env.WEAVIATE_HOST}/v1/schema`, schema);
        res.status(200).json({success: true});
    } catch(error: any){
        res.status(500).json({success: false, error: error.message});
    }
}