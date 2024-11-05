
import { NextResponse } from "next/server"
import City from "../../model/user"
import { connectMongoDb } from "../../mongo"

export async function POST(res:Request){
    try {
        await connectMongoDb()

        const { cityName, cityImage }:{cityName:string,cityImage:string} = await res.json()

        if(!cityName || !cityImage){
            return NextResponse.json({message:'Need to fill out a cityName and a cityImage'},{status:400})
        }

        const createCity = await City.create({cityName,cityImage})

        return NextResponse.json({message:'Creation was successfull'},{status:201})

    } catch (error) {
        console.log(error)  
        return NextResponse.json({ message: 'An error occurred', error: (error as Error).message }, { status: 500 });
    }
}