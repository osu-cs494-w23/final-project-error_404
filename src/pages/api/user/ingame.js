import { connectToDB } from "../../../../lib/db";
async function handler( req, res){
    if(req.method === "POST" ){
        const data = req.body
        const {email} = data

        const client = await connectToDB();

        //console.log(req)
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: email,
        });

        if (user == null) {
          client.close();
          res.status(404).json({message: "No user found."})
        }

        // client.close()
        console.log(user)
        res.status(200).json({
            name: user.name,
            email: user.email,
            tagline: user.tagline,
            gamename: user.gamename
        });

        
    }
    //console.log(req)
    
}
export default handler